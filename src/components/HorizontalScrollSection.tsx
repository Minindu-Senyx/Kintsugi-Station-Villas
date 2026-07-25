"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Pins the section and translates the inner track horizontally as the user
// scrolls vertically past it — the "scroll-jacked" gallery effect used on
// premium agency/real-estate sites. Falls back to a plain horizontally
// scrollable flex row when reduced motion is requested.
export default function HorizontalScrollSection({
  children,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (
      !section ||
      !track ||
      prefersReducedMotion() ||
      window.innerWidth < 1024
    )
      return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className={`flex will-change-transform max-lg:!transform-none max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory ${trackClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
