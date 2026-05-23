import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.DEBUG === "true"
        ? process.env.LOCALHOST_URL
        : process.env.PROD_URL,
  },
};

export default nextConfig;
