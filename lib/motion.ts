import type { Variants } from "framer-motion";

export const pageEnter: Variants = {
  initial:  { opacity: 0, y: 6 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -4 },
};
export const pageTransition = { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] as number[] };

export const toastPop: Variants = {
  initial:  { opacity: 0, y: 8, scale: 0.95 },
  animate:  { opacity: 1, y: 0, scale: 1 },
  exit:     { opacity: 0, scale: 0.9 },
};

export const levelUpBurst: Variants = {
  initial:  { opacity: 0, scale: 0.8 },
  animate:  { opacity: 1, scale: 1 },
  exit:     { opacity: 0, scale: 1.1 },
};

export const xpFill = (pct: number) => ({
  initial:    { width: "0%" },
  animate:    { width: `${pct}%` },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
});

export const cardHover = {
  whileHover: { scale: 1.01 },
  transition: { duration: 0.12 },
};
