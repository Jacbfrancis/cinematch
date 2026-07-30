import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonHover: Variants = {
  rest: { scale: 1, boxShadow: "0 0 0px rgba(245,158,11,0)" },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 24px rgba(245,158,11,0.5)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const arrowHover: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function CallToActionButton() {
  return (
    <motion.div variants={item}>
      <motion.button
        type="button"
        className="group relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a]"
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
      >
        {/* Shine sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <span className="relative">Start Matching</span>
        <motion.span className="relative flex" variants={arrowHover}>
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
