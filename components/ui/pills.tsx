"use client";
import { cn } from "@/lib/utils";

interface Tab { id: string; label: string }

interface PillsProps {
  tabs: Tab[];
  current: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Pills({ tabs, current, onChange, className }: PillsProps) {
  return (
    <div className={cn("flex gap-1.5 p-1 bg-bg-1 rounded-[2px]", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex-1 py-2 px-2.5 font-pixel text-[9px] tracking-[0.04em] text-center rounded-[1px] transition-all duration-150",
            current === t.id
              ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-pixel-sm"
              : "text-ink-2 hover:text-ink-1",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
