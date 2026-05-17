// Pixel SVG sprites — 16×16 grid, shape-rendering: crispEdges
// Each sprite uses currentColor so it inherits text color.

interface SpriteProps {
  size?: number;
  color?: string;
  color2?: string;
  strap?: string;
  className?: string;
}

function px(x: number, y: number, w = 1, h = 1, color = "currentColor") {
  return <rect key={`${x},${y},${w},${h}`} x={x} y={y} width={w} height={h} fill={color} />;
}

function Sprite({
  size = 16,
  vb = 16,
  children,
  style,
  className,
}: {
  size?: number;
  vb?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      shapeRendering="crispEdges"
      style={style}
      className={className}
    >
      {children}
    </svg>
  );
}

export function ShuttleIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,12,2,1,color),px(6,13,4,1,color),px(6,14,4,1,color),px(7,15,2,1,color),
        px(7,2,2,1,color),px(6,3,1,1,color),px(8,3,1,1,color),px(5,4,1,1,color),px(10,4,1,1,color),
        px(4,5,1,1,color),px(11,5,1,1,color),px(3,6,1,1,color),px(12,6,1,1,color),
        px(3,7,1,1,color),px(12,7,1,1,color),px(4,8,1,1,color),px(11,8,1,1,color),
        px(5,9,1,1,color),px(10,9,1,1,color),px(6,10,4,1,color),px(7,11,2,1,color),
        px(6,11,1,1,color),px(9,11,1,1,color)]}
    </Sprite>
  );
}

export function RacketIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(5,1,6,1,color),px(4,2,1,1,color),px(11,2,1,1,color),px(3,3,1,1,color),px(12,3,1,1,color),
        px(3,4,1,1,color),px(12,4,1,1,color),px(3,5,1,1,color),px(12,5,1,1,color),
        px(4,6,1,1,color),px(11,6,1,1,color),px(5,7,6,1,color),
        px(6,3,1,1,color),px(8,3,1,1,color),px(10,3,1,1,color),
        px(5,5,1,1,color),px(7,5,1,1,color),px(9,5,1,1,color),
        px(8,8,1,1,color),px(9,9,1,1,color),px(10,10,1,1,color),
        px(11,11,1,1,color),px(12,12,1,1,color),px(13,13,2,1,color),px(13,14,2,1,color)]}
    </Sprite>
  );
}

export function TrophyIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(5,2,6,1,color),px(4,3,8,1,color),px(4,4,1,1,color),px(11,4,1,1,color),px(5,4,6,1,color),
        px(2,3,2,1,color),px(12,3,2,1,color),px(2,4,1,1,color),px(13,4,1,1,color),
        px(2,5,1,1,color),px(13,5,1,1,color),px(4,5,8,1,color),px(5,6,6,1,color),
        px(6,7,4,1,color),px(7,8,2,1,color),px(7,9,2,1,color),px(5,10,6,1,color),
        px(4,11,8,1,color),px(3,12,10,1,color)]}
    </Sprite>
  );
}

export function FireIcon({ size = 16, color = "#FB923C", color2 = "#FACC15" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,2,1,1,color),px(6,3,2,1,color),px(6,4,3,1,color),px(5,5,4,1,color),
        px(5,6,5,1,color),px(4,7,7,1,color),px(4,8,8,1,color),px(3,9,10,1,color),
        px(3,10,10,1,color),px(3,11,10,1,color),px(4,12,8,1,color),px(5,13,6,1,color),
        px(7,6,1,1,color2),px(6,8,3,1,color2),px(5,10,5,1,color2),px(6,11,3,1,color2)]}
    </Sprite>
  );
}

export function StarIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,2,2,1,color),px(6,3,4,1,color),px(6,4,4,1,color),px(1,5,14,1,color),
        px(2,6,12,1,color),px(3,7,10,1,color),px(4,8,8,1,color),
        px(3,9,3,1,color),px(10,9,3,1,color),px(2,10,2,1,color),px(12,10,2,1,color),
        px(1,11,2,1,color),px(13,11,2,1,color)]}
    </Sprite>
  );
}

