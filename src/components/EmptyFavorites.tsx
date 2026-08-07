import { HeartOff, Clapperboard } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 py-20 text-center md:px-12 md:py-28">
      {/* Icon */}
      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1224]">
          <HeartOff className="h-9 w-9 text-amber-500" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-xl font-bold text-white md:text-2xl">
        No favorites yet
      </h2>

      {/* Subtext */}
      <p className="mt-3 max-w-md text-sm text-gray-400 md:text-base">
        Movies you save will show up here. Start exploring and tap the heart to
        build your personal watchlist.
      </p>

      {/* CTA */}
      <button
        type="button"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-[#0a0e1a] shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] hover:shadow-amber-500/30 active:scale-[0.99]"
      >
        <Clapperboard className="h-4 w-4" />
        Start Matching
      </button>
    </div>
  );
}
