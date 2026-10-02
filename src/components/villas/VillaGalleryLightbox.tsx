"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { delay } from "@/lib/motion";
import type { VillaPhoto } from "@/lib/villas";

const categoryLabels: Record<string, string> = {
  all: "All Photographs",
  bedroom: "Suites & En-Suites",
  living: "Living, Dining & Cinema",
  outdoor: "Verandas & Estate Grounds",
};

export default function VillaGalleryLightbox({ photos }: { photos: VillaPhoto[] }) {
  const [activeCategory, setActiveCategory] = useState<"all" | "bedroom" | "living" | "outdoor">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
  }, [filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-10">
        {(["all", "bedroom", "living", "outdoor"] as const).map((catId) => {
          const isSelected = activeCategory === catId;
          const count =
            catId === "all" ? photos.length : photos.filter((p) => p.category === catId).length;

          return (
            <button
              key={catId}
              type="button"
              onClick={() => setActiveCategory(catId)}
              className={`group flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] tracking-[0.08em] transition-all duration-300 ${
                isSelected
                  ? "bg-gold text-[#1c1d1a] shadow-sm font-medium"
                  : "border border-[#e0dad0] bg-white/70 text-[#6a6863] hover:border-gold/60 hover:text-ink hover:bg-white"
              }`}
            >
              <span>{categoryLabels[catId]}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[0.6rem] transition-colors ${
                  isSelected ? "bg-black/15 text-[#1c1d1a]" : "bg-[#f0ebe3] text-[#7d7a74]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Grid with Staggered Scroll Reveals */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPhotos.map((photo, idx) => (
          <figure
            key={photo.src}
            data-reveal="image"
            style={delay((idx % 6) * 70)}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2px] bg-[#1a1c1a] shadow-sm transition-all duration-500 hover:shadow-md"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />

            {/* Gradient Overlays: Subtle ambient base + Deep hover backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            />

            {/* Category tag icon badge top-right */}
            <div className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
              <Maximize2 className="size-3.5" />
            </div>

            {/* Hover Caption Details */}
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {/* Category label */}
              <span className="mb-1 block text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#d9bf87] transition-transform duration-500 ease-soft group-hover:-translate-y-1">
                {categoryLabels[photo.category || "living"]}
              </span>

              {/* Exact Photo Caption */}
              <p className="font-serif text-[0.92rem] font-light leading-snug text-[#f7f5f0] drop-shadow-sm transition-transform duration-500 ease-soft group-hover:-translate-y-1">
                {photo.caption}
              </p>

              {/* Expanding Gold Hairline */}
              <span
                aria-hidden="true"
                className="mt-2.5 block h-px w-8 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-soft group-hover:scale-x-100"
              />

              {/* Interaction Hint */}
              <span className="mt-2 flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-[#e0cfb0] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span>Inspect photograph</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        >
          {/* Lightbox Top Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-6xl items-center justify-between border-b border-white/10 py-3 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-[#d9bf87]">
                {categoryLabels[filteredPhotos[lightboxIndex].category || "living"]}
              </span>
              <p className="font-serif text-[1rem] tracking-wide text-white/95">
                {filteredPhotos[lightboxIndex].caption}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[0.74rem] text-white/60">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Close image preview"
                className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[74vh] w-full max-w-6xl items-center justify-center p-2"
          >
            <Image
              src={filteredPhotos[lightboxIndex].src}
              alt={filteredPhotos[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain transition-opacity duration-300"
              priority
            />

            {/* Navigation buttons */}
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-[#1c1d1a]"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-[#1c1d1a]"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Lightbox Bottom Footer Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl border-t border-white/10 py-3 text-center text-[0.8rem] text-white/70"
          >
            <p className="italic text-[#d6cfbe]">{filteredPhotos[lightboxIndex].alt}</p>
            <p className="mt-1 text-[0.64rem] uppercase tracking-[0.16em] text-white/40">
              Use arrow keys or swipe to navigate · Esc to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
