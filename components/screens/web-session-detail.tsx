"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { Pills } from "@/components/ui/pills";
import {
  CheckIcon, XIcon, ClockIcon, PinIcon, ShuttleIcon, HeartIcon, CrownIcon,
} from "@/components/icons/pixel-icons";
import { findPlayer } from "@/lib/data";
import type { Session } from "@/lib/data";

type Tab = "overview" | "roster" | "matches" | "costs" | "photos";

export function WebSessionDetail({ session: s }: { session: Session }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");

  const going   = s.going.map(findPlayer);
  const maybe   = (s.maybe   ?? []).map(findPlayer);
  const absent  = (s.notGoing ?? []).map(findPlayer);
  const totalCost = s.cost ?? 480000;
  const perPlayer = Math.round(totalCost / Math.max(1, going.length));
  const pct = Math.round((going.length / s.capacity) * 100);

  return (
    <div>
      {/* Header */}
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">
            <button
              onClick={() => router.push("/dashboard/sessions")}
              style={{ background: "none", color: "var(--text-3)", fontFamily: "var(--font-pixel)", fontSize: 8, cursor: "pointer", border: "none" }}
            >
              ▸ SESSIONS
            </button>
            <span style={{ color: "var(--text-3)", fontFamily: "var(--font-pixel)", fontSize: 8 }}>
              {" "}/ {s.title.toUpperCase()}
            </span>
          </div>
          <h1>{s.title}</h1>
          <div className="web-sub">
            <span style={{ color: "var(--text-1)" }}>{s.date} · {s.time}</span> · {s.court.name}
            <PixelBadge variant={s.status === "live" ? "danger" : "accent"} style={{ marginLeft: 12 }}>
              {s.status.toUpperCase()}
            </PixelBadge>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <PixelButton variant="ghost" size="sm" icon={<XIcon size={10} color="var(--danger)" />}>CAN&apos;T GO</PixelButton>
          <PixelButton variant="ghost" size="sm" icon={<ClockIcon size={10} color="var(--yellow)" />}>MAYBE</PixelButton>
          <PixelButton variant="primary" size="sm" icon={<CheckIcon size={10} color="var(--accent-ink)" />}>I&apos;M IN</PixelButton>
        </div>
      </div>

      {/* Hero strip */}
      <div className="web-cols-3" style={{ marginBottom: 16 }}>
        <PixelCard variant="elev" accent style={{ padding: 18, gridColumn: "span 2" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div
              className="ring-chart flex-shrink-0"
              style={{ "--val": pct, "--size": "128px", "--thick": "12px" } as React.CSSProperties}
            >
              <div style={{ textAlign: "center" }}>
                <div className="pixel-xl" style={{ color: "var(--accent)", fontSize: 22 }}>{pct}%</div>
                <div className="pixel-xs" style={{ color: "var(--text-3)", fontSize: 8 }}>ROSTER</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="pixel-xs" style={{ color: "var(--accent)" }}>SESSION STATUS</div>
              <div className="pixel-lg" style={{ color: "var(--text-0)", marginTop: 8 }}>
                {going.length} / {s.capacity} PLAYERS LOCKED IN
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <PixelBadge variant="accent">{going.length} GOING</PixelBadge>
                {maybe.length > 0 && <PixelBadge variant="yellow">{maybe.length} MAYBE</PixelBadge>}
                {absent.length > 0 && <PixelBadge variant="danger">{absent.length} OUT</PixelBadge>}
              </div>
              <div style={{ marginTop: 14 }}>
                <XPBar value={going.length} max={s.capacity} />
              </div>
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="default" style={{ padding: 18 }}>
          <SectionTitle>Court Cost</SectionTitle>
          <div className="pixel-xl" style={{ color: "var(--yellow)", marginTop: 10 }}>
            {totalCost.toLocaleString()}<span style={{ fontSize: 10, marginLeft: 4 }}>VND</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-3)" }}>Per player</span>
            <span className="pixel-sm" style={{ color: "var(--accent)" }}>{perPlayer.toLocaleString()} ₫</span>
          </div>
        </PixelCard>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 16 }}>
        <Pills
          tabs={[
            { id: "overview", label: "OVERVIEW" },
            { id: "roster",   label: "ROSTER" },
            { id: "matches",  label: "MATCHES" },
            { id: "costs",    label: "COSTS" },
            { id: "photos",   label: "PHOTOS" },
          ]}
          current={tab}
          onChange={v => setTab(v as Tab)}
        />
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div className="web-cols-2">
          <PixelCard variant="default" style={{ padding: 18 }}>
            <SectionTitle>Roster Quick View</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
              {going.map(p => (
                <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
                  <PixelAvatar seed={p.nick} size="xs" />
                  <span style={{ flex: 1, fontSize: 13, color: "var(--text-0)" }}>{p.name}</span>
                  <span className="pixel-xs" style={{ color: "var(--text-3)" }}>LV.{p.level}</span>
                </div>
              ))}
            </div>
          </PixelCard>
          <PixelCard variant="default" style={{ padding: 18 }}>
            <SectionTitle>Court Info</SectionTitle>
            <div className="pix-divider" style={{ marginTop: 12 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-3)" }}>Venue</span>
              <span style={{ fontSize: 13 }}>{s.court.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-3)" }}>Area</span>
              <span style={{ fontSize: 13 }}>{s.court.area}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--text-3)" }}>Rate</span>
              <span className="pixel-sm" style={{ color: "var(--yellow)" }}>{(s.court.price / 1000).toFixed(0)}K ₫/hr</span>
            </div>
          </PixelCard>
        </div>
      )}

      {tab === "roster" && (
        <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
          <table className="web-tbl">
            <thead>
              <tr>
                <th>PLAYER</th><th>LV</th><th>STREAK</th><th>STATUS</th><th>PAID</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...going.map(p => ({ p, status: "going" as const })),
                ...maybe.map(p => ({ p, status: "maybe" as const })),
                ...absent.map(p => ({ p, status: "out" as const })),
              ].map(({ p, status }, i) => (
                <tr key={p.id + status}>
                  <td>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <PixelAvatar seed={p.nick} size="sm" />
                      <div>
                        <div style={{ color: "var(--text-0)" }}>{p.name}</div>
                        <div className="pixel-xs" style={{ color: "var(--text-3)" }}>@{p.nick}</div>
                      </div>
                      {p.role === "admin" && <PixelBadge variant="yellow"><CrownIcon size={10} /> CAPT</PixelBadge>}
                    </div>
                  </td>
                  <td><span className="pixel-sm" style={{ color: "var(--accent)" }}>LV.{p.level}</span></td>
                  <td><span style={{ color: "var(--orange)" }}>🔥 {p.streak}</span></td>
                  <td>
                    {status === "going"  && <PixelBadge variant="accent" icon={<CheckIcon size={10} />}>IN</PixelBadge>}
                    {status === "maybe"  && <PixelBadge variant="yellow"><ClockIcon size={10} color="var(--yellow)" /> MAYBE</PixelBadge>}
                    {status === "out"    && <PixelBadge variant="danger"><XIcon size={10} color="var(--danger)" /> OUT</PixelBadge>}
                  </td>
                  <td>
                    {status === "going"
                      ? (i < 3 ? <PixelBadge variant="accent">PAID</PixelBadge> : <PixelBadge variant="danger">PENDING</PixelBadge>)
                      : <span className="pixel-xs" style={{ color: "var(--text-3)" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PixelCard>
      )}

      {tab === "matches" && (
        <div className="web-cols-2">
          <PixelCard variant="default" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <SectionTitle>Match Pairings</SectionTitle>
              <PixelButton variant="ghost" size="sm">↻ RE-SHUFFLE</PixelButton>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([
                { court: 1, a: [going[0], going[1]], b: [going[2], going[3]], score: "21-18", winner: "A" },
                { court: 2, a: [going[4], going[5]], b: [going[6], going[0]], score: "LIVE",  winner: null },
                { court: 1, a: [going[2], going[5]], b: [going[1], going[4]], score: "21-15", winner: "A" },
              ] as { court: number; a: typeof going; b: typeof going; score: string; winner: "A" | "B" | null }[]).filter(m => m.a[0] && m.a[1] && m.b[0] && m.b[1]).map((m, i) => (
                <div key={i} style={{ background: "var(--bg-1)", padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span className="pixel-xs" style={{ color: "var(--text-3)" }}>COURT {m.court} · MATCH {i + 1}</span>
                    {m.score === "LIVE"
                      ? <span className="pixel-xs" style={{ color: "var(--danger)" }}>● LIVE</span>
                      : <span className="pixel-sm" style={{ color: "var(--accent)" }}>{m.score}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, opacity: m.winner === "A" ? 1 : m.winner === "B" ? 0.5 : 1 }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <PixelAvatar seed={m.a[0].nick} size="xs" />
                        <PixelAvatar seed={m.a[1].nick} size="xs" />
                      </div>
                      <div className="pixel-xs" style={{ color: "var(--text-1)", marginTop: 6 }}>
                        {m.a[0].nick} / {m.a[1].nick}
                      </div>
                    </div>
                    <div className="pixel-md" style={{ color: "var(--text-3)" }}>VS</div>
                    <div style={{ flex: 1, textAlign: "right", opacity: m.winner === "B" ? 1 : m.winner === "A" ? 0.5 : 1 }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <PixelAvatar seed={m.b[0].nick} size="xs" />
                        <PixelAvatar seed={m.b[1].nick} size="xs" />
                      </div>
                      <div className="pixel-xs" style={{ color: "var(--text-1)", marginTop: 6 }}>
                        {m.b[0].nick} / {m.b[1].nick}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PixelCard>

          <PixelCard variant="default" style={{ padding: 18 }}>
            <SectionTitle>Top Performers</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
              {going.slice(0, 5).map((p, i) => (
                <div key={p.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span className="pixel-md" style={{ width: 24, color: i === 0 ? "var(--yellow)" : "var(--text-2)" }}>{i + 1}</span>
                  <PixelAvatar seed={p.nick} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--text-0)" }}>{p.name}</div>
                    <div className="pixel-xs" style={{ color: "var(--text-3)" }}>{4 - i} WINS · 0 LOSS</div>
                  </div>
                  <span className="pixel-sm" style={{ color: "var(--accent)" }}>+{(4 - i) * 25} XP</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </div>
      )}

      {tab === "costs" && (
        <div className="web-cols-2">
          <PixelCard variant="default" style={{ padding: 18 }}>
            <SectionTitle>Breakdown</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              {[
                { label: "Court rental (2h)", amount: 300000, icon: <PinIcon size={14} color="var(--accent)" /> },
                { label: "Shuttlecocks × 4",  amount: 120000, icon: <ShuttleIcon size={14} color="var(--cyan)" /> },
                { label: "Drinks & snacks",   amount: 60000,  icon: <HeartIcon size={14} /> },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px dashed var(--border-soft)" : "none" }}>
                  {row.icon}
                  <span style={{ flex: 1, color: "var(--text-1)" }}>{row.label}</span>
                  <span className="pixel-sm" style={{ color: "var(--text-0)" }}>{row.amount.toLocaleString()} ₫</span>
                </div>
              ))}
              <div className="pix-divider" />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
                <span className="pixel-md" style={{ color: "var(--text-0)" }}>TOTAL</span>
                <span className="pixel-lg" style={{ color: "var(--yellow)" }}>{totalCost.toLocaleString()} ₫</span>
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 18px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SectionTitle>Payments</SectionTitle>
                <PixelBadge variant="accent">{going.length - 2}/{going.length} PAID</PixelBadge>
              </div>
            </div>
            <table className="web-tbl" style={{ marginTop: 12 }}>
              <thead><tr><th>PLAYER</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
              <tbody>
                {going.map((p, i) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <PixelAvatar seed={p.nick} size="xs" />
                        <span style={{ color: "var(--text-0)" }}>{p.name}</span>
                      </div>
                    </td>
                    <td><span className="pixel-sm" style={{ color: "var(--text-1)" }}>{perPlayer.toLocaleString()} ₫</span></td>
                    <td>
                      {i < going.length - 2
                        ? <PixelBadge variant="accent" icon={<CheckIcon size={10} />}>PAID</PixelBadge>
                        : <PixelBadge variant="danger">PENDING</PixelBadge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PixelCard>
        </div>
      )}

      {tab === "photos" && (
        <PixelCard variant="default" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <SectionTitle>Highlights</SectionTitle>
            <PixelButton variant="ghost" size="sm">📷 UPLOAD</PixelButton>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  background: "var(--bg-1)",
                  boxShadow: "inset 0 0 0 2px var(--border-soft)",
                  display: "grid", placeItems: "center",
                }}
              >
                <span style={{ fontSize: 24, opacity: 0.3 }}>📸</span>
              </div>
            ))}
          </div>
        </PixelCard>
      )}
    </div>
  );
}
