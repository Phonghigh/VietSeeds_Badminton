import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeInitializer } from "@/components/theme-initializer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VietSeeds Smashers",
  description: "Pixel Sports Club Manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeInitializer />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
