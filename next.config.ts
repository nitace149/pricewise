import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // serverActions: true,
  },

  serverExternalPackages: ["mongoose"],

  images: {
    domains: ["m.media-amazon.com"]
  }
};

export default nextConfig;
