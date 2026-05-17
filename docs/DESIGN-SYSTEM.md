# Design System

Pixel retro aesthetic — "Pixel Sports Club Manager". Dark-first, with optional light mode on the web surface.

---

## Design Tokens

### Color — CSS Custom Properties (`:root` in `globals.css`)

| Token | Default value | Purpose |
|-------|--------------|---------|
| `--accent` | `#22C55E` | Primary action color — buttons, rings, glows |
| `--accent-2` | `#84CC16` | Secondary accent — XP bar stripes, charts |
| `--accent-glow` | `rgba(34,197,94,0.45)` | Box-shadow glow |
| `--accent-glow-soft` | `rgba(34,197,94,0.18)` | Subtle glow / bg tint |
| `--accent-ink` | `#052e13` | Text on accent background |
| `--bg-0` | `#0B1220` | Page background |
| `--bg-1` | `#111827` | Surface 1 — sidebar, cards |
| `--bg-2` | `#1F2937` | Surface 2 — inputs, tiles |
| `--bg-3` | `#2A3441` | Surface 3 — hover states |
| `--bg-elev` | `#1A2230` | Elevated card |
| `--text-0` | `#F3F4F6` | Primary text |
| `--text-1` | `#E5E7EB` | Secondary text |
| `--text-2` | `#9CA3AF` | Muted text |
| `--text-3` | `#6B7280` | Disabled / placeholder |
| `--border-soft` | `rgba(255,255,255,0.07)` | Subtle border |
| `--border-mid` | `rgba(255,255,255,0.12)` | Medium border |
| `--yellow` | `#FACC15` | Gold / rank / XP |
| `--cyan` | `#22D3EE` | Info / stats |
| `--pink` | `#F472B6` | Accent B / voting |
| `--orange` | `#FB923C` | Streak / fire |
| `--danger` | `#EF4444` | Live / error / can't-go |
| `--px` | `1` | Pixel intensity multiplier (0–1.6) |

**Accent colors are swappable** via `useThemeStore().setAccent(hex)`. Four presets: Green, Yellow, Cyan, Pink. The store applies all five `--accent-*` vars at once.

**Light theme** overrides `--bg-*`, `--text-*`, and `--border-*` via `[data-theme="light"]` in `globals.css`. Applied by `useWebStore`.

### Color — Tailwind Tokens (`tailwind.config.ts`)

Use Tailwind classes when possible. Falls back to `var()` for dynamic values only.

| Tailwind class | Value |
|---------------|-------|
| `bg-bg-0` | `#0B1220` |
| `bg-bg-1` | `#111827` |
| `bg-bg-2` | `#1F2937` |
| `bg-bg-3` | `#2A3441` |
| `text-ink-0` | `#F3F4F6` |
| `text-ink-1` | `#E5E7EB` |
| `text-ink-2` | `#9CA3AF` |
| `text-ink-3` | `#6B7280` |
| `text-retro-yellow` | `#FACC15` |
| `text-retro-danger` | `#EF4444` |
| `text-retro-cyan` | `#22D3EE` |
| `text-retro-pink` | `#F472B6` |
| `text-retro-orange` | `#FB923C` |

### Typography

Two font stacks:

| CSS var | Default | Purpose |
|---------|---------|---------|
| `--font-pixel` | `'Press Start 2P', monospace` | Labels, stats, badges, headings |
| `--font-body` | `'Inter', system-ui, sans-serif` | Descriptions, body copy |

**Pixel font size classes** (defined in both `globals.css` and Tailwind):

| Class | Size | Use |
|-------|------|-----|
| `pixel-xs` | 9px | Micro labels, timestamps, badge text |
| `pixel-sm` | 10px | Button text, small values |
| `pixel-md` | 12px | Card titles, section headings |
| `pixel-lg` | 16px | Screen headings, large stats |
| `pixel-xl` | 22px | Hero numbers, level display |

