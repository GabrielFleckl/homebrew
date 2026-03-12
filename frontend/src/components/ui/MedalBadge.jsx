const MEDAL_EMOJI = {
  Ouro: "🥇",
  Prata: "🥈",
  Bronze: "🥉",
};

export default function MedalBadge({ type }) {
  const emoji = MEDAL_EMOJI[type] || "❓";

  return (
    <span className="flex items-center gap-1">
      <span>{emoji}</span>
    </span>
  );
}
