"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { pageEnter, pageTransition } from "@/lib/motion";
import { SESSIONS, ACTIVITY, QUESTS, PLAYERS, ACHIEVEMENTS, ME, findPlayer } from "@/lib/data";
import type { Session } from "@/lib/data";
import { useThemeStore } from "@/stores/theme-store";
import { useGameStore } from "@/stores/game-store";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { XPBar } from "@/components/ui/xp-bar";
import { PixelAvatar, AvatarStack } from "@/components/ui/pixel-avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { StatTile } from "@/components/ui/stat-tile";
import {
  CalendarIcon, ClockIcon, PinIcon, FireIcon, BoltIcon, TrophyIcon,
  ArrowIcon, CheckIcon, PlusIcon, StarIcon, HeartIcon, CrownIcon,
  RacketIcon, MedalIcon,
} from "@/components/icons/pixel-icons";

const ACHIEVEMENT_ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  racket: RacketIcon as React.FC<{ size?: number; color?: string }>,
  fire:   FireIcon   as React.FC<{ size?: number; color?: string }>,
  star:   StarIcon   as React.FC<{ size?: number; color?: string }>,
  crown:  CrownIcon  as React.FC<{ size?: number; color?: string }>,
  medal:  MedalIcon  as React.FC<{ size?: number; color?: string }>,
  heart:  HeartIcon  as React.FC<{ size?: number; color?: string }>,
};

const ACTIVITY_ICON_MAP: Record<string, React.ReactNode> = {
  win:   <TrophyIcon size={14} color="var(--yellow)" />,
  level: <StarIcon   size={14} color="var(--accent)" />,
  vote:  <CheckIcon  size={14} color="var(--cyan)" />,
  join:  <PlusIcon   size={14} color="var(--accent)" />,
  badge: <FireIcon   size={14} />,
  photo: <HeartIcon  size={14} />,
};

// ── Layout A: Hero session + feed ─────────────────────────────────────────────

