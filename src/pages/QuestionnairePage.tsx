import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import StepIndicator from "../components/StepIndicator";
import MoodStep from "../components/MoodStep";
import GenreStep from "../components/GenreStep";
import TimeStep from "../components/TimeStep";
import ExperienceStep from "../components/ExperienceStep";
import Emoji from "../components/Emoji";
import { useNavigate } from "react-router";

interface Answers {
  mood: string | null;
  genre: string | null;
  time: string | null;
  experience: string;
}

const TOTAL_STEPS = 4;

const STEP_META: Record<number, { title: React.ReactNode; subtitle: string }> =
  {
    1: {
      title: (
        <>
          1. How are you <span className="text-amber-500">feeling</span> today?
        </>
      ),
      subtitle: "Choose the mood that fits you best.",
    },
    2: {
      title: (
        <>
          2. What <span className="text-amber-500">genre</span> are you in the
          mood for?
        </>
      ),
      subtitle: "Pick one or explore something new.",
    },
    3: {
      title: (
        <>
          3. How much <span className="text-amber-500">time</span> do you have?
        </>
      ),
      subtitle: "This helps us find the right length.",
    },
    4: {
      title: (
        <>
          4. What kind of <span className="text-amber-500">experience</span> are
          you looking for?
        </>
      ),
      subtitle: "Tell us in your own words.",
    },
  };

export default function Questionnaire() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    mood: null,
    genre: null,
    time: null,
    experience: "",
  });

  const isStepValid = () => {
    if (step === 1) return !!answers.mood;
    if (step === 2) return !!answers.genre;
    if (step === 3) return !!answers.time;
    return true; // experience is optional free text
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleContinue = () => {
    if (!isStepValid()) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      // Final step — hand answers off to your matching logic here
      console.log("Questionnaire complete:", answers);
    }
  };

  const meta = STEP_META[step];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0e1a] px-4 py-12 md:px-6">
      {/* Background image — mobile */}
      <img
        src="/questionnaire(mobile)-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      {/* Background image — desktop */}
      <img
        src="/questionnaire-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0e1a] via-[#0a0e1a]/85 to-[#0a0e1a]" />

      <div className="relative mx-auto max-w-2xl">
        {/* Surprise Me (step 1 only) */}
        {step === 1 && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => navigate("/surprise-me")}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-[#0d1224]/80 px-4 py-2 text-sm font-medium text-amber-400 backdrop-blur-sm transition-colors hover:border-amber-500 hover:bg-amber-500/10"
            >
              <Emoji emoji="🎲" label="Surprise me" size={18} />
              Surprise Me
              <span className="text-gray-500 group-hover:text-amber-400/70">
                — I&apos;m feeling lucky!
              </span>
            </button>
          </div>
        )}

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0d1224]/90 p-6 backdrop-blur-sm md:p-10">
          <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

          {/* Heading */}
          <h1 className="text-center text-2xl font-extrabold leading-snug text-white md:text-3xl">
            {meta.title}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-400">
            {meta.subtitle}
          </p>

          {/* Step content */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {step === 1 && (
                  <MoodStep
                    value={answers.mood}
                    onChange={(mood) => setAnswers((a) => ({ ...a, mood }))}
                  />
                )}
                {step === 2 && (
                  <GenreStep
                    value={answers.genre}
                    onChange={(genre) => setAnswers((a) => ({ ...a, genre }))}
                  />
                )}
                {step === 3 && (
                  <TimeStep
                    value={answers.time}
                    onChange={(time) => setAnswers((a) => ({ ...a, time }))}
                  />
                )}
                {step === 4 && (
                  <ExperienceStep
                    value={answers.experience}
                    onChange={(experience) =>
                      setAnswers((a) => ({ ...a, experience }))
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back a step"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isStepValid()}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0a0e1a] transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-amber-500"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Privacy note */}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <Emoji emoji="🔒" label="Private" size={14} />
            Your answers are private and help improve your recommendations.
          </p>
        </div>

        {/* Surprise Me (step 1 only) */}
        {step === 1 && (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium text-gray-500">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <button
              type="button"
              className="mt-6 flex w-full items-center gap-3 rounded-xl border border-amber-500/40 bg-[#0d1224]/90 px-5 py-4 text-left transition-colors hover:border-amber-500"
            >
              <Emoji emoji="🎲" label="Private" size={32} />
              <div>
                <p className="text-sm font-semibold text-white">Surprise Me</p>
                <p className="text-xs text-gray-400">I&apos;m feeling lucky!</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
