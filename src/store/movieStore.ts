import { create } from "zustand";
import { fetchPopularMovies, type Movie } from "../services/tmdb";

type MovieState = {
  popularMovies: Movie[];
  isLoading: boolean;
  error: string | null;
  /** True as soon as the first fetch has finished (success or failure). */
  hasFetched: boolean;
  fetchPopularMovies: () => Promise<void>;
};

export const useMovieStore = create<MovieState>()((set, get) => ({
  popularMovies: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchPopularMovies: async () => {
    // Fetch only once per page load. Combined with the fact that this is called
    // from MainLayout (which stays mounted across route changes), this means the
    // data is only refetched when the user reloads the app. The guard also
    // absorbs the double-invocation caused by React StrictMode in development.
    if (get().hasFetched || get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const popularMovies = await fetchPopularMovies();
      set({ popularMovies, hasFetched: true, isLoading: false });
    } catch (err) {
      set({
        hasFetched: true,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load movies.",
      });
    }
  },
}));
