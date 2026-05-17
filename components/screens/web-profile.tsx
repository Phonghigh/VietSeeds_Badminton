"use client";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { XPBar } from "@/components/ui/xp-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { WebKPITile } from "@/components/screens/web-home";
import {
  TrophyIcon, CalendarIcon, RacketIcon, FireIcon, StarIcon, CrownIcon,
  MedalIcon, HeartIcon,
} from "@/components/icons/pixel-icons";
import { ME, ACHIEVEMENTS } from "@/lib/data";

const ACHIEVEMENT_ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  racket: RacketIcon as React.FC<{ size?: number; color?: string }>,
  fire:   FireIcon   as React.FC<{ size?: number; color?: string }>,
  star:   StarIcon   as React.FC<{ size?: number; color?: string }>,
  crown:  CrownIcon  as React.FC<{ size?: number; color?: string }>,
  medal:  MedalIcon  as React.FC<{ size?: number; color?: string }>,
  heart:  HeartIcon  as React.FC<{ size?: number; color?: string }>,
};

const HEATMAP_OPACITY = Array.from({ length: 30 }, (_, i) => {
  const seed = (i * 17) % 100;
  return seed > 75 ? 1 : seed > 50 ? 0.6 : seed > 25 ? 0.3 : 0.08;
});

export function WebProfile() {
  const p = ME;

  return (
    <div>
      <div className="web-main-head">
        <div>
          <div className="web-crumbs">▸ PROFILE</div>
          <h1>{p.name.toUpperCase()}</h1>
          <div className="web-sub">@{p.nick} · Member since Jan 2024</div>
        </div>
        <PixelButton variant="ghost" size="sm">EDIT PROFILE</PixelButton>
      </div>

      <div className="web-cols-2" style={{ marginBottom: 16 }}>
        {/* Profile card */}
        <PixelCard variant="elev" accent style={{ padding: 24 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ position: "relative" }}>
              <PixelAvatar seed={p.nick} size="xl" ring />
              <div style={{
                position: "absolute", bottom: -8, right: -8,
                background: "var(--yellow)", color: "#422006",
                padding: "4px 8px",
                fontFamily: "var(--font-pixel)", fontSize: 12,
                boxShadow: "0 0 0 3px var(--bg-2)",
              }}>
                LV.{p.level}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="pixel-md" style={{ color: "var(--text-0)" }}>{p.name}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <PixelBadge variant="accent"><CrownIcon size={10} /> SMASH MASTER</PixelBadge>
                <PixelBadge variant="yellow"><FireIcon size={10} /> {p.streak} STREAK</PixelBadge>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="pixel-xs" style={{ color: "var(--text-3)" }}>XP TO LV.{p.level + 1}</span>
                  <span className="pixel-xs" style={{ color: "var(--accent)" }}>{p.xp} / {p.xpMax}</span>
                </div>
                <XPBar value={p.xp} max={p.xpMax} />
              </div>
            </div>
          </div>
        </PixelCard>

        {/* KPI mini grid */}
        <div className="web-kpi-row" style={{ marginBottom: 0, gridTemplateColumns: "1fr 1fr" }}>
          <WebKPITile label="WINS"       value={p.wins}         color="var(--yellow)" icon={<TrophyIcon size={64} color="var(--yellow)" />} delta="+8 this month" />
          <WebKPITile label="ATTENDANCE" value={`${p.attendance}%`} color="var(--accent)" icon={<CalendarIcon size={64} color="var(--accent)" />} delta="↑ 4%" />
          <WebKPITile label="MATCHES"    value="142"            color="var(--cyan)"   icon={<RacketIcon size={64} color="var(--cyan)" />} delta="83% win rate" />
          <WebKPITile label="STREAK"     value={p.streak}       color="var(--orange)" icon={<FireIcon size={64} />} delta="best: 18" />
        </div>
      </div>

      <div className="web-cols-2" style={{ marginBottom: 16 }}>
        {/* Skills */}
        <PixelCard variant="default" style={{ padding: 18 }}>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            {[
              { label: "SMASH POWER", val: 92, color: "var(--danger)"  },
              { label: "STAMINA",     val: 78, color: "var(--accent)"  },
              { label: "ACCURACY",    val: 84, color: "var(--cyan)"    },
              { label: "STRATEGY",    val: 68, color: "var(--yellow)"  },
              { label: "TEAMWORK",    val: 88, color: "var(--pink)"    },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span className="pixel-xs" style={{ color: "var(--text-1)" }}>{s.label}</span>
                  <span className="pixel-xs" style={{ color: s.color }}>{s.val}</span>
                </div>
                <div style={{ height: 10, background: "var(--bg-1)" }}>
                  <div style={{ width: `${s.val}%`, height: "100%", background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
                </div>
              </div>
            ))}
          </div>
        </PixelCard>

        {/* 30-day heatmap */}
        <PixelCard variant="default" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SectionTitle>30-Day Attendance</SectionTitle>
            <span className="pixel-xs" style={{ color: "var(--accent)" }}>{p.attendance}%</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4, marginTop: 12 }}>
            {HEATMAP_OPACITY.map((opacity, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  background: "var(--accent)",
                  opacity,
                  boxShadow: opacity > 0.5 ? "0 0 8px var(--accent-glow)" : "none",
                }}
              />
            ))}
          </div>
        </PixelCard>
      </div>

      {/* Achievements */}
      <PixelCard variant="default" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <SectionTitle>Trophy Cabinet</SectionTitle>
          <PixelBadge variant="accent">{ACHIEVEMENTS.filter(a => a.earned).length}/{ACHIEVEMENTS.length}</PixelBadge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {ACHIEVEMENTS.map(a => {
            const Icon = ACHIEVEMENT_ICONS[a.icon];
            return (
              <div
                key={a.id}
                style={{
                  background: "var(--bg-1)", padding: 16, textAlign: "center", position: "relative",
                  opacity: a.earned ? 1 : 0.4,
                  boxShadow: a.earned
                    ? `inset 0 0 0 2px ${a.color}, 0 0 16px ${a.color}33`
                    : "inset 0 0 0 2px var(--bg-3)",
                }}
              >
                <div style={{ margin: "8px auto 12px" }}>{Icon && <Icon size={44} color={a.color} />}</div>
                <div className="pixel-sm" style={{ color: a.earned ? "var(--text-0)" : "var(--text-3)" }}>{a.name.toUpperCase()}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 6 }}>{a.desc}</div>
                <div className="pixel-xs" style={{ color: a.color, marginTop: 8, fontSize: 8 }}>{a.rarity.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      </PixelCard>
    </div>
  );
}
