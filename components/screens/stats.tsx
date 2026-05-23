"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { pageEnter, pageTransition } from "@/lib/motion";
import { usePlayers } from "@/lib/hooks/use-players";
import { useSessions } from "@/lib/hooks/use-sessions";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { StatTile } from "@/components/ui/stat-tile";
import { Pills } from "@/components/ui/pills";
import {
  RacketIcon, ShuttleIcon, TrophyIcon, CrownIcon, ArrowIcon, CoinIcon,
} from "@/components/icons/pixel-icons";

type Range = "week" | "month" | "year";

const WEEKS = [
  { label: "W1", value: 65 },
  { label: "W2", value: 78 },
  { label: "W3", value: 92 },
  { label: "W4", value: 88 },
  { label: "W5", value: 95 },
  { label: "W6", value: 71 },
];

const SPENDING = [
  { label: "Courts",       value: 1200000, color: "var(--accent)" },
  { label: "Shuttlecocks", value: 480000,  color: "var(--cyan)" },
  { label: "Snacks",       value: 240000,  color: "var(--yellow)" },
  { label: "Equipment",    value: 180000,  color: "var(--pink)" },
];

export function Stats() {
  const [range, setRange] = useState<Range>("month");
  const totalSpent = SPENDING.reduce((s, x) => s + x.value, 0);
  const { data: players = [] } = usePlayers();

  return (
    <motion.div
      className="px-4 pb-4 flex flex-col gap-3.5"
      style={{ paddingTop: 8 }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="pixel-md" style={{ color: "var(--text-0)" }}>CLUB STATS</div>
          <div className="text-[11px] text-ink-3 mt-0.5">VietSeeds Smashers · Season 3</div>
        </div>
        <Pills
          tabs={[
            { id: "week",  label: "W" },
            { id: "month", label: "M" },
            { id: "year",  label: "Y" },
          ]}
          current={range}
          onChange={v => setRange(v as Range)}
        />
      </div>

      {/* Hero ring */}
      <PixelCard variant="elev" accent style={{ padding: 16 }}>
        <div className="flex items-center gap-3.5">
          <div
            className="ring-chart flex-shrink-0"
            style={{ "--val": "84", "--size": "96px", "--thick": "10px" } as React.CSSProperties}
          >
            <div className="text-center">
              <div className="pixel-md" style={{ color: "var(--accent)" }}>84%</div>
              <div className="pixel-xs text-ink-3" style={{ fontSize: 7 }}>TURNOUT</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="pixel-xs text-ink-3">CLUB HEALTH</div>
            <div className="pixel-md mt-1.5" style={{ color: "var(--text-0)" }}>EXCELLENT</div>
            <div className="flex items-center gap-1.5 mt-2">
              <PixelBadge variant="accent">↑ 12%</PixelBadge>
              <span className="text-[11px] text-ink-3">vs last month</span>
            </div>
            <div className="pix-divider" />
            <div className="flex justify-between items-center">
              <span className="pixel-xs text-ink-3">SESSIONS</span>
              <span className="pixel-sm" style={{ color: "var(--text-0)" }}>14 / month</span>
            </div>
          </div>
        </div>
      </PixelCard>

      {/* Quick tiles */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile icon={<RacketIcon size={14} color="var(--cyan)" />}           label="MATCHES"  value={142}    color="var(--cyan)"           sub="this month" />
        <StatTile icon={<ShuttleIcon size={14} color="var(--accent-2)" />}    label="SHUTTLES" value={56}     color="var(--accent-2)"          sub="used up" />
        <StatTile icon={<CoinIcon size={14} />}                                label="SPENT"    value="2.1M"   color="var(--yellow)"         sub="VND" />
        <StatTile icon={<TrophyIcon size={14} color="var(--orange)" />}        label="MVPS"     value={4}      color="var(--orange)"         sub="players" />
      </div>

      {/* Bar chart */}
      <PixelCard variant="default" style={{ padding: 16 }}>
        <SectionTitle>Weekly Attendance</SectionTitle>
        {/* Bars: each column is 140px tall; 20px value label + bar + 16px week label */}
        <div className="flex items-end gap-2 mt-2.5 px-1" style={{ height: 140 }}>
          {WEEKS.map((w, i) => {
            const barH = Math.round((w.value / 100) * 96); // 96px max bar height
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>{w.value}</span>
                <div
                  className="w-full transition-all duration-500"
                  style={{
                    height: barH,
                    background: "repeating-linear-gradient(0deg, var(--accent) 0 6px, var(--accent-2,#84CC16) 6px 12px)",
                    boxShadow: "0 0 10px var(--accent-glow), inset 0 -3px 0 rgba(0,0,0,0.25)",
                  }}
                />
                <span className="pixel-xs text-ink-3">{w.label}</span>
              </div>
            );
          })}
        </div>
      </PixelCard>

      {/* Spending */}
      <PixelCard variant="default" style={{ padding: 16 }}>
        <div className="flex justify-between items-center">
          <SectionTitle>Spending</SectionTitle>
          <span className="pixel-sm" style={{ color: "var(--yellow)" }}>{totalSpent.toLocaleString()} ₫</span>
        </div>
        <div className="flex h-4 mt-3" style={{ boxShadow: "inset 0 0 0 2px var(--bg-3)" }}>
          {SPENDING.map(s => (
            <div
              key={s.label}
              style={{
                width: `${(s.value / totalSpent) * 100}%`,
                background: s.color,
                boxShadow: `0 0 8px ${s.color}88`,
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          {SPENDING.map(s => (
            <div key={s.label} className="flex items-center gap-2.5">
              <div className="flex-shrink-0" style={{ width: 12, height: 12, background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
              <span className="flex-1 text-[12px] text-ink-1">{s.label}</span>
              <span className="pixel-xs text-ink-2">{((s.value / totalSpent) * 100).toFixed(0)}%</span>
              <span className="pixel-sm text-ink-0" style={{ minWidth: 64, textAlign: "right" }}>{s.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </PixelCard>

      {/* Leaderboard */}
      <PixelCard variant="default" style={{ padding: 14 }}>
        <SectionTitle more="VIEW ALL">Top Players</SectionTitle>
        {[...players].sort((a, b) => b.wins - a.wins).slice(0, 5).map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-2.5"
            style={{ padding: "8px 0", borderBottom: i < 4 ? "1px dashed var(--border-soft)" : "none" }}
          >
            <div
              className="font-pixel text-center flex-shrink-0"
              style={{
                width: 28, fontSize: 12,
                color: i === 0 ? "var(--yellow)" : i === 1 ? "var(--text-2)" : i === 2 ? "var(--orange)" : "var(--text-3)",
                textShadow: i === 0 ? "0 0 10px var(--yellow-glow)" : "none",
              }}
            >
              {i === 0 ? <CrownIcon size={16} color="var(--yellow)" /> : `#${i + 1}`}
            </div>
            <PixelAvatar seed={p.nick} size="sm" />
            <div className="flex-1">
              <div className="text-[12px] text-ink-1">{p.name}</div>
              <div className="pixel-xs text-ink-3">LV.{p.level} · {p.attendance}%</div>
            </div>
            <div className="pixel-sm" style={{ color: "var(--accent)" }}>{p.wins}W</div>
          </div>
        ))}
      </PixelCard>
    </motion.div>
  );
}

// ── Sessions list ──────────────────────────────────────────────────────────────

export function SessionsList() {
  const router = useRouter();
  const { data: sessions = [] } = useSessions();
  const { data: players = [] } = usePlayers();
  const findPlayer = (id: number) => players.find(p => p.id === id);

  return (
    <motion.div
      className="px-4 pb-4"
      style={{ paddingTop: 8 }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <div className="pixel-md" style={{ color: "var(--text-0)" }}>SESSIONS</div>
          <div className="text-[11px] text-ink-3">3 upcoming · 2 live</div>
        </div>
        <PixelButton variant="primary" size="sm" icon={<span className="pixel-sm">+</span>}>NEW</PixelButton>
      </div>

      <div className="flex flex-col gap-3">
        {sessions.map(s => (
          <PixelCard
            key={s.id}
            variant="elev"
            accent={s.status === "upcoming"}
            interactive
            style={{ overflow: "hidden" }}
            onClick={() => router.push(`/sessions/${s.id}`)}
          >
            <div style={{ padding: 14 }}>
              <div className="flex justify-between items-center">
                <PixelBadge variant={s.status === "live" ? "danger" : s.status === "upcoming" ? "accent" : "default"}>
                  {s.status === "live" && <span className="live-dot mr-1" />}
                  {s.status.toUpperCase()}
                </PixelBadge>
                <span className="pixel-xs text-ink-3">{s.date.toUpperCase()}</span>
              </div>
              <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>{s.title}</div>
              <div className="flex flex-wrap gap-2.5 mt-1.5">
                <span className="text-[11px] text-ink-3">⏰ {s.time}</span>
                <span className="text-[11px] text-ink-3">📍 {s.court.short}</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  {s.going.slice(0, 4).map(id => (
                    <PixelAvatar key={id} seed={findPlayer(id)?.nick ?? "?"} size="xs" />
                  ))}
                  {s.going.length > 4 && (
                    <span className="pixel-xs text-ink-3">+{s.going.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="pixel-xs" style={{ color: "var(--accent)" }}>{s.going.length}/{s.capacity}</span>
                  <ArrowIcon size={14} color="var(--text-2)" />
                </div>
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </motion.div>
  );
}
