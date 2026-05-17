"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Accent = "#22C55E" | "#FACC15" | "#22D3EE" | "#F472B6";
export type PixelFont = "Press Start 2P" | "Pixelify Sans" | "VT323";
export type BodyFont = "Inter" | "Geist" | "JetBrains Mono";
export type HomeLayout = "A" | "B" | "C";

const ACCENTS: Record<Accent, { main: string; alt: string; ink: string; glow: string; soft: string }> = {
  "#22C55E": { main: "#22C55E", alt: "#84CC16", ink: "#052e13", glow: "rgba(34,197,94,0.45)",   soft: "rgba(34,197,94,0.18)"   },
  "#FACC15": { main: "#FACC15", alt: "#EAB308", ink: "#422006", glow: "rgba(250,204,21,0.45)",  soft: "rgba(250,204,21,0.18)"  },
  "#22D3EE": { main: "#22D3EE", alt: "#06B6D4", ink: "#083344", glow: "rgba(34,211,238,0.45)",  soft: "rgba(34,211,238,0.18)"  },
  "#F472B6": { main: "#F472B6", alt: "#EC4899", ink: "#500724", glow: "rgba(244,114,182,0.5)",   soft: "rgba(244,114,182,0.18)" },
};

function applyAccent(hex: Accent) {
  const a = ACCENTS[hex];
  const r = document.documentElement.style;
  r.setProperty("--accent",           a.main);
  r.setProperty("--accent-2",         a.alt);
  r.setProperty("--accent-ink",       a.ink);
  r.setProperty("--accent-glow",      a.glow);
  r.setProperty("--accent-glow-soft", a.soft);
}

interface ThemeState {
  accent:         Accent;
  pixelFont:      PixelFont;
  bodyFont:       BodyFont;
  pixelIntensity: number;
  scanlines:      boolean;
  crtVignette:    boolean;
  homeLayout:     HomeLayout;

  setAccent:         (a: Accent) => void;
  setPixelFont:      (f: PixelFont) => void;
  setBodyFont:       (f: BodyFont) => void;
  setPixelIntensity: (v: number) => void;
  setScanlines:      (v: boolean) => void;
  setCrtVignette:    (v: boolean) => void;
  setHomeLayout:     (l: HomeLayout) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      accent:         "#22C55E",
      pixelFont:      "Press Start 2P",
      bodyFont:       "Inter",
      pixelIntensity: 100,
      scanlines:      true,
      crtVignette:    true,
      homeLayout:     "A",

      setAccent: (accent) => {
        if (typeof document !== "undefined") applyAccent(accent);
        set({ accent });
      },
      setPixelFont: (pixelFont) => {
        if (typeof document !== "undefined")
          document.documentElement.style.setProperty("--font-pixel", `'${pixelFont}', monospace`);
        set({ pixelFont });
      },
      setBodyFont: (bodyFont) => {
        if (typeof document !== "undefined")
          document.documentElement.style.setProperty("--font-body", `'${bodyFont}', sans-serif`);
        set({ bodyFont });
      },
      setPixelIntensity: (v) => {
        if (typeof document !== "undefined")
          document.documentElement.style.setProperty("--px", String(v / 100));
        set({ pixelIntensity: v });
      },
      setScanlines:   (v) => set({ scanlines: v }),
      setCrtVignette: (v) => set({ crtVignette: v }),
      setHomeLayout:  (l) => set({ homeLayout: l }),
    }),
    { name: "vietseeds-theme" }
  )
);
