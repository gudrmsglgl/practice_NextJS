import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
