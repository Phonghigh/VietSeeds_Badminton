import { PixelCard } from "./pixel-card";

interface StatTileProps {
  icon:   React.ReactNode;
  label:  string;
  value:  React.ReactNode;
  color?: string;
  sub?:   string;
}

export function StatTile({ icon, label, value, color = "var(--accent)", sub }: StatTileProps) {
  return (
    <PixelCard variant="flat" className="p-3.5 flex-1">
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="pixel-xs text-ink-2">{label}</span>
      </div>
      <div className="pixel-xl mt-2" style={{ color, textShadow: "0 0 12px currentColor" }}>
        {value}
      </div>
      {sub && <div className="text-[11px] text-ink-2 mt-1">{sub}</div>}
    </PixelCard>
  );
}
