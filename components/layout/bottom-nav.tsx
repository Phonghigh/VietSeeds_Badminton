"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon, CalendarIcon, VoteIcon, StatsIcon, ProfileIcon,
} from "@/components/icons/pixel-icons";

const NAV = [
  { href: "/home",     label: "Home",    Icon: HomeIcon    },
  { href: "/sessions", label: "Sessions",Icon: CalendarIcon },
  { href: "/votes",    label: "Vote",    Icon: VoteIcon    },
  { href: "/stats",    label: "Stats",   Icon: StatsIcon   },
  { href: "/profile",  label: "Profile", Icon: ProfileIcon },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav
      className="absolute bottom-0 inset-x-0 h-[84px] flex items-stretch justify-around px-2 pb-[18px] z-40 border-t-2 border-mid"
      style={{ background: "linear-gradient(180deg, rgba(17,24,39,0.85) 0%, rgba(11,18,32,0.95) 100%)", backdropFilter: "blur(12px)" }}
    >
      {/* accent line */}
      <div
        className="absolute -top-0.5 inset-x-0 h-0.5 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: "calc(0.6 * var(--px))" }}
      />
      {NAV.map(({ href, label, Icon }) => {
        const active = path === href || path.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className="flex-1 flex flex-col items-center justify-center gap-1 pt-2 font-pixel text-[8px] tracking-widest relative"
            style={{ color: active ? "var(--accent)" : "var(--text-3)" }}
          >
            {active && (
              <span
                className="absolute top-[2px] w-6 h-[3px]"
                style={{ background: "var(--accent)", boxShadow: "0 0 calc(12px * var(--px)) var(--accent)" }}
              />
            )}
            <span className="w-6 h-6 grid place-items-center">
              <Icon size={22} color={active ? "var(--accent)" : "var(--text-3)"} />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
