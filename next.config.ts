import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Tech_next",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
