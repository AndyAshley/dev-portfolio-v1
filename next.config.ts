import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers moved to middleware.ts for proper nonce handling
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/AndyAshley/dev-portfolio-posts/**",
      },
    ],
  },
};

export default nextConfig;
