import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, X } from "lucide-react";

type SignInPromptModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SignInPromptModal({
  open,
  onClose,
}: SignInPromptModalProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1224] p-8 text-center shadow-2xl"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
              <LogIn className="h-7 w-7 text-amber-500" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-white">
              Sign in to save movies
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              You need an account to build your personal favorites list. It only
              takes a minute.
            </p>

            {/* CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/auth?mode=signup");
              }}
              className="mt-6 w-full rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-[#0a0e1a] transition-colors hover:bg-amber-400"
            >
              Create an Account
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Maybe Later
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}