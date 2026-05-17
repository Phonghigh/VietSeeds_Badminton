"use client";
import { useThemeStore } from "@/stores/theme-store";

export function ScanlineOverlay() {
  const { scanlines, crtVignette, pixelIntensity } = useThemeStore();
  return (
    <>
      {scanlines && pixelIntensity > 5 && <div className="scanlines" />}
      {crtVignette && (
        <div
          className="absolute inset-0 pointer-events-none z-[999]"
          style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)" }}
        />
      )}
    </>
  );
}
