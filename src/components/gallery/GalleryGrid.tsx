"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const categories = ["All", "Architecture & Living", "The Suite", "Valley Views", "Dining & Rituals"] as const;
type Category = (typeof categories)[number];

type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: [string, string];
  tags: Exclude<Category, "All">[];
};

// The first six photos form the "All" mosaic exactly as laid out in the mockup.
const photos: Photo[] = [
  {
    id: "pool",
    src: "/assets/images/pool_mist.jpg",
    alt: "Infinity pool reflecting mist-covered mountains",
    caption: ["A Higher", "Kind of Quiet"],
    tags: ["Valley Views", "Architecture & Living"],
  },
  {
    id: "suite",
    src: "/assets/images/teak_bedroom.jpg",
    alt: "Teak master suite opening onto the valley",
    caption: ["Wake to", "A Wilder World"],
    tags: ["The Suite"],
  },
  {
    id: "bath",
    src: "/assets/images/stone_bath.jpg",
    alt: "Stone bath scattered with frangipani flowers",
    caption: ["Rituals", "in Nature"],
    tags: ["The Suite", "Dining & Rituals"],
  },
  {
    id: "tea",
    src: "/assets/images/tea_terrace.jpg",
    alt: "Ceylon tea served on a terrace above the hills",
    caption: ["Ceylon Tea", "Higher Perspectives"],
    tags: ["Dining & Rituals", "Valley Views"],
  },
  {
    id: "flavours",
    src: "/assets/images/artisanal_breakfast.jpg",
    alt: "Sri Lankan breakfast laid out on the veranda",
    caption: ["Sri Lankan Flavours", "A Slower Table"],
    tags: ["Dining & Rituals"],
  },
  {
    id: "night",
    src: "/assets/images/night_villa_hills.jpg",
    alt: "The villa lit up at dusk among forested hills",
    caption: ["Home", "in the Hills"],
    tags: ["Architecture & Living"],
  },
  {
    id: "pavilion",
    src: "/assets/images/open_air_pavilion.jpg",
    alt: "Open-air pavilion lounge overlooking the valley",
    caption: ["Open-Air", "Pavilion"],
    tags: ["Architecture & Living", "Valley Views"],
  },
  {
    id: "exterior",
    src: "/assets/images/villa_forest_exterior.jpg",
    alt: "Timber villa on a stone plinth in the rainforest",
    caption: ["Timber & Stone", "Rooted in Place"],
    tags: ["Architecture & Living"],
  },
  {
    id: "hero",
    src: "/assets/images/homepage_hero.jpg",
    alt: "Sunset over the pool deck and pavilion",
    caption: ["Golden Hour", "Over the Estate"],
    tags: ["Architecture & Living", "Valley Views"],
  },
  {
    id: "lake",
    src: "/assets/images/about_hero_panorama.jpg",
    alt: "Mist rising off a lake in the Kandy hills",
    caption: ["Morning Mist", "Across the Lake"],
    tags: ["Valley Views"],
  },
  {
    id: "ridge",
    src: "/assets/images/mist_mountain_ridge.jpg",
    alt: "Forest ridges above a sea of cloud",
    caption: ["Above", "the Clouds"],
    tags: ["Valley Views"],
  },
  {
    id: "dining",
    src: "/assets/images/host_dining_ritual.jpg",
    alt: "Private chef's curries served in the garden",
    caption: ["The Chef's", "Garden Table"],
    tags: ["Dining & Rituals"],
  },
];

const byId = (id: string) => photos.find((p) => p.id === id)!;

function Tile({ photo, className, sizes, onOpen }: { photo: Photo; className: string; sizes: string; onOpen: (p: Photo) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      className={`group relative block w-full overflow-hidden text-left ${className}`}
      aria-label={`View photo: ${photo.caption.join(" ")}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(10,14,11,0.62),rgba(10,14,11,0))]"
      />
      <span className="absolute bottom-[1.3rem] left-[1.25rem] font-serif text-[0.6rem] leading-[1rem] tracking-[0.2em] text-[#f4f1e8] uppercase">
        {photo.caption[0]}
        <br />
        {photo.caption[1]}
      </span>
    </button>
  );
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Category>("All");
  const [open, setOpen] = useState<Photo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const filtered = photos.filter((p) => filter !== "All" && p.tags.includes(filter as Exclude<Category, "All">));

  return (
    <>
      <div role="group" aria-label="Filter photos" className="mt-[1.5rem] flex flex-wrap justify-center gap-[0.62rem] px-5">
        {categories.map((cat) => {
          const active = cat === filter;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(cat)}
              className={`h-[2rem] rounded-full border font-serif text-[0.855rem] transition-colors ${
                cat === "All" ? "w-[4.5rem]" : "px-[1.15rem]"
              } ${
                active
                  ? "border-[#1b261d] bg-[#1b261d] text-[#f1ede9]"
                  : "border-[#b3aea5] text-[#2b2b25] hover:border-[#1b261d]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-[1.8rem] max-w-[64rem] px-3 lg:px-[1.0625rem]">
        {filter === "All" ? (
          <div className="grid gap-2 lg:grid-cols-[314fr_668fr] lg:gap-[0.5rem]">
            <div className="grid gap-2 lg:gap-[0.5rem]">
              <Tile photo={byId("pool")} onOpen={setOpen} className="h-96 lg:h-[26.75rem]" sizes="(min-width: 900px) 31vw, 100vw" />
              <Tile photo={byId("tea")} onOpen={setOpen} className="h-80 lg:h-[20.44rem]" sizes="(min-width: 900px) 31vw, 100vw" />
            </div>
            <div className="grid gap-2 lg:gap-[0.5rem]">
              <div className="grid gap-2 sm:grid-cols-[363fr_297fr] lg:gap-[0.5rem]">
                <Tile photo={byId("suite")} onOpen={setOpen} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 36vw, 100vw" />
                <Tile photo={byId("bath")} onOpen={setOpen} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 29vw, 100vw" />
              </div>
              <div className="grid gap-2 sm:grid-cols-[331fr_328fr] lg:gap-[0.56rem]">
                <Tile photo={byId("flavours")} onOpen={setOpen} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
                <Tile photo={byId("night")} onOpen={setOpen} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[0.5rem]">
            {filtered.map((photo) => (
              <Tile
                key={photo.id}
                photo={photo}
                onOpen={setOpen}
                className="h-80 lg:h-[20rem]"
                sizes="(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(92vw,70rem)] bg-transparent p-0 backdrop:bg-[#0b100c]/85"
      >
        {open && (
          <figure className="relative">
            <div className="relative aspect-[3/2] max-h-[82vh] w-full">
              <Image src={open.src} alt={open.alt} fill sizes="92vw" quality={85} className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center font-serif text-sm tracking-[0.2em] text-[#e6e2d4] uppercase">
              {open.caption.join(" · ")}
            </figcaption>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-2 top-2 grid size-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <X size={20} />
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
}
