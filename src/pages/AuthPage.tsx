import { useState } from "react";
import { Bookmark, Heart, MonitorSmartphone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigate } from "react-router";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { user, loading, authError, clearAuthError } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);

  // If the user is already authenticated, don't show the auth page.
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
    >
      {/* overlays */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/80" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-6 py-10 lg:px-12">
        {/* LEFT CONTENT */}
        <div className="hidden max-w-xl lg:block">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Find movies
            <br />
            you'll <span className="text-amber-500">love.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            CineMatch recommends the perfect movie for your mood. Create an
            account to save your favorites and get better recommendations.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3 text-white">
              <Bookmark className="h-5 w-5 text-amber-500" />
              <span>Save your favorite movies</span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <Heart className="h-5 w-5 text-amber-500" />
              <span>Get personalized recommendations</span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <MonitorSmartphone className="h-5 w-5 text-amber-500" />
              <span>Sync across all your devices</span>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="w-full max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-[#07101D]/70 p-6 backdrop-blur-2xl lg:p-10">
            {authError && (
              <div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <span>{authError}</span>
                <button
                  type="button"
                  onClick={clearAuthError}
                  aria-label="Dismiss error"
                  className="shrink-0 text-red-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
            <AnimatePresence mode="wait">
              {isSignIn ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                >
                  <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.25 }}
                >
                  <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
