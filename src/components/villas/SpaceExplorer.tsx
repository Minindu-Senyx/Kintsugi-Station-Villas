"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Eye } from "lucide-react";
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
                type="button"
                onClick={() => handleSpaceChange(idx)}
                className={`group relative whitespace-nowrap px-3 py-3 text-left transition-all duration-300 sm:px-5 ${
                  isSelected ? "text-ink font-medium" : "text-[#787672] hover:text-ink"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-gold sm:text-[0.68rem]">
                    Space 0{idx + 1}
                  </span>
                  <span className="rounded-full bg-[#e8e2d8] px-1.5 py-0.2 text-[0.58rem] text-[#6d665a]">
                    {space.photos.length} photos
                  </span>
                </div>
                <span className="mt-1 block font-serif text-[1rem] transition-colors sm:text-[1.15rem]">
                  {space.name}
                </span>
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
      <div
        key={activeSpace.id}
        className="grid grid-cols-1 gap-8 transition-opacity duration-500 animate-in fade-in lg:grid-cols-12 lg:gap-10"
      >
        {/* Left Column: Details & Features */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="inline-block rounded-full bg-[#ede6dc] px-3.5 py-1 text-[0.64rem] font-medium tracking-[0.14em] text-[#705e46] uppercase shadow-xs">
              {activeSpace.badge}
            </div>
            <h3 className="mt-3.5 font-serif text-[1.85rem] leading-[1.2] text-ink sm:text-[2.2rem]">
              {activeSpace.name}
            </h3>
            <p className="mt-3 text-[0.88rem] leading-[1.65] text-ink-soft sm:text-[0.92rem]">
              {activeSpace.description}
            </p>

            <div className="mt-6 border-t border-[#e8e2d8] pt-6">
              <p className="eyebrow text-[0.62rem] tracking-[0.2em] text-[#9b8564] uppercase">
                Space Highlights & Architecture
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {activeSpace.features.map((feature, fIdx) => (
                  <li
                    key={feature}
                    style={{ animationDelay: `${fIdx * 50}ms` }}
                    className="flex items-start gap-2.5 text-[0.82rem] text-[#3e3f3d] animate-in fade-in"
                  >
                    <span className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-[#8a6b29]">
                      <Check className="size-2.5" strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Photo Counter & Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-[#e8e2d8] pt-4 text-[0.74rem] text-[#7d7a74]">
            <span className="flex items-center gap-2">
              <Eye className="size-3.5 text-gold" />
              <span>
                Photograph {activePhotoIndex + 1} of {photos.length}
              </span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="flex size-8 items-center justify-center rounded border border-[#d6cfc3] bg-white transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="flex size-8 items-center justify-center rounded border border-[#d6cfc3] bg-white transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Photo Display */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#1a1c1a] shadow-sm">
            <Image
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] animate-in fade-in"
              priority
            />
            {/* Subtle gradient vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"
            />

            {/* Photo Caption Badge */}
            <div className="absolute bottom-3.5 left-4 right-4 flex flex-col justify-end text-white">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[#d9bf87]">
                {activeSpace.name}
              </span>
              <p className="font-serif text-[0.96rem] font-light leading-snug drop-shadow-sm sm:text-[1.1rem]">
                {currentPhoto.caption}
              </p>
            </div>

            {/* Prev/Next Overlay buttons on Image */}
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-[#1c1d1a] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-[#1c1d1a] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {photos.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {photos.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`group relative h-14 w-20 shrink-0 overflow-hidden rounded-[2px] transition-all duration-300 sm:h-16 sm:w-24 ${
                    idx === activePhotoIndex
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-mist shadow"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {idx === activePhotoIndex && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gold/10"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
