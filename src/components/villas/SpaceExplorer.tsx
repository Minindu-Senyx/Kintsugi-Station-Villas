"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RoomSpace } from "@/lib/villas";

/*
 * One space at a time: pick it from the tabs, then step through its photos with
 * the arrows or the thumbnails. Each tab, arrow and thumbnail is a real button
 * with a name and a pressed state.
 */
export default function SpaceExplorer({ spaces }: { spaces: RoomSpace[] }) {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const activeSpace = spaces[activeSpaceIndex];
  const photos = activeSpace.photos;
  const currentPhoto = photos[activePhotoIndex] || photos[0];

  const handleSpaceChange = (idx: number) => {
    setActiveSpaceIndex(idx);
    setActivePhotoIndex(0);
  };
  const step = (dir: 1 | -1) => setActivePhotoIndex((prev) => (prev + dir + photos.length) % photos.length);

  const arrow =
    "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80";

  return (
    <div className="flex flex-col gap-8">
      {/* Space tabs */}
      <div className="scrollbar-none overflow-x-auto border-b border-[#d9d2c5]">
        <div role="group" aria-label="Spaces" className="flex min-w-max gap-6 sm:gap-8">
          {spaces.map((space, idx) => {
            const isSelected = idx === activeSpaceIndex;
            return (
              <button
                key={space.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSpaceChange(idx)}
                className={`relative whitespace-nowrap pb-3 text-left font-serif text-[1.05rem] transition-colors sm:text-[1.15rem] ${
                  isSelected ? "text-ink" : "text-[#5a5c58] hover:text-ink"
                }`}
              >
                {space.name}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 transition-colors ${isSelected ? "bg-gold" : "bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div key={activeSpace.id} className="enter-fade grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Description */}
        <div className="lg:col-span-4">
          <p className="eyebrow text-[0.7rem] tracking-[0.2em] text-[#5a5c58]">{activeSpace.badge}</p>
          <h3 className="mt-3 font-serif text-[1.8rem] leading-[1.15] text-ink">{activeSpace.name}</h3>
          <p className="mt-4 text-[0.92rem] leading-[1.55rem] text-ink-soft">{activeSpace.description}</p>
        </div>

        {/* Photos */}
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a1c1a]">
            <Image
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="enter-fade object-cover"
            />
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${arrow} left-3`}>
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${arrow} right-3`}>
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <p className="mt-3 flex items-baseline justify-between gap-4 text-[0.82rem] text-[#3c3e3b]">
            <span>{currentPhoto.caption}</span>
            <span className="shrink-0 text-[#5a5c58]">
              {activePhotoIndex + 1} / {photos.length}
            </span>
          </p>

          {photos.length > 1 && (
            <div className="scrollbar-none mt-4 flex gap-2.5 overflow-x-auto pb-1">
              {photos.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-pressed={idx === activePhotoIndex}
                  aria-label={`Show photo ${idx + 1} of ${photos.length}: ${photo.caption}`}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`group relative h-14 w-20 shrink-0 overflow-hidden transition-opacity duration-300 sm:h-16 sm:w-24 ${
                    idx === activePhotoIndex ? "ring-2 ring-gold ring-offset-2 ring-offset-mist" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={photo.src} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 ease-soft group-hover:scale-110" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
