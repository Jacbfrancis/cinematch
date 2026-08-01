interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps = 4,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <p className="mb-4 text-center text-xs font-semibold tracking-wide text-amber-500">
        STEP {currentStep} OF {totalSteps}
      </p>
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isComplete = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isFilled = isComplete || isActive;

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300 ${
                  isFilled
                    ? "border-amber-500 bg-amber-500 text-[#0a0e1a]"
                    : "border-white/15 bg-transparent text-gray-500"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`h-0.5 w-10 transition-colors duration-300 sm:w-16 ${
                    stepNumber < currentStep ? "bg-amber-500" : "bg-white/15"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
