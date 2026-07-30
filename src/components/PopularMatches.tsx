import MovieCard from "./MovieCard";
import { FEATURES } from "../constants/features";

const MOVIES = [
  {
    title: "Interstellar",
    rating: 8.6,
    genres: ["Sci-Fi", "Adventure"],
    runtime: "169 min",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "The Dark Knight",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    runtime: "152 min",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Spider-Man: No Way Home",
    rating: 8.2,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: "148 min",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
  {
    title: "La La Land",
    rating: 8.0,
    genres: ["Romance", "Drama", "Music"],
    runtime: "128 min",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
  },
  {
    title: "The Grand Budapest Hotel",
    rating: 8.1,
    genres: ["Comedy", "Adventure"],
    runtime: "99 min",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  },
  {
    title: "Inception",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: "148 min",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
];

export default function PopularMatches() {
  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 border-l-2 border-amber-500 pl-3">
          <h2 className="text-lg font-bold text-white md:text-xl">
            Popular matches this week
          </h2>
          <p className="text-sm text-gray-400">
            Top picks from CineMatch users
          </p>
        </div>

        {/* Movie row */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-scroll pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-x-visible md:pb-0">
            {MOVIES.map((movie) => (
              <MovieCard key={movie.title} {...movie} />
            ))}
          </div>
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
