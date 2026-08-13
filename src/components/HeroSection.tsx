import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import Emoji from "./Emoji";
import { MOODS } from "../constants/moods";
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

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function smoothScrollBy(distance: number, duration = 700) {
  const start = window.scrollY;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0e1a] px-6 pb-16 pt-20 md:px-12">
      {/* Mobile Background image */}
      <img
        src="/hero-background(mobile).png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover block md:hidden"
      />

      {/* Desktop Background image */}
      <img
        src="/hero-background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
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
          just for you.
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
            className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 md:grid-cols-6"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {MOODS.map(({ id, label, emoji }, index) => (
              <motion.button
                key={id}
                type="button"
                variants={cardVariants}
                onClick={() =>
                  navigate(`/questionnaire?step=2&mood=${encodeURIComponent(id)}`)
                }
                whileHover={{
                  rotate: [0, -4, 4, -3, 3, 0],
                  scale: 1.06,
                  transition: { duration: 0.4 },
                }}
                whileTap={{ scale: 0.95 }}
                className="flex w-26 shrink-0 flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#0a0e1a]/60 px-4 py-5 transition-colors hover:border-amber-500/60 hover:bg-[#0a0e1a] sm:w-auto sm:flex-shrink sm:py-6"
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
                  <Emoji emoji={emoji} label={label} size={32} />
                </motion.span>
                <span className="text-sm font-semibold text-white">
                  {label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <button
            type="button"
            onClick={() => smoothScrollBy(window.innerHeight)}
            aria-label="Scroll down"
            className="absolute -bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0e1a] transition-colors hover:border-amber-500/60"
          >
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
