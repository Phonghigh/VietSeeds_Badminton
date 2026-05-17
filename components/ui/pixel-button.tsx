"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const CLIP = "polygon(0 4px,4px 4px,4px 0,calc(100% - 4px) 0,calc(100% - 4px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 4px) calc(100% - 4px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 4px),0 calc(100% - 4px))";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-pixel uppercase tracking-widest rounded-[2px] transition-all duration-150 select-none whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-[var(--accent)] text-[var(--accent-ink)] shadow-[inset_0_-3px_0_rgba(0,0,0,0.25),0_0_calc(20px_*_var(--px))_var(--accent-glow)]",
        ghost:   "bg-bg-2 text-ink-1 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.12)]",
        danger:  "bg-retro-danger text-white",
        yellow:  "bg-retro-yellow text-amber-900",
      },
      size: {
        sm: "px-3 py-2 text-[9px]",
        md: "px-4 py-3 text-[10px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

export function PixelButton({
  variant,
  size,
  className,
  icon,
  children,
  ...props
}: PixelButtonProps) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size }), className)}
      style={{ clipPath: CLIP }}
      whileTap={{ y: 2 }}
      whileHover={{ filter: "brightness(1.1)" }}
      {...(props as object)}
    >
      {icon}
      {children}
    </motion.button>
  );
}
