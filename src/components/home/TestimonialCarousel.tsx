"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

/*
 * One guest review at a time, stepped with the arrows, the dots, the arrow
 * keys or a swipe. It never advances on its own: moving text is hard to
 * read, and it would pull focus from anyone using a screen reader.
 */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = items.length;
  const current = items[index];

  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest reviews"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        else if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <div aria-live="polite" className="min-h-[17rem] sm:min-h-[13rem] lg:min-h-[11.5rem]">
        {/* Keyed so each review remounts and fades in afresh. */}
        <figure key={index} aria-roledescription="slide" className="enter-fade">
          <blockquote className="font-serif text-[1.3rem] leading-[1.7rem] text-ink">
            <p>&ldquo;{current.excerpt}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-[1rem] text-[0.75rem] leading-[1.2rem] text-[#5a5c58]">
            {current.name} · {current.date} · {current.stay}
          </figcaption>
        </figure>
      </div>

      <div className="mt-[1.4rem] flex items-center gap-[1rem]">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="grid size-[2rem] place-items-center rounded-full border border-[#d9cfbf] text-[#2b2c2a] transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="size-[0.9rem]" strokeWidth={1.6} aria-hidden="true" />
        </button>
        <div className="flex items-center">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show review ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="grid size-6 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`block size-[0.38rem] rounded-full transition-colors duration-500 ${
                  i === index ? "bg-gold" : "bg-[#d9cfbf] hover:bg-[#c3a876]"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="grid size-[2rem] place-items-center rounded-full border border-[#d9cfbf] text-[#2b2c2a] transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="size-[0.9rem]" strokeWidth={1.6} aria-hidden="true" />
        </button>
        <p className="ml-auto text-[0.7rem] tracking-[0.14em] text-[#746754]">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
