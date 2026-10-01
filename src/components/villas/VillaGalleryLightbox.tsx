"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { VillaPhoto } from "@/lib/villas";

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
      <div className="flex flex-wrap items-center justify-center gap-2 pb-8">
        {[
          { id: "all", label: "All Photographs" },
          { id: "bedroom", label: "Suites & Bedrooms" },
          { id: "living", label: "Living & Pavilions" },
          { id: "outdoor", label: "Terraces & Grounds" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
            className={`rounded-full px-4 py-1.5 text-[0.72rem] tracking-[0.08em] transition-all ${
              activeCategory === tab.id
                ? "bg-gold text-[#1c1d1a] shadow-sm font-medium"
                : "border border-[#e0dad0] bg-white/70 text-[#6a6863] hover:border-gold/60 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPhotos.map((photo, idx) => (
          <figure
            key={photo.src}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[2px] bg-[#222]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <figcaption className="absolute bottom-3 left-3 right-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-serif text-[0.88rem] leading-tight text-white drop-shadow">
                {photo.caption}
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-[#e3cb98]">
                Click to inspect
              </p>
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-md"
        >
          {/* Lightbox Header */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-6xl items-center justify-between py-2 text-white"
          >
            <p className="font-serif text-[1rem] tracking-wide text-white/90">
              {filteredPhotos[lightboxIndex].caption}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[0.74rem] text-white/60">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={closeLightbox}
                aria-label="Close image preview"
                className="rounded p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="size-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[75vh] w-full max-w-6xl items-center justify-center"
          >
            <Image
              src={filteredPhotos[lightboxIndex].src}
              alt={filteredPhotos[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />

            {/* Navigation buttons */}
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/90 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/90 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* Lightbox Footer */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl py-3 text-center text-[0.8rem] text-white/70"
          >
            {filteredPhotos[lightboxIndex].alt}
          </div>
        </div>
      )}
    </div>
  );
}
