import Emoji from "./Emoji";

const MOODS = [
  { id: "happy", label: "Happy", emoji: "😀" },
  { id: "excited", label: "Excited", emoji: "🔥" },
  { id: "relaxed", label: "Relaxed", emoji: "😌" },
  { id: "mind-blown", label: "Mind-Blown", emoji: "🤯" },
  { id: "sad", label: "Sad", emoji: "😭" },
  { id: "curious", label: "Curious", emoji: "🤔" },
  { id: "angry", label: "Angry", emoji: "😠" },
  { id: "lonely", label: "Lonely", emoji: "😔" },
  { id: "romantic", label: "Romantic", emoji: "💝" },
  { id: "motivated", label: "Motivated", emoji: "💪" },
  { id: "adventurous", label: "Adventurous", emoji: "🌎" },
  { id: "nostalgic", label: "Nostalgic", emoji: "🥹" },
];

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
