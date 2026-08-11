import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  addFavorite,
  fetchFavorites,
  getOrCreateUserDoc,
  removeFavoriteById,
  toFavoriteMovie,
  type FavoriteMovie,
} from "../firebase/favorites";
import type { Movie } from "../services/tmdb";
import SignInPromptModal from "../components/SignInPromptModal";

interface FavoritesContextValue {
  favorites: FavoriteMovie[];
  isLoading: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  authPromptOpen: boolean;
  closeAuthPrompt: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.uid;

  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);

  // Load the user's favorites whenever their auth state changes (on mount,
  // reload, sign-in and sign-out).
  useEffect(() => {
    let active = true;

    const finish = (movies: FavoriteMovie[]) => {
      if (!active) return;
      setFavorites(movies);
      setIsLoading(false);
    };

    if (!userId) {
      // Defer past the effect body so we don't set state synchronously.
      Promise.resolve().then(() => finish([]));
      return;
    }

    fetchFavorites(userId)
      .then(finish)
      .catch((error) => {
        console.error("Failed to load favorites", error);
        finish([]);
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
      if (!user) {
        setAuthPromptOpen(true);
        return;
      }

      const existing = favorites.some((favorite) => favorite.id === movie.id);
      const favorite = toFavoriteMovie(movie);

      // Optimistic update so the UI responds immediately.
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
        // Re-sync with the database if the write failed.
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
        setAuthPromptOpen(true);
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
    [user, ensureDoc],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isLoading,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      authPromptOpen,
      closeAuthPrompt: () => setAuthPromptOpen(false),
    }),
    [
      favorites,
      isLoading,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      authPromptOpen,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
      <SignInPromptModal
        open={authPromptOpen}
        onClose={() => setAuthPromptOpen(false)}
      />
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