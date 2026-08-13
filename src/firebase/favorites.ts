import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";
import type { Movie } from "../services/tmdb";

/**
 * The shape of a saved favorite as stored in Firestore. `runtime` and
 * `overview` are kept as strings and `addedAt` is a timestamp so the object is
 * fully serializable and sortable by "recently added".
 */
export type FavoriteMovie = {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: string;
  genres: string[];
  overview: string;
  addedAt: number;
};

export type UserProfile = {
  name: string;
  email: string;
};

function userDoc(uid: string) {
  return doc(db, "users", uid);
}

/** Maps a full TMDB movie into the serializable {@link FavoriteMovie} shape. */
export function toFavoriteMovie(movie: Movie): FavoriteMovie {
  const year = Number.parseInt((movie.releaseDate ?? "").slice(0, 4), 10) || 0;
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating,
    year,
    runtime: movie.runtime ?? "",
    genres: movie.genres,
    overview: movie.overview,
    addedAt: Date.now(),
  };
}

/**
 * Returns the user's Firestore doc, creating it on first call if it doesn't
 * already exist. Every user gets a `users/{uid}` doc with their name, email,
 * account creation date, and empty `favorites` / `recommendedMovies` arrays.
 */
export async function getOrCreateUserDoc(user: User): Promise<void> {
  const ref = userDoc(user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      name: user.displayName ?? "",
      email: user.email ?? "",
      createdAt: serverTimestamp(),
      favorites: [],
      recommendedMovies: [],
    });
  }
}

/** Fetches the current list of favorite movies for a user. */
export async function fetchFavorites(uid: string): Promise<FavoriteMovie[]> {
  const snap = await getDoc(userDoc(uid));
  const data = snap.data();
  return (data?.favorites as FavoriteMovie[] | undefined) ?? [];
}

/**
 * Merges a list of movies into a user's favorites (de-duped by id), keeping the
 * passed-in movies first. Used to transfer locally-saved favorites into the
 * database when a user signs up. Returns the merged list.
 */
export async function mergeFavorites(
  uid: string,
  movies: FavoriteMovie[],
): Promise<FavoriteMovie[]> {
  const ref = userDoc(uid);
  const snap = await getDoc(ref);
  const existing = (snap.data()?.favorites as FavoriteMovie[] | undefined) ?? [];
  const incomingIds = new Set(movies.map((movie) => movie.id));
  const merged = [...movies, ...existing.filter((movie) => !incomingIds.has(movie.id))];
  await setDoc(ref, { favorites: merged }, { merge: true });
  return merged;
}

/**
 * Adds a movie to a user's favorites. Reads the current list, de-dupes by id
 * and prepends the movie so it appears first under "Recently Added".
 */
export async function addFavorite(uid: string, movie: FavoriteMovie): Promise<void> {
  const ref = userDoc(uid);
  const snap = await getDoc(ref);
  const favorites = (snap.data()?.favorites as FavoriteMovie[] | undefined) ?? [];
  const deduped = favorites.filter((item) => item.id !== movie.id);
  await setDoc(ref, { favorites: [movie, ...deduped] }, { merge: true });
}

/**
 * Removes a movie from a user's favorites by id. Reads the current list and
 * writes back the filtered version so we don't depend on object-equality.
 */
export async function removeFavoriteById(uid: string, id: number): Promise<void> {
  const ref = userDoc(uid);
  const snap = await getDoc(ref);
  const favorites = (snap.data()?.favorites as FavoriteMovie[] | undefined) ?? [];
  const remaining = favorites.filter((movie) => movie.id !== id);
  await setDoc(ref, { favorites: remaining }, { merge: true });
}