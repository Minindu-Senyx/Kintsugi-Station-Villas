"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Sticky header behaviour (styled under .site-header in globals.css): it
 * gains a soft shadow once the page scrolls, slips out of view while reading
 * downward and returns as soon as the visitor scrolls back up. It stays put
 * while the mobile menu is open or focus is inside it.
 */
export default function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) < 6) return;
      const header = ref.current;
      const pinned = !!header?.querySelector('[aria-expanded="true"]') || !!header?.contains(document.activeElement);
      setHidden(y > last && y > 160 && !pinned);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      onFocus={() => setHidden(false)}
      data-scrolled={scrolled || undefined}
      data-hidden={hidden || undefined}
      className="site-header sticky top-0 z-40 bg-ivory"
    >
      {children}
    </header>
  );
}
