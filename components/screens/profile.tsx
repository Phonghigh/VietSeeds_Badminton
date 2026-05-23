"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { pageEnter, pageTransition } from "@/lib/motion";
import { useMe, usePlayer } from "@/lib/hooks/use-players";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useAchievements } from "@/lib/hooks/use-achievements";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { XPBar } from "@/components/ui/xp-bar";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { StatTile } from "@/components/ui/stat-tile";
import { Pills } from "@/components/ui/pills";
import {
  TrophyIcon, CalendarIcon, FireIcon, RacketIcon,
  CrownIcon, MedalIcon, HeartIcon, StarIcon,
  ArrowIcon,
} from "@/components/icons/pixel-icons";

type Tab = "stats" | "achievements" | "history";

const ACHIEVEMENT_ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  racket: RacketIcon as React.FC<{ size?: number; color?: string }>,
  fire:   FireIcon   as React.FC<{ size?: number; color?: string }>,
  star:   StarIcon   as React.FC<{ size?: number; color?: string }>,
  crown:  CrownIcon  as React.FC<{ size?: number; color?: string }>,
  medal:  MedalIcon  as React.FC<{ size?: number; color?: string }>,
  heart:  HeartIcon  as React.FC<{ size?: number; color?: string }>,
};

interface ProfileProps {
  playerId?: number;
}

