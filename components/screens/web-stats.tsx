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
  TrophyIcon, CalendarIcon, RacketIcon, ShuttleIcon, CoinIcon, CrownIcon,
} from "@/components/icons/pixel-icons";
import { usePlayers } from "@/lib/hooks/use-players";

const WEEKS = [
  { label: "W1", value: 65, sessions: 3 },
  { label: "W2", value: 78, sessions: 4 },
  { label: "W3", value: 92, sessions: 4 },
  { label: "W4", value: 88, sessions: 3 },
  { label: "W5", value: 95, sessions: 4 },
  { label: "W6", value: 71, sessions: 2 },
  { label: "W7", value: 84, sessions: 3 },
  { label: "W8", value: 90, sessions: 4 },
];

const SPENDING = [
  { label: "Courts",        value: 1200000, color: "var(--accent)" },
  { label: "Shuttlecocks",  value: 480000,  color: "var(--cyan)" },
  { label: "Snacks",        value: 240000,  color: "var(--yellow)" },
  { label: "Equipment",     value: 180000,  color: "var(--pink)" },
];

export function WebStats() {
  const [range] = useState("month");
  const total = SPENDING.reduce((s, x) => s + x.value, 0);
  const { data: players = [] } = usePlayers();

  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ ANALYTICS / STATS</div>
          <h1>CLUB STATISTICS</h1>
          <div className="web-sub">VietSeeds Smashers · Season 3 · Updated 2 minutes ago</div>
        </div>
        <Pills
          tabs={[
            { id: "week",  label: "WEEK" },
            { id: "month", label: "MONTH" },
            { id: "year",  label: "YEAR" },
          ]}
          current={range}
          onChange={() => {}}
        />
      </div>

      {/* KPIs */}
      <div className="web-kpi-row">
        <WebKPITile label="CLUB HEALTH" value="EXCELLENT" delta="↑ 12% vs last month" color="var(--accent)" icon={<TrophyIcon size={64} color="var(--accent)" />} />
        <WebKPITile label="SESSIONS"    value="14"  delta="this month · 84% turnout" color="var(--cyan)"    icon={<CalendarIcon size={64} color="var(--cyan)" />} />
        <WebKPITile label="MATCHES"     value="142" delta="91% completed"             color="var(--accent-2)" icon={<RacketIcon size={64} color="var(--accent-2)" />} />
        <WebKPITile label="SHUTTLES"    value="56"  delta="4 per session"             color="var(--accent-2)" icon={<ShuttleIcon size={64} color="var(--accent-2)" />} />
        <WebKPITile label="SPENT"       value="2.1M" delta="VND · within budget"      color="var(--yellow)"  icon={<CoinIcon size={64} />} />
        <WebKPITile label="MVPs"        value="4"   delta="rotating leaders"          color="var(--orange)"  icon={<CrownIcon size={64} color="var(--orange)" />} />
      </div>

      <div className="web-cols-2" style={{ marginBottom: 16 }}>
        {/* Bar chart */}
        <PixelCard variant="default" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionTitle>Weekly Attendance</SectionTitle>
            <PixelBadge variant="accent">AVG 84%</PixelBadge>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 220, padding: "0 6px" }}>
            {WEEKS.map((w, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div className="pixel-xs" style={{ color: "var(--accent)" }}>{w.value}</div>
                <div
                  style={{
                    width: "100%",
                    height: `${w.value}%`,
                    background: "repeating-linear-gradient(0deg, var(--accent) 0 6px, var(--accent-2) 6px 12px)",
                    boxShadow: "0 0 10px var(--accent-glow), inset 0 -3px 0 rgba(0,0,0,0.25)",
                    transition: "height 600ms ease-out",
                    cursor: "pointer",
                  }}
                  title={`${w.value}% · ${w.sessions} sessions`}
                />
                <div className="pixel-xs" style={{ color: "var(--text-3)" }}>{w.label}</div>
              </div>
            ))}
          </div>
        </PixelCard>

        {/* Spending */}
        <PixelCard variant="default" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionTitle>Spending Breakdown</SectionTitle>
            <span className="pixel-lg" style={{ color: "var(--yellow)" }}>{total.toLocaleString()} ₫</span>
          </div>
          <div style={{ display: "flex", height: 18, marginTop: 12, boxShadow: "inset 0 0 0 2px var(--bg-3)" }}>
            {SPENDING.map(s => (
              <div
                key={s.label}
                style={{
                  width: `${(s.value / total) * 100}%`,
                  background: s.color,
                  boxShadow: `0 0 8px ${s.color}88`,
                }}
              />
            ))}
          </div>
          <table className="web-tbl" style={{ marginTop: 16 }}>
            <thead>
              <tr>
                <th>CATEGORY</th><th>%</th><th style={{ textAlign: "right" }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {SPENDING.map(s => (
                <tr key={s.label}>
                  <td>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 12, height: 12, background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                      <span style={{ color: "var(--text-0)" }}>{s.label}</span>
                    </div>
                  </td>
                  <td><span className="pixel-sm" style={{ color: "var(--text-2)" }}>{((s.value / total) * 100).toFixed(0)}%</span></td>
                  <td style={{ textAlign: "right" }}><span className="pixel-sm" style={{ color: "var(--text-0)" }}>{s.value.toLocaleString()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </PixelCard>
      </div>

      {/* Full leaderboard */}
      <PixelCard variant="default" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 18px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SectionTitle>Full Leaderboard</SectionTitle>
            <PixelButton variant="ghost" size="sm">⤓ EXPORT CSV</PixelButton>
          </div>
        </div>
        <table className="web-tbl" style={{ marginTop: 14 }}>
          <thead>
            <tr>
              <th>RANK</th><th>PLAYER</th><th>LV</th><th>WINS</th>
              <th>ATTENDANCE</th><th>STREAK</th><th>XP</th>
            </tr>
          </thead>
          <tbody>
            {[...players].sort((a, b) => b.wins - a.wins).map((p, i) => (
              <tr key={p.id}>
                <td>
                  <span className="pixel-md" style={{
                    color: i === 0 ? "var(--yellow)" : i === 1 ? "var(--text-2)" : i === 2 ? "var(--orange)" : "var(--text-3)",
                  }}>
                    {i === 0 ? <CrownIcon size={16} color="var(--yellow)" /> : `#${i + 1}`}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <PixelAvatar seed={p.nick} size="sm" />
                    <div>
                      <div style={{ color: "var(--text-0)" }}>{p.name}</div>
                      <div className="pixel-xs" style={{ color: "var(--text-3)" }}>@{p.nick}</div>
                    </div>
                  </div>
                </td>
                <td><span className="pixel-sm" style={{ color: "var(--accent)" }}>LV.{p.level}</span></td>
                <td><span style={{ color: "var(--yellow)" }}>{p.wins}W</span></td>
                <td style={{ minWidth: 120 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ flex: 1, maxWidth: 100 }}>
                      <XPBar value={p.attendance} max={100} height={6} />
                    </div>
                    <span className="pixel-xs">{p.attendance}%</span>
                  </div>
                </td>
                <td><span style={{ color: "var(--orange)" }}>🔥 {p.streak}</span></td>
                <td><span className="pixel-sm" style={{ color: "var(--accent-2)" }}>{p.xp.toLocaleString()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </PixelCard>
    </div>
  );
}
