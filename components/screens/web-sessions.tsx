"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { AvatarStack } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { Pills } from "@/components/ui/pills";
import { ShuttleIcon, PlusIcon, ArrowIcon } from "@/components/icons/pixel-icons";
import type { Session, Player } from "@/lib/data";
import { useSessions } from "@/lib/hooks/use-sessions";
import { usePlayers } from "@/lib/hooks/use-players";

export function WebSessions() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "upcoming" | "live" | "past">("all");
  const { data: sessions = [] } = useSessions();
  const { data: players = [] } = usePlayers();

  const filtered = filter === "all"
    ? sessions
    : sessions.filter(s => s.status === filter);

  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ SESSIONS</div>
          <h1>SESSION LIBRARY</h1>
          <div className="web-sub">3 upcoming · 1 live · 7 completed this month</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Pills
            tabs={[
              { id: "all",      label: "ALL" },
              { id: "upcoming", label: "UPCOMING" },
              { id: "live",     label: "LIVE" },
              { id: "past",     label: "PAST" },
            ]}
            current={filter}
            onChange={v => setFilter(v as typeof filter)}
          />
          <PixelButton variant="primary" size="sm" icon={<PlusIcon size={10} color="var(--accent-ink)" />}>
            NEW SESSION
          </PixelButton>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
        {filtered.map(s => (
          <SessionCard key={s.id} session={s} players={players} onClick={() => router.push(`/dashboard/sessions/${s.id}`)} />
        ))}
      </div>
    </div>
  );
}

function SessionCard({ session: s, players, onClick }: { session: Session; players: Player[]; onClick: () => void }) {
  const findPlayer = (id: number) => players.find(p => p.id === id);
  return (
    <PixelCard
      variant="elev"
      accent={s.status === "upcoming"}
      interactive
      onClick={onClick}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {/* Banner */}
      <div style={{
        height: 100,
        background: "radial-gradient(circle at center, var(--accent-glow-soft) 0%, transparent 60%), linear-gradient(135deg, var(--bg-3) 0%, var(--bg-1) 100%)",
        position: "relative",
        borderBottom: "2px solid var(--border-soft)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 10, left: 14 }}>
          <PixelBadge variant={s.status === "live" ? "danger" : s.status === "upcoming" ? "accent" : "default"}>
            {s.status === "live" && <span className="live-dot" style={{ marginRight: 4 }} />}
            {s.status.toUpperCase()}
          </PixelBadge>
        </div>
        <div style={{ position: "absolute", top: 10, right: 14 }}>
          <span className="pixel-xs" style={{ color: "var(--text-3)" }}>{s.date.toUpperCase()}</span>
        </div>
        <div style={{
          position: "absolute", right: 16, bottom: -16,
          animation: "shuttle-fly 4s ease-in-out infinite alternate",
          opacity: 0.6,
        }}>
          <ShuttleIcon size={64} color="var(--accent)" />
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div className="pixel-md" style={{ color: "var(--text-0)" }}>{s.title}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>⏰ {s.time}</span>
          <span style={{ fontSize: 11, color: "var(--text-3)" }}>📍 {s.court.short}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
          <AvatarStack seeds={s.going.map(id => findPlayer(id)?.nick ?? "?")} max={5} size="xs" />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <PixelBadge variant={s.going.length >= (s.capacity ?? 12) ? "danger" : "accent"}>
              {s.going.length}/{s.capacity ?? 12}
            </PixelBadge>
            <ArrowIcon size={14} color="var(--text-2)" />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <XPBar value={s.going.length} max={s.capacity ?? 12} height={6} />
        </div>
      </div>
    </PixelCard>
  );
}
