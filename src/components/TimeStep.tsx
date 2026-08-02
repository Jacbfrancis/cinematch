import { TIME_OPTIONS } from "../constants/timeOptons";
import Emoji from "./Emoji";

interface TimeStepProps {
  value: string | null;
  onChange: (id: string) => void;
}

export default function TimeStep({ value, onChange }: TimeStepProps) {
  return (
    <div className="flex flex-col gap-3">
      {TIME_OPTIONS.map(({ id, label, description }) => {
        const isSelected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
              isSelected
                ? "border-amber-500 bg-amber-500/10"
                : "border-white/10 bg-[#0f1424] hover:border-amber-500/40"
            }`}
          >
            <Emoji emoji="⏰" label="Duration" size={24} />
            <div>
              <p
                className={`text-sm font-semibold ${
                  isSelected ? "text-white" : "text-gray-200"
                }`}
              >
                {label}
              </p>
              <p className="text-xs text-gray-400">{description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