export function CoinIcon({ size = 16, color = "#FACC15" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(6,2,4,1,color),px(4,3,8,1,color),px(3,4,10,1,color),px(3,5,10,1,color),
        px(2,6,12,1,color),px(2,7,12,1,color),px(2,8,12,1,color),px(2,9,12,1,color),
        px(3,10,10,1,color),px(3,11,10,1,color),px(4,12,8,1,color),px(6,13,4,1,color),
        px(6,6,1,1,"#0a0a0a"),px(9,6,1,1,"#0a0a0a"),px(6,7,1,1,"#0a0a0a"),px(9,7,1,1,"#0a0a0a"),
        px(7,8,2,1,"#0a0a0a"),px(7,9,2,1,"#0a0a0a")]}
    </Sprite>
  );
}

export function BoltIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(8,1,3,1,color),px(7,2,3,1,color),px(6,3,3,1,color),px(5,4,3,1,color),
        px(4,5,3,1,color),px(4,6,6,1,color),px(5,7,5,1,color),px(6,8,5,1,color),
        px(7,9,4,1,color),px(8,10,3,1,color),px(9,11,2,1,color),px(10,12,2,1,color),px(11,13,1,1,color)]}
    </Sprite>
  );
}

export function HeartIcon({ size = 16, color = "#EF4444" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(3,3,3,1,color),px(10,3,3,1,color),px(2,4,5,1,color),px(9,4,5,1,color),
        px(2,5,12,1,color),px(2,6,12,1,color),px(3,7,10,1,color),px(4,8,8,1,color),
        px(5,9,6,1,color),px(6,10,4,1,color),px(7,11,2,1,color)]}
    </Sprite>
  );
}

export function CalendarIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(3,2,1,1,color),px(12,2,1,1,color),px(2,3,12,1,color),
        px(2,4,1,1,color),px(13,4,1,1,color),px(2,5,12,1,color),
        ...[6,7,8,9,10,11,12].flatMap(y => [px(2,y,1,1,color),px(13,y,1,1,color)]),
        px(2,13,12,1,color),
        px(4,7,2,1,color),px(7,7,2,1,color),px(10,7,2,1,color),
        px(4,9,2,1,color),px(7,9,2,1,color)]}
    </Sprite>
  );
}

export function HomeIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,2,2,1,color),px(6,3,4,1,color),px(5,4,6,1,color),px(4,5,8,1,color),
        px(3,6,10,1,color),px(2,7,12,1,color),
        ...[8,9,10,11,12].flatMap(y => [px(4,y,1,1,color),px(11,y,1,1,color)]),
        px(4,13,8,1,color),
        px(7,10,2,1,color),px(7,11,2,1,color),px(7,12,2,1,color),px(7,13,2,1,color)]}
    </Sprite>
  );
}

export function VoteIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(2,2,12,1,color),
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(y => [px(2,y,1,1,color),px(13,y,1,1,color)]),
        px(2,13,12,1,color),
        px(10,5,2,1,color),px(9,6,2,1,color),px(8,7,2,1,color),
        px(4,8,1,1,color),px(7,8,2,1,color),px(4,9,2,1,color),px(6,9,2,1,color),px(5,10,2,1,color)]}
    </Sprite>
  );
}

export function StatsIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(2,12,2,2,color),px(2,10,2,2,color),px(6,9,2,5,color),px(10,5,2,9,color),px(2,13,12,1,color)]}
    </Sprite>
  );
}

export function ProfileIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(6,3,4,1,color),px(5,4,6,1,color),px(5,5,6,1,color),px(5,6,6,1,color),px(6,7,4,1,color),
        px(4,10,8,1,color),px(3,11,10,1,color),px(3,12,10,1,color),px(3,13,10,1,color)]}
    </Sprite>
  );
}

