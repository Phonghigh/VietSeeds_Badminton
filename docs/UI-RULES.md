# UI / UX Rules

Coding conventions, interaction patterns, and component usage rules for both mobile and web surfaces.

---

## General Rules

### File conventions

```typescript
// Every interactive component must start with:
"use client";

// Page files are server components — thin wrappers only:
export default function SomePage() {
  return <SomeScreen />;  // No logic here
}

// Screen components contain all logic:
export function SomeScreen() { ... }
```

### Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Component files | kebab-case | `pixel-card.tsx` |
| Component names | PascalCase | `PixelCard` |
| Screen components | PascalCase + surface prefix | `WebHome`, `WebSessions` |
| CSS classes | kebab-case | `web-topbar`, `pixel-corners` |
| Store files | kebab-case | `theme-store.ts` |
| Store hooks | `use` + PascalCase | `useThemeStore` |
| CSS custom properties | `--kebab-case` | `--accent-glow` |

---

## Component Usage

### PixelCard — when to use each variant

| Variant | Use |
|---------|-----|
| `default` | Standard content card |
| `flat` | Nested card, less depth |
| `elev` | Featured / hero section |
| `glass` | Overlay / modal context |

Add `accent` on cards that respond to the current theme accent.
Add `interactive` when the entire card is clickable.

```tsx
// Correct
<PixelCard variant="elev" accent interactive onClick={...}>
  ...
</PixelCard>

// Wrong — don't wrap interactive cards in extra buttons
<button><PixelCard>...</PixelCard></button>
```

### PixelBadge — variant selection

```tsx
// Session status
<PixelBadge variant={s.status === "live" ? "danger" : "accent"}>
  {s.status.toUpperCase()}
</PixelBadge>

// Ranks
<PixelBadge variant="yellow">👑 LV.18</PixelBadge>

// Wrong — don't use arbitrary inline colors on badges
<PixelBadge style={{ color: "red" }}>...</PixelBadge>  // BAD
```

### PixelButton — sizes

- Use `size="sm"` in cards, headers, table cells
- Use `size="md"` (default) for standalone CTAs

```tsx
// Primary action always variant="primary"
<PixelButton variant="primary" size="sm" icon={<CheckIcon size={10} color="var(--accent-ink)" />}>
  I'M IN
</PixelButton>

// Destructive / warning
<PixelButton variant="danger" size="sm">WATCH</PixelButton>

// Neutral / secondary
<PixelButton variant="ghost" size="sm">CAN'T GO</PixelButton>
```

### Icons

All icons are in `components/icons/pixel-icons.tsx`. Every icon accepts `size` and `color`.

```tsx
// Color should use CSS variables
<RacketIcon size={14} color="var(--accent)" />
<TrophyIcon size={64} color="var(--yellow)" />   // KPI background icon

// Wrong — never hardcode hex in icon color
<ShuttleIcon color="#22C55E" />  // BAD
```

Available icons: `ShuttleIcon`, `RacketIcon`, `TrophyIcon`, `FireIcon`, `StarIcon`, `CoinIcon`, `BoltIcon`, `HeartIcon`, `CalendarIcon`, `HomeIcon`, `VoteIcon`, `StatsIcon`, `ProfileIcon`, `CheckIcon`, `XIcon`, `ClockIcon`, `PinIcon`, `CrownIcon`, `MedalIcon`, `ArrowIcon`, `PlusIcon`, `BellIcon`, `ChatIcon`

### PixelAvatar / AvatarStack

```tsx
// Single avatar
<PixelAvatar seed={player.nick} size="sm" ring />

// Stack in session cards
<AvatarStack
  seeds={s.going.map(id => findPlayer(id).nick)}
  max={5}
  size="xs"
/>
```

`seed` must be the player's `nick` field (deterministic hash for the pixel art face).

---

## Layout Patterns

### Mobile screen structure

```tsx
<motion.div
  className="px-4 pb-4 flex flex-col gap-3.5"
  style={{ paddingTop: 8 }}
  variants={pageEnter}
  initial="initial"
  animate="animate"
  transition={pageTransition}
>
  {/* Header */}
  <div className="flex justify-between items-center">...</div>

  {/* Content */}
  <PixelCard ...>...</PixelCard>
</motion.div>
```

### Web screen structure

```tsx
<div>
  {/* Breadcrumb + title + actions */}
  <div className="web-main-head">
    <div>
      <div className="web-crumbs">▸ SECTION / SUB</div>
      <h1>PAGE TITLE</h1>
      <div className="web-sub">Subtitle text here</div>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      <PixelButton variant="ghost" size="sm">...</PixelButton>
      <PixelButton variant="primary" size="sm">...</PixelButton>
    </div>
  </div>

  {/* KPI row (optional) */}
  <div className="web-kpi-row">
    <WebKPITile label="..." value={...} color="var(--accent)" icon={...} />
  </div>

  {/* Content grids */}
  <div className="web-cols-2">...</div>  {/* 1.5fr / 1fr */}
  <div className="web-cols-3">...</div>  {/* 1fr / 1fr / 1fr */}
</div>
```

