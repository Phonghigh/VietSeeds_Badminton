"use client";
import { BottomNav } from "@/components/layout/bottom-nav";
import { StatusBar } from "@/components/layout/status-bar";
import { ScanlineOverlay } from "@/components/layout/scanline-overlay";
import { ToastOverlay } from "@/components/ui/toast-overlay";
import { TweaksPanel } from "@/components/layout/tweaks-panel";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-0 bg-dot-grid bg-dot-16 bg-stage-glow">
      <div
        className="relative overflow-hidden bg-bg-0"
        style={{
          width: 390,
          height: 844,
          maxHeight: "100dvh",
          borderRadius: 44,
          boxShadow: "0 0 60px var(--accent-glow), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <ScanlineOverlay />
        <StatusBar />
        {/* Scrollable content */}
        <div
          className="screen-scroll"
          style={{ height: "calc(844px - 44px)", paddingBottom: 84 }}
        >
          {children}
        </div>
        <BottomNav />
        <ToastOverlay />
      </div>
      {/* Outside phone shell so fixed positioning isn't clipped */}
      <TweaksPanel />
    </div>
  );
}
