import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  }
};

export default nextConfig;