export function CheckIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(12,4,2,1,color),px(11,5,2,1,color),px(10,6,2,1,color),px(9,7,2,1,color),
        px(8,8,2,1,color),px(3,9,1,1,color),px(7,9,2,1,color),
        px(3,10,2,1,color),px(6,10,2,1,color),px(4,11,3,1,color),px(5,12,1,1,color)]}
    </Sprite>
  );
}

export function XIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(3,3,2,1,color),px(11,3,2,1,color),px(4,4,2,1,color),px(10,4,2,1,color),
        px(5,5,2,1,color),px(9,5,2,1,color),px(6,6,2,1,color),px(8,6,2,1,color),px(7,7,2,1,color),
        px(6,8,2,1,color),px(8,8,2,1,color),px(5,9,2,1,color),px(9,9,2,1,color),
        px(4,10,2,1,color),px(10,10,2,1,color),px(3,11,2,1,color),px(11,11,2,1,color)]}
    </Sprite>
  );
}

export function ClockIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(6,2,4,1,color),px(4,3,2,1,color),px(10,3,2,1,color),
        px(3,4,1,1,color),px(12,4,1,1,color),px(2,5,1,1,color),px(13,5,1,1,color),
        px(2,6,1,1,color),px(13,6,1,1,color),px(7,6,1,1,color),
        px(2,7,1,1,color),px(13,7,1,1,color),px(7,7,1,1,color),
        px(2,8,1,1,color),px(13,8,1,1,color),px(7,8,3,1,color),
        px(3,9,1,1,color),px(12,9,1,1,color),px(4,10,2,1,color),px(10,10,2,1,color),px(6,11,4,1,color)]}
    </Sprite>
  );
}

export function PinIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(6,2,4,1,color),px(5,3,6,1,color),px(5,4,6,1,color),px(5,5,6,1,color),px(5,6,6,1,color),
        px(6,7,4,1,color),px(7,8,2,1,color),px(7,9,2,1,color),px(7,10,2,1,color),
        px(7,4,2,1,"#0a0a0a"),px(7,5,2,1,"#0a0a0a")]}
    </Sprite>
  );
}

export function CrownIcon({ size = 16, color = "#FACC15" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(2,4,1,1,color),px(7,3,2,1,color),px(13,4,1,1,color),
        px(2,5,1,1,color),px(7,4,2,1,color),px(13,5,1,1,color),
        px(2,6,2,1,color),px(7,5,2,1,color),px(12,6,2,1,color),
        px(2,7,12,1,color),px(2,8,12,1,color),px(3,9,10,1,color),px(3,10,10,1,color),
        px(7,8,2,1,"#EF4444")]}
    </Sprite>
  );
}

export function MedalIcon({ size = 16, color = "#FACC15", strap = "#22C55E" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(3,1,2,1,strap),px(11,1,2,1,strap),px(4,2,2,1,strap),px(10,2,2,1,strap),
        px(5,3,2,1,strap),px(9,3,2,1,strap),px(6,4,4,1,strap),
        px(6,5,4,1,color),px(5,6,6,1,color),px(4,7,8,1,color),px(4,8,8,1,color),px(4,9,8,1,color),
        px(5,10,6,1,color),px(6,11,4,1,color),
        px(6,7,1,1,"#FEF08A"),px(7,8,1,1,"#FEF08A")]}
    </Sprite>
  );
}

export function ArrowIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(8,4,1,1,color),px(8,5,2,1,color),px(8,6,3,1,color),px(2,7,10,1,color),
        px(2,8,10,1,color),px(8,9,3,1,color),px(8,10,2,1,color),px(8,11,1,1,color)]}
    </Sprite>
  );
}

export function PlusIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,3,2,1,color),px(7,4,2,1,color),px(7,5,2,1,color),px(7,6,2,1,color),
        px(3,7,10,1,color),px(3,8,10,1,color),
        px(7,9,2,1,color),px(7,10,2,1,color),px(7,11,2,1,color),px(7,12,2,1,color)]}
    </Sprite>
  );
}

