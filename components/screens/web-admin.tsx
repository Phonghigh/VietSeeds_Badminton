"use client";
import { useState } from "react";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { Pills } from "@/components/ui/pills";
import { WebKPITile } from "@/components/screens/web-home";
import {
  PlusIcon, CrownIcon, TrophyIcon, CalendarIcon, ShuttleIcon, CheckIcon, CoinIcon,
} from "@/components/icons/pixel-icons";
import { usePlayers } from "@/lib/hooks/use-players";

// ── Admin Users ───────────────────────────────────────────────
export function WebAdminUsers() {
  const [search, setSearch] = useState("");
  const { data: players = [] } = usePlayers();
  const filtered = players.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) || p.nick.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ ADMIN / MEMBERS</div>
          <h1>MEMBER MANAGEMENT</h1>
          <div className="web-sub">{players.length} active members · 2 captains · 1 invitation pending</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <PixelButton variant="ghost" size="sm">⤓ EXPORT</PixelButton>
          <PixelButton variant="primary" size="sm" icon={<PlusIcon size={10} color="var(--accent-ink)" />}>
            INVITE MEMBER
          </PixelButton>
        </div>
      </div>

      <div className="web-kpi-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <WebKPITile label="TOTAL MEMBERS" value={players.length}                                           color="var(--accent)"  delta="+2 this month" />
        <WebKPITile label="ACTIVE"        value={players.filter(p => p.attendance >= 70).length}           color="var(--accent-2)" delta="≥ 70% attendance" />
        <WebKPITile label="AT-RISK"       value={players.filter(p => p.attendance < 70).length}            color="var(--danger)"  delta="< 70% attendance" />
        <WebKPITile label="AVG LEVEL"     value={players.length ? Math.round(players.reduce((s, p) => s + p.level, 0) / players.length) : 0} color="var(--yellow)" delta={players.length ? `spread ${Math.min(...players.map(p => p.level))}-${Math.max(...players.map(p => p.level))}` : "—"} />
      </div>

      <PixelCard variant="default" style={{ padding: 0, overflow: "hidden", marginTop: 16 }}>
        <div style={{ padding: 18, borderBottom: "2px solid var(--border-soft)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search members…"
              style={{
                flex: 1, padding: "10px 14px",
                background: "var(--bg-1)", color: "var(--text-0)",
                border: 0, boxShadow: "inset 0 0 0 2px var(--border-soft)",
                fontFamily: "var(--font-body)", fontSize: 13,
              }}
            />
            <Pills
              tabs={[
                { id: "all",    label: "ALL" },
                { id: "admins", label: "CAPTAINS" },
                { id: "risk",   label: "AT-RISK" },
              ]}
              current="all"
              onChange={() => {}}
            />
          </div>
        </div>
        <table className="web-tbl">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>MEMBER</th><th>ROLE</th><th>LEVEL</th>
              <th>ATTENDANCE</th><th>STREAK</th><th>JOINED</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <PixelAvatar seed={p.nick} size="sm" />
                    <div>
                      <div style={{ color: "var(--text-0)" }}>{p.name}</div>
                      <div className="pixel-xs" style={{ color: "var(--text-3)" }}>@{p.nick}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {p.role === "admin"
                    ? <PixelBadge variant="yellow"><CrownIcon size={10} /> CAPTAIN</PixelBadge>
                    : <PixelBadge>PLAYER</PixelBadge>}
                </td>
                <td><span className="pixel-sm" style={{ color: "var(--accent)" }}>LV.{p.level}</span></td>
                <td style={{ minWidth: 140 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <XPBar value={p.attendance} max={100} height={6} color={p.attendance < 70 ? "danger" : "accent"} />
                    </div>
                    <span className="pixel-xs" style={{ color: p.attendance < 70 ? "var(--danger)" : "var(--text-1)" }}>
                      {p.attendance}%
                    </span>
                  </div>
                </td>
                <td><span style={{ color: "var(--orange)" }}>🔥 {p.streak}</span></td>
                <td><span className="pixel-xs" style={{ color: "var(--text-3)" }}>Jan 2024</span></td>
                <td>
                  <PixelButton variant="ghost" size="sm">⋯</PixelButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PixelCard>
    </div>
  );
}

// ── Admin Reports ─────────────────────────────────────────────
export function WebAdminReports() {
  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ ADMIN / REPORTS</div>
          <h1>REPORTS & EXPORTS</h1>
          <div className="web-sub">Generate financial, attendance, and player reports</div>
        </div>
      </div>

      <div className="web-cols-3" style={{ marginBottom: 16 }}>
        {[
          { name: "Monthly Financial",   desc: "Court costs, shuttlecock spend, per-player breakdown",   icon: <CoinIcon size={32} />,                             color: "var(--yellow)"  },
          { name: "Attendance Report",   desc: "30/90 day attendance trends, at-risk members",           icon: <CalendarIcon size={32} color="var(--accent)" />,    color: "var(--accent)"  },
          { name: "Player Performance",  desc: "Win rates, match counts, MVP rotation",                  icon: <TrophyIcon size={32} color="var(--cyan)" />,        color: "var(--cyan)"    },
          { name: "Session Audit",       desc: "Per-session expenses, attendance, photos",               icon: <ShuttleIcon size={32} color="var(--accent-2)" />,   color: "var(--accent-2)"},
          { name: "Vote History",        desc: "Past polls, participation rates, decisions",             icon: <CheckIcon size={32} color="var(--pink)" />,         color: "var(--pink)"    },
          { name: "Tax Summary",         desc: "Annual financial summary for accounting",                icon: <CoinIcon size={32} />,                              color: "var(--orange)"  },
        ].map((r, i) => (
          <PixelCard key={i} variant="default" style={{ padding: 18 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{
                width: 60, height: 60, background: "var(--bg-1)",
                display: "grid", placeItems: "center",
                boxShadow: `inset 0 0 0 2px ${r.color}, 0 0 14px ${r.color}33`,
              }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="pixel-sm" style={{ color: "var(--text-0)" }}>{r.name.toUpperCase()}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>{r.desc}</div>
              </div>
            </div>
            <div className="web-card-foot">
              <PixelButton variant="ghost" size="sm">PREVIEW</PixelButton>
              <PixelButton variant="primary" size="sm">⤓ EXPORT PDF</PixelButton>
            </div>
          </PixelCard>
        ))}
      </div>

      <PixelCard variant="default" style={{ padding: 18 }}>
        <SectionTitle>Recent Exports</SectionTitle>
        <table className="web-tbl" style={{ marginTop: 12 }}>
          <thead><tr><th>REPORT</th><th>GENERATED BY</th><th>DATE</th><th>SIZE</th><th></th></tr></thead>
          <tbody>
            {[
              { name: "Monthly Financial - May 2026", by: "Minh", date: "2 days ago",  size: "124 KB" },
              { name: "Attendance Q1 2026",           by: "Long", date: "1 week ago",  size: "88 KB"  },
              { name: "Player Performance - Apr",     by: "Minh", date: "3 weeks ago", size: "156 KB" },
            ].map((r, i) => (
              <tr key={i}>
                <td><span style={{ color: "var(--text-0)" }}>📄 {r.name}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <PixelAvatar seed={r.by} size="xs" />
                    <span style={{ color: "var(--text-1)" }}>{r.by}</span>
                  </div>
                </td>
                <td><span className="pixel-xs" style={{ color: "var(--text-3)" }}>{r.date.toUpperCase()}</span></td>
                <td><span className="pixel-xs" style={{ color: "var(--text-3)" }}>{r.size}</span></td>
                <td><PixelButton variant="ghost" size="sm">⤓ DOWNLOAD</PixelButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PixelCard>
    </div>
  );
}

// ── Admin Settings ────────────────────────────────────────────
export function WebAdminSettings() {
  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ ADMIN / SETTINGS</div>
          <h1>CLUB SETTINGS</h1>
          <div className="web-sub">Configure your community</div>
        </div>
      </div>

      <div className="web-cols-2">
        <PixelCard variant="default" style={{ padding: 18 }}>
          <SectionTitle>Club Identity</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
            <div>
              <div className="pixel-xs" style={{ color: "var(--text-3)", marginBottom: 6 }}>CLUB NAME</div>
              <input
                defaultValue="VietSeeds Smashers"
                style={{
                  width: "100%", padding: "10px 14px",
                  background: "var(--bg-1)", color: "var(--text-0)",
                  border: 0, boxShadow: "inset 0 0 0 2px var(--border-soft)",
                  fontFamily: "var(--font-body)", fontSize: 14,
                }}
              />
            </div>
            <div>
              <div className="pixel-xs" style={{ color: "var(--text-3)", marginBottom: 6 }}>LOCATION</div>
              <input
                defaultValue="Ho Chi Minh City, Vietnam"
                style={{
                  width: "100%", padding: "10px 14px",
                  background: "var(--bg-1)", color: "var(--text-0)",
                  border: 0, boxShadow: "inset 0 0 0 2px var(--border-soft)",
                  fontFamily: "var(--font-body)", fontSize: 14,
                }}
              />
            </div>
          </div>
        </PixelCard>

        <PixelCard variant="default" style={{ padding: 18 }}>
          <SectionTitle>Session Defaults</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
            {[
              { label: "Default capacity",        value: "12 players" },
              { label: "Default duration",        value: "2 hours"    },
              { label: "Auto-pair matches",       badge: "accent",  text: "ENABLED"   },
              { label: "Public voting",           badge: "accent",  text: "ENABLED"   },
              { label: "XP rewards",              badge: "accent",  text: "ENABLED"   },
              { label: "Captain approval required", badge: "default", text: "DISABLED" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--text-1)" }}>{row.label}</span>
                {"value" in row
                  ? <span className="pixel-sm" style={{ color: "var(--accent)" }}>{row.value}</span>
                  : <PixelBadge variant={row.badge as "accent" | "default"}>{row.text}</PixelBadge>}
              </div>
            ))}
          </div>
        </PixelCard>
      </div>
    </div>
  );
}
