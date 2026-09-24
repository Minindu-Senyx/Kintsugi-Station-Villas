import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the original photography untouched — no resizing or recompression.
    unoptimized: true,
  },
};

export default nextConfig;
