"use client";
import { create } from "zustand";

interface Toast {
  id:      string;
  message: string;
}

interface GameState {
  toast:      Toast | null;
  levelUp:    boolean;
  levelValue: number;

  showToast:    (message: string) => void;
  clearToast:   () => void;
  showLevelUp:  (level: number) => void;
  clearLevelUp: () => void;
}

export const useGameStore = create<GameState>()((set) => ({
  toast:      null,
  levelUp:    false,
  levelValue: 19,

  showToast: (message) =>
    set({ toast: { id: Date.now().toString(), message } }),
  clearToast: () =>
    set({ toast: null }),
  showLevelUp: (level) =>
    set({ levelUp: true, levelValue: level }),
  clearLevelUp: () =>
    set({ levelUp: false }),
}));
