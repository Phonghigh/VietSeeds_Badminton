"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AvatarStack } from "@/components/ui/pixel-avatar";
import { PixelButton } from "@/components/ui/pixel-button";
import {
  HomeIcon, CalendarIcon, VoteIcon, StatsIcon, ProfileIcon, BoltIcon,
} from "@/components/icons/pixel-icons";
import { PLAYERS } from "@/lib/data";

const NAV_ITEMS = [
  { id: "home",     href: "/dashboard",         label: "Home",    Icon: HomeIcon },
  { id: "sessions", href: "/dashboard/sessions", label: "Sessions",Icon: CalendarIcon, num: 3 },
  { id: "votes",    href: "/dashboard/votes",    label: "Voting",  Icon: VoteIcon,    num: "3 OPEN" },
  { id: "stats",    href: "/dashboard/stats",    label: "Stats",   Icon: StatsIcon },
  { id: "profile",  href: "/dashboard/profile",  label: "Profile", Icon: ProfileIcon },
];

const ADMIN_ITEMS = [
  { id: "admin-users",    href: "/dashboard/admin/users",    label: "Members",  Icon: ProfileIcon },
  { id: "admin-reports",  href: "/dashboard/admin/reports",  label: "Reports",  Icon: StatsIcon },
  { id: "admin-settings", href: "/dashboard/admin/settings", label: "Settings", Icon: BoltIcon },
];

export function WebSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <aside className="web-sidebar">
      <div className="web-nav-section">── MAIN ──</div>
      {NAV_ITEMS.map(({ id, href, label, Icon, num }) => (
        <Link
          key={id}
          href={href}
          className={`web-side-link ${isActive(href) ? "active" : ""}`}
        >
          <Icon size={16} />
          <span className="nav-label">{label.toUpperCase()}</span>
          {num != null && <span className="num">{num}</span>}
        </Link>
      ))}

      <div className="web-nav-section">── ADMIN ──</div>
      {ADMIN_ITEMS.map(({ id, href, label, Icon }) => (
        <Link
          key={id}
          href={href}
          className={`web-side-link ${isActive(href) ? "active" : ""}`}
        >
          <Icon size={16} />
          <span className="nav-label">{label.toUpperCase()}</span>
        </Link>
      ))}

      <div className="web-community-card pixel-corners" style={{ marginTop: "auto" }}>
        <div className="pixel-xs" style={{ color: "var(--accent)" }}>▸ YOUR CLUB</div>
        <div className="pixel-md" style={{ color: "var(--text-0)", marginTop: 8 }}>VIETSEEDS</div>
        <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>12 members · Saigon</div>
        <div style={{ marginTop: 12 }}>
          <AvatarStack seeds={PLAYERS.slice(0, 5).map(p => p.nick)} max={4} size="xs" />
        </div>
        <PixelButton variant="ghost" size="sm" style={{ width: "100%", marginTop: 12 }}>
          MANAGE CLUB
        </PixelButton>
      </div>
    </aside>
  );
}
