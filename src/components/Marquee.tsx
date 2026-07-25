"use client";

import { useLayoutEffect, useRef } from "react";
import { Gem } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Marquee({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, {
        x: -totalWidth,
        duration: totalWidth / 55,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [text]);

  const item = (
    <span className="inline-flex items-center gap-6 pr-6">
      <span>{text}</span>
      <Gem size={16} className="text-gold shrink-0" aria-hidden="true" />
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex w-max">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
