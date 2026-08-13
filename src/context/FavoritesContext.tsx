import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  addFavorite,
  fetchFavorites,
  getOrCreateUserDoc,
  mergeFavorites,
  removeFavoriteById,
  toFavoriteMovie,
  type FavoriteMovie,
} from "../firebase/favorites";
import type { Movie } from "../services/tmdb";

const LOCAL_FAVORITES_KEY = "cinematch.favorites";

function readLocalFavorites(): FavoriteMovie[] {
  try {
    const raw = localStorage.getItem(LOCAL_FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as FavoriteMovie[]) : [];
  } catch {
    return [];
  }
}

function writeLocalFavorites(movies: FavoriteMovie[]) {
  try {
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(movies));
  } catch {
    // Storage may be unavailable (private mode / quota) — ignore.
  }
}

interface FavoritesContextValue {
  favorites: FavoriteMovie[];
  isLoading: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  transferLocalFavorites: (uid: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.uid;

  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Remembers the uid for which a successful localStorage→DB transfer happened,
  // so a stale in-flight fetch can't overwrite the transferred favorites.
  const transferredUidRef = useRef<string | null>(null);

  // Load the user's favorites whenever their auth state changes. Guests load
  // from localStorage; signed-in users load from Firestore.
  useEffect(() => {
    let active = true;

    const finish = (movies: FavoriteMovie[]) => {
      if (!active) return;
      setFavorites(movies);
      setIsLoading(false);
    };

    if (!userId) {
      transferredUidRef.current = null;
      // Defer past the effect body so we don't set state synchronously.
      Promise.resolve().then(() => finish(readLocalFavorites()));
      return;
    }

    if (transferredUidRef.current === userId) {
      // Favorites were already set by a successful transfer for this user.
      return;
    }

    fetchFavorites(userId)
      .then((movies) => {
        if (!active) return;
        if (transferredUidRef.current === userId) return;
        setFavorites(movies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load favorites", error);
        if (!active) return;
        if (transferredUidRef.current === userId) return;
        setFavorites([]);
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const ensureDoc = useCallback(async () => {
    if (user) await getOrCreateUserDoc(user);
  }, [user]);

  const isFavorite = useCallback(
    (id: number) => favorites.some((favorite) => favorite.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    async (movie: Movie) => {
      const favorite = toFavoriteMovie(movie);
      const existing = favorites.some((item) => item.id === movie.id);

      if (!user) {
        // Guest: persist to localStorage.
        const next = existing
          ? favorites.filter((item) => item.id !== movie.id)
          : [favorite, ...favorites];
        setFavorites(next);
        writeLocalFavorites(next);
        return;
      }

      // Signed in: optimistic update + Firestore.
      setFavorites((prev) =>
        existing
          ? prev.filter((item) => item.id !== movie.id)
          : [favorite, ...prev],
      );
      try {
        await ensureDoc();
        if (existing) await removeFavoriteById(user.uid, movie.id);
        else await addFavorite(user.uid, favorite);
      } catch (error) {
        console.error("Failed to update favorite", error);
        try {
          setFavorites(await fetchFavorites(user.uid));
        } catch {
          // ignore
        }
      }
    },
    [user, favorites, ensureDoc],
  );

  const removeFavorite = useCallback(
    async (id: number) => {
      if (!user) {
        const next = favorites.filter((item) => item.id !== id);
        setFavorites(next);
        writeLocalFavorites(next);
        return;
      }

      setFavorites((prev) => prev.filter((item) => item.id !== id));
      try {
        await ensureDoc();
        await removeFavoriteById(user.uid, id);
      } catch (error) {
        console.error("Failed to remove favorite", error);
        try {
          setFavorites(await fetchFavorites(user.uid));
        } catch {
          // ignore
        }
      }
    },
    [user, favorites, ensureDoc],
  );

  const transferLocalFavorites = useCallback(async (uid: string) => {
    const local = readLocalFavorites();
    if (local.length === 0) {
      writeLocalFavorites([]);
      return;
    }
    try {
      const merged = await mergeFavorites(uid, local);
      writeLocalFavorites([]);
      transferredUidRef.current = uid;
      setFavorites(merged);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to transfer local favorites", error);
    }
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isLoading,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      transferLocalFavorites,
    }),
    [
      favorites,
      isLoading,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      transferLocalFavorites,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
