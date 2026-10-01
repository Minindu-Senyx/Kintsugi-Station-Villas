"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { RoomSpace } from "@/lib/villas";

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

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      {/* Space Selection Tabs */}
      <div className="flex items-center overflow-x-auto border-b border-[#e2dcd2] pb-px scrollbar-none">
        <div className="flex min-w-full gap-2 sm:gap-4">
          {spaces.map((space, idx) => {
            const isSelected = idx === activeSpaceIndex;
            return (
              <button
                key={space.id}
                onClick={() => handleSpaceChange(idx)}
                className={`group relative whitespace-nowrap px-3 py-3 text-left transition-colors sm:px-5 ${
                  isSelected ? "text-ink font-medium" : "text-[#787672] hover:text-ink"
                }`}
              >
                <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-gold sm:text-[0.68rem]">
                  Space 0{idx + 1}
                </span>
                <span className="mt-0.5 block font-serif text-[1rem] sm:text-[1.12rem]">{space.name}</span>
                {isSelected ? (
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold/40 transition-transform duration-300 group-hover:scale-x-100"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Space Showcase */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Details & Features */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="inline-block rounded-full bg-[#ede6dc] px-3 py-1 text-[0.64rem] font-medium tracking-[0.12em] text-[#705e46] uppercase">
              {activeSpace.badge}
            </div>
            <h3 className="mt-3 font-serif text-[1.85rem] leading-[1.2] text-ink sm:text-[2.2rem]">
              {activeSpace.name}
            </h3>
            <p className="mt-3 text-[0.875rem] leading-[1.6] text-ink-soft sm:text-[0.92rem]">
              {activeSpace.description}
            </p>

            <div className="mt-6 border-t border-[#e8e2d8] pt-6">
              <p className="eyebrow text-[0.62rem] tracking-[0.2em] text-[#9b8564] uppercase">
                Space Highlights & Amenities
              </p>
              <ul className="mt-3 space-y-2.5">
                {activeSpace.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.82rem] text-[#3e3f3d]">
                    <span className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[#8a6b29]">
                      <Check className="size-2.5" strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo Counter */}
          <div className="mt-8 flex items-center justify-between border-t border-[#e8e2d8] pt-4 text-[0.72rem] text-[#7d7a74]">
            <span>
              Showing {activePhotoIndex + 1} of {photos.length} photos
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="flex size-7 items-center justify-center rounded border border-[#d6cfc3] bg-white transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="flex size-7 items-center justify-center rounded border border-[#d6cfc3] bg-white transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Photo Display */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#222]">
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

            {/* Photo Caption Badge */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
              <p className="font-serif text-[0.92rem] drop-shadow-sm sm:text-[1.05rem]">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Prev/Next Overlay buttons on Image */}
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/90 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/90 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {photos.map((photo, idx) => (
                <button
                  key={photo.src}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[2px] transition-all sm:h-16 sm:w-24 ${
                    idx === activePhotoIndex
                      ? "ring-2 ring-gold ring-offset-1"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
