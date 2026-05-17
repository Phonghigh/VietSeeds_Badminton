import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "#0B1220",
          1: "#111827",
          2: "#1F2937",
          3: "#2A3441",
          elev: "#1A2230",
        },
        ink: {
          0: "#F3F4F6",
          1: "#E5E7EB",
          2: "#9CA3AF",
          3: "#6B7280",
        },
        retro: {
          yellow: "#FACC15",
          danger: "#EF4444",
          cyan:   "#22D3EE",
          pink:   "#F472B6",
          purple: "#A78BFA",
          orange: "#FB923C",
          green:  "#22C55E",
          lime:   "#84CC16",
        },
      },
      fontFamily: {
        pixel:    ["'Press Start 2P'", "monospace"],
        vt:       ["VT323", "monospace"],
        body:     ["Inter", "system-ui", "sans-serif"],
        "mono-alt": ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "pixel-xs": ["9px",  { lineHeight: "1.4", letterSpacing: "0.06em" }],
        "pixel-sm": ["10px", { lineHeight: "1.3", letterSpacing: "0.04em" }],
        "pixel-md": ["12px", { lineHeight: "1.3", letterSpacing: "0.02em" }],
        "pixel-lg": ["16px", { lineHeight: "1.2", letterSpacing: "0.02em" }],
        "pixel-xl": ["22px", { lineHeight: "1.15", letterSpacing: "0.01em" }],
      },
      boxShadow: {
        "pixel-sm":    "0 0 calc(8px * var(--px)) var(--accent-glow)",
        "pixel-md":    "0 0 calc(16px * var(--px)) var(--accent-glow)",
        "pixel-lg":    "0 0 calc(24px * var(--px)) var(--accent-glow)",
        "pixel-card":  "0 8px 24px rgba(0,0,0,0.35)",
        "yellow-glow": "0 0 calc(16px * var(--px)) rgba(250,204,21,0.4)",
        "danger-glow": "0 0 calc(16px * var(--px)) rgba(239,68,68,0.4)",
        "accent-border": "inset 0 0 0 2px var(--accent), 0 0 calc(20px * var(--px)) var(--accent-glow)",
        "mid-border":    "inset 0 0 0 2px rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "stage-glow":
          "radial-gradient(circle at 20% 0%, rgba(34,197,94,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 100%, rgba(132,204,22,0.06) 0%, transparent 45%)",
      },
      backgroundSize: {
        "dot-16": "16px 16px",
      },
      keyframes: {
        blink: { "0%,60%": { opacity: "1" }, "70%,100%": { opacity: "0.25" } },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 calc(8px * var(--px)) var(--accent-glow)" },
          "50%":     { boxShadow: "0 0 calc(24px * var(--px)) var(--accent-glow)" },
        },
        "float-up": {
          from: { transform: "translateY(6px)", opacity: "0" },
          to:   { transform: "translateY(0)",   opacity: "1" },
        },
        marquee: {
          from: { backgroundPosition: "0 0" },
          to:   { backgroundPosition: "24px 0" },
        },
        flicker: {
          "0%,18%,22%,25%,53%,57%,100%": { opacity: "1" },
          "20%,24%,55%":                  { opacity: "0.55" },
        },
        "shuttle-fly": {
          "0%":   { transform: "translate(-20px, 10px) rotate(-20deg)" },
          "50%":  { transform: "translate(0, -10px) rotate(0deg)" },
          "100%": { transform: "translate(20px, 10px) rotate(20deg)" },
        },
        "scan-sweep": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(2200%)" },
        },
        wobble: {
          "0%,100%": { transform: "rotate(0)" },
          "25%":     { transform: "rotate(-3deg)" },
          "75%":     { transform: "rotate(3deg)" },
        },
      },
      animation: {
        blink:        "blink 1.2s steps(2, end) infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float-up":   "float-up 360ms ease-out both",
        flicker:      "flicker 4s infinite",
        "shuttle-fly":"shuttle-fly 3s ease-in-out infinite alternate",
        marquee:      "marquee 0.6s linear infinite",
        wobble:       "wobble 0.4s ease-in-out",
      },
      borderColor: {
        soft: "rgba(255,255,255,0.07)",
        mid:  "rgba(255,255,255,0.12)",
      },
      spacing: {
        u:  "4px",
        "2u": "8px",
        "4u": "16px",
        "6u": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
