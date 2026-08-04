import { Play } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  color: string; // tailwind text color class
  url: string;
}

interface StreamingAvailabilityProps {
  platforms: Platform[];
  trailerThumbnail: string;
  trailerDuration: string;
  onPlayTrailer?: () => void;
}

const DEFAULT_PLATFORMS: Platform[] = [
  { id: "netflix", name: "NETFLIX", color: "text-red-600", url: "#" },
  { id: "prime", name: "prime video", color: "text-sky-400", url: "#" },
  { id: "disney", name: "Disney+", color: "text-blue-300", url: "#" },
  { id: "appletv", name: "tv+", color: "text-white", url: "#" },
  { id: "hulu", name: "hulu", color: "text-green-500", url: "#" },
];

const DEFAULT_PROPS: StreamingAvailabilityProps = {
  platforms: DEFAULT_PLATFORMS,
  trailerThumbnail:
    "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  trailerDuration: "2:31",
};

export default function StreamingAvailability(
  props: Partial<StreamingAvailabilityProps> = {},
) {
  const { platforms, trailerThumbnail, trailerDuration, onPlayTrailer } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-8 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] md:grid-cols-[1.7fr_1fr] md:divide-x md:divide-white/10">
        {/* Available On */}
        <div className="p-6">
          <h2 className="text-sm font-bold text-white">Available On</h2>

          <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-black shadow-md ring-1 ring-white/10">
                  <span
                    className={`px-1 text-center text-sm font-extrabold tracking-tight ${platform.color}`}
                  >
                    {platform.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch Trailer */}
        <div className="border-t border-white/10 p-6 md:border-t-0">
          <h2 className="text-sm font-bold text-white">Watch Trailer</h2>

          <button
            type="button"
            onClick={onPlayTrailer}
            aria-label="Play trailer"
            className="group relative mt-4 block w-full overflow-hidden rounded-xl"
          >
            <div className="aspect-video w-full">
              <img
                src={trailerThumbnail}
                alt="Trailer preview"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />

            {/* Play button */}
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0a0e1a] shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5 fill-current" />
            </span>

            {/* Duration badge */}
            <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-gray-200">
              {trailerDuration}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
