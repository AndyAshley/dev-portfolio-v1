import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https://raw.githubusercontent.com/AndyAshley/dev-portfolio-posts/;
              connect-src 'self' https://raw.githubusercontent.com/AndyAshley/dev-portfolio-posts/;
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
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