export function Profile({ playerId }: ProfileProps) {
  const router = useRouter();
  const { data: me } = useMe();
  const { data: specificPlayer } = usePlayer(playerId ?? 0);
  const { data: sessions = [] } = useSessions();
  const { data: achievements = [] } = useAchievements(playerId);
  const [tab, setTab] = useState<Tab>("stats");

  const p = playerId ? specificPlayer : me;
  if (!p) return (
    <div className="flex items-center justify-center" style={{ height: 300 }}>
      <span className="pixel-xs animate-pulse" style={{ color: "var(--text-3)" }}>Loading…</span>
    </div>
  );

  return (
    <motion.div
      className="pb-4"
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center top, var(--accent-glow-soft) 0%, transparent 50%), linear-gradient(180deg, var(--bg-2) 0%, var(--bg-1) 100%)",
          padding: "12px 16px 24px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(132,204,22,0.04) 3px, rgba(132,204,22,0.04) 4px)",
          }}
        />
        {playerId && (
          <button
            onClick={() => router.back()}
            className="relative grid place-items-center mb-3"
            style={{
              width: 36, height: 36, background: "var(--bg-2)",
              clipPath: "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))",
              transform: "scaleX(-1)",
            }}
          >
            <ArrowIcon size={14} />
          </button>
        )}

        <div className="text-center relative">
          <div className="inline-block relative">
            <PixelAvatar seed={p.nick} size="xl" ring />
            <div
              className="absolute font-pixel leading-none"
              style={{
                bottom: -6, right: -6,
                background: "var(--yellow)", color: "#422006",
                fontSize: 10, padding: "4px 6px",
                boxShadow: "0 0 0 3px var(--bg-1), 0 0 12px var(--yellow-glow)",
              }}
            >
              LV.{p.level}
            </div>
          </div>
          <div className="pixel-lg mt-3.5" style={{ color: "var(--text-0)" }}>{p.name}</div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <PixelBadge variant="accent"><CrownIcon size={10} /> SMASH MASTER</PixelBadge>
            <PixelBadge variant="yellow"><FireIcon size={10} /> {p.streak} STREAK</PixelBadge>
          </div>
          <div className="mt-4" style={{ maxWidth: 280, marginInline: "auto" }}>
            <div className="flex justify-between mb-1">
              <span className="pixel-xs text-ink-3">LV.{p.level}</span>
              <span className="pixel-xs text-ink-3">LV.{p.level + 1}</span>
            </div>
            <XPBar value={p.xp} max={p.xpMax} />
            <div className="pixel-xs mt-1.5" style={{ color: "var(--accent)" }}>
              {p.xp} / {p.xpMax} XP · {p.xpMax - p.xp} to next level
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-3">
        <Pills
          tabs={[
            { id: "stats",        label: "STATS"   },
            { id: "achievements", label: "BADGES"  },
            { id: "history",      label: "HISTORY" },
          ]}
          current={tab}
          onChange={v => setTab(v as Tab)}
        />
      </div>

      <div className="px-4 mt-3 flex flex-col gap-3.5">

        {tab === "stats" && (
          <>
            <div className="grid grid-cols-2 gap-2.5">
              <StatTile icon={<TrophyIcon size={14} color="var(--yellow)" />} label="WINS"       value={p.wins}         color="var(--yellow)"  sub="this season" />
              <StatTile icon={<CalendarIcon size={14} color="var(--accent)" />} label="ATTENDANCE" value={`${p.attendance}%`} color="var(--accent)" sub="last 30 days" />
              <StatTile icon={<FireIcon size={14} />}                      label="STREAK"     value={`${p.streak}`}  color="var(--orange)"  sub="sessions" />
              <StatTile icon={<RacketIcon size={14} color="var(--cyan)" />} label="MATCHES"    value={142}            color="var(--cyan)"    sub="total played" />
            </div>

            <PixelCard variant="default" style={{ padding: 16 }}>
              <div className="flex justify-between items-center">
                <SectionTitle>30-Day Attendance</SectionTitle>
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>{p.attendance}%</span>
              </div>
              <div className="grid gap-[3px] mt-2" style={{ gridTemplateColumns: "repeat(15, 1fr)" }}>
                {Array.from({ length: 30 }).map((_, i) => {
                  const intensity = [1,0.6,0.25,0.08,1,0.25,0.6,0.08,1,0.6,0.25,1,0.08,0.6,1,0.25,0.6,1,0.08,0.25,1,0.6,0.08,1,0.25,0.6,1,0.08,0.25,1][i] ?? 0.4;
                  return (
                    <div
                      key={i}
                      style={{
                        aspectRatio: "1",
                        background: "var(--accent)",
                        opacity: intensity,
                        boxShadow: intensity > 0.6 ? "0 0 8px var(--accent-glow)" : "none",
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-2.5">
                <span className="pixel-xs text-ink-3">LESS</span>
                <div className="flex gap-0.5">
                  {[0.1, 0.3, 0.6, 1].map((o, i) => (
                    <div key={i} style={{ width: 10, height: 10, background: "var(--accent)", opacity: o }} />
                  ))}
                </div>
                <span className="pixel-xs text-ink-3">MORE</span>
              </div>
            </PixelCard>

            <PixelCard variant="default" style={{ padding: 16 }}>
              <SectionTitle>Skills</SectionTitle>
              {[
                { label: "SMASH POWER", val: 92, color: "var(--danger)"  },
                { label: "STAMINA",     val: 78, color: "var(--accent)" },
                { label: "ACCURACY",    val: 84, color: "var(--cyan)"   },
                { label: "STRATEGY",    val: 68, color: "var(--yellow)" },
                { label: "TEAMWORK",    val: 88, color: "var(--pink)"   },
              ].map(s => (
                <div key={s.label} className="mt-2.5">
                  <div className="flex justify-between mb-1">
                    <span className="pixel-xs text-ink-1">{s.label}</span>
                    <span className="pixel-xs" style={{ color: s.color }}>{s.val}</span>
                  </div>
                  <div className="h-2" style={{ background: "var(--bg-1)", boxShadow: "inset 0 0 0 1px var(--bg-3)" }}>
                    <div style={{ width: `${s.val}%`, height: "100%", background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  </div>
                </div>
              ))}
            </PixelCard>
          </>
        )}

        {tab === "achievements" && (
          <PixelCard variant="default" style={{ padding: 14 }}>
            <div className="flex justify-between items-center">
              <SectionTitle>Achievement Trophies</SectionTitle>
              <PixelBadge variant="accent">{achievements.filter(a => a.earned).length} / {achievements.length}</PixelBadge>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              {achievements.map(a => {
                const Icon = ACHIEVEMENT_ICON_MAP[a.icon];
                return (
                  <div
                    key={a.id}
                    className="relative text-center"
                    style={{
                      background: "var(--bg-1)",
                      padding: 14,
                      opacity: a.earned ? 1 : 0.4,
                      boxShadow: a.earned
                        ? `inset 0 0 0 2px ${a.color}, 0 0 16px ${a.color}33`
                        : "inset 0 0 0 2px var(--bg-3)",
                    }}
                  >
                    {a.rarity === "legend" && a.earned && (
                      <div className="absolute top-1 right-1"><CrownIcon size={10} color="var(--yellow)" /></div>
                    )}
                    <div className="grid place-items-center mb-2 mt-1">
                      {Icon && <Icon size={36} color={a.color} />}
                    </div>
                    <div className="pixel-xs" style={{ color: a.earned ? "var(--text-0)" : "var(--text-3)" }}>{a.name.toUpperCase()}</div>
                    <div className="pixel-xs text-ink-3 mt-1" style={{ fontSize: 7 }}>{a.desc}</div>
                    <div className="pixel-xs mt-1.5" style={{ color: a.color, fontSize: 7 }}>{a.rarity.toUpperCase()}</div>
                  </div>
                );
              })}
            </div>
          </PixelCard>
        )}

        {tab === "history" && (
          <div className="flex flex-col gap-2.5">
            {sessions.map(s => (
              <PixelCard key={s.id} variant="default" style={{ padding: 14 }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="pixel-xs" style={{ color: "var(--accent)" }}>{s.date.toUpperCase()}</span>
                  <PixelBadge variant={s.status === "live" ? "danger" : s.status === "upcoming" ? "accent" : "default"}>
                    {s.status.toUpperCase()}
                  </PixelBadge>
                </div>
                <div className="pixel-sm" style={{ color: "var(--text-0)" }}>{s.title}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] text-ink-3">{s.time}</span>
                  <span className="text-[11px] text-ink-3">{s.court.short}</span>
                  {s.attendancePct && <PixelBadge variant="accent">{s.attendancePct}% turnout</PixelBadge>}
                </div>
              </PixelCard>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