function HomeLayoutA() {
  const router = useRouter();
  const { showToast } = useGameStore();
  const upcoming = SESSIONS[0];
  const live      = SESSIONS[1];
  const going     = upcoming.going.map(findPlayer);

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: 16, padding: "8px 16px 24px" }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Greeting */}
      <div className="flex items-start justify-between" style={{ paddingTop: 4 }}>
        <div>
          <div className="pixel-xs" style={{ color: "var(--accent)" }}>▸ HELLO PLAYER</div>
          <div className="pixel-lg mt-1.5" style={{ color: "var(--ink-0, #F3F4F6)" }}>
            Hi, {ME.nick} <span className="animate-flicker">★</span>
          </div>
          <div className="text-[11px] text-ink-3 mt-0.5">Ready to smash today?</div>
        </div>
        <button onClick={() => router.push("/profile")}>
          <PixelAvatar seed={ME.nick} size="md" ring level={ME.level} />
        </button>
      </div>

      {/* Live banner */}
      {live && (
        <PixelCard variant="elev" accent style={{ overflow: "hidden", position: "relative" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, transparent 50%)" }}
          />
          <div style={{ padding: 14 }}>
            <div className="flex items-center gap-2">
              <span className="live-dot" />
              <span className="pixel-xs" style={{ color: "var(--danger)" }}>● LIVE NOW</span>
              <PixelBadge className="ml-auto">{live.matchesPlayed ?? 0}/12 matches</PixelBadge>
            </div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>{live.title}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <PinIcon size={12} color="var(--text-2)" />
              <span className="text-[11px] text-ink-3">{live.court.name}</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <AvatarStack seeds={live.going.slice(0, 5).map(id => findPlayer(id).nick)} size="sm" />
              <PixelButton variant="danger" size="sm" icon={<ArrowIcon size={12} color="#fff" />}
                onClick={() => router.push(`/sessions/${live.id}`)}>
                JOIN LIVE
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      )}

      {/* Upcoming hero */}
      <PixelCard variant="elev" accent glow style={{ overflow: "hidden", position: "relative" }}>
        <div
          className="absolute top-0 right-0 bottom-0 pointer-events-none"
          style={{ width: "50%", background: "radial-gradient(circle at top right, var(--accent-glow-soft) 0%, transparent 70%)" }}
        />
        <div style={{ padding: 18 }}>
          <div className="flex items-center justify-between">
            <PixelBadge variant="accent" icon={<CalendarIcon size={10} />}>NEXT UP</PixelBadge>
            <span className="pixel-xs" style={{ color: "var(--text-2)" }}>IN 2 DAYS</span>
          </div>
          <div className="pixel-lg mt-3" style={{ color: "var(--text-0)", lineHeight: 1.3 }}>{upcoming.title}</div>
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1.5">
              <ClockIcon size={12} color="var(--accent)" />
              <span className="text-[11px] text-ink-1">{upcoming.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PinIcon size={12} color="var(--accent)" />
              <span className="text-[11px] text-ink-1">{upcoming.court.short} · {upcoming.court.area}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-1.5">
              <span className="pixel-xs" style={{ color: "var(--text-2)" }}>ROSTER</span>
              <span className="pixel-xs" style={{ color: "var(--accent)" }}>{upcoming.going.length}/{upcoming.capacity}</span>
            </div>
            <XPBar value={upcoming.going.length} max={upcoming.capacity} />
          </div>

          <div className="flex items-center justify-between mt-3.5">
            <AvatarStack seeds={going.map(p => p.nick)} max={5} size="sm" />
            <div className="flex gap-1.5">
              <PixelButton variant="ghost" size="sm" onClick={() => router.push("/votes")}>ABSENT</PixelButton>
              <PixelButton variant="primary" size="sm" onClick={() => {
                router.push(`/sessions/${upcoming.id}`);
                showToast("RSVP'd! +50 XP");
              }}>
                I&apos;M IN ✓
              </PixelButton>
            </div>
          </div>
        </div>
      </PixelCard>

      {/* Quick stats */}
      <div className="flex gap-2.5 items-stretch">
        <StatTile icon={<FireIcon size={14} />} label="STREAK" value={`${ME.streak} 🔥`} color="var(--orange)" />
        <StatTile icon={<BoltIcon size={14} />} label="XP TODAY" value="+120" color="var(--accent)" />
        <StatTile icon={<TrophyIcon size={14} color="var(--yellow)" />} label="RANK" value="#4" color="var(--yellow)" />
      </div>

      {/* Daily quests */}
      <PixelCard variant="default" style={{ padding: 16 }}>
        <div className="flex justify-between items-center">
          <SectionTitle>Daily Quests</SectionTitle>
          <PixelBadge variant="yellow">2/3</PixelBadge>
        </div>
        <div className="flex flex-col gap-2.5 mt-1">
          {QUESTS.map(q => (
            <div key={q.id} className="flex items-start gap-2.5">
              <div
                className="flex-shrink-0 grid place-items-center"
                style={{
                  width: 22, height: 22,
                  background: q.done ? "var(--accent)" : "var(--bg-3)",
                  clipPath: "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))",
                  boxShadow: q.done ? "0 0 12px var(--accent-glow)" : "none",
                }}
              >
                {q.done && <CheckIcon size={14} color="var(--accent-ink)" />}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[12px]"
                  style={{ color: q.done ? "var(--text-3)" : "var(--text-1)", textDecoration: q.done ? "line-through" : "none" }}
                >
                  {q.label}
                </div>
                {q.progress != null && q.total != null && (
                  <div className="mt-1">
                    <XPBar value={q.progress} max={q.total} color="yellow" height={6} />
                  </div>
                )}
              </div>
              <PixelBadge variant="accent" icon={<BoltIcon size={10} />}>+{q.xp}</PixelBadge>
            </div>
          ))}
        </div>
      </PixelCard>

      {/* Activity feed */}
      <div>
        <SectionTitle more="VIEW ALL">Activity Feed</SectionTitle>
        <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
          {ACTIVITY.map((a, i) => {
            const who    = findPlayer(a.who);
            const target = a.target ? findPlayer(a.target) : null;
            return (
              <div
                key={a.id}
                className="flex items-center gap-2.5"
                style={{
                  padding: "12px 14px",
                  borderTop: i === 0 ? "none" : "1px dashed var(--border-soft)",
                }}
              >
                <PixelAvatar seed={who.nick} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-ink-1 leading-snug">
                    <b className="text-ink-0">{who.nick}</b> {a.text}
                    {target && <b style={{ color: "var(--accent)" }}> {target.nick}</b>}
                    {a.level && <b className="text-retro-yellow"> Lv.{a.level}</b>}
                  </div>
                  <div className="pixel-xs text-ink-3 mt-0.5">{a.time.toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-1">
                  {ACTIVITY_ICON_MAP[a.type]}
                  {a.xp && <span className="pixel-xs" style={{ color: "var(--accent)" }}>+{a.xp}</span>}
                </div>
              </div>
            );
          })}
        </PixelCard>
      </div>

      {/* Leaderboard preview */}
      <div>
        <SectionTitle more="FULL BOARD">Weekly Leaderboard</SectionTitle>
        <PixelCard variant="default" style={{ padding: 14 }}>
          {[PLAYERS[2], PLAYERS[8], PLAYERS[0], PLAYERS[6]].map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5"
              style={{ padding: "8px 0", borderBottom: i < 3 ? "1px dashed var(--border-soft)" : "none" }}
            >
              <div
                className="pixel-md text-center"
                style={{
                  width: 28,
                  color: i === 0 ? "var(--yellow)" : i === 1 ? "var(--text-2)" : i === 2 ? "var(--orange)" : "var(--text-3)",
                  textShadow: i === 0 ? "0 0 10px var(--yellow-glow)" : "none",
                }}
              >
                {i + 1}
              </div>
              <PixelAvatar seed={p.nick} size="sm" />
              <div className="flex-1">
                <div className="text-[12px] text-ink-1">{p.name}</div>
                <div className="pixel-xs text-ink-3">LV.{p.level}</div>
              </div>
              <div className="pixel-sm" style={{ color: "var(--accent)" }}>{p.wins}W</div>
            </div>
          ))}
        </PixelCard>
      </div>
    </motion.div>
  );
}

