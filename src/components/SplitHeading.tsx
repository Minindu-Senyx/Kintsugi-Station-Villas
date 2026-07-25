"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

type SplitHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Delay (seconds) before the reveal starts once triggered. */
  delay?: number;
  /** Animate immediately on mount instead of waiting to scroll into view — for hero headlines. */
  immediate?: boolean;
};

export default function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: "words,chars",
        wordsClass: "split-word",
        charsClass: "split-char",
      });

      if (prefersReducedMotion()) {
        gsap.set(split.chars, { opacity: 1, y: 0, rotateZ: 0 });
        return;
      }

      gsap.set(split.chars, { opacity: 0, y: "0.65em", rotateZ: 6 });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.8,
        delay,
        stagger: 0.014,
        ease: "power3.out",
        scrollTrigger: immediate
          ? undefined
          : { trigger: el, start: "top 88%", once: true },
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === el)
          .forEach((st) => st.kill());
      };
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
