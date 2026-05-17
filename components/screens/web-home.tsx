"use client";
import { useRouter } from "next/navigation";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar, AvatarStack } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  ShuttleIcon, RacketIcon, TrophyIcon, FireIcon, StarIcon, CoinIcon, BoltIcon,
  CalendarIcon, ClockIcon, PinIcon, CheckIcon, CrownIcon, MedalIcon,
  HeartIcon, PlusIcon,
} from "@/components/icons/pixel-icons";
import { ME, PLAYERS, SESSIONS, ACHIEVEMENTS, QUESTS, findPlayer } from "@/lib/data";

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

// ── Icon map for achievements ─────────────────────────────────
const ACHIEVEMENT_ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  racket: RacketIcon as React.FC<{ size?: number; color?: string }>,
  fire:   FireIcon   as React.FC<{ size?: number; color?: string }>,
  star:   StarIcon   as React.FC<{ size?: number; color?: string }>,
  crown:  CrownIcon  as React.FC<{ size?: number; color?: string }>,
  medal:  MedalIcon  as React.FC<{ size?: number; color?: string }>,
  heart:  HeartIcon  as React.FC<{ size?: number; color?: string }>,
};

// ── WebHome ───────────────────────────────────────────────────
export function WebHome() {
  const router = useRouter();
  const upcoming = SESSIONS.find(s => s.status === "upcoming") ?? SESSIONS[0];
  const going = upcoming.going.map(findPlayer);

  return (
    <div>
      {/* Header */}
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ DASHBOARD / OVERVIEW</div>
          <h1>
            WELCOME BACK, {ME.nick.toUpperCase()}&nbsp;
            <span className="animate-flicker">★</span>
          </h1>
          <div className="web-sub">
            You&apos;re on a{" "}
            <b style={{ color: "var(--orange)" }}>{ME.streak} session streak 🔥</b>
            {" "}— keep it going at tonight&apos;s smash.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
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

      {/* KPI tiles */}
      <div className="web-kpi-row">
        <WebKPITile label="ATTENDANCE" value={<AnimatedNumber value={92} suffix="%" />} delta="↑ 4% vs last month" color="var(--accent)" icon={<CalendarIcon size={64} color="var(--accent)" />} />
        <WebKPITile label="STREAK" value={<><AnimatedNumber value={ME.streak} /> 🔥</>} delta="best: 18 sessions" deltaColor="var(--text-2)" color="var(--orange)" icon={<FireIcon size={64} />} />
        <WebKPITile label="MATCHES (MO.)" value={<AnimatedNumber value={42} />} delta="28W · 14L" deltaColor="var(--text-2)" color="var(--cyan)" icon={<RacketIcon size={64} color="var(--cyan)" />} />
        <WebKPITile label="XP TODAY" value={<>+<AnimatedNumber value={120} /></>} delta="to LV.19 in 260" deltaColor="var(--accent-2)" color="var(--accent-2)" icon={<BoltIcon size={64} color="var(--accent-2)" />} />
        <WebKPITile label="CLUB RANK" value="#4" delta="of 12 smashers" deltaColor="var(--text-2)" color="var(--yellow)" icon={<TrophyIcon size={64} color="var(--yellow)" />} />
        <WebKPITile label="SPENT (MO.)" value="2.1M" delta="VND · 175K/session" deltaColor="var(--text-2)" color="var(--pink)" icon={<CoinIcon size={64} />} />
      </div>

      {/* Hero + player card */}
      <div className="web-cols-2" style={{ marginBottom: 16 }}>
        {/* Next session hero */}
        <div
          className="web-hero-card pixel-corners"
          style={{ boxShadow: "inset 0 0 0 2px var(--accent), 0 0 calc(30px * var(--px)) var(--accent-glow-soft)" }}
        >
          <div className="shuttle-bg"><ShuttleIcon size={180} color="var(--accent)" /></div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <PixelBadge variant="accent" icon={<CalendarIcon size={10} />}>▸ NEXT UP · IN 2 DAYS</PixelBadge>
              <PixelBadge variant="yellow">+200 XP</PixelBadge>
            </div>
            <div className="pixel-xl" style={{ color: "var(--text-0)", marginTop: 18, fontSize: 26, lineHeight: 1.2 }}>
              {upcoming.title}
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <ClockIcon size={14} color="var(--accent)" />
                <span style={{ color: "var(--text-1)" }}>{upcoming.time}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <PinIcon size={14} color="var(--accent)" />
                <span style={{ color: "var(--text-1)" }}>{upcoming.court.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <CoinIcon size={14} />
                <span style={{ color: "var(--text-1)" }}>
                  {(upcoming.cost / Math.max(1, upcoming.going.length) / 1000).toFixed(0)}K ₫/player
                </span>
              </div>
            </div>

            {/* Roster grid */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="pixel-xs" style={{ color: "var(--text-2)" }}>SQUAD — {going.length}/{upcoming.capacity}</span>
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>
                  {Math.round((going.length / upcoming.capacity) * 100)}% FULL
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
                {Array.from({ length: upcoming.capacity }).map((_, i) => {
                  const id = upcoming.going[i];
                  const player = id ? findPlayer(id) : null;
                  return (
                    <div
                      key={i}
                      title={player?.name ?? "Open spot"}
                      style={{
                        aspectRatio: "1",
                        background: player ? "var(--bg-3)" : "var(--bg-1)",
                        display: "grid", placeItems: "center",
                        boxShadow: player
                          ? "0 0 0 2px var(--accent)"
                          : "inset 0 0 0 2px var(--border-mid)",
                        cursor: player ? "pointer" : "default",
                      }}
                    >
                      {player
                        ? <PixelAvatar seed={player.nick} size="xs" />
                        : <PlusIcon size={10} color="var(--text-3)" />
                      }
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

        {/* Player card + quests */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <PixelCard variant="elev" accent style={{ overflow: "hidden" }}>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <button onClick={() => router.push("/dashboard/profile")} style={{ background: "none", border: "none" }}>
                  <PixelAvatar seed={ME.nick} size="lg" ring />
                </button>
                <div style={{ flex: 1 }}>
                  <div className="pixel-xs" style={{ color: "var(--accent)" }}>SMASH MASTER</div>
                  <div className="pixel-md" style={{ color: "var(--text-0)", marginTop: 6 }}>{ME.name.toUpperCase()}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                    <PixelBadge variant="yellow"><CrownIcon size={10} /> LV.{ME.level}</PixelBadge>
                    <PixelBadge variant="accent">{ME.wins}W</PixelBadge>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="pixel-xs" style={{ color: "var(--text-3)" }}>XP TO LV.{ME.level + 1}</span>
                  <span className="pixel-xs" style={{ color: "var(--accent)" }}>{ME.xp} / {ME.xpMax}</span>
                </div>
                <XPBar value={ME.xp} max={ME.xpMax} />
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="default" style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <SectionTitle>Daily Quests</SectionTitle>
              <PixelBadge variant="yellow">2/3</PixelBadge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {QUESTS.map(q => (
                <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 18, height: 18, flexShrink: 0,
                    background: q.done ? "var(--accent)" : "var(--bg-3)",
                    display: "grid", placeItems: "center",
                  }}>
                    {q.done && <CheckIcon size={12} color="var(--accent-ink)" />}
                  </div>
                  <div style={{
                    flex: 1, fontSize: 12,
                    color: q.done ? "var(--text-3)" : "var(--text-1)",
                    textDecoration: q.done ? "line-through" : "none",
                  }}>
                    {q.label}
                  </div>
                  <PixelBadge variant="accent" icon={<BoltIcon size={9} />}>+{q.xp}</PixelBadge>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      </div>

      {/* Heatmap + recent matches */}
      <div className="web-cols-2" style={{ marginBottom: 16 }}>
        <PixelCard variant="default" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionTitle>Activity Heatmap</SectionTitle>
            <span className="pixel-xs" style={{ color: "var(--text-3)" }}>LAST 12 WEEKS</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: 12 }).map((_, col) => (
              <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                {Array.from({ length: 7 }).map((_, row) => {
                  const seed = (col * 7 + row + 11) % 100;
                  const opacity = seed > 75 ? 1 : seed > 55 ? 0.7 : seed > 30 ? 0.4 : seed > 12 ? 0.15 : 0.05;
                  return (
                    <div key={row} style={{
                      aspectRatio: "1",
                      background: "var(--accent)",
                      opacity,
                      boxShadow: opacity > 0.6 ? "0 0 6px var(--accent-glow)" : "none",
                    }} />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <span className="pixel-xs" style={{ color: "var(--text-3)" }}>14 SESSIONS · 56 MATCHES PLAYED</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span className="pixel-xs" style={{ color: "var(--text-3)", marginRight: 4 }}>LESS</span>
              {[0.1, 0.3, 0.6, 1].map((o, i) => (
                <div key={i} style={{ width: 12, height: 12, background: "var(--accent)", opacity: o }} />
              ))}
              <span className="pixel-xs" style={{ color: "var(--text-3)", marginLeft: 4 }}>MORE</span>
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 18px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionTitle>Recent Matches</SectionTitle>
              <PixelButton variant="ghost" size="sm">VIEW ALL →</PixelButton>
            </div>
          </div>
          <table className="web-tbl" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>PAIR</th>
                <th>VS</th>
                <th>SCORE</th>
                <th style={{ textAlign: "right", paddingRight: 18 }}>XP</th>
              </tr>
            </thead>
            <tbody>
              {[
                { a: PLAYERS[0], b: PLAYERS[2],  score: "21-18", won: true,  xp: 25 },
                { a: PLAYERS[6], b: PLAYERS[8],  score: "21-23", won: false, xp: 10 },
                { a: PLAYERS[0], b: PLAYERS[5],  score: "21-15", won: true,  xp: 25 },
                { a: PLAYERS[3], b: PLAYERS[10], score: "19-21", won: false, xp: 8  },
                { a: PLAYERS[0], b: PLAYERS[1],  score: "21-12", won: true,  xp: 30 },
              ].map((m, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <PixelAvatar seed={m.a.nick} size="xs" />
                      <span style={{ color: "var(--text-0)", fontSize: 12 }}>{m.a.nick}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <PixelAvatar seed={m.b.nick} size="xs" />
                      <span style={{ color: "var(--text-2)", fontSize: 12 }}>{m.b.nick}</span>
                    </div>
                  </td>
                  <td>
                    <span className="pixel-sm" style={{ color: m.won ? "var(--accent)" : "var(--danger)" }}>{m.score}</span>
                    <span className="pixel-xs" style={{ color: "var(--text-3)", marginLeft: 6, fontSize: 8 }}>{m.won ? "WIN" : "LOSS"}</span>
                  </td>
                  <td style={{ textAlign: "right", paddingRight: 18 }}>
                    <span className="pixel-xs" style={{ color: m.won ? "var(--accent)" : "var(--text-3)" }}>+{m.xp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PixelCard>
      </div>

      {/* Achievements */}
      <PixelCard variant="default" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <SectionTitle>Power-Ups</SectionTitle>
          <PixelBadge variant="accent">
            {ACHIEVEMENTS.filter(a => a.earned).length} / {ACHIEVEMENTS.length} UNLOCKED
          </PixelBadge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {ACHIEVEMENTS.map(a => {
            const Icon = ACHIEVEMENT_ICONS[a.icon];
            return (
              <div
                key={a.id}
                className="pixel-corners"
                style={{
                  background: "var(--bg-1)",
                  padding: 14,
                  textAlign: "center",
                  position: "relative",
                  opacity: a.earned ? 1 : 0.4,
                  boxShadow: a.earned
                    ? `inset 0 0 0 2px ${a.color}, 0 0 14px ${a.color}33`
                    : "inset 0 0 0 2px var(--bg-3)",
                }}
              >
                <div style={{ display: "grid", placeItems: "center", margin: "8px auto 12px" }}>
                  {Icon && <Icon size={40} color={a.color} />}
                </div>
                <div className="pixel-xs" style={{ color: a.earned ? "var(--text-0)" : "var(--text-3)" }}>
                  {a.name.toUpperCase()}
                </div>
                <div className="pixel-xs" style={{ color: "var(--text-3)", fontSize: 8, marginTop: 6 }}>{a.desc}</div>
                <div className="pixel-xs" style={{ color: a.color, marginTop: 8, fontSize: 7 }}>{a.rarity.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </PixelCard>
    </div>
  );
}