// ── Layout B: Compact card grid ───────────────────────────────────────────────

function HomeLayoutB() {
  const router  = useRouter();
  const { showToast } = useGameStore();
  const upcoming = SESSIONS[0];

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: 14, padding: "8px 16px 24px" }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between" style={{ paddingTop: 4 }}>
        <div>
          <div className="pixel-lg" style={{ color: "var(--text-0)" }}>SMASHERS</div>
          <div className="text-[11px] text-ink-3 mt-0.5">VietSeeds · 12 active</div>
        </div>
        <button onClick={() => router.push("/profile")}>
          <PixelAvatar seed={ME.nick} size="md" ring level={ME.level} />
        </button>
      </div>

      {/* 2×2 action grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <PixelCard variant="elev" accent interactive onClick={() => router.push(`/sessions/${upcoming.id}`)}>
          <div style={{ padding: 14 }}>
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={12} color="var(--accent)" />
              <span className="pixel-xs" style={{ color: "var(--accent)" }}>TONIGHT</span>
            </div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>19:30</div>
            <div className="text-[11px] text-ink-3 mt-0.5">{upcoming.court.short}</div>
            <div className="mt-2">
              <XPBar value={upcoming.going.length} max={upcoming.capacity} height={6} />
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="elev" interactive onClick={() => router.push("/votes")}>
          <div style={{ padding: 14 }}>
            <div className="flex items-center gap-1.5">
              <CheckIcon size={12} color="var(--cyan)" />
              <span className="pixel-xs" style={{ color: "var(--cyan)" }}>VOTE</span>
            </div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>3 OPEN</div>
            <div className="text-[11px] text-ink-3 mt-0.5">court · time · snacks</div>
            <div className="flex gap-0.5 mt-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-1 h-1" style={{ background: "var(--cyan)", opacity: 0.6 - i * 0.15, boxShadow: "0 0 8px var(--cyan)" }} />
              ))}
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="elev">
          <div style={{ padding: 14 }}>
            <div className="flex items-center gap-1.5">
              <FireIcon size={12} />
              <span className="pixel-xs" style={{ color: "var(--orange)" }}>STREAK</span>
            </div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>{ME.streak} 🔥</div>
            <div className="text-[11px] text-ink-3 mt-0.5">Best: 18</div>
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1.5"
                  style={{
                    background: i < 5 ? "var(--orange)" : "var(--bg-3)",
                    boxShadow: i < 5 ? "0 0 6px var(--orange)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="elev">
          <div style={{ padding: 14 }}>
            <div className="flex items-center gap-1.5">
              <BoltIcon size={12} color="var(--yellow)" />
              <span className="pixel-xs" style={{ color: "var(--yellow)" }}>XP</span>
            </div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)" }}>{ME.xp}</div>
            <div className="text-[11px] text-ink-3 mt-0.5">LV.{ME.level} · {ME.xpMax - ME.xp} to next</div>
            <div className="mt-2">
              <XPBar value={ME.xp} max={ME.xpMax} color="yellow" height={6} />
            </div>
          </div>
        </PixelCard>
      </div>

      {/* Daily quests banner */}
      <PixelCard variant="default" style={{ padding: 14 }}>
        <div className="flex justify-between items-center">
          <SectionTitle>Daily Quests</SectionTitle>
          <PixelBadge variant="yellow">2/3</PixelBadge>
        </div>
        <div className="flex flex-col gap-2 mt-1.5">
          {QUESTS.map(q => (
            <div key={q.id} className="flex items-center gap-2.5">
              <div
                className="flex-shrink-0 grid place-items-center"
                style={{ width: 18, height: 18, background: q.done ? "var(--accent)" : "var(--bg-3)" }}
              >
                {q.done && <CheckIcon size={12} color="var(--accent-ink)" />}
              </div>
              <div className="flex-1 text-[12px]">{q.label}</div>
              <span className="pixel-xs" style={{ color: "var(--accent)" }}>+{q.xp}XP</span>
            </div>
          ))}
        </div>
      </PixelCard>

      {/* Horizontal mini feed */}
      <div>
        <SectionTitle more="VIEW ALL">Live Feed</SectionTitle>
        <div className="h-scroll" style={{ marginLeft: -2, marginRight: -2, paddingLeft: 2, paddingRight: 2 }}>
          {ACTIVITY.slice(0, 4).map(a => {
            const who = findPlayer(a.who);
            return (
              <PixelCard key={a.id} variant="flat" style={{ minWidth: 200, flex: "0 0 auto" }}>
                <div style={{ padding: 12 }}>
                  <div className="flex items-center gap-2">
                    <PixelAvatar seed={who.nick} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="pixel-xs text-ink-0">{who.nick.toUpperCase()}</div>
                      <div className="text-[11px] text-ink-3">{a.time}</div>
                    </div>
                  </div>
                  <div className="text-[12px] text-ink-1 mt-2" style={{ minHeight: 36 }}>
                    {a.text}{a.target && <b style={{ color: "var(--accent)" }}> {findPlayer(a.target).nick}</b>}
                  </div>
                  {a.xp && <PixelBadge variant="accent" icon={<BoltIcon size={10} />} className="mt-1">+{a.xp} XP</PixelBadge>}
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <SectionTitle more="FULL">Top Smashers</SectionTitle>
        <PixelCard variant="default" style={{ padding: 12 }}>
          {[PLAYERS[2], PLAYERS[8], PLAYERS[0]].map((p, i) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5"
              style={{ padding: "6px 0", borderBottom: i < 2 ? "1px dashed var(--border-soft)" : "none" }}
            >
              <span className="pixel-md" style={{ width: 24, textAlign: "center", color: i === 0 ? "var(--yellow)" : "var(--text-2)" }}>{i + 1}</span>
              <PixelAvatar seed={p.nick} size="sm" />
              <div className="flex-1 text-[12px]">{p.nick}</div>
              <span className="pixel-sm" style={{ color: "var(--accent)" }}>{p.wins}W</span>
            </div>
          ))}
        </PixelCard>
      </div>
    </motion.div>
  );
}

// ── Layout C: Arcade game-screen ─────────────────────────────────────────────

function HomeLayoutC() {
  const router   = useRouter();
  const { showToast } = useGameStore();
  const upcoming = SESSIONS[0];

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: 14, padding: "8px 16px 24px" }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Arcade header */}
      <div className="text-center" style={{ padding: "8px 0 4px" }}>
        <div className="pixel-xs" style={{ color: "var(--accent)" }}>--◆ PLAYER 1 READY ◆--</div>
        <div
          className="pixel-xl animate-pulse-glow mt-2.5"
          style={{ color: "var(--accent)", fontSize: 18, textShadow: "0 0 14px var(--accent-glow), 2px 2px 0 rgba(0,0,0,0.6)" }}
        >
          VIETSEEDS
        </div>
        <div className="pixel-sm mt-1" style={{ color: "var(--yellow)", letterSpacing: "0.2em" }}>SMASHERS</div>
      </div>

      {/* Player card */}
      <PixelCard variant="elev" accent style={{ overflow: "hidden" }}>
        <div style={{ padding: 14 }}>
          <div className="flex items-start gap-3">
            <button onClick={() => router.push("/profile")}>
              <PixelAvatar seed={ME.nick} size="lg" ring />
            </button>
            <div className="flex-1">
              <div className="pixel-xs" style={{ color: "var(--accent)" }}>YOU</div>
              <div className="pixel-md mt-1.5" style={{ color: "var(--text-0)" }}>{ME.name.toUpperCase()}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <PixelBadge variant="yellow"><CrownIcon size={10} /> LV.{ME.level}</PixelBadge>
                <PixelBadge variant="accent">SMASH MASTER</PixelBadge>
              </div>
            </div>
          </div>
          <div className="mt-3.5">
            <div className="flex justify-between mb-1">
              <span className="pixel-xs text-ink-3">XP</span>
              <span className="pixel-xs" style={{ color: "var(--accent)" }}>{ME.xp} / {ME.xpMax}</span>
            </div>
            <XPBar value={ME.xp} max={ME.xpMax} />
          </div>
        </div>
      </PixelCard>

      {/* Mission card */}
      <PixelCard variant="default" style={{ overflow: "hidden", position: "relative" }}>
        <div
          className="absolute top-0 left-0 right-0 h-[3px] animate-marquee"
          style={{ background: "repeating-linear-gradient(90deg, var(--accent) 0 8px, transparent 8px 16px)" }}
        />
        <div style={{ padding: 16 }}>
          <div className="flex justify-between items-center">
            <div className="pixel-xs" style={{ color: "var(--yellow)" }}>▸ MISSION {upcoming.id.replace("s-", "")}</div>
            <PixelBadge variant="accent">+200 XP</PixelBadge>
          </div>
          <div className="pixel-md mt-2.5" style={{ color: "var(--text-0)", lineHeight: 1.3 }}>
            {upcoming.title.toUpperCase()}
          </div>
          <div className="text-[11px] text-ink-3 mt-1.5">{upcoming.date.toUpperCase()} · {upcoming.time}</div>
          <div className="flex items-center gap-1 text-[11px] mt-0.5" style={{ color: "var(--accent-2)" }}>
            <PinIcon size={10} color="var(--accent-2)" /> {upcoming.court.name}
          </div>

          {/* Squad grid */}
          <div className="mt-3.5">
            <div className="pixel-xs text-ink-3 mb-1.5">SQUAD</div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
              {Array.from({ length: upcoming.capacity }).map((_, i) => {
                const id     = upcoming.going[i];
                const player = id != null ? findPlayer(id) : null;
                return (
                  <div
                    key={i}
                    className="grid place-items-center"
                    style={{
                      aspectRatio: "1",
                      background: player ? "var(--bg-3)" : "var(--bg-1)",
                      boxShadow: player ? "0 0 0 2px var(--accent)" : "inset 0 0 0 2px var(--bg-3)",
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

          <div className="flex gap-2 mt-3.5">
            <PixelButton variant="ghost" size="sm" style={{ flex: 1 }} onClick={() => router.push("/votes")}>OUT</PixelButton>
            <PixelButton variant="primary" size="sm" style={{ flex: 2 }} onClick={() => {
              router.push(`/sessions/${upcoming.id}`);
              showToast("MISSION ACCEPTED! +200 XP");
            }}>
              ▶ JOIN MISSION
            </PixelButton>
          </div>
        </div>
      </PixelCard>

      {/* Power-ups (achievements) */}
      <div>
        <SectionTitle more="ALL">Power-Ups</SectionTitle>
        <div className="h-scroll">
          {ACHIEVEMENTS.map(a => {
            const Icon = ACHIEVEMENT_ICON_MAP[a.icon];
            return (
              <div
                key={a.id}
                className="flex-none text-center"
                style={{
                  minWidth: 96,
                  background: "var(--bg-2)",
                  padding: 12,
                  opacity: a.earned ? 1 : 0.4,
                  clipPath: "polygon(0 4px,4px 4px,4px 0,calc(100% - 4px) 0,calc(100% - 4px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 4px) calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 4px),0 calc(100% - 4px))",
                  boxShadow: a.earned ? `0 0 14px ${a.color}55` : "none",
                }}
              >
                <div className="grid place-items-center mb-2 mt-1">
                  {Icon && <Icon size={28} color={a.color} />}
                </div>
                <div className="pixel-xs" style={{ color: a.earned ? "var(--text-0)" : "var(--text-3)" }}>
                  {a.name.toUpperCase()}
                </div>
                <div className="pixel-xs text-ink-3 mt-1" style={{ fontSize: 7 }}>{a.rarity.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity ticker */}
      <PixelCard variant="default" style={{ padding: 12 }}>
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="live-dot" />
            <span className="pixel-xs" style={{ color: "var(--danger)" }}>LIVE TICKER</span>
          </div>
          <span className="pixel-xs text-ink-3">UPDATED 12s</span>
        </div>
        <div className="flex flex-col gap-2">
          {ACTIVITY.slice(0, 4).map(a => {
            const who    = findPlayer(a.who);
            const target = a.target ? findPlayer(a.target) : null;
            return (
              <div key={a.id} className="flex items-start gap-2">
                <span className="pixel-xs" style={{ color: "var(--accent)" }}>›</span>
                <span className="text-[11px] text-ink-1">
                  <b>{who.nick}</b> {a.text}
                  {target && <b style={{ color: "var(--accent)" }}> {target.nick}</b>}
                  {a.xp && <span style={{ color: "var(--accent)" }}> +{a.xp}XP</span>}
                </span>
              </div>
            );
          })}
        </div>
      </PixelCard>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function HomeScreen() {
  const { homeLayout } = useThemeStore();
  if (homeLayout === "B") return <HomeLayoutB />;
  if (homeLayout === "C") return <HomeLayoutC />;
  return <HomeLayoutA />;
}
