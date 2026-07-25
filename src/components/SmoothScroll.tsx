"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

// Lenis intercepts native scroll, so ScrollTrigger needs to be told about
// every tick manually — otherwise pinned/scrubbed animations drift out of
// sync with what's actually on screen.
function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // Lazy-init from matchMedia so users with prefers-reduced-motion never get
  // Lenis's inertia/lerp scrolling — only native, instant scroll behaviour.
  const [enabled] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15, smoothWheel: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
