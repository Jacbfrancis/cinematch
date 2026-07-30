import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Sparkles,
  Smile,
  Zap,
  Sparkle,
  Leaf,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import CallToActionButton from "./CallToActionButton";

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const MOODS = [
  { label: "Happy", description: "Feel-good picks", icon: Smile },
  { label: "Excited", description: "High energy movies", icon: Zap },
  { label: "Mind-Blown", description: "Epic & thrilling", icon: Sparkle },
  { label: "Relaxed", description: "Chill & comforting", icon: Leaf },
  { label: "Emotional", description: "Touching stories", icon: Heart },
  { label: "Curious", description: "Thought-provoking", icon: Search },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0e1a] px-6 pb-16 pt-20 md:px-12">
      {/* Background image */}
      <img
        src="/hero-background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0a0e1a]/70" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-amber-500">
          <Sparkles className="h-4 w-4" />
          Not sure what to watch tonight?
          <Sparkles className="h-4 w-4" />
        </p>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          We&apos;ll find your <span className="text-amber-500">perfect</span>{" "}
          movie.
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-5 max-w-xl text-base text-gray-300 md:text-lg">
          Answer a few simple questions and get a movie recommendation tailored
          to your mood, preferences, and available time.
        </p>

        {/* CTA button */}
        <CallToActionButton />

        {/* Mood picker card */}
        <div className="relative mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <p className="mb-6 flex items-center justify-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Or pick your mood to get started
            <Sparkles className="h-4 w-4 text-amber-500" />
          </p>

          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {MOODS.map(({ label, description, icon: Icon }, index) => (
              <motion.button
                key={label}
                type="button"
                variants={cardVariants}
                whileHover={{
                  rotate: [0, -4, 4, -3, 3, 0],
                  scale: 1.06,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#0a0e1a]/60 px-4 py-6 transition-colors hover:border-amber-500/60 hover:bg-[#0a0e1a]"
              >
                <motion.span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 text-amber-500"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <span className="text-sm font-semibold text-white">
                  {label}
                </span>
                <span className="text-xs text-gray-400">{description}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute -bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#0a0e1a] border border-white/10">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
