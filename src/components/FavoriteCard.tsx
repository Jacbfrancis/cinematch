import { Star, Heart, MoreVertical } from "lucide-react";

type FavoriteMovie = {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: string;
  genres: string[];
  description: string;
};

type FavoriteCardProps = {
  movie: FavoriteMovie;
  onToggleFavorite?: (id: string) => void;
  onMore?: (id: string) => void;
};

export function FavoriteCard({
  movie,
  onToggleFavorite,
  onMore,
}: FavoriteCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/10 bg-[#0d1224] p-4 lg:block lg:overflow-hidden lg:p-0">
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
              onClick={() => onToggleFavorite?.(movie.id)}
              aria-label="Remove from favorites"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/70"
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
              onClick={() => onToggleFavorite?.(movie.id)}
              aria-label="Remove from favorites"
            >
              <Heart className="h-5 w-5 fill-amber-500 text-amber-500" />
            </button>

            <button
              type="button"
              onClick={() => onMore?.(movie.id)}
              aria-label="More options"
              className="text-gray-500 transition-colors hover:text-gray-300"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile meta */}
        <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-gray-400 sm:text-sm lg:hidden">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {movie.rating.toFixed(1)}
          </span>
          <span>·</span>
          <span>{movie.year}</span>
          <span>·</span>
          <span>{movie.runtime}</span>
          <span>·</span>
          <span>{movie.genres.join(", ")}</span>
        </div>

        {/* Mobile description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-400 lg:hidden">
          {movie.description}
        </p>

        {/* Desktop meta (MovieCard style) */}
        <div className="hidden lg:block">
          <p className="mt-1 truncate text-xs text-gray-400">
            {movie.genres.join(" · ")}
          </p>

          <p className="mt-1 text-xs text-gray-500">{movie.runtime}</p>
        </div>
      </div>
    </div>
  );
}
