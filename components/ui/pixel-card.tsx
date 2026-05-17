"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const CLIP = "polygon(0 6px,6px 6px,6px 0,calc(100% - 6px) 0,calc(100% - 6px) 6px,100% 6px,100% calc(100% - 6px),calc(100% - 6px) calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,6px calc(100% - 6px),0 calc(100% - 6px))";

const variants = {
  default: "bg-bg-2",
  flat:    "bg-bg-1",
  elev:    "bg-bg-elev shadow-pixel-card",
  glass:   "backdrop-blur-md bg-bg-2/60",
} as const;

export interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:    keyof typeof variants;
  accent?:     boolean;
  glow?:       boolean;
  interactive?: boolean;
}

export function PixelCard({
  variant = "default",
  accent = false,
  glow = false,
  interactive = false,
  className,
  children,
  onClick,
  ...props
}: PixelCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-[4px]",
        variants[variant],
        accent && "pixel-corners",
        glow   && "animate-pulse-glow",
        interactive && "cursor-pointer",
        className,
      )}
      style={{ clipPath: CLIP }}
      whileHover={interactive ? { scale: 1.01 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.12 }}
      onClick={onClick}
      {...(props as object)}
    >
      {children}
    </motion.div>
  );
}
