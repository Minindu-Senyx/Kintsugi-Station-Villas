"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

// No live updates needed — pointer type / motion preference don't change
// mid-session — so subscribe is a no-op. This still gets us a correct,
// hydration-safe value: false on the server, the real client value after
// hydration, with React reconciling the difference automatically instead
// of throwing a mismatch error (unlike computing this via useState/useEffect).
function subscribe() {
  return () => {};
}

function getSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    function onMove(e: MouseEvent) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea, select')) {
        ring?.classList.add("cursor-ring-hover");
      }
    }

    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea, select')) {
        ring?.classList.remove("cursor-ring-hover");
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/70 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
    </>
  );
}
