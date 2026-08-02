import { Star, Heart, Bookmark, Dices } from "lucide-react";
import Footer from "../components/Footer";

const SURPRISE_PICK = {
  title: "The Shawshank Redemption",
  year: 1994,
  genre: "Drama",
  runtime: "2h 22m",
  rating: 9.3,
  poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  description:
    "Framed for murder, banker Andy Dufresne is sent to Shawshank Prison where he forms an unlikely friendship and finds hope in the most unlikely place.",
};

export default function SurpriseMe() {
  const movie = SURPRISE_PICK;

  return (
    <div>
      <section className="relative w-full overflow-hidden bg-[#0a0e1a] px-6 py-12 md:px-12">
        {/* Background image — mobile */}
        <img
          src="/questionnaire(mobile)-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        {/* Background image — desktop */}
        <img
          src="/questionnaire-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <div className="absolute inset-0 bg-[#0a0e1a]/70" />

        <div className="relative mx-auto max-w-5xl">
          {/* Heading */}
          <div className="text-center md:mb-20">
            <h1 className="text-2xl font-extrabold text-white md:text-[2.3rem]">
              Your <span className="text-amber-500">Surprise</span> Pick is
              Ready!
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-400 md:text-lg">
              We&apos;ve picked something amazing just for you. Sit back, relax
              and enjoy the show!
            </p>
          </div>

          {/* Poster + info */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-[360px_1fr] md:items-start md:gap-12">
            {/* Poster card */}
            <div className="mx-auto w-full max-w-sm md:mx-0">
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/40">
                <div className="aspect-2/3 w-full">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Rating badge */}
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2.5 py-1 text-sm font-semibold text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {movie.rating.toFixed(1)}
                </span>

                {/* Meta bar */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/80 to-transparent px-4 py-4 text-sm text-gray-200">
                  <span>
                    {movie.year} · {movie.genre}
                  </span>
                  <span>{movie.runtime}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                {movie.title}
              </h2>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-300 md:justify-start">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {movie.rating}/10
                </span>
                <span className="text-gray-600">|</span>
                <span className="rounded bg-amber-500 px-1.5 py-0.5 text-xs font-bold text-[#0a0e1a]">
                  IMDb
                </span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400 md:mx-0">
                {movie.description}
              </p>

              {/* Loved this pick? */}
              <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left md:mx-0">
                <Heart className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Loved this pick?
                  </p>
                  <p className="text-xs text-gray-400">
                    Add it to your watchlist so you never lose track.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3 md:mx-0 md:flex-row">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400"
                >
                  <Dices />
                  Surprise Me Again
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-amber-500/40 px-6 py-3 text-sm font-semibold text-amber-400 transition-colors hover:border-amber-500 hover:bg-amber-500/10"
                >
                  <Bookmark className="h-4 w-4" />
                  Save to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
