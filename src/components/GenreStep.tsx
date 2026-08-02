import { GENRES } from "../constants/genres";
import Emoji from "./Emoji";

const SKIP_ID = "skip";

interface GenreStepProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function GenreStep({ value, onChange }: GenreStepProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {GENRES.map(({ id, label, emoji }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors sm:flex-row sm:justify-start sm:gap-2 sm:px-4 sm:py-4 sm:text-left ${
              isSelected
                ? "border-amber-500 bg-amber-500/10"
                : "border-white/10 bg-[#0f1424] hover:border-amber-500/40"
            }`}
          >
            <Emoji emoji={emoji} label={label} size={20} />
            <span
              className={`text-xs font-medium leading-tight sm:text-sm ${
                isSelected ? "text-white" : "text-gray-300"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}

      {/* Skip — for when nothing fits, without leaving genre unanswered */}
      <button
        type="button"
        onClick={() => onChange(SKIP_ID)}
        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-2 py-3 text-center transition-colors sm:flex-row sm:justify-start sm:gap-2 sm:px-4 sm:py-4 sm:text-left ${
          value === SKIP_ID
            ? "border-amber-500 bg-amber-500/10"
            : "border-white/20 bg-transparent text-gray-500 hover:border-white/40 hover:text-gray-300"
        }`}
      >
        <Emoji emoji="🤷" label="Skip" size={20} />
        <span
          className={`text-xs font-medium leading-tight sm:text-sm ${
            value === SKIP_ID ? "text-white" : "text-gray-500"
          }`}
        >
          Skip
        </span>
      </button>
    </div>
  );
}
