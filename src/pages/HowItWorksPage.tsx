import { motion } from "framer-motion";
import { ArrowRight, Popcorn } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Mood",
    description: "Share how you're feeling or what vibe you're looking for.",
  },
  {
    number: "02",
    title: "Pick Your Preferences",
    description:
      "Choose your favorite genres, themes, and the experience you want.",
  },
  {
    number: "03",
    title: "We Find the Perfect Fit",
    description:
      "Our smart matching engine finds movies that match your unique taste.",
  },
  {
    number: "04",
    title: "Get Your Match",
    description: "Discover your recommended movie and enjoy!",
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-[#0F172A] px-6 py-4 md:px-12 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Header + Image */}
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
            {/* Mobile image (top) */}
            <div className="relative -mx-6 h-64 overflow-hidden md:hidden">
              <img
                src="/popcorn-movie.png"
                alt="Popcorn bucket and clapperboard"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2">
              <h2 className="font-sora text-4xl font-bold leading-tight text-white md:text-5xl">
                How <span className="text-amber-400">CineMatch</span> Works
              </h2>
              <div className="mt-4 h-1 w-14 rounded-full bg-amber-400" />
              <p className="font-inter mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
                Finding the right movie should be easy and fun. We do the heavy
                lifting so you can get back to what matters—watching great
                movies.
              </p>
            </div>

            {/* Desktop image (right) */}
            <div className="hidden md:block md:w-1/2">
              <img
                src="/popcorn-movie.png"
                alt="Popcorn bucket and clapperboard"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mt-14 flex flex-col divide-y divide-slate-800 md:mt-20 md:flex-row md:divide-x md:divide-y-0">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 py-6 first:pt-0 last:pb-0 md:flex-1 md:flex-col md:gap-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-400/60 font-sora text-lg font-semibold text-amber-400 md:mb-4">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="font-inter mt-1 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-slate-900/60 p-6 sm:flex-row sm:items-center sm:justify-between md:mt-16">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
                <Popcorn className="h-6 w-6" />
              </span>
              <div>
                <p className="font-sora text-base font-semibold text-white">
                  Ready to find your next favorite movie?
                </p>
                <p className="font-inter text-sm text-slate-400">
                  Let&apos;s get you matched.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-sora text-sm font-semibold text-[#0F172A] transition-colors hover:bg-amber-300"
              onClick={() => navigate("/questionnaire")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
