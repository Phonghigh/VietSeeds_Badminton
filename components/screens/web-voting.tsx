"use client";
import { useState } from "react";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { AvatarStack } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { Pills } from "@/components/ui/pills";
import { BoltIcon, CheckIcon, CrownIcon } from "@/components/icons/pixel-icons";
import { COURTS, findPlayer } from "@/lib/data";

type VoteStyle = "bars" | "cards" | "versus";
type Picks = Record<string, string | null>;

const COURT_VOTES = [
  { id: "a", label: COURTS[0].name, area: COURTS[0].area, price: COURTS[0].price, votes: 7,  voters: [1, 3, 7, 9, 11, 6, 2] },
  { id: "b", label: COURTS[1].name, area: COURTS[1].area, price: COURTS[1].price, votes: 3,  voters: [5, 8, 12] },
  { id: "c", label: COURTS[2].name, area: COURTS[2].area, price: COURTS[2].price, votes: 1,  voters: [4] },
  { id: "d", label: COURTS[3].name, area: COURTS[3].area, price: COURTS[3].price, votes: 0,  voters: [] },
] as const;

const TIME_VOTES = [
  { id: "t1", label: "18:00 – 20:00", votes: 4, voters: [1, 3, 9, 11] },
  { id: "t2", label: "19:30 – 21:30", votes: 6, voters: [2, 5, 6, 7, 8, 12] },
  { id: "t3", label: "20:00 – 22:00", votes: 2, voters: [4, 10] },
] as const;

const POLLS = [
  { topic: "court", title: "Where should we play Thursday night?", num: "25", options: COURT_VOTES as readonly {id:string;label:string;votes:number;voters:readonly number[];area?:string;price?:number}[] },
  { topic: "time",  title: "What time works for everyone?",        num: "26", options: TIME_VOTES  as readonly {id:string;label:string;votes:number;voters:readonly number[];area?:string;price?:number}[] },
];

