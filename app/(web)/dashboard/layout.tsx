"use client";
import "@/app/web.css";
import { WebTopBar } from "@/components/web/top-bar";
import { WebSidebar } from "@/components/web/sidebar";
import { WebRightRail } from "@/components/web/right-rail";
import { useWebStore } from "@/stores/web-store";
import { WebTweaksPanel } from "@/components/web/tweaks-panel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { showRail } = useWebStore();

  return (
    <div className="web-bg" style={{ minHeight: "100vh" }}>
      <div className={`web-app ${!showRail ? "no-rail" : ""}`}>
        <WebTopBar />
        <WebSidebar />
        <main className="web-main">{children}</main>
        {showRail && <WebRightRail />}
      </div>
      <WebTweaksPanel />
    </div>
  );
}
