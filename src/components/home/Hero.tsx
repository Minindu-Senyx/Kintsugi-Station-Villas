"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import QuickBookingCard from "@/components/QuickBookingCard";
import MagneticButton from "@/components/MagneticButton";
import SplitHeading from "@/components/SplitHeading";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll-scrub: the footage scales up, darkens, and the headline
  // drifts up and fades as the hero scrolls past — a lightweight version of
  // the "pinned hero" technique used on cinematic property/agency sites.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const scrollOpts = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(videoWrapperRef.current, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: scrollOpts,
      });
      gsap.to(contentRef.current, {
        yPercent: -35,
        opacity: 0,
        ease: "none",
        scrollTrigger: scrollOpts,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="relative h-dvh min-h-[520px] w-full overflow-hidden bg-charcoal">
        <div ref={videoWrapperRef} className="absolute inset-0 h-full w-full">
          <video
            className="h-full w-full object-cover"
            src="/assets/video/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 h-full mx-auto max-w-7xl px-6 sm:px-10 flex items-center"
        >
          <div className="max-w-2xl p-6 sm:p-8 -m-6 sm:-m-8 shadow-[0_25px_70px_25px_rgba(0,0,0,0.55)]">
            <SplitHeading
              as="h1"
              immediate
              text="Kintsugi Station Villas"
              className="font-display text-white text-5xl sm:text-6xl lg:text-[4rem] leading-[1.05]"
            />
            <p className="mt-6 text-white/85 text-base sm:text-lg leading-relaxed max-w-lg">
              Lovingly restored Sri Lankan holiday homes — combining modern
              comfort with old world charm.
            </p>
            <div className="mt-9">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-teal hover:bg-teal-dark text-white font-semibold px-7 py-3.5 text-sm shadow-md transition-colors"
                >
                  Book your stay
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/*
        Quick booking card: overlaps the video on large screens, but flows
        as its own solid-background block below the video on mobile so it
        never sits on top of (and obscures) the footage on small screens.
      */}
      <div className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:pointer-events-none">
        <div className="bg-charcoal lg:bg-transparent px-6 sm:px-10 py-12 lg:py-0 w-full">
          <div className="mx-auto max-w-7xl flex lg:justify-end">
            <div className="w-full lg:w-[380px] lg:pointer-events-auto">
              <QuickBookingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
