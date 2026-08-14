import { create } from "zustand";
import {
  recommendMovie,
  surpriseMovie,
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
  /** Where the current pick came from — drives how "Try another match" behaves. */
  mode: "questionnaire" | "surprise";
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
  generateSurprise: () => Promise<void>;
  clear: () => void;
};

export const useRecommendationStore = create<RecommendationState>()(
  (set, get) => ({
    mode: "questionnaire",
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
      set({ isLoading: true, error: null, mode: "questionnaire" });
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

    // The "Surprise me" flow: ask for a deliberately random, unexpected movie
    // (reusing the same trailer / credits / streaming pipeline).
    generateSurprise: async () => {
      // Absorb double-invocations (React StrictMode, rapid re-clicks).
      if (get().isLoading) return;
      set({
        isLoading: true,
        error: null,
        mode: "surprise",
        answers: null,
        suggestion: null,
        movie: null,
        credits: null,
        trailerUrl: null,
        trailerThumbnail: "",
        providers: [],
      });
      try {
        const suggestion = await surpriseMovie(get().seenTitles);
        // Record the suggested title immediately so the "no repeats" list always
        // advances — even if the TMDB lookup below fails and we bail to catch.
        set((state) =>
          state.seenTitles.includes(suggestion.title)
            ? {}
            : { seenTitles: [...state.seenTitles, suggestion.title] },
        );
        const movie = await searchMovie(suggestion.title);
        const [videos, watch, credits] = await Promise.all([
          fetchMovieVideos(movie.id),
          fetchMovieWatchProviders(movie.id, movie.title),
          fetchMovieCredits(movie.id),
        ]);
        const trailer = pickTrailer(videos);

        set({
          suggestion,
          movie,
          credits,
          trailerUrl: trailer?.youtubeUrl ?? null,
          trailerThumbnail: trailer?.thumbnail ?? movie.backdrop,
          providers: watch.platforms,
          isLoading: false,
        });
      } catch (err) {
        set({
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "We couldn't find a surprise movie right now. Please try again.",
        });
      }
    },

    clear: () =>
      set({
        mode: "questionnaire",
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
