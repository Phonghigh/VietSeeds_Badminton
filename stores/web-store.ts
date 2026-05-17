"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Accent } from "@/stores/theme-store";

// ── Light/dark theme accent sets ──────────────────────────────
const ACCENTS_LIGHT: Record<Accent, { main: string; alt: string; ink: string; glow: string; soft: string }> = {
  "#22C55E": { main: "#15803D", alt: "#65A30D", ink: "#FAFAF7", glow: "rgba(21,128,61,0.30)",  soft: "rgba(21,128,61,0.12)" },
  "#FACC15": { main: "#A16207", alt: "#CA8A04", ink: "#FFFBEB", glow: "rgba(161,98,7,0.30)",   soft: "rgba(161,98,7,0.12)" },
  "#22D3EE": { main: "#0E7490", alt: "#0891B2", ink: "#ECFEFF", glow: "rgba(14,116,144,0.30)", soft: "rgba(14,116,144,0.12)" },
  "#F472B6": { main: "#BE185D", alt: "#DB2777", ink: "#FDF2F8", glow: "rgba(190,24,93,0.30)",  soft: "rgba(190,24,93,0.12)" },
};

function applyWebTheme(theme: "dark" | "light", accent: Accent) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  if (theme === "light") {
    const a = ACCENTS_LIGHT[accent];
    const r = document.documentElement.style;
    r.setProperty("--accent",           a.main);
    r.setProperty("--accent-2",         a.alt);
    r.setProperty("--accent-ink",       a.ink);
    r.setProperty("--accent-glow",      a.glow);
    r.setProperty("--accent-glow-soft", a.soft);
  }
  // Dark accent re-applied by the main theme store
}

interface WebState {
  theme:    "dark" | "light";
  showRail: boolean;
  setTheme:    (t: "dark" | "light", accent: Accent) => void;
  setShowRail: (v: boolean) => void;
  toggleTheme: (accent: Accent) => void;
}

export const useWebStore = create<WebState>()(
  persist(
    (set, get) => ({
      theme:    "dark",
      showRail: true,

      setTheme: (theme, accent) => {
        applyWebTheme(theme, accent);
        set({ theme });
      },
      setShowRail: (v) => set({ showRail: v }),
      toggleTheme: (accent) => {
        const next = get().theme === "dark" ? "light" : "dark";
        applyWebTheme(next, accent);
        set({ theme: next });
      },
    }),
    { name: "vietseeds-web" }
  )
);
