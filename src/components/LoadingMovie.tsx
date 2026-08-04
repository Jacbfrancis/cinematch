import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Film } from "lucide-react";

interface LoadingMovieProps {
  messages?: string[];
  messageInterval?: number;
}

const DEFAULT_MESSAGES = [
  "Reading the room...",
  "Matching your mood...",
  "Scanning thousands of titles...",
  "Curating your perfect pick...",
];

export default function LoadingMovie({
  messages = DEFAULT_MESSAGES,
  messageInterval = 2200,
}: LoadingMovieProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, messageInterval);
    return () => clearInterval(interval);
  }, [messages.length, messageInterval]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#121736]">
      {/* Ambient glows */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-[30%] top-[60%] h-56 w-56 rounded-full bg-amber-400/5 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          {/* Static outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />

          {/* Rotating arc */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-amber-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulsing icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10"
          >
            <Film className="h-6 w-6 text-amber-500" />
          </motion.div>
        </div>

        {/* Wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm font-bold tracking-[0.3em] text-white"
        >
          CINE<span className="text-amber-500">MATCH</span>
        </motion.p>

        {/* Cycling status message */}
        <div className="mt-3 h-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-xs text-gray-500"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Indeterminate progress bar */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/3 rounded-full bg-linear-to-r from-transparent via-amber-500 to-transparent"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
