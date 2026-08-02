import { MOODS } from "../constants/moods";
import Emoji from "./Emoji";

interface MoodStepProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function MoodStep({ value, onChange }: MoodStepProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
      {MOODS.map(({ id, label, emoji }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-5 text-center transition-colors ${
              isSelected
                ? "border-amber-500 bg-amber-500/10"
                : "border-white/10 bg-[#0f1424] hover:border-amber-500/40"
            }`}
          >
            <Emoji emoji={emoji} label={label} size={32} />
            <span
              className={`text-sm font-medium ${
                isSelected ? "text-white" : "text-gray-300"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
