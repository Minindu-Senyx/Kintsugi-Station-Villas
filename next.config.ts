import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the original photography untouched — no resizing or recompression.
    unoptimized: true,
  },
  experimental: {
    // Animates route changes with React's <ViewTransition> (see app/layout).
    viewTransition: true,
  },
};

export default nextConfig;
