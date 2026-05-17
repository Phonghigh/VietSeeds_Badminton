"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { pageEnter, pageTransition } from "@/lib/motion";
import { COURTS, findPlayer } from "@/lib/data";
import { useGameStore } from "@/stores/game-store";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { XPBar } from "@/components/ui/xp-bar";
import { AvatarStack } from "@/components/ui/pixel-avatar";
import { Pills } from "@/components/ui/pills";
import {
  ArrowIcon, BoltIcon, CheckIcon, CrownIcon, ClockIcon,
} from "@/components/icons/pixel-icons";

const COURT_VOTES = [
  { id: "a", label: COURTS[0].name, area: COURTS[0].area, price: COURTS[0].price, votes: 7,  voters: [1, 3, 7, 9, 11, 6, 2] },
  { id: "b", label: COURTS[1].name, area: COURTS[1].area, price: COURTS[1].price, votes: 3,  voters: [5, 8, 12] },
  { id: "c", label: COURTS[2].name, area: COURTS[2].area, price: COURTS[2].price, votes: 1,  voters: [4] },
  { id: "d", label: COURTS[3].name, area: COURTS[3].area, price: COURTS[3].price, votes: 0,  voters: [] },
];

const TIME_VOTES = [
  { id: "t1", label: "18:00 – 20:00", votes: 4, voters: [1, 3, 9, 11],       area: undefined, price: undefined },
  { id: "t2", label: "19:30 – 21:30", votes: 6, voters: [2, 5, 6, 7, 8, 12], area: undefined, price: undefined },
  { id: "t3", label: "20:00 – 22:00", votes: 2, voters: [4, 10],             area: undefined, price: undefined },
];

type Style = "bars" | "cards" | "versus";
type Topic = "court" | "time";

