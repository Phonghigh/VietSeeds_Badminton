"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { pageEnter, pageTransition } from "@/lib/motion";
import type { Session } from "@/lib/data";
import { findPlayer } from "@/lib/data";
import { useGameStore } from "@/stores/game-store";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { XPBar } from "@/components/ui/xp-bar";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { SectionTitle } from "@/components/ui/section-title";
import { Pills } from "@/components/ui/pills";
import {
  ShuttleIcon, CalendarIcon, ClockIcon, PinIcon,
  CheckIcon, XIcon, CrownIcon, ChatIcon,
  ArrowIcon, HeartIcon, BoltIcon, CoinIcon,
} from "@/components/icons/pixel-icons";

type Tab = "roster" | "matches" | "costs" | "photos";

interface SessionDetailProps {
  session: Session;
}

export function SessionDetail({ session: s }: SessionDetailProps) {
  const router = useRouter();
  const { showToast } = useGameStore();
  const [tab, setTab] = useState<Tab>("roster");

  const going  = s.going.map(findPlayer);
  const maybe  = (s.maybe  ?? []).map(findPlayer);
  const absent = (s.notGoing ?? []).map(findPlayer);

  const totalCost = s.cost ?? 480000;
  const perPlayer = Math.round(totalCost / Math.max(1, going.length));
  const rosterPct = Math.round((going.length / s.capacity) * 100);

  return (
    <motion.div
      className="flex flex-col pb-4"
      style={{ gap: 14 }}
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 260,
          background: "radial-gradient(ellipse at center top, rgba(34,197,94,0.18) 0%, transparent 60%), var(--bg-1)",
        }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4" style={{ paddingTop: 12 }}>
          <button
            onClick={() => router.back()}
            className="grid place-items-center"
            style={{
              width: 36, height: 36,
              background: "rgba(31,41,55,0.85)",
              backdropFilter: "blur(8px)",
              clipPath: "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))",
            }}
          >
            <span style={{ display: "inline-block", transform: "scaleX(-1)" }}><ArrowIcon size={14} /></span>
          </button>
          <div className="flex items-center gap-1.5">
            <PixelBadge variant={s.status === "live" ? "danger" : "accent"}>
              {s.status === "live" ? "● LIVE" : s.status === "upcoming" ? "▸ UPCOMING" : "PAST"}
            </PixelBadge>
            <button
              className="grid place-items-center"
              style={{
                width: 36, height: 36,
                background: "rgba(31,41,55,0.85)",
                clipPath: "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))",
              }}
            >
              <ChatIcon size={14} />
            </button>
          </div>
        </div>

        {/* Animated shuttle */}
        <div
          className="absolute animate-shuttle-fly"
          style={{
            top: 50, left: "50%", transform: "translateX(-50%)",
            filter: "drop-shadow(0 0 12px var(--accent-glow))",
          }}
        >
          <ShuttleIcon size={56} color="var(--accent)" />
        </div>

        {/* Title overlay */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: 16, background: "linear-gradient(180deg, transparent 0%, var(--bg-1) 100%)" }}
        >
          <div className="pixel-xs" style={{ color: "var(--accent)" }}>MISSION #{s.id.replace("s-", "")}</div>
          <div className="pixel-lg mt-1.5" style={{ color: "var(--text-0)", lineHeight: 1.2 }}>{s.title}</div>
          <div className="flex flex-wrap gap-3.5 mt-2">
            {[
              { Icon: CalendarIcon, text: s.date },
              { Icon: ClockIcon,    text: s.time },
              { Icon: PinIcon,      text: s.court.name },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1">
                <Icon size={12} color="var(--text-2)" />
                <span className="text-[11px] text-ink-1">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roster summary */}
      <div className="px-4">
        <PixelCard variant="elev" accent style={{ overflow: "hidden" }}>
          <div style={{ padding: 16 }}>
            <div className="flex items-start gap-3.5">
              {/* Ring chart */}
              <div
                className="ring-chart flex-shrink-0"
                style={{ "--val": rosterPct, "--size": "80px" } as React.CSSProperties}
              >
                <div className="pixel-md" style={{ color: "var(--accent)" }}>{rosterPct}%</div>
              </div>
              <div className="flex-1">
                <div className="pixel-xs text-ink-3">ROSTER STATUS</div>
                <div className="pixel-md mt-1.5" style={{ color: "var(--text-0)" }}>{going.length} / {s.capacity} PLAYERS</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px]"><b style={{ color: "var(--accent)" }}>{going.length}</b> in</span>
                  <span className="text-[11px]"><b className="text-retro-yellow">{maybe.length}</b> maybe</span>
                  <span className="text-[11px]"><b className="text-retro-danger">{absent.length}</b> out</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3.5">
              <PixelButton variant="ghost" size="sm" style={{ flex: 1 }} icon={<XIcon size={10} color="var(--danger)" />}>
                CAN&apos;T GO
              </PixelButton>
              <PixelButton variant="ghost" size="sm" style={{ flex: 1 }} icon={<ClockIcon size={10} color="var(--yellow)" />}>
                MAYBE
              </PixelButton>
              <PixelButton
                variant="primary" size="sm" style={{ flex: 2 }}
                icon={<CheckIcon size={10} color="var(--accent-ink)" />}
                onClick={() => showToast("RSVP'd! +50 XP 🏸")}
              >
                I&apos;M IN
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Pills
          tabs={[
            { id: "roster",  label: "ROSTER"  },
            { id: "matches", label: "MATCHES" },
            { id: "costs",   label: "COSTS"   },
            { id: "photos",  label: "PHOTOS"  },
          ]}
          current={tab}
          onChange={v => setTab(v as Tab)}
        />
      </div>

      {/* Tab content */}
      <div className="px-4 flex flex-col gap-3">

        {tab === "roster" && (
          <PixelCard variant="default" style={{ padding: 12 }}>
            <div className="pixel-xs mb-2" style={{ color: "var(--accent)" }}>● IN — {going.length}</div>
            <div className="flex flex-col gap-1.5">
              {going.map(p => (
                <div key={p.id} className="flex items-center gap-2.5" style={{ padding: "6px 4px" }}>
                  <PixelAvatar seed={p.nick} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-ink-0">{p.name}</div>
                    <div className="pixel-xs text-ink-3">LV.{p.level} · {p.wins}W</div>
                  </div>
                  {p.role === "admin" && <PixelBadge variant="yellow"><CrownIcon size={10} /> CAPT</PixelBadge>}
                  <CheckIcon size={14} color="var(--accent)" />
                </div>
              ))}
            </div>

            {maybe.length > 0 && (
              <>
                <div className="pix-divider" />
                <div className="pixel-xs mb-2" style={{ color: "var(--yellow)" }}>⏱ MAYBE — {maybe.length}</div>
                {maybe.map(p => (
                  <div key={p.id} className="flex items-center gap-2.5" style={{ padding: "6px 4px", opacity: 0.7 }}>
                    <PixelAvatar seed={p.nick} size="sm" />
                    <div className="flex-1">
                      <div className="text-[12px]">{p.name}</div>
                      <div className="pixel-xs text-ink-3">LV.{p.level}</div>
                    </div>
                    <ClockIcon size={14} color="var(--yellow)" />
                  </div>
                ))}
              </>
            )}

            {absent.length > 0 && (
              <>
                <div className="pix-divider" />
                <div className="pixel-xs mb-2" style={{ color: "var(--danger)" }}>✗ OUT — {absent.length}</div>
                {absent.map(p => (
                  <div key={p.id} className="flex items-center gap-2.5" style={{ padding: "6px 4px", opacity: 0.5 }}>
                    <PixelAvatar seed={p.nick} size="sm" />
                    <div className="flex-1">
                      <div className="text-[12px] line-through">{p.name}</div>
                      <div className="pixel-xs text-ink-3">LV.{p.level}</div>
                    </div>
                    <XIcon size={14} color="var(--danger)" />
                  </div>
                ))}
              </>
            )}
          </PixelCard>
        )}

        {tab === "matches" && (
          <PixelCard variant="default" style={{ padding: 14 }}>
            <div className="flex justify-between items-center mb-2.5">
              <SectionTitle>Auto-Pairing</SectionTitle>
              <PixelBadge variant="cyan">8-BIT MIXER</PixelBadge>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { court: 1, a: [going[0], going[1]], b: [going[2], going[3]], score: "21-18", winner: "A" },
                { court: 2, a: [going[4], going[5]], b: [going[6], going[0]], score: "LIVE",  winner: null },
                { court: 1, a: [going[2], going[5]], b: [going[1], going[4]], score: "21-15", winner: "A" },
              ].filter(m => m.a[0] && m.a[1] && m.b[0] && m.b[1]).map((m, i) => (
                <div key={i} className="bg-bg-1" style={{ padding: 12 }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="pixel-xs text-ink-3">COURT {m.court} · MATCH {i + 1}</span>
                    {m.score === "LIVE"
                      ? <span className="pixel-xs" style={{ color: "var(--danger)" }}>● LIVE</span>
                      : <span className="pixel-sm" style={{ color: "var(--accent)" }}>{m.score}</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1" style={{ opacity: m.winner === "A" ? 1 : m.winner === "B" ? 0.5 : 1 }}>
                      <div className="flex gap-1.5">
                        <PixelAvatar seed={m.a[0]!.nick} size="xs" />
                        <PixelAvatar seed={m.a[1]!.nick} size="xs" />
                      </div>
                      <div className="pixel-xs text-ink-1 mt-1">{m.a[0]!.nick} / {m.a[1]!.nick}</div>
                    </div>
                    <div className="pixel-md text-ink-3">VS</div>
                    <div className="flex-1 text-right" style={{ opacity: m.winner === "B" ? 1 : m.winner === "A" ? 0.5 : 1 }}>
                      <div className="flex gap-1.5 justify-end">
                        <PixelAvatar seed={m.b[0]!.nick} size="xs" />
                        <PixelAvatar seed={m.b[1]!.nick} size="xs" />
                      </div>
                      <div className="pixel-xs text-ink-1 mt-1">{m.b[0]!.nick} / {m.b[1]!.nick}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PixelButton variant="ghost" size="sm" className="w-full mt-3">↻ RE-SHUFFLE PAIRS</PixelButton>
          </PixelCard>
        )}

        {tab === "costs" && (
          <>
            <PixelCard variant="elev" style={{ padding: 16 }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="pixel-xs text-ink-3">TOTAL COST</div>
                  <div
                    className="pixel-xl mt-2"
                    style={{ color: "var(--yellow)", textShadow: "0 0 12px var(--yellow-glow)" }}
                  >
                    {totalCost.toLocaleString()}<span className="text-[10px] ml-1">VND</span>
                  </div>
                </div>
                <CoinIcon size={56} />
              </div>
              <div className="pix-divider" />
              <div className="flex justify-between">
                <span className="text-[12px] text-ink-3">Per player ({going.length})</span>
                <span className="pixel-sm" style={{ color: "var(--accent)" }}>{perPlayer.toLocaleString()} ₫</span>
              </div>
            </PixelCard>

            <PixelCard variant="default" style={{ padding: 14 }}>
              <SectionTitle>Breakdown</SectionTitle>
              {[
                { label: "Court rental (2h)", amount: 300000, Icon: PinIcon,      color: "var(--accent)" },
                { label: "Shuttlecocks × 4", amount: 120000, Icon: ShuttleIcon,   color: "var(--cyan)" },
                { label: "Drinks & snacks",  amount: 60000,  Icon: HeartIcon,     color: "var(--pink)" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2.5"
                  style={{ padding: "8px 0", borderBottom: i < 2 ? "1px dashed var(--border-soft)" : "none" }}>
                  <row.Icon size={14} color={row.color} />
                  <span className="flex-1 text-[12px] text-ink-1">{row.label}</span>
                  <span className="pixel-sm text-ink-0">{row.amount.toLocaleString()}</span>
                </div>
              ))}
            </PixelCard>

            <PixelCard variant="default" style={{ padding: 14 }}>
              <div className="flex justify-between items-center mb-2.5">
                <SectionTitle>Payments</SectionTitle>
                <PixelBadge variant="accent">{going.length - 2}/{going.length} PAID</PixelBadge>
              </div>
              <div className="flex flex-col gap-2">
                {going.slice(0, 5).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2.5">
                    <PixelAvatar seed={p.nick} size="sm" />
                    <span className="flex-1 text-[12px]">{p.nick}</span>
                    {i < 3
                      ? <PixelBadge variant="accent" icon={<CheckIcon size={10} />}>PAID</PixelBadge>
                      : <PixelBadge variant="danger">PENDING</PixelBadge>}
                  </div>
                ))}
              </div>
            </PixelCard>
          </>
        )}

        {tab === "photos" && (
          <>
            <PixelCard variant="default" style={{ padding: 14 }}>
              <SectionTitle more="UPLOAD">Highlights</SectionTitle>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Match shot", "Group photo", "MVP", "Trophy shot"].map(label => (
                  <div
                    key={label}
                    className="flex items-center justify-center text-[11px] text-ink-3"
                    style={{ aspectRatio: "1", background: "var(--bg-1)", border: "1px dashed var(--border-mid)" }}
                  >
                    📸 {label}
                  </div>
                ))}
              </div>
            </PixelCard>

            <PixelCard variant="default" style={{ padding: 14 }}>
              <div className="flex justify-between items-center">
                <SectionTitle>Top Shot</SectionTitle>
                <PixelBadge variant="yellow"><CrownIcon size={10} /> MVP</PixelBadge>
              </div>
              <div
                className="flex items-center justify-center text-[11px] text-ink-3 mt-2"
                style={{ width: "100%", aspectRatio: "16/9", background: "var(--bg-1)", border: "1px dashed var(--border-mid)" }}
              >
                🏆 MVP highlight reel
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                <PixelAvatar seed={going[2]?.nick ?? "Long"} size="sm" />
                <div className="flex-1">
                  <div className="text-[12px] text-ink-0">{going[2]?.name ?? "Long Phạm"}</div>
                  <div className="pixel-xs text-ink-3">7 wins · perfect attendance</div>
                </div>
                <PixelButton variant="ghost" size="sm" icon={<HeartIcon size={10} />}>23</PixelButton>
              </div>
            </PixelCard>
          </>
        )}
      </div>
    </motion.div>
  );
}
