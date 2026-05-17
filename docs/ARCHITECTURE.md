# Architecture

## Folder Structure

```
app/
  layout.tsx              Root layout — <html>, Providers, ThemeInitializer (no centering)
  globals.css             CSS custom properties + Tailwind layers + utility classes
  web.css                 Web dashboard layout CSS (web-app grid, topbar, sidebar, rail)
  page.tsx                Redirects → /home

  (app)/                  Route group: mobile phone shell
    layout.tsx            Centering div + phone frame (390×844) + BottomNav + TweaksPanel
    home/page.tsx
    sessions/page.tsx
    sessions/[id]/page.tsx
    votes/page.tsx
    stats/page.tsx
    profile/page.tsx

  (web)/                  Route group: desktop 3-column dashboard
    dashboard/
      layout.tsx          web-app grid: TopBar + Sidebar + Main + RightRail
      page.tsx            → WebHome
      sessions/page.tsx   → WebSessions
      sessions/[id]/page.tsx → WebSessionDetail
      votes/page.tsx      → WebVoting
      stats/page.tsx      → WebStats
      profile/page.tsx    → WebProfile
      admin/
        users/page.tsx    → WebAdminUsers
        reports/page.tsx  → WebAdminReports
        settings/page.tsx → WebAdminSettings

components/
  icons/
    pixel-icons.tsx       All pixel SVG icons (ShuttleIcon, RacketIcon, …)
  layout/                 Mobile-shell chrome
    bottom-nav.tsx
    status-bar.tsx
    scanline-overlay.tsx
    tweaks-panel.tsx
  web/                    Web-shell chrome
    top-bar.tsx
    sidebar.tsx
    right-rail.tsx
    tweaks-panel.tsx
  screens/                Full-screen content components
    home-screen.tsx       Mobile: HomeLayoutA/B/C + HomeScreen switcher
    session-detail.tsx    Mobile: tabbed session detail
    voting.tsx            Mobile: voting
    profile.tsx           Mobile: player profile
    stats.tsx             Mobile: Stats + SessionsList
    web-home.tsx          Web: dashboard home
    web-sessions.tsx      Web: sessions grid
    web-session-detail.tsx Web: session detail (wider, tabbed)
    web-voting.tsx        Web: voting polls
    web-stats.tsx         Web: analytics + leaderboard
    web-profile.tsx       Web: player profile
    web-admin.tsx         Web: WebAdminUsers / Reports / Settings
  ui/                     Shared primitives (both surfaces)
    pixel-card.tsx
    pixel-button.tsx
    pixel-badge.tsx
    pixel-avatar.tsx      + AvatarStack export
    xp-bar.tsx
    pills.tsx
    section-title.tsx
    stat-tile.tsx
    toast-overlay.tsx
    animated-number.tsx

lib/
  data.ts                 All mock data: PLAYERS, SESSIONS, COURTS, ACHIEVEMENTS, …
  motion.ts               Framer Motion page variants (pageEnter, pageTransition)
  utils.ts                cn() helper

stores/
  theme-store.ts          Accent, fonts, pixel intensity, scanlines, home layout
  web-store.ts            Dark/light theme, show-rail toggle (web only)
  game-store.ts           Toast, levelUp burst
```

## Routing Pattern

```
/               → redirect /home
/home           → mobile HomeScreen (phone shell)
/sessions       → mobile SessionsList
/sessions/[id]  → mobile SessionDetail
/votes          → mobile Voting
/stats          → mobile Stats
/profile        → mobile Profile
/dashboard      → web WebHome (desktop shell)
/dashboard/*    → web screens
```

## Data Flow

1. **Static mock data** in `lib/data.ts` — exported as `PLAYERS`, `SESSIONS`, `COURTS`, etc.
2. **Theme state** in Zustand (`stores/theme-store.ts`) — persisted to localStorage, applies CSS vars via `applyAccent()` + direct `setProperty` calls.
3. **Web state** in Zustand (`stores/web-store.ts`) — dark/light mode, rail visibility.
4. **Game events** in Zustand (`stores/game-store.ts`) — toast messages, level-up burst.

## Server vs Client

- **Page files** (`app/**/page.tsx`) — server components by default. No `"use client"`.
- **Layout files** — `(app)/layout.tsx` and `(web)/dashboard/layout.tsx` are client components (use Zustand).
- **All screen components** — client components (`"use client"` at top).
- **All UI primitives** — client components (Framer Motion + Zustand).
- **Root layout** — server component (no `"use client"`).

## CSS Architecture

Two CSS files loaded:
1. `app/globals.css` — imported in root layout, applies everywhere
   - Fonts, CSS custom properties (tokens), Tailwind layers, utility classes
2. `app/web.css` — imported only in `(web)/dashboard/layout.tsx`
   - Web-specific layout classes: `.web-app`, `.web-topbar`, `.web-sidebar`, etc.

Tailwind tokens (colors, shadows, fonts) are defined in `tailwind.config.ts`.
CSS custom properties (`--accent`, `--bg-0`, etc.) are in `globals.css :root`.
The theme store syncs them at runtime via `document.documentElement.style.setProperty`.
