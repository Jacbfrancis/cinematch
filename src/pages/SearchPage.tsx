import { useEffect, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { searchMovies, type Movie } from "../services/tmdb";
import { useFavorites } from "../context/FavoritesContext";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Debounced search so we only hit the TMDB API once the user pauses typing.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);

    const handle = setTimeout(async () => {
      try {
        const movies = await searchMovies(trimmed);
        setResults(movies);
        setHasSearched(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to search movies.",
        );
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(handle);
  }, [query]);

  // Guard against TMDb titles missing a poster so we don't render broken images.
  const withPoster = results.filter((movie) => movie.poster);

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Search Movies</h1>

          <p className="mt-2 text-slate-400">Find your next favorite movie</p>
        </div>

        {/* Search Bar */}

        <div className="mx-auto mb-8 max-w-4xl">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies by title..."
              className="
                h-11
                w-full
                rounded-full
                border
                border-amber-400
                bg-[#091126]
                pl-14
                pr-14
                text-white
                outline-none
                placeholder:text-slate-500
              "
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Results */}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching movies…</span>
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-red-400">{error}</p>
        ) : !query.trim() ? (
          <p className="py-16 text-center text-sm text-slate-500">
            Start typing to search for movies.
          </p>
        ) : hasSearched && withPoster.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-400">
            No movies found for “{query.trim()}”.
          </p>
        ) : withPoster.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 lg:grid-cols-5 xl:grid-cols-6">
            {withPoster.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                genres={movie.genres}
                releaseDate={movie.releaseDate}
                poster={movie.poster}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={() => toggleFavorite(movie)}
              />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
