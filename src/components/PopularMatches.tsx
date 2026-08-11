import MovieCard from "./MovieCard";
import { FEATURES } from "../constants/features";
import { useFavorites } from "../context/FavoritesContext";
import { useMovieStore } from "../store/movieStore";

export default function PopularMatches() {
  const movies = useMovieStore((state) => state.popularMovies);
  const isLoading = useMovieStore((state) => state.isLoading);
  const error = useMovieStore((state) => state.error);
  const { isFavorite, toggleFavorite } = useFavorites();

  // The popular endpoint returns posters for nearly every title, but guard
  // against the odd one without one so we don't render broken images.
  const withPoster = movies.filter((movie) => movie.poster);

  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 border-l-2 border-amber-500 pl-3">
          <h2 className="text-lg font-bold text-white md:text-xl">
            Popular matches this week
          </h2>
          <p className="text-sm text-gray-400">Top picks from the TMDB API</p>
        </div>

        {/* Movie row */}
        <div className="relative">
          {isLoading && withPoster.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-400">
              Loading popular movies…
            </p>
          ) : error && withPoster.length === 0 ? (
            <p className="py-10 text-center text-sm text-red-400">{error}</p>
          ) : (
            <div className="flex gap-4 overflow-x-scroll pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-x-visible md:pb-0">
              {withPoster.slice(0, 18).map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  genres={movie.genres}
                  runtime={movie.runtime}
                  releaseDate={movie.releaseDate}
                  poster={movie.poster}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Feature strip */}
        <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-amber-500">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="mt-1 text-xs text-gray-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