**Body text:** use regular Tailwind `text-xs/sm/base` classes with `font-body` or default system font.

### Spacing

Base: `4px` grid.

```
4px  = space-u
8px  = space-2u
16px = space-4u
24px = space-6u
```

Card padding: `14–18px`. Screen padding: `px-4 pb-4` (mobile), `var(--pad) = 20px` (web).

### Shadows / Glow

| Class | Effect |
|-------|--------|
| `glow-accent` | `0 0 16px var(--accent-glow)` |
| `glow-yellow` | `0 0 16px rgba(250,204,21,0.4)` |
| `glow-danger` | `0 0 16px rgba(239,68,68,0.4)` |
| `text-glow` | `text-shadow: 0 0 10px currentColor` |
| `shadow-pixel-card` | `0 8px 24px rgba(0,0,0,0.35)` |
| `shadow-accent-border` | Inset 2px accent border + glow |

### Motion

- Page enter: `pageEnter` / `pageTransition` from `lib/motion.ts`
- Pixel intensity controls all glow animation strength via `--px`
- Key animations: `animate-blink`, `animate-flicker`, `animate-pulse-glow`, `animate-shuttle-fly`, `animate-marquee`

---

## Component Catalog

### PixelCard

Variants: `default | flat | elev | glass`
- Add `accent` prop for pixel corner ticks
- Add `interactive` for cursor-pointer
- `glow` for pulsing glow animation

### PixelButton

Variants: `primary | ghost | danger | yellow`
Sizes: `sm | md`
- `icon` prop renders before label

### PixelBadge

Variants: `default | accent | yellow | danger | cyan | pink`
- `icon` prop renders before children

### PixelAvatar / AvatarStack

- `size`: `xs | sm | md | lg | xl`
- `ring`: adds accent glow ring
- `AvatarStack`: overlapping avatars with `max` count and `+N` overflow

### XPBar

- `color`: `accent | yellow | danger`
- `height`: pixel height (default 12)
- Uses stripe animation classes from globals.css

### Pills (tab switcher)

- `tabs`: `{ id, label }[]`
- `current`: active tab id
- `onChange`: callback

### AnimatedNumber

Counts up from previous value to new value with ease-out cubic.
Props: `value`, `duration` (ms), `suffix`, `prefix`

---

## Pixel Clip Paths

These `clip-path` values give square-cornered "pixel art" shapes:

| Class | Corner cut |
|-------|-----------|
| `pixel-clip-sm` | 4px |
| `pixel-clip` | 6px |
| `pixel-clip-avatar` | 3px |

For inline usage: `clip-path: polygon(0 4px, 4px 4px, 4px 0, ...)`.

---

## CSS Utility Classes (from `globals.css`)

| Class | Purpose |
|-------|---------|
| `pixel-corners` | `::before/::after` corner ticks using `--accent` |
| `pix-divider` | Dashed pixel divider line |
| `live-dot` | Pulsing red LED dot |
| `ring-chart` | Conic gradient ring. Set `--val`, `--size`, `--thick` |
| `screen-scroll` | Scroll container, hidden scrollbar |
| `h-scroll` | Horizontal scroll strip |
| `marching` | Animated dashed border |
| `scanlines` | CRT scanline overlay |
| `xp-stripe-accent/yellow/danger` | Striped XP bar fill |

---

## Anti-Patterns

- **Never** hardcode hex colors in component files. Use `var(--accent)`, `var(--text-0)`, Tailwind tokens.
- **Never** use `style={{ color: "#22C55E" }}` — the accent color changes with the theme.
- **Never** use `overflow: hidden` on the root `<body>` for web routes — only the phone shell needs it.
- **Never** use percentage heights (`height: 65%`) on children of flex items without a defined parent height.
- **Avoid** one-off font sizes — use the `pixel-xs/sm/md/lg/xl` scale.
- **Avoid** arbitrary shadows — use the predefined shadow tokens.
