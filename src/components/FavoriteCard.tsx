import { useNavigate } from "react-router";
import { Star, Heart } from "lucide-react";
import type { FavoriteMovie } from "../firebase/favorites";

type FavoriteCardProps = {
  movie: FavoriteMovie;
  onRemove?: (id: number) => void;
};

export function FavoriteCard({ movie, onRemove }: FavoriteCardProps) {
  const navigate = useNavigate();
  const open = () => navigate(`/movie/${movie.id}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className="flex cursor-pointer gap-4 rounded-xl border border-white/10 bg-[#0d1224] p-4 transition-colors hover:border-amber-500/40 lg:block lg:overflow-hidden lg:p-0"
    >
      {/* Poster */}
      <div className="w-20 shrink-0 sm:w-24 lg:w-full">
        <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg lg:rounded-none">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />

          {/* Desktop overlays */}
          <div className="hidden lg:block">
            {/* Rating */}
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-amber-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {movie.rating.toFixed(1)}
            </span>

            {/* Favorite */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(movie.id);
              }}
              aria-label={`Remove ${movie.title} from favorites`}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/70 transition-colors hover:text-amber-400"
            >
              <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 lg:p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-base font-bold text-white sm:text-lg lg:text-sm">
            {movie.title}
          </h3>

          {/* Mobile only actions */}
          <div className="flex shrink-0 items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(movie.id);
              }}
              aria-label={`Remove ${movie.title} from favorites`}
            >
              <Heart className="h-5 w-5 fill-amber-500 text-amber-500" />
            </button>
          </div>
        </div>

        {/* Mobile meta */}
        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-gray-400 sm:text-sm lg:hidden">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {movie.rating.toFixed(1)}
          </span>
          {movie.year > 0 && (
            <>
              <span>·</span>
              <span>{movie.year}</span>
            </>
          )}
          {movie.runtime && (
            <>
              <span>·</span>
              <span>{movie.runtime}</span>
            </>
          )}
          {movie.genres.length > 0 && (
            <>
              <span>·</span>
              <span>{movie.genres.join(", ")}</span>
            </>
          )}
        </div>

        {/* Mobile description */}
        {movie.overview && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-400 lg:hidden">
            {movie.overview}
          </p>
        )}

        {/* Desktop meta (MovieCard style) */}
        <div className="hidden lg:block">
          <p className="mt-1 truncate text-xs text-gray-400">
            {movie.genres.join(" · ") || "—"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {movie.runtime || (movie.year > 0 ? String(movie.year) : "")}
          </p>
        </div>
      </div>
    </div>
  );
}