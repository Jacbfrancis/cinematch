function toCodepoints(emoji: string): string {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)!.toString(16))
    .join("-");
}

interface EmojiProps {
  /** The actual emoji character, e.g. "🔥", "🌎", "❤️" */
  emoji: string;
  /** Accessible label describing the emoji's meaning in context */
  label: string;
  size?: number;
  className?: string;
}

export default function Emoji({
  emoji,
  label,
  size = 28,
  className = "",
}: EmojiProps) {
  const codepoints = toCodepoints(emoji);
  const src = `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${codepoints}_3d.png`;

  return (
    <img
      src={src}
      alt={label}
      width={size}
      height={size}
      draggable={false}
      loading="lazy"
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        // Hide gracefully if this codepoint isn't in the mirrored set,
        // instead of showing a broken-image icon
        (e.target as HTMLImageElement).style.visibility = "hidden";
      }}
    />
  );
}
