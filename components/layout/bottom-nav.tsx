"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon, CalendarIcon, VoteIcon, StatsIcon, ProfileIcon,
} from "@/components/icons/pixel-icons";

// Configuration array for bottom navigation bar items.
// Defining this data externally makes it easy to add, remove, or modify menu items.
const NAV = [
  { href: "/home",     label: "Home",    Icon: HomeIcon    },
  { href: "/sessions", label: "Sessions",Icon: CalendarIcon },
  { href: "/votes",    label: "Vote",    Icon: VoteIcon    },
  { href: "/stats",    label: "Stats",   Icon: StatsIcon   },
  { href: "/profile",  label: "Profile", Icon: ProfileIcon },
];

export function BottomNav() {
  // Retrieves the current pathname (e.g. "/home") to determine the active navigation tab.
  const path = usePathname();
  
  return (
    <nav 
      // [Class & CSS Breakdown]
      // - "bottom-nav": Custom class in globals.css containing backdrop-filter (glassmorphism blur), linear-gradient background, and a top glowing shimmer line.
      // - "absolute bottom-0 inset-x-0": Pins the navigation bar securely to the bottom of the screen (bottom: 0) and stretches it 100% wide (left: 0; right: 0).
      // - "h-[84px]": Fixed height designed for mobile navigation shells.
      // - "flex items-stretch justify-around": Grid-like flexbox layout. Distributes buttons evenly and stretches them to fill the bar's height.
      // - "px-2 pb-[18px]": Adds padding. Bottom padding (pb-[18px]) prevents buttons from overlapping the modern smartphone Home Indicator.
      // - "z-40": Ensures the navigation bar floats securely on top of any scrollable page content.
      // - "border-t-2 border-mid": Retro 2px-thick top border mimicking a pixel art edge, using the semantic color token --border-mid.
      className="bottom-nav absolute bottom-0 inset-x-0 h-[84px] flex items-stretch justify-around px-2 pb-[18px] z-40 border-t-2 border-mid"
    >
      {NAV.map(({ href, label, Icon }) => {
        // Checks if the current path matches the link's href or represents a child page of it.
        const active = path === href || path.startsWith(href + "/");
        
        return (
          <Link
            key={href}
            href={href}
            // [Accessibility & CSS State Trigger]
            // aria-current="page" is applied when the link is active. CSS queries this state selector to toggle colors without dynamic JS inline styles.
            aria-current={active ? "page" : undefined}
            // [Class Breakdown]
            // - "nav-link": Base class for navigation link. Defaults to gray (--text-3) and transitions to active green (--accent) via CSS state selector.
            // - "flex-1 flex flex-col items-center justify-center": Gives equal clickable space to each button and centers contents vertically.
            // - "gap-1 pt-2": 4px spacing between icon/text and 8px top padding.
            // - "pixel-xs": Predefined typography scale for pixel fonts (9px, monospace, 0.06em letter spacing).
            // - "relative": Serves as the coordinate parent to position the absolute glowing active pip indicator.
            className="nav-link flex-1 flex flex-col items-center justify-center gap-1 pt-2 pixel-xs relative"
          >
            {/* Active pip indicator featuring a retro glow effect driven by class .nav-pip */}
            {active && <span className="nav-pip absolute top-[2px] w-6 h-[3px]" />}
            
            {/* Centered icon container ensuring identical icon grid alignments */}
            <span className="w-6 h-6 grid place-items-center">
              {/* Uses dynamic CSS theme variables supporting seamless Dark/Light theme switching */}
              <Icon size={22} color={active ? "var(--accent)" : "var(--text-3)"} />
            </span>
            
            {/* Label text displayed below the icon */}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}


