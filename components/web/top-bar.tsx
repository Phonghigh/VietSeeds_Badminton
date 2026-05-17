"use client";
import { useWebStore } from "@/stores/web-store";
import { useThemeStore } from "@/stores/theme-store";
import { PixelAvatar } from "@/components/ui/pixel-avatar";
import { BellIcon, ChatIcon } from "@/components/icons/pixel-icons";
import { ME } from "@/lib/data";

export function WebTopBar() {
  const { theme, toggleTheme } = useWebStore();
  const { accent } = useThemeStore();

  return (
    <header className="web-topbar">
      <div className="web-brand">
        <div>
          <div className="web-brand-name">VIETSEEDS</div>
          <div className="web-brand-tag">SMASHERS · S3</div>
        </div>
      </div>

      <div className="web-search">
        <span style={{ fontSize: 16 }}>⌕</span>
        <span>Search players, sessions, courts…</span>
        <kbd>⌘K</kbd>
      </div>

      <div className="web-topbar-tools">
        <button
          className="web-icon-btn"
          onClick={() => toggleTheme(accent)}
          title="Toggle theme"
        >
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: 14 }}>
            {theme === "dark" ? "☾" : "☀"}
          </span>
        </button>
        <button className="web-icon-btn" title="Notifications">
          <BellIcon size={16} />
          <span className="dot" />
        </button>
        <button className="web-icon-btn" title="Messages">
          <ChatIcon size={16} />
        </button>
        <button className="web-user-pill">
          <PixelAvatar seed={ME.nick} size="sm" ring />
          <div>
            <div className="pp-label">{ME.nick.toUpperCase()}</div>
            <div className="pp-sub">LV.{ME.level} · {ME.streak}🔥</div>
          </div>
        </button>
      </div>
    </header>
  );
}
