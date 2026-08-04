type TryAnotherMatchProps = {
  onClick?: () => void;
};

export default function TryAnotherMatch({ onClick }: TryAnotherMatchProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0e1a] px-6 py-10 text-center md:px-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-base font-bold text-[#0a0e1a] shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] hover:shadow-amber-500/30 active:scale-[0.99] sm:w-auto"
        >
          Try Another Match
        </button>

        <p className="mt-3 text-xs text-gray-500">
          Not the perfect pick? Let&apos;s find something else!
        </p>
      </div>
    </section>
  );
}
