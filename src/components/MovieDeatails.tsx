import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  HelpCircle,
  Rocket,
  Mountain,
  Bookmark,
  type LucideIcon,
} from "lucide-react";

interface Reason {
  icon: LucideIcon;
  label: string;
  color: string; // tailwind color name, e.g. "amber", "yellow", "red", "teal"
}

interface MovieDetailsProps {
  poster: string;
  title: string;
  description: string;
  director: string;
  cast: string[];
  releaseDate: string;
  runtime: string;
  reasons: Reason[];
  whyBlurb: string;
}

const DEFAULT_MOVIE: MovieDetailsProps = {
  poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  title: "Interstellar",
  description:
    "A team of explorers travels through a wormhole in search of a new home for humanity. As they journey to the far reaches of space, they confront the limits of time, love, and the survival of our species.",
  director: "Christopher Nolan",
  cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  releaseDate: "November 7, 2014",
  runtime: "2h 49m",
  reasons: [
    { icon: HelpCircle, label: "You were Curious", color: "amber" },
    { icon: Rocket, label: "You love Sci-Fi", color: "red" },
    {
      icon: Mountain,
      label: "You had between 90 - 120 minutes",
      color: "teal",
    },
  ],
  whyBlurb:
    "Interstellar combines astonishing science, deep emotional storytelling, and breathtaking visuals — perfect for your mindset and mood.",
};

const COLOR_CLASSES: Record<
  string,
  { text: string; bg: string; ring: string }
> = {
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    ring: "ring-amber-400/30",
  },
  yellow: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    ring: "ring-yellow-400/30",
  },
  red: { text: "text-red-400", bg: "bg-red-400/10", ring: "ring-red-400/30" },
  teal: {
    text: "text-teal-400",
    bg: "bg-teal-400/10",
    ring: "ring-teal-400/30",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    ring: "ring-blue-400/30",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    ring: "ring-pink-400/30",
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MovieDetails(props: Partial<MovieDetailsProps> = {}) {
  const movie = { ...DEFAULT_MOVIE, ...props };

  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-16 md:px-12">
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-[260px_1fr_1fr] md:items-start"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
      >
        {/* Poster */}
        <motion.div
          variants={fadeUp}
          className="relative mx-auto w-full max-w-[260px] md:mx-0"
        >
          {/* Ambient glow behind the poster */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-amber-500/10 blur-2xl" />

          <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/60 transition-shadow duration-300 hover:shadow-amber-500/10">
            <div className="aspect-[2/3] w-full">
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Subtle bottom vignette for cohesion with the badge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

            <button
              type="button"
              aria-label="Add to favorites"
              className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-gray-200 backdrop-blur-sm transition-colors hover:text-amber-400"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* About the movie */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 shadow-lg shadow-black/30"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-1 rounded-full bg-amber-500" />
            <h2 className="text-lg font-bold tracking-tight text-white">
              About The Movie
            </h2>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            {movie.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/5 pt-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Director
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {movie.director}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Cast
              </p>
              <div className="mt-1.5 space-y-1">
                {movie.cast.map((actor) => (
                  <p key={actor} className="text-sm font-medium text-gray-200">
                    {actor}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Release Date
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {movie.releaseDate}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Runtime
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-200">
                {movie.runtime}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why we picked this */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.06] to-white/[0.02] p-7 shadow-lg shadow-black/30"
        >
          {/* Ambient glow, consistent with the CTA section's language */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative flex items-center gap-2.5">
            <span className="h-4 w-1 rounded-full bg-amber-500" />
            <h2 className="text-lg font-bold tracking-tight text-white">
              Why We Picked This For You
            </h2>
          </div>

          <ul className="relative mt-5 flex flex-col gap-3.5">
            {movie.reasons.map(({ icon: Icon, label, color }) => {
              const classes = COLOR_CLASSES[color] ?? COLOR_CLASSES.amber;
              return (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${classes.bg} ${classes.text} ${classes.ring}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-gray-200">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="relative mt-6 border-t border-white/5 pt-5 text-sm leading-relaxed text-gray-400">
            {movie.whyBlurb}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