### Web tables

Always use `className="web-tbl"` for data tables on the web surface:

```tsx
<table className="web-tbl">
  <thead>
    <tr>
      <th>COLUMN</th>  {/* pixel-xs styling, uppercase */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>value</td>
    </tr>
  </tbody>
</table>
```

---

## Ring Chart (attendance/roster)

The `ring-chart` CSS class creates a conic-gradient ring using CSS custom properties:

```tsx
<div
  className="ring-chart flex-shrink-0"
  style={{
    "--val": String(pct),    // 0–100, no % sign
    "--size": "96px",
    "--thick": "10px",
  } as React.CSSProperties}
>
  <div style={{ textAlign: "center" }}>
    <div className="pixel-md" style={{ color: "var(--accent)" }}>{pct}%</div>
    <div className="pixel-xs text-ink-3">TURNOUT</div>
  </div>
</div>
```

---

## Live Dot

```tsx
<span className="live-dot" />          {/* Red pulsing dot */}
<span className="live-dot mr-1" />     {/* In a badge */}
```

---

## XP / Spending Bar Chart (height pitfall)

**Never** use percentage heights on bars inside a flex column without a defined parent height:

```tsx
// WRONG — height: "65%" resolves to 0 if parent has no fixed height
<div style={{ height: "65%", background: "..." }} />

// CORRECT — compute pixel height from max height
const MAX_H = 96;  // or 220 on web
const barH = Math.round((value / 100) * MAX_H);
<div style={{ height: barH, background: "..." }} />

// CORRECT for web (parent has explicit height={220}):
<div style={{ height: 220, ... }}>  {/* defined parent */}
  <div style={{ height: `${value}%` }} />  {/* OK here */}
</div>
```

---

## Heatmap Cells

Use a deterministic seed so server and client render the same values (avoids hydration mismatch):

```tsx
{Array.from({ length: 30 }).map((_, i) => {
  const seed = (i * 17) % 100;  // deterministic
  const opacity = seed > 75 ? 1 : seed > 50 ? 0.6 : seed > 25 ? 0.3 : 0.08;
  return <div key={i} style={{ background: "var(--accent)", opacity }} />;
})}
```

---

## Theming

### Applying dynamic colors

The theme store exposes `setAccent(hex)` which writes all `--accent-*` CSS vars to `document.documentElement`. Never write `--accent` vars yourself — call the store method.

```tsx
// Correct
const { setAccent } = useThemeStore();
setAccent("#22D3EE");

// Wrong — bypasses the glow/ink/soft vars
document.documentElement.style.setProperty("--accent", "#22D3EE");  // BAD
```

### Light vs Dark mode (web only)

```tsx
// In web components that need theme-sensitive inline styles
// Use CSS vars — they update automatically via [data-theme="light"]
style={{ background: "var(--bg-2)", color: "var(--text-0)" }}

// Not Tailwind bg-bg-2 — those don't react to data-theme
```

---

## Navigation

### Mobile — Bottom Nav

Uses `usePathname()` and `<Link>`. Add new routes to `NAV_ITEMS` array in `components/layout/bottom-nav.tsx`.

### Web — Sidebar

Uses `usePathname()` and Next.js `<Link>`. Add routes to `NAV_ITEMS` / `ADMIN_ITEMS` in `components/web/sidebar.tsx`.

Navigation calls `router.push()` — never manipulate history directly.

---

## State

### Toast messages

```tsx
import { useGameStore } from "@/stores/game-store";

const { showToast } = useGameStore();
showToast("VOTE CAST · +20 XP 🗳️");
```

### Theme

```tsx
import { useThemeStore } from "@/stores/theme-store";
const { accent, pixelFont } = useThemeStore();
```

### Web-specific

```tsx
import { useWebStore } from "@/stores/web-store";
const { theme, showRail, toggleTheme } = useWebStore();
```

---

## Accessibility Checklist

- All interactive elements must be `<button>` or `<a>` (not `<div onClick>`)
- Icon-only buttons must have `title` or `aria-label`
- Color is never the only indicator of status — pair with text/icons
- Focus-visible styles must be visible (Tailwind's `outline-none` is forbidden without a replacement)
- `role="img"` + `aria-label` on `PixelAvatar` (already implemented)
- Animated elements must respect `prefers-reduced-motion` — the `animate-` classes and Framer Motion do this automatically if CSS is authored correctly
