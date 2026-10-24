"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { delay } from "@/lib/motion";
import type { VillaPhoto } from "@/lib/villas";

const categoryLabels: Record<string, string> = {
  all: "All Photographs",
  bedroom: "Suites & En-Suites",
  living: "Living, Dining & Cinema",
  outdoor: "Verandas & Estate Grounds",
};

type Category = "all" | "bedroom" | "living" | "outdoor";

/*
 * The villa's photo grid and its lightbox. The lightbox is a native <dialog>
 * opened with showModal(), so the browser traps focus inside it, closes it on
 * Escape, makes the page behind it inert and returns focus to the photo that
 * opened it. Each photo is a real button, so the grid works from the keyboard.
 */
export default function VillaGalleryLightbox({ photos }: { photos: VillaPhoto[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filteredPhotos = activeCategory === "all" ? photos : photos.filter((p) => p.category === activeCategory);
  const active = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxIndex !== null && !dialog.open) dialog.showModal();
    if (lightboxIndex === null && dialog.open) dialog.close();
  }, [lightboxIndex]);

  const step = (dir: 1 | -1) =>
    setLightboxIndex((prev) => (prev === null ? null : (prev + dir + filteredPhotos.length) % filteredPhotos.length));

  return (
    <div>
      {/* Category filter */}
      <div role="group" aria-label="Filter photographs" className="flex flex-wrap items-center justify-center gap-2.5 pb-10">
        {(["all", "bedroom", "living", "outdoor"] as const).map((catId) => {
          const isSelected = activeCategory === catId;
          const count = catId === "all" ? photos.length : photos.filter((p) => p.category === catId).length;

          return (
            <button
              key={catId}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActiveCategory(catId)}
              className={`h-[2.1rem] rounded-full border px-4 font-serif text-[0.84rem] transition-colors duration-300 ${
                isSelected
                  ? "border-marble bg-marble text-ivory"
                  : "border-line-strong bg-transparent text-ink-soft hover:border-marble hover:bg-marble/5"
              }`}
            >
              <span>{categoryLabels[catId]}</span>
              <span className={`ml-1.5 text-[0.75rem] ${isSelected ? "text-gold-light" : "text-muted"}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPhotos.map((photo, idx) => (
          <button
            key={photo.src}
            type="button"
            data-reveal="image"
            style={delay((idx % 6) * 70)}
            onClick={() => setLightboxIndex(idx)}
            aria-label={`View photo: ${photo.caption}`}
            className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-marble text-left focus-visible:outline-offset-[-3px]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105 group-focus-visible:scale-105"
            />

            {/* The caption fades in on hover or keyboard focus */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-10 text-[0.88rem] leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {photo.caption}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        aria-label={active ? `Photo ${lightboxIndex! + 1} of ${filteredPhotos.length}: ${active.caption}` : "Photo"}
        onClose={() => setLightboxIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setLightboxIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="lightbox m-auto max-h-[92vh] w-[min(92vw,70rem)] bg-transparent p-0"
      >
        {active && (
          <figure className="relative">
            <div key={active.src} className="enter-fade relative aspect-[3/2] max-h-[78vh] w-full">
              <Image src={active.src} alt={active.alt} fill sizes="92vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-white">
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.72rem] uppercase tracking-[0.16em] text-gold-light">
                {categoryLabels[active.category || "living"]}
              </span>
              <span className="font-serif text-[1rem] tracking-wide">{active.caption}</span>
              <span className="text-[0.8rem] text-white/80" aria-hidden="true">
                {lightboxIndex! + 1} / {filteredPhotos.length}
              </span>
            </figcaption>
            <p className="mt-1.5 text-center text-[0.75rem] text-white/70">Arrow keys to step through · Esc to close</p>

            {filteredPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-[calc(50%-2rem)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-gold"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-[calc(50%-2rem)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-gold"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo"
              className="absolute right-2 top-2 grid size-11 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </figure>
        )}
      </dialog>
    </div>
  );
}
