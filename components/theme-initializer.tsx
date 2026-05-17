"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";

export function ThemeInitializer() {
  const { accent, pixelFont, bodyFont, pixelIntensity, setAccent, setPixelFont, setBodyFont, setPixelIntensity } = useThemeStore();

  useEffect(() => {
    // Re-apply stored values to CSS custom properties on first client render
    setAccent(accent);
    setPixelFont(pixelFont);
    setBodyFont(bodyFont);
    setPixelIntensity(pixelIntensity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
