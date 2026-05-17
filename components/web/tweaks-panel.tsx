"use client";
import { useState } from "react";
import { useThemeStore, type Accent, type PixelFont, type BodyFont } from "@/stores/theme-store";
import { useWebStore } from "@/stores/web-store";

const ACCENTS: Accent[] = ["#22C55E", "#FACC15", "#22D3EE", "#F472B6"];
const ACCENT_NAMES: Record<Accent, string> = {
  "#22C55E": "Green",
  "#FACC15": "Yellow",
  "#22D3EE": "Cyan",
  "#F472B6": "Pink",
};

const PIXEL_FONTS: PixelFont[] = ["Press Start 2P", "Pixelify Sans", "VT323"];
const BODY_FONTS: BodyFont[] = ["Inter", "Geist", "JetBrains Mono"];

export function WebTweaksPanel() {
  const [open, setOpen] = useState(false);
  const theme = useThemeStore();
  const web = useWebStore();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 44,
          height: 44,
          background: "var(--bg-2)",
          color: "var(--accent)",
          border: "none",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 0 20px var(--accent-glow), inset 0 0 0 2px var(--accent)",
          fontFamily: "var(--font-pixel)",
          fontSize: 16,
          zIndex: 100,
        }}
        title="Tweaks"
        aria-label="Open tweaks panel"
      >
        ⚙
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 76,
            right: 20,
            width: 260,
            background: "var(--bg-1)",
            boxShadow: "0 0 40px rgba(0,0,0,0.6), inset 0 0 0 2px var(--border-mid)",
            zIndex: 100,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="pixel-sm" style={{ color: "var(--text-0)" }}>TWEAKS</div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", fontFamily: "var(--font-pixel)", fontSize: 10 }}
            >
              ✕
            </button>
          </div>

          {/* Theme mode */}
          <Section label="THEME">
            <div style={{ display: "flex", gap: 8 }}>
              {(["dark", "light"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => web.setTheme(t, theme.accent)}
                  style={{
                    flex: 1, padding: "8px 0",
                    fontFamily: "var(--font-pixel)", fontSize: 9,
                    background: web.theme === t ? "var(--accent)" : "var(--bg-2)",
                    color: web.theme === t ? "var(--accent-ink)" : "var(--text-2)",
                    border: "none", cursor: "pointer",
                  }}
                >
                  {t === "dark" ? "◐ DARK" : "◑ LIGHT"}
                </button>
              ))}
            </div>
          </Section>

          {/* Accent color */}
          <Section label="ACCENT COLOR">
            <div style={{ display: "flex", gap: 8 }}>
              {ACCENTS.map(hex => (
                <button
                  key={hex}
                  onClick={() => theme.setAccent(hex)}
                  title={ACCENT_NAMES[hex]}
                  style={{
                    width: 36, height: 36,
                    background: hex,
                    border: "none", cursor: "pointer",
                    boxShadow: theme.accent === hex
                      ? `0 0 0 3px var(--bg-1), 0 0 0 5px ${hex}`
                      : "none",
                  }}
                />
              ))}
            </div>
          </Section>

          {/* Layout */}
          <Section label="LAYOUT">
            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--text-2)" }}>Right rail</span>
              <Toggle value={web.showRail} onChange={web.setShowRail} />
            </label>
          </Section>

          {/* Pixel intensity */}
          <Section label={`PIXEL INTENSITY — ${theme.pixelIntensity}%`}>
            <input
              type="range" min={0} max={160} step={5}
              value={theme.pixelIntensity}
              onChange={e => theme.setPixelIntensity(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </Section>

          {/* Pixel font */}
          <Section label="PIXEL FONT">
            <select
              value={theme.pixelFont}
              onChange={e => theme.setPixelFont(e.target.value as PixelFont)}
              style={{
                width: "100%", padding: "8px 10px",
                background: "var(--bg-2)", color: "var(--text-0)",
                border: "none", boxShadow: "inset 0 0 0 2px var(--border-soft)",
                fontFamily: "var(--font-body)", fontSize: 13,
              }}
            >
              {PIXEL_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </Section>

          {/* Body font */}
          <Section label="BODY FONT">
            <select
              value={theme.bodyFont}
              onChange={e => theme.setBodyFont(e.target.value as BodyFont)}
              style={{
                width: "100%", padding: "8px 10px",
                background: "var(--bg-2)", color: "var(--text-0)",
                border: "none", boxShadow: "inset 0 0 0 2px var(--border-soft)",
                fontFamily: "var(--font-body)", fontSize: 13,
              }}
            >
              {BODY_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </Section>
        </div>
      )}
    </>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="pixel-xs" style={{ color: "var(--text-3)", letterSpacing: "0.1em" }}>{label}</div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 40, height: 22, position: "relative",
        background: value ? "var(--accent)" : "var(--bg-3)",
        border: "none", cursor: "pointer",
        transition: "background 200ms",
      }}
      aria-checked={value}
      role="switch"
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: value ? 21 : 3,
          width: 16, height: 16,
          background: "#fff",
          transition: "left 200ms",
        }}
      />
    </button>
  );
}
