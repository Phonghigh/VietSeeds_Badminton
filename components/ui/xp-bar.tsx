"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface XPBarProps {
  value: number;
  max: number;
  color?: "accent" | "yellow" | "danger";
  height?: number;
  showLabel?: boolean;
  className?: string;
}

const stripes = {
  accent: "xp-stripe-accent",
  yellow: "xp-stripe-yellow",
  danger: "xp-stripe-danger",
};

const glows = {
  accent: "shadow-pixel-sm",
  yellow: "shadow-yellow-glow",
  danger: "shadow-danger-glow",
};

export function XPBar({ value, max, color = "accent", height = 12, showLabel, className }: XPBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative overflow-hidden rounded-[1px] bg-bg-1 shadow-[inset_0_0_0_2px_theme(colors.bg.3)]"
        style={{ height }}
      >
        <motion.div
          className={cn("h-full", stripes[color], glows[color])}
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex justify-between pixel-xs">
          <span className="text-ink-2">{value} / {max} XP</span>
          <span style={{ color: "var(--accent)" }}>{pct.toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}
