"use client";
import { useRouter } from "next/navigation";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar, AvatarStack } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { SESSIONS, PLAYERS, ACTIVITY, findPlayer } from "@/lib/data";
import type { Session } from "@/lib/data";

export function WebRightRail() {
  const router = useRouter();
  const live = SESSIONS.find(s => s.status === "live");
  const upcoming = SESSIONS.find(s => s.status === "upcoming");

  const goToSession = (s: Session) => router.push(`/dashboard/sessions/${s.id}`);

  return (
    <aside className="web-rail">
      {/* Live session */}
      {live && (
        <PixelCard variant="elev" accent style={{ overflow: "hidden" }}>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="live-dot" />
              <span className="pixel-xs" style={{ color: "var(--danger)" }}>● LIVE NOW</span>
            </div>
            <div className="pixel-sm" style={{ color: "var(--text-0)", marginTop: 8 }}>{live.title}</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>
              {live.court.short} · {live.matchesPlayed ?? 0}/12 matches
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 10, gap: 8 }}>
              <AvatarStack seeds={live.going.slice(0, 4).map(id => findPlayer(id).nick)} size="xs" />
              <PixelButton variant="danger" size="sm" onClick={() => goToSession(live)} style={{ marginLeft: "auto" }}>
                WATCH
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      )}

      {/* Activity feed */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span className="pixel-xs" style={{ color: "var(--accent)" }}>● ACTIVITY</span>
          <span className="pixel-xs" style={{ color: "var(--text-3)" }}>LIVE</span>
        </div>
        <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
          {ACTIVITY.map((a, i) => {
            const who = findPlayer(a.who);
            const target = a.target ? findPlayer(a.target) : null;
            return (
              <div
                key={a.id}
                style={{
                  padding: "10px 12px",
                  borderTop: i === 0 ? "none" : "1px dashed var(--border-soft)",
                  display: "flex", gap: 10, alignItems: "flex-start",
                }}
              >
                <PixelAvatar seed={who.nick} size="xs" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, lineHeight: 1.4, color: "var(--text-1)" }}>
                    <b style={{ color: "var(--text-0)" }}>{who.nick}</b> {a.text}
                    {target && <b style={{ color: "var(--accent)" }}> {target.nick}</b>}
                    {a.level && <b style={{ color: "var(--yellow)" }}> Lv.{a.level}</b>}
                  </div>
                  <div className="pixel-xs" style={{ color: "var(--text-3)", marginTop: 4, fontSize: 8 }}>
                    {a.time.toUpperCase()}{a.xp ? ` · +${a.xp}XP` : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </PixelCard>
      </div>

      {/* Mini leaderboard */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span className="pixel-xs" style={{ color: "var(--yellow)" }}>👑 LEADERBOARD</span>
          <span className="pixel-xs" style={{ color: "var(--text-3)" }}>WEEK</span>
        </div>
        <PixelCard variant="default" style={{ padding: 12 }}>
          {[...PLAYERS].sort((a, b) => b.wins - a.wins).slice(0, 5).map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "6px 0",
                borderBottom: i < 4 ? "1px dashed var(--border-soft)" : "none",
              }}
            >
              <span
                className="pixel-sm"
                style={{
                  width: 20,
                  color: i === 0 ? "var(--yellow)" : i === 1 ? "var(--text-2)" : i === 2 ? "var(--orange)" : "var(--text-3)",
                }}
              >
                {i + 1}
              </span>
              <PixelAvatar seed={p.nick} size="xs" />
              <span style={{ flex: 1, fontSize: 12, color: "var(--text-1)" }}>{p.nick}</span>
              <span className="pixel-xs" style={{ color: "var(--accent)" }}>{p.wins}W</span>
            </div>
          ))}
        </PixelCard>
      </div>

      {/* Upcoming bookings */}
      {upcoming && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span className="pixel-xs" style={{ color: "var(--cyan)" }}>📅 UPCOMING</span>
            <span className="pixel-xs" style={{ color: "var(--text-3)" }}>
              {SESSIONS.filter(s => s.status === "upcoming").length}
            </span>
          </div>
          <button
            onClick={() => goToSession(upcoming)}
            style={{ background: "none", textAlign: "left", padding: 0, width: "100%", border: "none" }}
          >
            <PixelCard variant="default" style={{ padding: 12, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>{upcoming.date.toUpperCase()}</span>
                <PixelBadge variant="accent">{upcoming.going.length}/{upcoming.capacity}</PixelBadge>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-0)", marginTop: 6 }}>{upcoming.title}</div>
              <div className="pixel-xs" style={{ color: "var(--text-3)", marginTop: 4 }}>{upcoming.time}</div>
              <div style={{ marginTop: 8 }}>
                <XPBar value={upcoming.going.length} max={upcoming.capacity} height={6} />
              </div>
            </PixelCard>
          </button>
        </div>
      )}
    </aside>
  );
}
