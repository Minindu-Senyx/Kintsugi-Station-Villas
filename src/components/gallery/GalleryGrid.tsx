"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { delay } from "@/lib/motion";

const categories = [
  "All",
  "Avalon Villa",
  "Villa Acland",
  "Suites & Bedrooms",
  "Living & Terraces",
  "Gardens & Outdoors",
] as const;
type Category = (typeof categories)[number];

type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: [string, string];
  tags: Exclude<Category, "All">[];
};

// Photographs of Avalon Villa and Villa Acland in Kandy
const photos: Photo[] = [
  {
    id: "pool",
    src: "/assets/images/villas/avalon/avalon-hero.jpg",
    alt: "Brick courtyard shaded by mature trees at Avalon Villa",
    caption: ["Avalon Villa", "Shaded Courtyard"],
    tags: ["Avalon Villa", "Gardens & Outdoors", "Living & Terraces"],
  },
  {
    id: "suite",
    src: "/assets/images/villas/avalon/avalon-b1-master.jpg",
    alt: "En-suite bathroom with twin basins and a sunken bath at Avalon Villa",
    caption: ["Master En-Suite", "Avalon Villa"],
    tags: ["Avalon Villa", "Suites & Bedrooms"],
  },
  {
    id: "bath",
    src: "/assets/images/villas/acland/acland-stone-bath.jpg",
    alt: "Bathroom with twin basins, a mirror and a walk-in shower at Villa Acland",
    caption: ["En-Suite Bathroom", "Villa Acland"],
    tags: ["Villa Acland", "Suites & Bedrooms"],
  },
  {
    id: "tea",
    src: "/assets/images/villas/acland/acland-veranda-lounge.jpg",
    alt: "Dining table beside open windows and greenery at Villa Acland",
    caption: ["Dining by the Trees", "Villa Acland"],
    tags: ["Villa Acland", "Living & Terraces"],
  },
  {
    id: "flavours",
    src: "/assets/images/villas/avalon/avalon-dining-patio.jpg",
    alt: "Sofas facing a cinema projector screen at Avalon Villa",
    caption: ["Cinema Lounge", "Avalon Villa"],
    tags: ["Avalon Villa", "Living & Terraces"],
  },
  {
    id: "night",
    src: "/assets/images/villas/acland/acland-hero.jpg",
    alt: "Blue-grey exterior walls and stone urns beneath trees at Villa Acland",
    caption: ["Sanctuary Retreat", "Villa Acland"],
    tags: ["Villa Acland", "Gardens & Outdoors"],
  },
  {
    id: "avalon-living",
    src: "/assets/images/villas/avalon/avalon-living-overview.jpg",
    alt: "Dining table on the covered veranda at Avalon Villa",
    caption: ["Veranda Dining", "Avalon Villa"],
    tags: ["Avalon Villa", "Living & Terraces"],
  },
  {
    id: "avalon-deck",
    src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg",
    alt: "Cinema seating and a piano at Avalon Villa",
    caption: ["Cinema & Piano", "Avalon Villa"],
    tags: ["Avalon Villa", "Living & Terraces"],
  },
  {
    id: "avalon-b2",
    src: "/assets/images/villas/avalon/avalon-b2-room.jpg",
    alt: "Twin beds with teal throws and garden-facing windows at Avalon Villa",
    caption: ["Valley Suite B2", "Avalon Villa"],
    tags: ["Avalon Villa", "Suites & Bedrooms"],
  },
  {
    id: "acland-bed",
    src: "/assets/images/villas/acland/acland-bedroom-suite.jpg",
    alt: "Bedroom windows overlooking trees at Villa Acland",
    caption: ["Bedroom Garden Outlook", "Villa Acland"],
    tags: ["Villa Acland", "Suites & Bedrooms"],
  },
  {
    id: "acland-deck",
    src: "/assets/images/villas/acland/acland-deck-view.jpg",
    alt: "Sofa beside open windows overlooking greenery at Villa Acland",
    caption: ["Lounge by the Windows", "Villa Acland"],
    tags: ["Villa Acland", "Living & Terraces"],
  },
  {
    id: "acland-terrace",
    src: "/assets/images/villas/acland/acland-garden-terrace.jpg",
    alt: "Balcony railing surrounded by leafy trees at Villa Acland",
    caption: ["Leafy Balcony", "Villa Acland"],
    tags: ["Villa Acland", "Gardens & Outdoors"],
  },
];


const featuredIds = ["pool", "tea", "suite", "bath", "flavours", "night"];
const remainingPhotos = photos.filter((photo) => !featuredIds.includes(photo.id));

const byId = (id: string) => photos.find((p) => p.id === id)!;

type TileProps = {
  photo: Photo;
  className: string;
  sizes: string;
  /** Stagger for the tile's scroll reveal, in ms. */
  wait: number;
  onOpen: (p: Photo) => void;
};