export function Voting() {
  const router = useRouter();
  const { showToast } = useGameStore();
  const [style,  setStyle]  = useState<Style>("bars");
  const [topic,  setTopic]  = useState<Topic>("court");
  const [picks,  setPicks]  = useState<Record<string, string | null>>({});

  const options = topic === "court" ? COURT_VOTES : TIME_VOTES;
  const total   = options.reduce((s, o) => s + o.votes, 0);
  const myPick  = picks[topic] ?? null;

  const cast = (id: string) => {
    setPicks(p => ({ ...p, [topic]: id }));
    showToast("VOTE CAST · +20 XP 🗳️");
  };

  return (
    <motion.div
      className="pb-4"
      variants={pageEnter}
      initial="initial"
      animate="animate"
      transition={pageTransition}
    >
      {/* Sticky header */}
      <div
        className="flex justify-between items-center px-4 py-3 sticky top-0 z-20 border-b-2 border-soft"
        style={{ background: "var(--bg-1)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="grid place-items-center"
            style={{
              width: 36, height: 36, background: "var(--bg-2)",
              clipPath: "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))",
              transform: "scaleX(-1)",
            }}
          >
            <ArrowIcon size={14} />
          </button>
          <div>
            <div className="pixel-md" style={{ color: "var(--text-0)" }}>VOTING BOOTH</div>
            <div className="text-[11px] text-ink-3 mt-0.5">Closes in <span className="text-retro-yellow">3h 24m</span></div>
          </div>
        </div>
        <PixelBadge variant="accent" icon={<BoltIcon size={10} />}>+20 XP</PixelBadge>
      </div>

      <div className="px-4 pt-3 flex flex-col gap-3.5">
        {/* Topic pills */}
        <Pills
          tabs={[
            { id: "court", label: "🏟 COURT" },
            { id: "time",  label: "⏰ TIME SLOT" },
          ]}
          current={topic}
          onChange={v => setTopic(v as Topic)}
        />

        {/* Style selector */}
        <div>
          <div className="pixel-xs text-ink-3 mb-1.5">VIEW · pick a style</div>
          <Pills
            tabs={[
              { id: "bars",   label: "BARS" },
              { id: "cards",  label: "CARDS" },
              { id: "versus", label: "VS-MODE" },
            ]}
            current={style}
            onChange={v => setStyle(v as Style)}
          />
        </div>

        {/* Poll prompt */}
        <PixelCard variant="elev" accent style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ padding: 14 }}>
            <div className="pixel-xs" style={{ color: "var(--accent)" }}>▸ POLL #25 · ACTIVE</div>
            <div className="pixel-md mt-2" style={{ color: "var(--text-0)", lineHeight: 1.3 }}>
              {topic === "court" ? "Where should we play\nThursday night?" : "What time works\nfor everyone?"}
            </div>
            <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
              <PixelBadge>{total} VOTES</PixelBadge>
              <AvatarStack
                seeds={options.flatMap(o => o.voters).slice(0, 5).map(id => findPlayer(id)?.nick ?? "?")}
                max={5}
                size="xs"
              />
            </div>
          </div>
        </PixelCard>

        {/* ── BARS ── */}
        {style === "bars" && (
          <div className="flex flex-col gap-2.5">
            {options.map(o => {
              const pct     = total ? (o.votes / total) * 100 : 0;
              const picked  = myPick === o.id;
              const leading = options.every(x => o.votes >= x.votes) && o.votes > 0;
              return (
                <button key={o.id} onClick={() => cast(o.id)} className="block w-full text-left">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      background: "var(--bg-2)",
                      padding: 14,
                      boxShadow: picked
                        ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                        : "inset 0 0 0 2px rgba(255,255,255,0.07)",
                      transition: "all 200ms ease-out",
                    }}
                  >
                    {/* Fill bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0"
                      style={{
                        width: `${pct}%`,
                        background: picked
                          ? "linear-gradient(90deg, var(--accent) 0%, var(--accent-2,#84CC16) 100%)"
                          : leading
                            ? "linear-gradient(90deg, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.1) 100%)"
                            : "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
                        transition: "width 600ms cubic-bezier(0.2,0.8,0.2,1)",
                      }}
                    />
                    {pct > 0 && pct < 100 && (
                      <div
                        className="absolute top-0 bottom-0"
                        style={{
                          left: `calc(${pct}% - 2px)`,
                          width: 2,
                          background: picked ? "var(--accent-ink)" : "var(--accent)",
                          boxShadow: picked ? "none" : "0 0 8px var(--accent)",
                        }}
                      />
                    )}
                    <div className="relative flex items-center gap-2.5">
                      <div
                        className="flex-shrink-0 grid place-items-center"
                        style={{
                          width: 28, height: 28,
                          background: picked ? "var(--accent-ink)" : leading ? "var(--accent)" : "var(--bg-1)",
                        }}
                      >
                        {picked
                          ? <CheckIcon size={14} color="var(--accent)" />
                          : leading
                            ? <CrownIcon size={14} color="var(--yellow)" />
                            : <span className="pixel-sm">{o.id.toUpperCase()}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-ink-0">{o.label}</div>
                        {o.area
                          ? <div className="pixel-xs text-ink-3">{o.area} · {((o.price ?? 0) / 1000).toFixed(0)}K ₫/hr</div>
                          : <div className="pixel-xs text-ink-3">2-hour block</div>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="pixel-md" style={{ color: picked ? "var(--accent)" : "var(--text-0)" }}>{pct.toFixed(0)}%</div>
                        <div className="pixel-xs text-ink-3">{o.votes} votes</div>
                      </div>
                    </div>
                    {o.voters.length > 0 && (
                      <div className="mt-2.5 relative">
                        <AvatarStack seeds={o.voters.map(id => findPlayer(id)?.nick ?? "?")} max={6} size="xs" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── CARDS ── */}
        {style === "cards" && (
          <div className="grid grid-cols-2 gap-2.5">
            {options.map(o => {
              const pct     = total ? (o.votes / total) * 100 : 0;
              const picked  = myPick === o.id;
              const leading = options.every(x => o.votes >= x.votes) && o.votes > 0;
              return (
                <button key={o.id} onClick={() => cast(o.id)} className="block w-full text-left">
                  <div
                    className="relative overflow-hidden flex flex-col"
                    style={{
                      background: "var(--bg-2)",
                      padding: 12,
                      minHeight: 180,
                      boxShadow: picked
                        ? "0 0 0 3px var(--accent), 0 0 24px var(--accent-glow)"
                        : leading ? "inset 0 0 0 2px var(--accent)" : "inset 0 0 0 2px rgba(255,255,255,0.07)",
                      clipPath: "polygon(0 5px,5px 5px,5px 0,calc(100% - 5px) 0,calc(100% - 5px) 5px,100% 5px,100% calc(100% - 5px),calc(100% - 5px) calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,5px calc(100% - 5px),0 calc(100% - 5px))",
                    }}
                  >
                    {leading && !picked && <div className="absolute top-2 right-2"><CrownIcon size={16} color="var(--yellow)" /></div>}
                    {picked && (
                      <div className="absolute top-2 right-2 grid place-items-center" style={{ background: "var(--accent)", padding: 2 }}>
                        <CheckIcon size={14} color="var(--accent-ink)" />
                      </div>
                    )}
                    <div
                      className="relative overflow-hidden mb-2.5"
                      style={{
                        height: 60,
                        background: topic === "court"
                          ? "linear-gradient(135deg, #14532D 0%, #166534 100%)"
                          : "linear-gradient(135deg, var(--bg-3) 0%, var(--bg-1) 100%)",
                        boxShadow: topic === "court" ? "inset 0 0 0 2px #052e13" : "none",
                      }}
                    >
                      {topic === "court" ? (
                        <>
                          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/70" />
                          <div className="absolute inset-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]" />
                        </>
                      ) : (
                        <div className="absolute inset-0 grid place-items-center">
                          <ClockIcon size={32} color="var(--accent)" />
                        </div>
                      )}
                    </div>
                    <div className="pixel-xs text-ink-0 leading-snug mb-1.5">{o.label.toUpperCase()}</div>
                    {o.area && <div className="pixel-xs text-ink-3" style={{ fontSize: 8 }}>{o.area} · {((o.price ?? 0) / 1000).toFixed(0)}K</div>}
                    <div className="mt-auto pt-2.5">
                      <div className="flex justify-between mb-1">
                        <span className="pixel-xs text-ink-3">{o.votes}V</span>
                        <span className="pixel-sm" style={{ color: picked ? "var(--accent)" : "var(--text-0)" }}>{pct.toFixed(0)}%</span>
                      </div>
                      <XPBar value={o.votes} max={Math.max(total, 1)} height={6} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── VERSUS ── */}
        {style === "versus" && (() => {
          const sorted = [...options].sort((a, b) => b.votes - a.votes);
          const A = sorted[0];
          const B = sorted[1];
          if (!A || !B) return null;
          const total2 = A.votes + B.votes;
          const pctA   = total2 ? (A.votes / total2) * 100 : 50;
          const pctB   = 100 - pctA;
          return (
            <div className="flex flex-col gap-3.5">
              <div className="pixel-xs text-ink-3 text-center">— TOP 2 CONTENDERS —</div>
              <div
                className="relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--bg-2) 0%, var(--bg-1) 100%)",
                  padding: 16,
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.12), 0 0 30px rgba(0,0,0,0.5)",
                }}
              >
                <div className="absolute -top-10 -left-5 w-30 h-30 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)", width: 120, height: 120 }} />
                <div className="absolute -bottom-10 -right-5 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 60%)", width: 120, height: 120 }} />

                <div className="flex items-center gap-2 relative">
                  <button onClick={() => cast(A.id)} className="flex-1 text-left">
                    <div className="pixel-xs" style={{ color: "var(--accent)" }}>FIGHTER A</div>
                    <div className="pixel-md mt-2" style={{ color: "var(--text-0)", lineHeight: 1.2 }}>{A.label}</div>
                    {A.area && <div className="pixel-xs text-ink-3 mt-1">{A.area}</div>}
                    <div className="pixel-xl animate-pulse-glow mt-3" style={{ color: "var(--accent)", fontSize: 28 }}>
                      {pctA.toFixed(0)}%
                    </div>
                    <div className="pixel-xs text-ink-3 mt-0.5">{A.votes} VOTES</div>
                  </button>

                  <div className="text-center flex-shrink-0">
                    <div
                      className="pixel-xl animate-flicker"
                      style={{ color: "var(--yellow)", fontSize: 32, textShadow: "0 0 20px var(--yellow-glow), 3px 3px 0 rgba(0,0,0,0.6)" }}
                    >
                      VS
                    </div>
                  </div>

                  <button onClick={() => cast(B.id)} className="flex-1 text-right">
                    <div className="pixel-xs" style={{ color: "var(--pink)" }}>FIGHTER B</div>
                    <div className="pixel-md mt-2" style={{ color: "var(--text-0)", lineHeight: 1.2 }}>{B.label}</div>
                    {B.area && <div className="pixel-xs text-ink-3 mt-1">{B.area}</div>}
                    <div className="pixel-xl mt-3" style={{ color: "var(--pink)", fontSize: 28, textShadow: "0 0 16px var(--pink-glow)" }}>
                      {pctB.toFixed(0)}%
                    </div>
                    <div className="pixel-xs text-ink-3 mt-0.5">{B.votes} VOTES</div>
                  </button>
                </div>

                {/* HP bars */}
                <div className="mt-3.5">
                  <div className="relative h-3.5 flex" style={{ background: "var(--bg-0)", boxShadow: "inset 0 0 0 2px var(--border-mid)" }}>
                    <div
                      className="transition-all duration-500"
                      style={{
                        width: `${pctA}%`,
                        background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2,#84CC16) 100%)",
                        boxShadow: "0 0 12px var(--accent-glow)",
                      }}
                    />
                    <div
                      className="transition-all duration-500"
                      style={{
                        width: `${pctB}%`,
                        background: "linear-gradient(90deg, var(--pink) 0%, #BE185D 100%)",
                        boxShadow: "0 0 12px rgba(244,114,182,0.6)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-3.5">
                  <PixelButton variant="ghost" size="sm" style={{ flex: 1 }} onClick={() => cast(A.id)}>VOTE A</PixelButton>
                  <PixelButton variant="primary" size="sm" style={{ flex: 1 }} onClick={() => cast(B.id)}>VOTE B</PixelButton>
                </div>
              </div>

              {sorted.slice(2).length > 0 && (
                <div>
                  <div className="pixel-xs text-ink-3 mb-2">OTHER OPTIONS</div>
                  <div className="flex flex-col gap-2">
                    {sorted.slice(2).map(o => {
                      const pct    = total ? (o.votes / total) * 100 : 0;
                      const picked = myPick === o.id;
                      return (
                        <button key={o.id} onClick={() => cast(o.id)} className="block w-full text-left">
                          <div
                            className="flex items-center gap-2.5 bg-bg-2"
                            style={{ padding: 10, boxShadow: picked ? "0 0 0 2px var(--accent)" : "none" }}
                          >
                            <div className="flex-1">
                              <div className="text-[12px] text-ink-1">{o.label}</div>
                              <div className="pixel-xs text-ink-3">{o.votes} votes</div>
                            </div>
                            <span className="pixel-sm text-ink-3">{pct.toFixed(0)}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* My vote summary */}
        <PixelCard variant="default" style={{ padding: 14 }}>
          <div className="flex justify-between items-center">
            <div>
              <div className="pixel-xs text-ink-3">YOUR VOTE</div>
              <div className="pixel-md mt-1.5" style={{ color: myPick ? "var(--accent)" : "var(--text-3)" }}>
                {myPick ? (options.find(o => o.id === myPick)?.label ?? "—") : "NOT CAST"}
              </div>
            </div>
            {myPick && (
              <PixelButton variant="ghost" size="sm" onClick={() => setPicks(p => ({ ...p, [topic]: null }))}>
                CHANGE
              </PixelButton>
            )}
          </div>
        </PixelCard>
      </div>
    </motion.div>
  );
}
