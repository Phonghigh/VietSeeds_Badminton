"use client";
import { useRouter } from "next/navigation";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  ShuttleIcon, RacketIcon, TrophyIcon, FireIcon, BoltIcon,
  CalendarIcon, ClockIcon, PinIcon, CheckIcon, CrownIcon, CoinIcon, PlusIcon,
} from "@/components/icons/pixel-icons";
import { useMe, usePlayers } from "@/lib/hooks/use-players";
import { useSessions } from "@/lib/hooks/use-sessions";

// ── KPI Tile ──────────────────────────────────────────────────
interface KPITileProps {
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaColor?: string;
  icon?: React.ReactNode;
  color?: string;
}

export function WebKPITile({ label, value, delta, deltaColor, icon, color = "var(--accent)" }: KPITileProps) {
  return (
    <div className="web-kpi-tile pixel-corners">
      <div className="label">{label}</div>
      <div className="value" style={{ color }}>{value}</div>
      {delta && <div className="delta" style={{ color: deltaColor || "var(--accent)" }}>{delta}</div>}
      {icon && <div className="icon-bg">{icon}</div>}
    </div>
  );
}

// ── WebHome ───────────────────────────────────────────────────
export function WebHome() {
  const router = useRouter();
  const { data: me } = useMe();
  const { data: sessions = [] } = useSessions();
  const { data: players = [] } = usePlayers();
  const findPlayer = (id: number) => players.find(p => p.id === id);
  const upcoming = sessions.find(s => s.status === "upcoming") ?? sessions[0];

  if (!me || !upcoming) return <div className="pixel-xs" style={{ padding: 32, textAlign: "center", color: "var(--text-3)" }}>Loading…</div>;

  const going = upcoming.going.map(findPlayer).filter(Boolean) as NonNullable<ReturnType<typeof findPlayer>>[];

  return (
    <div>
      {/* Header */}
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ DASHBOARD / OVERVIEW</div>
          <h1>
            WELCOME BACK, {me.nick.toUpperCase()}&nbsp;
            <span className="animate-flicker">★</span>
          </h1>
          <div className="web-sub">
            On a <b style={{ color: "var(--orange)" }}>{me.streak} session streak 🔥</b> — keep it going.
          </div>
        </div>
        <div className="flex gap-2.5">
          <PixelButton variant="ghost" size="sm" icon={<CalendarIcon size={12} />}>
            NEW SESSION
          </PixelButton>
          <PixelButton
            variant="primary" size="sm"
            onClick={() => router.push(`/dashboard/sessions/${upcoming.id}`)}
            icon={<BoltIcon size={12} color="var(--accent-ink)" />}
          >
            JOIN NEXT
          </PixelButton>
        </div>
      </div>

      {/* 4 KPI tiles — attendance, streak, matches, rank */}
      <div className="web-kpi-row">
        <WebKPITile
          label="ATTENDANCE" color="var(--accent)"
          value={<AnimatedNumber value={92} suffix="%" />}
          delta="↑ 4% this month"
          icon={<CalendarIcon size={64} color="var(--accent)" />}
        />
        <WebKPITile
          label="STREAK" color="var(--orange)"
          value={<><AnimatedNumber value={me.streak} /> 🔥</>}
          delta="best: 18 sessions" deltaColor="var(--text-2)"
          icon={<FireIcon size={64} />}
        />
        <WebKPITile
          label="MATCHES" color="var(--cyan)"
          value={<AnimatedNumber value={42} />}
          delta="28W · 14L" deltaColor="var(--text-2)"
          icon={<RacketIcon size={64} color="var(--cyan)" />}
        />
        <WebKPITile
          label="CLUB RANK" color="var(--yellow)"
          value="#4"
          delta="of 12 smashers" deltaColor="var(--text-2)"
          icon={<TrophyIcon size={64} color="var(--yellow)" />}
        />
      </div>

      {/* Two columns: next session hero | player card */}
      <div className="web-cols-2">
        {/* Next session */}
        <div
          className="web-hero-card pixel-corners"
          style={{ boxShadow: "inset 0 0 0 2px var(--accent), 0 0 calc(30px * var(--px)) var(--accent-glow-soft)" }}
        >
          <div className="shuttle-bg"><ShuttleIcon size={180} color="var(--accent)" /></div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="web-row-sb">
              <PixelBadge variant="accent" icon={<CalendarIcon size={10} />}>▸ NEXT UP · IN 2 DAYS</PixelBadge>
              <PixelBadge variant="yellow">+200 XP</PixelBadge>
            </div>

            <div className="pixel-xl" style={{ color: "var(--text-0)", marginTop: 18, fontSize: 26, lineHeight: 1.2 }}>
              {upcoming.title}
            </div>

            <div className="flex flex-wrap gap-6 mt-3.5">
              <div className="flex items-center gap-2">
                <ClockIcon size={14} color="var(--accent)" />
                <span style={{ color: "var(--text-1)" }}>{upcoming.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <PinIcon size={14} color="var(--accent)" />
                <span style={{ color: "var(--text-1)" }}>{upcoming.court.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CoinIcon size={14} />
                <span style={{ color: "var(--text-1)" }}>
                  {(upcoming.cost / Math.max(1, upcoming.going.length) / 1000).toFixed(0)}K ₫/player
                </span>
              </div>
            </div>

            {/* Roster */}
            <div style={{ marginTop: 20 }}>
              <div className="web-row-sb" style={{ marginBottom: 8 }}>
                <span className="pixel-xs" style={{ color: "var(--text-2)" }}>
                  SQUAD — {going.length}/{upcoming.capacity}
                </span>
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>
                  {Math.round((going.length / upcoming.capacity) * 100)}% FULL
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
                {Array.from({ length: upcoming.capacity }).map((_, i) => {
                  const player = upcoming.going[i] != null ? findPlayer(upcoming.going[i]) : null;
                  return (
                    <div
                      key={i}
                      title={player?.name ?? "Open spot"}
                      style={{
                        aspectRatio: "1",
                        background: player ? "var(--bg-3)" : "var(--bg-1)",
                        display: "grid", placeItems: "center",
                        boxShadow: player ? "0 0 0 2px var(--accent)" : "inset 0 0 0 2px var(--border-mid)",
                        cursor: player ? "pointer" : "default",
                      }}
                    >
                      {player
                        ? <PixelAvatar seed={player.nick} size="xs" />
                        : <PlusIcon size={10} color="var(--text-3)" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="web-card-foot">
              <PixelButton variant="ghost" size="sm">CAN&apos;T MAKE IT</PixelButton>
              <PixelButton
                variant="primary" size="sm"
                onClick={() => router.push(`/dashboard/sessions/${upcoming.id}`)}
                icon={<CheckIcon size={10} color="var(--accent-ink)" />}
              >
                COUNT ME IN
              </PixelButton>
              <PixelButton
                variant="ghost" size="sm"
                onClick={() => router.push(`/dashboard/sessions/${upcoming.id}`)}
                style={{ marginLeft: "auto" }}
              >
                VIEW DETAILS →
              </PixelButton>
            </div>
          </div>
        </div>

        {/* Player card */}
        <PixelCard variant="elev" accent style={{ overflow: "hidden" }}>
          <div style={{ padding: 24 }}>
            <div className="flex gap-4 items-start">
              <button onClick={() => router.push("/dashboard/profile")} style={{ background: "none", border: "none" }}>
                <PixelAvatar seed={me.nick} size="lg" ring />
              </button>
              <div style={{ flex: 1 }}>
                <div className="pixel-xs" style={{ color: "var(--accent)" }}>SMASH MASTER</div>
                <div className="pixel-md mt-1.5" style={{ color: "var(--text-0)" }}>{me.name.toUpperCase()}</div>
                <div className="flex gap-1.5 mt-2">
                  <PixelBadge variant="yellow"><CrownIcon size={10} /> LV.{me.level}</PixelBadge>
                  <PixelBadge variant="accent">{me.wins}W</PixelBadge>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="web-row-sb" style={{ marginBottom: 6 }}>
                <span className="pixel-xs" style={{ color: "var(--text-3)" }}>XP TO LV.{me.level + 1}</span>
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>{me.xp} / {me.xpMax}</span>
              </div>
              <XPBar value={me.xp} max={me.xpMax} />
            </div>

            {/* Three personal stats */}
            <div className="flex gap-3 mt-5">
              <div className="flex-1 text-center" style={{ padding: "12px 0", background: "var(--bg-2)" }}>
                <div className="pixel-lg" style={{ color: "var(--orange)" }}>{me.streak}</div>
                <div className="pixel-xs mt-1" style={{ color: "var(--text-3)" }}>STREAK</div>
              </div>
              <div className="flex-1 text-center" style={{ padding: "12px 0", background: "var(--bg-2)" }}>
                <div className="pixel-lg" style={{ color: "var(--yellow)" }}>#4</div>
                <div className="pixel-xs mt-1" style={{ color: "var(--text-3)" }}>RANK</div>
              </div>
              <div className="flex-1 text-center" style={{ padding: "12px 0", background: "var(--bg-2)" }}>
                <div className="pixel-lg" style={{ color: "var(--cyan)" }}>{me.wins}</div>
                <div className="pixel-xs mt-1" style={{ color: "var(--text-3)" }}>WINS</div>
              </div>
            </div>

            <PixelButton
              variant="ghost" size="sm"
              onClick={() => router.push("/dashboard/profile")}
              style={{ width: "100%", marginTop: 16 }}
            >
              VIEW FULL PROFILE →
            </PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}