function Tile({ photo, className, sizes, wait, onOpen }: TileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      data-reveal="image"
      style={delay(wait)}
      className={`group relative block w-full overflow-hidden text-left focus-visible:outline-offset-[-3px] ${className}`}
      aria-label={`View photo: ${photo.caption.join(" ")}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover group-hover:scale-[1.04]" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(10,14,11,0.62),rgba(10,14,11,0))]"
      />
      <span className="absolute bottom-[1.3rem] left-[1.25rem] font-serif text-[0.7rem] leading-[1rem] tracking-[0.2em] text-ivory uppercase transition-transform duration-700 ease-soft group-hover:-translate-y-[0.3rem]">
        {photo.caption[0]}
        <br />
        {photo.caption[1]}
        <span
          aria-hidden="true"
          className="mt-[0.45rem] block h-px w-[1.8rem] origin-left scale-x-0 bg-gold-light transition-transform duration-700 ease-soft group-hover:scale-x-100"
        />
      </span>
    </button>
  );
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Category>("All");
  // The lightbox photo is kept after closing so the dialog can fade out with it.
  const [active, setActive] = useState<Photo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const filtered = photos.filter((p) => filter !== "All" && p.tags.includes(filter as Exclude<Category, "All">));
  // The lightbox steps through everything in the current view.
  const sequence = filter === "All" ? [...featuredIds.map(byId), ...remainingPhotos] : filtered;
  const index = active ? sequence.findIndex((p) => p.id === active.id) : -1;

  const openPhoto = (photo: Photo) => {
    setActive(photo);
    setIsOpen(true);
  };
  const step = (dir: 1 | -1) => {
    if (index < 0) return;
    setActive(sequence[(index + dir + sequence.length) % sequence.length]);
  };

  const arrowButton =
    "group absolute top-[calc(50%-1.25rem)] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/60";

  return (
    <>
      <div
        role="group"
        aria-label="Filter photos"
        style={delay(550)}
        className="enter-rise mt-[1.5rem] flex flex-wrap justify-center gap-[0.62rem] px-5"
      >
        {categories.map((cat) => {
          const selected = cat === filter;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(cat)}
              className={`h-[2rem] rounded-full border font-serif text-[0.855rem] transition-colors duration-500 ${
                cat === "All" ? "w-[4.5rem]" : "px-[1.15rem]"
              } ${
                selected
                  ? "border-marble bg-marble text-ivory"
                  : "border-line-strong text-ink-soft hover:border-marble hover:bg-marble/5"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so each view's tiles unveil afresh. */}
      <div key={filter} className="mx-auto mt-[1.8rem] max-w-[64rem] px-3 lg:px-[1.0625rem]">
        {filter === "All" ? (
          <>
            <div className="grid gap-2 lg:grid-cols-[314fr_668fr] lg:gap-[0.5rem]">
              <div className="grid gap-2 lg:gap-[0.5rem]">
                <Tile photo={byId("pool")} wait={0} onOpen={openPhoto} className="h-96 lg:h-[26.75rem]" sizes="(min-width: 900px) 31vw, 100vw" />
                <Tile photo={byId("tea")} wait={150} onOpen={openPhoto} className="h-80 lg:h-[20.44rem]" sizes="(min-width: 900px) 31vw, 100vw" />
              </div>
              <div className="grid gap-2 lg:gap-[0.5rem]">
                <div className="grid gap-2 sm:grid-cols-[363fr_297fr] lg:gap-[0.5rem]">
                  <Tile photo={byId("suite")} wait={120} onOpen={openPhoto} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 36vw, 100vw" />
                  <Tile photo={byId("bath")} wait={240} onOpen={openPhoto} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 29vw, 100vw" />
                </div>
                <div className="grid gap-2 sm:grid-cols-[331fr_328fr] lg:gap-[0.56rem]">
                  <Tile photo={byId("flavours")} wait={120} onOpen={openPhoto} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
                  <Tile photo={byId("night")} wait={240} onOpen={openPhoto} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
                </div>
              </div>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:mt-[0.5rem] lg:gap-[0.5rem]">
              {remainingPhotos.map((photo, i) => (
                <Tile
                  key={photo.id}
                  photo={photo}
                  wait={(i % 3) * 120}
                  onOpen={openPhoto}
                  className="h-80 lg:h-[20rem]"
                  sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[0.5rem]">
            {filtered.map((photo, i) => (
              <Tile
                key={photo.id}
                photo={photo}
                wait={(i % 3) * 120}
                onOpen={openPhoto}
                className="h-80 lg:h-[20rem]"
                sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={active ? active.caption.join(" ") : "Photo"}
        onClose={() => setIsOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="lightbox m-auto max-h-[92vh] w-[min(92vw,70rem)] bg-transparent p-0"
      >
        {active && (
          <figure className="relative">
            {/* Keyed by photo so each one fades in as the visitor steps through. */}
            <div key={active.id} className="enter-fade relative aspect-[3/2] max-h-[82vh] w-full">
              <Image src={active.src} alt={active.alt} fill sizes="92vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 flex items-center justify-center gap-4 font-serif text-sm tracking-[0.2em] text-ivory uppercase">
              <span key={active.id} className="enter-fade">
                {active.caption.join(" · ")}
              </span>
              {index >= 0 && (
                <span className="text-xs tracking-[0.1em] text-on-dark-muted">
                  {index + 1} / {sequence.length}
                </span>
              )}
            </figcaption>
            {sequence.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${arrowButton} left-2`}>
                  <ChevronLeft size={22} className="transition-transform duration-500 ease-soft group-hover:-translate-x-0.5" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${arrowButton} right-2`}>
                  <ChevronRight size={22} className="transition-transform duration-500 ease-soft group-hover:translate-x-0.5" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-2 top-2 grid size-10 place-items-center rounded-full bg-black/40 text-white transition-[background-color,rotate] duration-500 ease-soft hover:rotate-90 hover:bg-black/60"
            >
              <X size={20} />
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
