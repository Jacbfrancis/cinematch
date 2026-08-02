import Emoji from "./Emoji";

const MAX_LENGTH = 120;

interface ExperienceStepProps {
  value: string;
  onChange: (text: string) => void;
}

export default function ExperienceStep({
  value,
  onChange,
}: ExperienceStepProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-4">
        <Emoji emoji="📝" label="Write your answer" size={18} />
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        maxLength={MAX_LENGTH}
        rows={5}
        placeholder="e.g. Something that'll wreck me emotionally, a plot twist I won't see coming..."
        className="w-full resize-none rounded-xl border border-amber-500/40 bg-[#0f1424] px-4 py-4 pl-12 text-sm text-white placeholder:text-gray-500 focus:border-amber-500 focus:outline-none"
      />
      <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-gray-500">
        {value.length}/{MAX_LENGTH}
      </span>
    </div>
  );
}
