import { Star, Bookmark } from "lucide-react";

type MovieCardProps = {
  title: string;
  rating: number;
  genres: string[];
  runtime: string;
  poster: string;
};

export default function MovieCard({
  title,
  rating,
  genres,
  runtime,
  poster,
}: MovieCardProps) {
  return (
    <div className="relative w-55 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#121736] md:w-auto">
      {/* Poster */}
      <div className="relative aspect-2/3 w-full">
        <img src={poster} alt={title} className="h-full w-full object-cover" />

        {/* Rating badge */}
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-amber-400">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
        </span>

        {/* Bookmark button */}
        <button
          type="button"
          aria-label={`Save ${title}`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/70 text-gray-200 transition-colors hover:text-amber-400"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 truncate text-xs text-gray-400">
          {genres.join(" · ")}
        </p>
        <p className="mt-1 text-xs text-gray-500">{runtime}</p>
      </div>
    </div>
  );
}
