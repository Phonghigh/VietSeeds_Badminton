"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/stores/game-store";
import { toastPop, levelUpBurst } from "@/lib/motion";

const CLIP = "polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))";

function ToastBanner({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="absolute top-14 left-1/2 -translate-x-1/2 z-[80] px-3.5 py-2.5 font-pixel text-[10px] text-[var(--accent-ink)] bg-[var(--accent)]"
      style={{ clipPath: CLIP, boxShadow: "0 8px 30px var(--accent-glow)" }}
      variants={toastPop}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {message}
    </motion.div>
  );
}

function LevelUpOverlay({ level, onDone }: { level: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="absolute inset-0 z-[200] grid place-items-center bg-bg-0/85 pointer-events-none"
      variants={levelUpBurst}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.36, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="text-center">
        <div className="pixel-sm text-retro-yellow mb-3">★ LEVEL UP ★</div>
        <div
          className="pixel-xl animate-pulse-glow text-[48px] leading-none"
          style={{ color: "var(--accent)", textShadow: "0 0 30px var(--accent-glow), 4px 4px 0 rgba(0,0,0,0.6)" }}
        >
          LV. {level}
        </div>
        <div className="pixel-sm mt-3" style={{ color: "var(--accent-2)" }}>+ 50 XP</div>
      </div>
    </motion.div>
  );
}

export function ToastOverlay() {
  const { toast, clearToast, levelUp, levelValue, clearLevelUp } = useGameStore();
  return (
    <>
      <AnimatePresence>
        {toast && <ToastBanner key={toast.id} message={toast.message} onDone={clearToast} />}
      </AnimatePresence>
      <AnimatePresence>
        {levelUp && <LevelUpOverlay key="lvlup" level={levelValue} onDone={clearLevelUp} />}
      </AnimatePresence>
    </>
  );
}
