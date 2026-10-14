"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type HeroSlide = { src: string; alt: string; position?: string };

const INTERVAL_MS = 6000;

/*
 * The home hero: photographs that rotate behind the headline and the booking bar.
 *  - It plays on its own for everyone. Visitors who ask their device to reduce
 *    motion get an instant swap instead of the fade (see globals.css).
 *  - A visible Pause / Play button, plus previous / next / dot controls, lets
 *    anyone stop or steer it.
 *  - It also holds still while the pointer or keyboard focus is on those controls.
 *  - A hidden status line names the current photo (read out only when paused).
 * Only the first photo loads up front; the rest load once the page has settled.
 */
export default function HeroCarousel({
  slides,
  children,
  bar,
}: {
  slides: HeroSlide[];
  /** Headline and intro text. */
  children: ReactNode;
  /** The booking bar, placed along the bottom. */
  bar: ReactNode;
}) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onControls, setOnControls] = useState(false);
  const [loadRest, setLoadRest] = useState(false);

  const running = !paused;
  const playing = running && !onControls;

  useEffect(() => {
    const timer = setTimeout(() => setLoadRest(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, count]);

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const control = "grid size-6 place-items-center text-white/90 transition-colors hover:text-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Photographs of the villas"
      className="relative h-auto min-h-[36rem] lg:h-[31rem] lg:min-h-0"
    >
      <div className="absolute inset-0 overflow-hidden bg-[#161a17]">
        {slides.map((slide, i) =>
          i === 0 || loadRest ? (
            <Image
              key={slide.src}
              src={slide.src}
              alt={i === index ? slide.alt : ""}
              aria-hidden={i !== index}
              fill
              preload={i === 0}
              sizes="100vw"
              style={{ objectPosition: slide.position ?? "50% 50%" }}
              className={`object-cover transition-opacity duration-[1400ms] ease-in-out ${i === index ? "enter-settle opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,36,50,0.62)_0%,rgba(12,36,50,0.42)_60%,rgba(12,36,50,0.58)_100%)] lg:bg-[linear-gradient(90deg,rgba(12,36,50,0.7)_0%,rgba(12,36,50,0.34)_50%,rgba(12,36,50,0.04)_100%)]"
        />
      </div>

      <div className="frame relative flex h-full flex-col px-5 pb-6 pt-24 lg:block lg:px-[3.625rem] lg:pb-0 lg:pt-[8rem]">
        {children}

        <div
          className="mt-6 flex items-center gap-1"
          role="group"
          aria-label="Slideshow controls"
          onMouseEnter={() => setOnControls(true)}
          onMouseLeave={() => setOnControls(false)}
          onFocus={() => setOnControls(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOnControls(false);
          }}
        >
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={control}>
            <ChevronLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
          </button>
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="grid size-6 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`block h-[0.4rem] rounded-full bg-white transition-all duration-500 ${i === index ? "w-6 opacity-100" : "w-[0.4rem] opacity-50"}`}
              />
            </button>
          ))}
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={control}>
            <ChevronRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPaused(running)}
            className="link-underline ml-3 min-h-6 text-[0.8rem] text-white"
          >
            {running ? "Pause" : "Play"}
            <span className="sr-only"> slideshow</span>
          </button>
        </div>

        <div className="relative z-30 mt-auto pt-8 lg:absolute lg:left-1/2 lg:top-[25.4rem] lg:mt-0 lg:w-[49.5rem] lg:max-w-[calc(100%-2rem)] lg:-translate-x-1/2 lg:pt-0 xl:w-[53rem]">
          {bar}
        </div>
      </div>

      {/* Names the current photo; only read aloud while the slideshow isn't moving on its own. */}
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        Photo {index + 1} of {count}: {slides[index].alt}
      </p>
    </section>
  );
}
