"use client";
import { useState } from "react";
import { Settings } from "lucide-react";
import { useThemeStore, type Accent, type HomeLayout } from "@/stores/theme-store";
import { cn } from "@/lib/utils";

const ACCENTS: { hex: Accent; label: string }[] = [
  { hex: "#22C55E", label: "Green"  },
  { hex: "#FACC15", label: "Yellow" },
  { hex: "#22D3EE", label: "Cyan"   },
  { hex: "#F472B6", label: "Pink"   },
];

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const t = useThemeStore();

  return (
    <div className="fixed bottom-4 right-4 z-[2000]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 rounded-full bg-bg-2 border border-mid flex items-center justify-center text-ink-2 hover:text-ink-0 hover:bg-bg-3 transition-colors"
        title="Open tweaks"
      >
        <Settings size={18} />
      </button>

      {open && (
        <div className="absolute bottom-12 right-0 w-72 bg-bg-2/90 backdrop-blur-md border border-mid rounded-xl shadow-pixel-card p-4 flex flex-col gap-4 text-ink-1 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-[var(--accent)]">TWEAKS</span>
            <button onClick={() => setOpen(false)} className="text-ink-3 hover:text-ink-0 text-lg leading-none">✕</button>
          </div>

          {/* Home layout */}
          <div>
            <div className="font-pixel text-[9px] text-ink-3 mb-2 uppercase tracking-widest">Home Variant</div>
            <div className="flex gap-1.5">
              {(["A","B","C"] as HomeLayout[]).map((l) => (
                <button key={l}
                  onClick={() => t.setHomeLayout(l)}
                  className={cn("flex-1 py-1.5 font-pixel text-[9px] rounded border", t.homeLayout === l ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-glow-soft)]" : "border-mid text-ink-3")}
                >
                  {l === "A" ? "Hero" : l === "B" ? "Grid" : "Arcade"}
                </button>
              ))}
            </div>
          </div>

          {/* Accent */}
          <div>
            <div className="font-pixel text-[9px] text-ink-3 mb-2 uppercase tracking-widest">Accent Color</div>
            <div className="flex gap-2">
              {ACCENTS.map(({ hex, label }) => (
                <button key={hex}
                  onClick={() => t.setAccent(hex)}
                  title={label}
                  className={cn("w-8 h-8 rounded border-2 transition-transform hover:scale-110", t.accent === hex ? "border-white scale-110" : "border-transparent")}
                  style={{ background: hex }}
                />
              ))}
            </div>
          </div>

          {/* Pixel intensity */}
          <div>
            <div className="font-pixel text-[9px] text-ink-3 mb-2 uppercase tracking-widest">Pixel Intensity — {t.pixelIntensity}%</div>
            <input type="range" min={0} max={160} step={5} value={t.pixelIntensity}
              onChange={(e) => t.setPixelIntensity(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Scanlines", on: t.scanlines, set: t.setScanlines },
              { label: "CRT Vignette", on: t.crtVignette, set: t.setCrtVignette },
            ].map(({ label, on, set }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-ink-2">{label}</span>
                <button
                  onClick={() => set(!on)}
                  className={cn("w-8 h-4 rounded-full relative transition-colors", on ? "bg-[var(--accent)]" : "bg-bg-3")}
                >
                  <span className={cn("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform", on ? "translate-x-4" : "translate-x-0.5")} />
                </button>
              </div>
            ))}
          </div>

          {/* Pixel font */}
          <div>
            <div className="font-pixel text-[9px] text-ink-3 mb-2 uppercase tracking-widest">Pixel Font</div>
            <select
              value={t.pixelFont}
              onChange={(e) => t.setPixelFont(e.target.value as typeof t.pixelFont)}
              className="w-full bg-bg-1 border border-mid rounded px-2 py-1.5 text-ink-1 text-[11px]"
            >
              <option>Press Start 2P</option>
              <option>Pixelify Sans</option>
              <option>VT323</option>
            </select>
          </div>

          {/* Body font */}
          <div>
            <div className="font-pixel text-[9px] text-ink-3 mb-2 uppercase tracking-widest">Body Font</div>
            <select
              value={t.bodyFont}
              onChange={(e) => t.setBodyFont(e.target.value as typeof t.bodyFont)}
              className="w-full bg-bg-1 border border-mid rounded px-2 py-1.5 text-ink-1 text-[11px]"
            >
              <option>Inter</option>
              <option>Geist</option>
              <option>JetBrains Mono</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
