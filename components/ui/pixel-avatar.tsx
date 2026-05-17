import { cn } from "@/lib/utils";
import { PixelAvatarSvg } from "@/components/icons/pixel-icons";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<AvatarSize, { px: number; clip: number; font: number }> = {
  xs: { px: 24, clip: 2, font: 8  },
  sm: { px: 32, clip: 2, font: 9  },
  md: { px: 40, clip: 3, font: 11 },
  lg: { px: 72, clip: 5, font: 18 },
  xl: { px: 96, clip: 6, font: 24 },
};

interface PixelAvatarProps {
  seed?: string;
  size?: AvatarSize;
  ring?: boolean;
  level?: number;
  className?: string;
}

export function PixelAvatar({ seed = "P", size = "md", ring = false, level, className }: PixelAvatarProps) {
  const { px, clip, font } = SIZE_MAP[size];
  const clipPath = `polygon(0 ${clip}px,${clip}px ${clip}px,${clip}px 0,calc(100% - ${clip}px) 0,calc(100% - ${clip}px) ${clip}px,100% ${clip}px,100% calc(100% - ${clip}px),calc(100% - ${clip}px) calc(100% - ${clip}px),calc(100% - ${clip}px) 100%,${clip}px 100%,${clip}px calc(100% - ${clip}px),0 calc(100% - ${clip}px))`;

  return (
    <div
      className={cn("relative flex-shrink-0 bg-bg-3 overflow-hidden", className)}
      style={{
        width: px,
        height: px,
        clipPath,
        boxShadow: ring ? "0 0 0 2px var(--accent), 0 0 calc(12px * var(--px)) var(--accent-glow)" : undefined,
      }}
      role="img"
      aria-label={seed}
    >
      <PixelAvatarSvg seed={seed} size={px} />
      {level != null && (
        <span
          className="absolute bottom-[-4px] right-[-4px] font-pixel text-amber-900 leading-none"
          style={{ background: "var(--yellow)", fontSize: font * 0.55, padding: "2px 4px", boxShadow: "0 0 0 2px var(--bg-1)" }}
        >
          {level}
        </span>
      )}
    </div>
  );
}

export function AvatarStack({ seeds = [], max = 4, size = "sm" }: { seeds: string[]; max?: number; size?: AvatarSize }) {
  const shown = seeds.slice(0, max);
  const more  = seeds.length - max;
  const offset = size === "sm" ? -10 : size === "xs" ? -8 : -14;
  const { px, clip } = SIZE_MAP[size];
  const clipPath = `polygon(0 ${clip}px,${clip}px ${clip}px,${clip}px 0,calc(100% - ${clip}px) 0,calc(100% - ${clip}px) ${clip}px,100% ${clip}px,100% calc(100% - ${clip}px),calc(100% - ${clip}px) calc(100% - ${clip}px),calc(100% - ${clip}px) 100%,${clip}px 100%,${clip}px calc(100% - ${clip}px),0 calc(100% - ${clip}px))`;

  return (
    <div className="flex items-center">
      {shown.map((s, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : offset, position: "relative", zIndex: shown.length - i, boxShadow: "0 0 0 2px var(--bg-2)" }}>
          <PixelAvatar seed={s} size={size} />
        </div>
      ))}
      {more > 0 && (
        <div
          className="flex items-center justify-center bg-bg-3 text-ink-1 font-pixel flex-shrink-0"
          style={{ width: px, height: px, marginLeft: offset, fontSize: 9, clipPath, boxShadow: "0 0 0 2px var(--bg-2)" }}
        >
          +{more}
        </div>
      )}
    </div>
  );
}