export function BellIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(7,2,2,1,color),px(5,3,6,1,color),px(4,4,8,1,color),px(4,5,8,1,color),
        px(4,6,8,1,color),px(4,7,8,1,color),px(4,8,8,1,color),px(3,9,10,1,color),
        px(2,10,12,1,color),px(2,11,12,1,color),px(7,12,2,1,color),px(7,13,2,1,color)]}
    </Sprite>
  );
}

export function ChatIcon({ size = 16, color = "currentColor" }: SpriteProps) {
  return (
    <Sprite size={size}>
      {[px(2,3,12,1,color),
        ...[4,5,6,7,8].flatMap(y => [px(2,y,1,1,color),px(13,y,1,1,color)]),
        px(2,9,12,1,color),px(3,10,2,1,color),px(4,11,2,1,color),
        px(5,6,1,1,color),px(8,6,1,1,color),px(11,6,1,1,color)]}
    </Sprite>
  );
}

// ── Pixel Avatar Generator ────────────────────────────────────────────────────
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0;
  return h;
}

const AVATAR_PALETTES = [
  { skin: "#F5C39A", hair: "#1F2937", shirt: "#22C55E" },
  { skin: "#E5A781", hair: "#451A03", shirt: "#FACC15" },
  { skin: "#FBBF24", hair: "#0F172A", shirt: "#22D3EE" },
  { skin: "#FDE68A", hair: "#7C2D12", shirt: "#F472B6" },
  { skin: "#FCD34D", hair: "#1E293B", shirt: "#A78BFA" },
  { skin: "#FB923C", hair: "#0F172A", shirt: "#84CC16" },
  { skin: "#FECACA", hair: "#312E81", shirt: "#EF4444" },
  { skin: "#E5C99E", hair: "#3F3F46", shirt: "#FB923C" },
];

export function PixelAvatarSvg({ seed = "P", size = 40 }: { seed?: string; size?: number }) {
  const h = hashStr(seed);
  const p = AVATAR_PALETTES[h % AVATAR_PALETTES.length];
  const bg = ["#1F2937", "#0F172A", "#1E293B", "#111827"][h % 4];
  const hairStyle = h % 4;
  const eyeColor = "#0F172A";

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
      {px(0,0,16,16,bg)}
      {/* shirt */}
      {px(2,12,12,4,p.shirt)}{px(1,13,1,3,p.shirt)}{px(14,13,1,3,p.shirt)}
      {/* neck */}
      {px(6,11,4,1,p.skin)}
      {/* head */}
      {[4,5,6,7,8,9].map(y => px(4,y,8,1,p.skin))}
      {px(5,4,6,1,p.skin)}{px(5,10,6,1,p.skin)}
      {/* hair */}
      {hairStyle === 0 ? [px(5,3,6,1,p.hair),px(4,4,8,1,p.hair),px(4,5,1,1,p.hair),px(11,5,1,1,p.hair)] :
       hairStyle === 1 ? [px(4,3,8,1,p.hair),px(3,4,10,1,p.hair),px(3,5,1,1,p.hair),px(12,5,1,1,p.hair),px(3,6,1,1,p.hair),px(12,6,1,1,p.hair)] :
       hairStyle === 2 ? [px(5,3,6,1,p.hair),px(4,4,1,1,p.hair),px(11,4,1,1,p.hair),px(5,4,6,1,p.hair)] :
       [px(4,2,8,1,p.hair),px(3,3,10,1,p.hair),px(3,4,1,1,p.hair),px(12,4,1,1,p.hair),px(4,4,1,1,p.hair),px(11,4,1,1,p.hair)]}
      {/* eyes */}
      {px(6,7,1,1,eyeColor)}{px(9,7,1,1,eyeColor)}
      {/* cheeks */}
      {px(5,8,1,1,"#F472B6")}{px(10,8,1,1,"#F472B6")}
      {/* mouth */}
      {px(7,9,2,1,"#7F1D1D")}
    </svg>
  );
}
