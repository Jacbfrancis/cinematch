import { Star, Play, Heart } from "lucide-react";

type MovieBannerProps = {
  eyebrow?: string;
  title: string;
  moodTags: string[];
  tagline: string;
  rating: number;
  year: number;
  runtime: string;
  genres: string[];
  backdrop: string;
};

const DEFAULT_MOVIE: MovieBannerProps = {
  eyebrow: "Cine Match Recommends",
  title: "Interstellar",
  moodTags: ["Curious", "Mind-Blown", "Adventurous"],
  tagline: "A mind-bending journey beyond our world.",
  rating: 8.7,
  year: 2014,
  runtime: "2h 49m",
  genres: ["Sci-Fi", "Adventure", "Drama"],
  backdrop: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
};

export default function MovieBanner(props: Partial<MovieBannerProps> = {}) {
  const movie = { ...DEFAULT_MOVIE, ...props };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0e1a]">
      {/* Backdrop */}
      <img
        src={movie.backdrop}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay — heavier flat scrim on mobile for readability, left-to-right gradient on desktop so the art stays visible on the right */}
      <div className="absolute inset-0 bg-[#0a0e1a]/80 md:bg-gradient-to-r md:from-[#0a0e1a] md:via-[#0a0e1a]/85 md:to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500">
            {movie.eyebrow}
          </p>

          {/* Title */}
          <h1 className="mt-2 text-5xl font-extrabold uppercase leading-none text-white sm:text-6xl md:text-7xl">
            {movie.title}
          </h1>

          {/* Mood tags + tagline */}
          <p className="mt-4 text-sm text-gray-300 md:text-base">
            Based on your mood: {movie.moodTags.join(", ")}
          </p>
          <p className="mt-1 text-sm text-gray-400 md:text-base">
            {movie.tagline}
          </p>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-4">
            <div>
              <span className="flex items-center gap-1 text-sm font-semibold text-white md:text-base">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {movie.rating.toFixed(1)}/10
              </span>
              <span className="text-xs text-gray-500">IMDb</span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <span className="block text-sm font-semibold text-white md:text-base">
                {movie.year}
              </span>
              <span className="text-xs text-gray-500">Year</span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <span className="block text-sm font-semibold text-white md:text-base">
                {movie.runtime}
              </span>
              <span className="text-xs text-gray-500">Runtime</span>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <span className="block text-sm font-semibold text-white md:text-base">
                {movie.genres.join(" · ")}
              </span>
              <span className="text-xs text-gray-500">Genres</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
            >
              <Play className="h-4 w-4 fill-[#0a0e1a]" />
              Watch Trailer
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-amber-500/40 px-6 py-3 text-sm font-semibold text-amber-400 transition-colors hover:border-amber-500 hover:bg-amber-500/10"
            >
              <Heart className="h-4 w-4" />
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
