"use client";

import "@photo-sphere-viewer/core/index.css";
import { useEffect, useRef, useState } from "react";
import type { Viewer } from "@photo-sphere-viewer/core";
import type { PanoramaTour as Tour } from "@/lib/villas";

/*
 * A 360° view of a room: pick the room from the tabs, then drag to look around.
 *  - The viewer library and the first panorama only load once this section is
 *    close to the screen, so they cost nothing for visitors who never scroll here.
 *  - Nothing turns by itself. The page does not scroll-jack: the mouse wheel and
 *    a single finger still scroll the page; use the zoom buttons, a second
 *    finger or a click-and-drag to look around.
 *  - Full screen is in the viewer's own toolbar.
 */
export default function PanoramaTour({ tours, villaName }: { tours: Tour[]; villaName: string }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  // The latest tab, read when the viewer is created after the section scrolls into view.
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
    viewerRef.current?.setPanorama(tours[index].src, { transition: false }).catch(() => setFailed(true));
  }, [index, tours]);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        import("@photo-sphere-viewer/core")
          .then(({ Viewer }) => {
            if (cancelled) return;
            viewerRef.current = new Viewer({
              container: stage,
              panorama: tours[indexRef.current].src,
              navbar: ["zoom", "fullscreen"],
              loadingTxt: "Loading…",
              defaultZoomLvl: 20,
              mousewheel: false,
              touchmoveTwoFingers: true,
              moveInertia: false,
            });
          })
          .catch(() => setFailed(true));
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [tours]);

  return (
    <div ref={rootRef}>
      <div role="group" aria-label="Rooms in 360°" className="scrollbar-none overflow-x-auto border-b border-line">
        <div className="flex min-w-max gap-6 sm:gap-8">
          {tours.map((tour, i) => {
            const selected = i === index;
            return (
              <button
                key={tour.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setIndex(i)}
                className={`relative whitespace-nowrap pb-3 text-left font-serif text-[1.05rem] transition-colors sm:text-[1.15rem] ${
                  selected ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {tour.name}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 transition-colors ${selected ? "bg-gold" : "bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={stageRef}
        role="region"
        aria-label={`360° view of ${villaName}: ${tours[index].name}`}
        className="mt-6 h-[22rem] w-full overflow-hidden bg-marble sm:h-[30rem] lg:h-[34rem]"
      />
      <p className="mt-3 text-[0.82rem] text-ink-soft">
        {failed
          ? "The 360° view could not load. Please try again later."
          : "Click and drag to look around, or use two fingers on a phone. The buttons in the corner zoom in and go full screen."}
      </p>
    </div>
  );
}
