import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sparkles, Clapperboard, Zap, Film } from "lucide-react";
import CallToActionButton from "./CallToActionButton";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CallToAction() {
  return (
    <section className="w-full bg-[#0a0e1a] px-6 py-16 md:px-12">
      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-amber-950/40 via-[#12162a] to-[#0a0e1a] px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Ambient glow — pulsing */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary drifting glow for depth */}
        <motion.div
          className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-amber-500"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            Still scrolling?
            <motion.span
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={item}
            className="text-3xl font-extrabold text-white md:text-4xl"
          >
            Let&apos;s settle it in under a minute.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-md text-base text-gray-400"
          >
            Answer a few quick questions and get a movie picked for your exact
            mood, right now.
          </motion.p>

          {/* CTA button */}
          <CallToActionButton />

          {/* Trust row */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400"
          >
            {[
              { icon: Clapperboard, label: "Tailored to your mood" },
              { icon: Zap, label: "Takes ~45 seconds" },
              { icon: Film, label: "10,000+ movies" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-amber-500" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
