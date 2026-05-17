# VietSeeds Smashers — Claude Code Reference

Pixel Sports Club Manager for a Vietnamese badminton community. Two surfaces:
- **Mobile** (`/home`, `/sessions`, etc.) — 390×844 phone shell, bottom-nav
- **Web** (`/dashboard`, `/dashboard/sessions`, etc.) — full desktop 3-col dashboard

## Quick Links

| Topic | File |
|-------|------|
| Folder structure & routing | `docs/ARCHITECTURE.md` |
| Design tokens, CSS vars, Tailwind | `docs/DESIGN-SYSTEM.md` |
| Component API & UI rules | `docs/UI-RULES.md` |

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Variants | class-variance-authority (CVA) |
| Animation | Framer Motion |
| State | Zustand (persist middleware) |
| Server state | TanStack Query |
| Icons | Custom pixel SVG icons (`components/icons/pixel-icons.tsx`) |

## Dev Commands

```bash
npm run dev     # start dev server on :3000
npm run build   # production build (type-check + compile)
npm run lint    # ESLint
```

## Key Rules

1. **Never** put logic in page files — pages are thin wrappers that render a screen component.
2. **Always** add CSS custom properties (via `useThemeStore`) rather than hardcoding hex values.
3. **Never** import from `node_modules` CSS directly — all global styles live in `app/globals.css` and `app/web.css`.
4. **Prefer** CSS class names from `globals.css` / `web.css` for web layout utilities over inline Tailwind for structural layout (grid, sticky positions).
5. New shared UI components go in `components/ui/`. Web-shell components go in `components/web/`. Mobile-shell components go in `components/layout/`.
6. All client-side interactive code must have `"use client"` at the top.
7. Zustand stores live in `stores/`. `theme-store.ts` = shared theme. `web-store.ts` = desktop-only tweaks.