export function WebVoting() {
  const [picks, setPicks] = useState<Picks>({});
  const [voteStyle, setVoteStyle] = useState<VoteStyle>("bars");

  const cast = (topic: string, id: string) => {
    setPicks(p => ({ ...p, [topic]: id }));
  };

  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ VOTING BOOTH</div>
          <h1>OPEN POLLS</h1>
          <div className="web-sub">
            3 active polls · Closes in <b style={{ color: "var(--yellow)" }}>3h 24m</b>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Pills
            tabs={[
              { id: "bars",   label: "BARS" },
              { id: "cards",  label: "CARDS" },
              { id: "versus", label: "VS-MODE" },
            ]}
            current={voteStyle}
            onChange={v => setVoteStyle(v as VoteStyle)}
          />
          <PixelBadge variant="accent" icon={<BoltIcon size={10} />}>+20 XP / VOTE</PixelBadge>
        </div>
      </div>

      <div className="web-cols-2">
        {POLLS.map(poll => {
          const total = poll.options.reduce((s, o) => s + o.votes, 0);
          const myPick = picks[poll.topic];
          const sortedTop2 = [...poll.options].sort((a, b) => b.votes - a.votes);

          return (
            <PixelCard key={poll.topic} variant="elev" accent style={{ padding: 18, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div className="pixel-xs" style={{ color: "var(--accent)" }}>▸ POLL #{poll.num} · ACTIVE</div>
                  <div className="pixel-md" style={{ color: "var(--text-0)", marginTop: 8, lineHeight: 1.3 }}>{poll.title}</div>
                </div>
                <PixelBadge variant="accent">{total} VOTES</PixelBadge>
              </div>

              {voteStyle === "bars" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {poll.options.map(o => {
                    const pct = total ? (o.votes / total) * 100 : 0;
                    const picked = myPick === o.id;
                    const leading = poll.options.every(x => o.votes >= x.votes) && o.votes > 0;
                    return (
                      <button key={o.id} onClick={() => cast(poll.topic, o.id)} style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "none" }}>
                        <div style={{
                          position: "relative",
                          background: "var(--bg-1)", padding: 14, overflow: "hidden",
                          boxShadow: picked
                            ? "0 0 0 2px var(--accent), 0 0 20px var(--accent-glow)"
                            : "inset 0 0 0 2px var(--border-soft)",
                          transition: "all 200ms ease-out",
                        }}>
                          <div style={{
                            position: "absolute", left: 0, top: 0, bottom: 0,
                            width: `${pct}%`,
                            background: picked
                              ? "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)"
                              : leading
                                ? "linear-gradient(90deg, var(--accent-glow-soft) 0%, transparent 100%)"
                                : "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                            transition: "width 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                          }} />
                          <div style={{ position: "relative", display: "flex", gap: 10, alignItems: "center" }}>
                            <div style={{
                              width: 28, height: 28,
                              background: picked ? "var(--accent-ink)" : leading ? "var(--accent)" : "var(--bg-2)",
                              display: "grid", placeItems: "center",
                            }}>
                              {picked ? <CheckIcon size={14} /> : leading ? <CrownIcon size={14} color="var(--yellow)" /> : <span className="pixel-sm">{o.id.slice(-1).toUpperCase()}</span>}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, color: "var(--text-0)", fontWeight: 600 }}>{o.label}</div>
                              {"area" in o && o.area && (
                                <div className="pixel-xs" style={{ color: "var(--text-3)" }}>
                                  {o.area} · {((o.price ?? 0) / 1000).toFixed(0)}K ₫/hr
                                </div>
                              )}
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div className="pixel-md" style={{ color: picked ? "var(--accent)" : "var(--text-0)" }}>{pct.toFixed(0)}%</div>
                              <div className="pixel-xs" style={{ color: "var(--text-3)" }}>{o.votes} votes</div>
                            </div>
                          </div>
                          {o.voters.length > 0 && (
                            <div style={{ marginTop: 10, position: "relative" }}>
                              <AvatarStack
                                seeds={(o.voters as number[]).map(id => findPlayer(id)?.nick ?? "?")}
                                max={8}
                                size="xs"
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {voteStyle === "cards" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {poll.options.map(o => {
                    const pct = total ? (o.votes / total) * 100 : 0;
                    const picked = myPick === o.id;
                    const leading = poll.options.every(x => o.votes >= x.votes) && o.votes > 0;
                    return (
                      <button key={o.id} onClick={() => cast(poll.topic, o.id)} style={{ display: "block", textAlign: "left", border: "none", background: "none" }}>
                        <div style={{
                          background: "var(--bg-1)", padding: 14, minHeight: 160,
                          display: "flex", flexDirection: "column",
                          boxShadow: picked
                            ? "0 0 0 3px var(--accent), 0 0 24px var(--accent-glow)"
                            : leading ? "inset 0 0 0 2px var(--accent)" : "inset 0 0 0 2px var(--border-soft)",
                        }}>
                          {leading && !picked && <div style={{ alignSelf: "flex-end" }}><CrownIcon size={16} color="var(--yellow)" /></div>}
                          {picked && <div style={{ alignSelf: "flex-end" }}><CheckIcon size={14} color="var(--accent)" /></div>}
                          <div className="pixel-sm" style={{ color: "var(--text-0)", marginTop: 8 }}>{o.label.toUpperCase()}</div>
                          {"area" in o && o.area && <div className="pixel-xs" style={{ color: "var(--text-3)", marginTop: 4 }}>{o.area}</div>}
                          <div style={{ marginTop: "auto", paddingTop: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                              <span className="pixel-xs" style={{ color: "var(--text-3)" }}>{o.votes}V</span>
                              <span className="pixel-md" style={{ color: picked ? "var(--accent)" : "var(--text-0)" }}>{pct.toFixed(0)}%</span>
                            </div>
                            <XPBar value={o.votes} max={Math.max(total, 1)} height={6} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {voteStyle === "versus" && (() => {
                const A = sortedTop2[0];
                const B = sortedTop2[1];
                const t2 = (A?.votes ?? 0) + (B?.votes ?? 0);
                const pctA = t2 ? (A.votes / t2) * 100 : 50;
                const pctB = 100 - pctA;
                return (
                  <div style={{
                    background: "linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%)",
                    padding: 18, position: "relative", overflow: "hidden",
                    boxShadow: "inset 0 0 0 2px var(--border-mid)",
                  }}>
                    <div style={{ position: "absolute", top: -40, left: -20, width: 140, height: 140, background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: -40, right: -20, width: 140, height: 140, background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 60%)" }} />
                    <div style={{ display: "flex", gap: 10, alignItems: "center", position: "relative" }}>
                      <button onClick={() => cast(poll.topic, A.id)} style={{ flex: 1, textAlign: "left", border: "none", background: "none" }}>
                        <div className="pixel-xs" style={{ color: "var(--accent)" }}>FIGHTER A</div>
                        <div className="pixel-sm" style={{ color: "var(--text-0)", marginTop: 8, lineHeight: 1.2 }}>{A.label}</div>
                        <div className="pixel-xl animate-pulse-glow" style={{ color: "var(--accent)", marginTop: 14, fontSize: 32 }}>{pctA.toFixed(0)}%</div>
                      </button>
                      <div className="pixel-xl animate-flicker" style={{ color: "var(--yellow)", fontSize: 36 }}>VS</div>
                      <button onClick={() => cast(poll.topic, B.id)} style={{ flex: 1, textAlign: "right", border: "none", background: "none" }}>
                        <div className="pixel-xs" style={{ color: "var(--pink)" }}>FIGHTER B</div>
                        <div className="pixel-sm" style={{ color: "var(--text-0)", marginTop: 8, lineHeight: 1.2 }}>{B.label}</div>
                        <div className="pixel-xl" style={{ color: "var(--pink)", marginTop: 14, fontSize: 32 }}>{pctB.toFixed(0)}%</div>
                      </button>
                    </div>
                    <div style={{ marginTop: 14, height: 14, background: "var(--bg-0)", display: "flex", boxShadow: "inset 0 0 0 2px var(--border-mid)" }}>
                      <div style={{ width: `${pctA}%`, background: "linear-gradient(90deg, var(--accent), var(--accent-2))", boxShadow: "0 0 12px var(--accent-glow)" }} />
                      <div style={{ width: `${pctB}%`, background: "linear-gradient(90deg, var(--pink), #BE185D)" }} />
                    </div>
                  </div>
                );
              })()}

              <div className="web-card-foot" style={{ marginTop: 14 }}>
                <span className="pixel-xs" style={{ flex: 1, color: "var(--text-3)" }}>
                  YOUR VOTE:{" "}
                  <b style={{ color: myPick ? "var(--accent)" : "var(--text-3)" }}>
                    {myPick ? (poll.options.find(o => o.id === myPick)?.label ?? "—") : "NOT CAST"}
                  </b>
                </span>
                {myPick && (
                  <PixelButton variant="ghost" size="sm" onClick={() => setPicks(p => ({ ...p, [poll.topic]: null }))}>
                    CHANGE VOTE
                  </PixelButton>
                )}
              </div>
            </PixelCard>
          );
        })}
      </div>
    </div>
  );
}
