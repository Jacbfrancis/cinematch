import { create } from "zustand";
import {
  recommendMovie,
  type MovieSuggestion,
  type RecommendInput,
} from "../services/gemini";

import {
  searchMovie,
  fetchMovieVideos,
  fetchMovieWatchProviders,
  fetchMovieCredits,
  pickTrailer,
  type Movie,
  type MovieCredits,
  type WatchProvider,
} from "../services/tmdb";

type RecommendationState = {
  answers: RecommendInput | null;
  suggestion: MovieSuggestion | null;
  movie: Movie | null;
  credits: MovieCredits | null;
  trailerUrl: string | null;
  trailerThumbnail: string;
  providers: WatchProvider[];
  /** Titles already shown to the user, so "Try another match" avoids repeats. */
  seenTitles: string[];
  isLoading: boolean;
  error: string | null;
  generateRecommendation: (answers: RecommendInput) => Promise<void>;
  clear: () => void;
};

export const useRecommendationStore = create<RecommendationState>()(
  (set, get) => ({
    answers: null,
    suggestion: null,
    movie: null,
    credits: null,
    trailerUrl: null,
    trailerThumbnail: "",
    providers: [],
    seenTitles: [],
    isLoading: false,
    error: null,

    // Ask the recommendation service for a suggestion (excluding already-shown
    // titles), look it up on TMDB, then resolve the trailer + streaming
    // providers so the results page can render.
    generateRecommendation: async (answers) => {
      set({ isLoading: true, error: null });
      try {
        const suggestion = await recommendMovie(answers, get().seenTitles);
        const movie = await searchMovie(suggestion.title);
        const [videos, watch, credits] = await Promise.all([
          fetchMovieVideos(movie.id),
          fetchMovieWatchProviders(movie.id, movie.title),
          fetchMovieCredits(movie.id),
        ]);
        const trailer = pickTrailer(videos);

        set((state) => ({
          answers,
          suggestion,
          movie,
          credits,
          trailerUrl: trailer?.youtubeUrl ?? null,
          trailerThumbnail: trailer?.thumbnail ?? movie.backdrop,
          providers: watch.platforms,
          seenTitles: state.seenTitles.includes(movie.title)
            ? state.seenTitles
            : [...state.seenTitles, movie.title],
          isLoading: false,
        }));
      } catch (err) {
        set({
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "We couldn't find a match right now. Please try again.",
        });
      }
    },

    clear: () =>
      set({
        answers: null,
        suggestion: null,
        movie: null,
        credits: null,
        trailerUrl: null,
        trailerThumbnail: "",
        providers: [],
        seenTitles: [],
        error: null,
      }),
  }),
);
