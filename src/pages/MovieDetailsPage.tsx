import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import MovieBanner from "../components/MovieBanner";
import StreamingAvailability from "../components/StreamingAvailability";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchMovieWatchProviders,
  pickTrailer,
  type Movie,
  type WatchProvider,
} from "../services/tmdb";
import { useMovieStore } from "../store/movieStore";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = Number(id);
  const invalidMovie = Number.isNaN(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Look the movie up in the store so we can render it instantly (it was just
  // clicked from the popular list) while the full details fetch completes.
  const storeMovie = useMovieStore(
    (state) =>
      state.popularMovies.find((movie) => movie.id === movieId) ?? null,
  );

  const [movie, setMovie] = useState<Movie | null>(storeMovie);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerThumbnail, setTrailerThumbnail] = useState<string>("");
  const [providers, setProviders] = useState<WatchProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (invalidMovie) return;

    const load = async () => {
      const movieData = await fetchMovieDetails(movieId);
      const videos = await fetchMovieVideos(movieId);
      const watch = await fetchMovieWatchProviders(movieId, movieData.title);
      return { movieData, videos, watch };
    };

    load()
      .then(({ movieData, videos, watch }) => {
        if (!active) return;
        const trailer = pickTrailer(videos);
        setMovie(movieData);
        setTrailerUrl(trailer?.youtubeUrl ?? null);
        setTrailerThumbnail(trailer?.thumbnail ?? movieData.backdrop);
        setProviders(watch.platforms);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Failed to load movie details.",
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [movieId, invalidMovie]);

  const year = movie?.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : undefined;

  const openTrailer = () => {
    if (trailerUrl) window.open(trailerUrl, "_blank", "noopener,noreferrer");
  };

  // Adapt the TMDB watch providers to what StreamingAvailability expects
  // (id as a string, optional logo, and a clickable url).
  const streamingPlatforms = providers.map((platform) => ({
    id: String(platform.id),
    name: platform.name,
    color: "text-white",
    url: platform.url,
    logo: platform.logo,
  }));

  return (
    <div>
      {loading && !movie ? (
        <section className="w-full bg-[#0a0e1a] px-6 py-24 text-center md:px-12">
          <p className="text-sm text-gray-400">Loading movie details…</p>
        </section>
      ) : error && !movie ? (
        <section className="w-full bg-[#0a0e1a] px-6 py-24 text-center md:px-12">
          <p className="text-sm text-red-400">{error}</p>
        </section>
      ) : movie ? (
        <>
          <MovieBanner
            eyebrow="TMDB · Movie Details"
            title={movie.title}
            moodTags={[]}
            tagline={movie.overview}
            rating={movie.rating}
            year={year ?? 0}
            runtime={movie.runtime ?? "—"}
            genres={movie.genres}
            backdrop={movie.backdrop}
            onPlayTrailer={trailerUrl ? openTrailer : undefined}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={() => toggleFavorite(movie)}
          />

          {/* About the movie */}
          <section className="w-full bg-[#0a0e1a] px-6 py-16 md:px-12">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-[260px_1fr] md:items-start">
              {/* Poster */}
              <div className="relative mx-auto w-full max-w-[260px] md:mx-0">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* About */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 shadow-lg shadow-black/30">
                <div className="flex items-center gap-2.5">
                  <span className="h-4 w-1 rounded-full bg-amber-500" />
                  <h2 className="text-lg font-bold tracking-tight text-white">
                    About The Movie
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {movie.overview}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/5 pt-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                      Release Date
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-gray-200">
                      {movie.releaseDate || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                      Runtime
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-gray-200">
                      {movie.runtime || "—"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                      Genres
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-gray-200">
                      {movie.genres.join(", ") || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <StreamingAvailability
            platforms={streamingPlatforms}
            trailerThumbnail={trailerThumbnail || movie.backdrop}
            trailerDuration={trailerUrl ? "Trailer" : undefined}
            onPlayTrailer={trailerUrl ? openTrailer : undefined}
          />
        </>
      ) : null}

      {/* Back */}
      <div className="w-full bg-[#0a0e1a] px-6 pb-10 md:px-12">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-amber-500/40 hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

