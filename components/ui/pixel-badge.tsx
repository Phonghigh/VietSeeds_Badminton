import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 font-pixel text-[9px] uppercase tracking-widest rounded-[2px]",
  {
    variants: {
      variant: {
        default: "bg-bg-3 text-ink-1",
        accent:  "bg-[var(--accent-glow-soft)] text-[var(--accent)]",
        yellow:  "bg-retro-yellow/20 text-retro-yellow",
        danger:  "bg-retro-danger/20 text-retro-danger",
        cyan:    "bg-retro-cyan/20 text-retro-cyan",
        pink:    "bg-retro-pink/20 text-retro-pink",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface PixelBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function PixelBadge({ variant, icon, className, children, ...props }: PixelBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon}
      {children}
    </span>
  );
}
