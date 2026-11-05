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

// Photographs of Avalon Villa, Villa Acland and the entrance, made by `npm run images:villas`
const AVALON = "Avalon Villa" as const;
const ACLAND = "Villa Acland" as const;
const BED = "Suites & Bedrooms" as const;
const LIV = "Living & Terraces" as const;
const OUT = "Gardens & Outdoors" as const;

const photos: Photo[] = [
  {
    id: "passage",
    src: "/assets/images/villas/acland/acland-stone-passage.webp",
    alt: "Stone-paved passage under a pergola, beside a wall of ferns and plants at Villa Acland",
    caption: ["Stone Passage", "Villa Acland"],
    tags: [ACLAND, OUT],
  },
  {
    id: "veranda",
    src: "/assets/images/villas/avalon/avalon-veranda-dining.webp",
    alt: "Dining table on the covered veranda at Avalon Villa, with sliding doors into the house",
    caption: ["Veranda Dining", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "king",
    src: "/assets/images/villas/avalon/avalon-bedroom-balcony.webp",
    alt: "King-size bed with bedside lamps and glass doors onto the balcony at Avalon Villa",
    caption: ["King Bedroom", "Avalon Villa"],
    tags: [AVALON, BED],
  },
  {
    id: "jacuzzi",
    src: "/assets/images/villas/avalon/avalon-jacuzzi-bath.webp",
    alt: "Round white bathtub in front of a large window onto the trees at Avalon Villa",
    caption: ["Jacuzzi Bath", "Avalon Villa"],
    tags: [AVALON, BED],
  },
  {
    id: "cinema",
    src: "/assets/images/villas/avalon/avalon-cinema.webp",
    alt: "Sofa facing a projector screen in the cinema room at Avalon Villa",
    caption: ["Cinema Room", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "garden",
    src: "/assets/images/villas/acland/acland-exterior-garden.webp",
    alt: "Villa Acland from the garden, its teal walls and balcony among tall trees",
    caption: ["Garden Facade", "Villa Acland"],
    tags: [ACLAND, OUT],
  },
  {
    id: "library",
    src: "/assets/images/villas/avalon/avalon-library.webp",
    alt: "Sectional sofa facing built-in white bookshelves at Avalon Villa",
    caption: ["The Library", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "patio",
    src: "/assets/images/villas/avalon/avalon-patio.webp",
    alt: "Stone patio with a lounger in front of a teal wall at Avalon Villa",
    caption: ["Stone Patio", "Avalon Villa"],
    tags: [AVALON, OUT],
  },
  {
    id: "twin",
    src: "/assets/images/villas/avalon/avalon-twin-bedroom.webp",
    alt: "Twin bedroom with garden-facing windows at Avalon Villa",
    caption: ["Twin Bedroom", "Avalon Villa"],
    tags: [AVALON, BED],
  },
  {
    id: "kitchen",
    src: "/assets/images/villas/avalon/avalon-kitchen-bar.webp",
    alt: "Kitchen breakfast bar with high stools at Avalon Villa",
    caption: ["Kitchen Bar", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "piano",
    src: "/assets/images/villas/avalon/avalon-piano-hall.webp",
    alt: "Hall with a piano and a brick pillar at Avalon Villa",
    caption: ["Piano Hall", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "stone-bath",
    src: "/assets/images/villas/avalon/avalon-stone-bath.webp",
    alt: "Sunken stone bath below a timber-framed window at Avalon Villa",
    caption: ["Stone Bath", "Avalon Villa"],
    tags: [AVALON, BED],
  },
  {
    id: "lounge",
    src: "/assets/images/villas/avalon/avalon-veranda-lounge.webp",
    alt: "Veranda seating area with cane armchairs and a sofa at Avalon Villa",
    caption: ["Veranda Lounge", "Avalon Villa"],
    tags: [AVALON, LIV],
  },
  {
    id: "courtyard",
    src: "/assets/images/villas/avalon/avalon-courtyard.webp",
    alt: "Cobbled courtyard under mature trees at Avalon Villa",
    caption: ["The Courtyard", "Avalon Villa"],
    tags: [AVALON, OUT],
  },
  {
    id: "acland-bed",
    src: "/assets/images/villas/acland/acland-bedroom-bed.webp",
    alt: "King-size bed with a teak headboard at Villa Acland",
    caption: ["King Bedroom", "Villa Acland"],
    tags: [ACLAND, BED],
  },
  {
    id: "acland-vaulted",
    src: "/assets/images/villas/acland/acland-bedroom-vaulted.webp",
    alt: "Bedroom under a vaulted timber ceiling at Villa Acland",
    caption: ["Vaulted Bedroom", "Villa Acland"],
    tags: [ACLAND, BED],
  },
  {
    id: "acland-kitchen",
    src: "/assets/images/villas/acland/acland-kitchen-stairs.webp",
    alt: "Kitchen and round dining table beside a floating staircase at Villa Acland",
    caption: ["Kitchen & Dining", "Villa Acland"],
    tags: [ACLAND, LIV],
  },
  {
    id: "acland-dining",
    src: "/assets/images/villas/acland/acland-dining-balcony.webp",
    alt: "Round dining table by open doors onto the balcony at Villa Acland",
    caption: ["Dining by the Balcony", "Villa Acland"],
    tags: [ACLAND, LIV],
  },
  {
    id: "acland-balcony",
    src: "/assets/images/villas/acland/acland-balcony-veranda.webp",
    alt: "Covered balcony with two wooden armchairs at Villa Acland",
    caption: ["The Balcony", "Villa Acland"],
    tags: [ACLAND, LIV, OUT],
  },
  {
    id: "acland-canopy",
    src: "/assets/images/villas/acland/acland-balcony-canopy.webp",
    alt: "Looking down through the branches of a large tree from the balcony at Villa Acland",
    caption: ["Into the Canopy", "Villa Acland"],
    tags: [ACLAND, OUT],
  },
  {
    id: "acland-walkway",
    src: "/assets/images/villas/acland/acland-breezeway.webp",
    alt: "Covered timber walkway laid with river pebbles at Villa Acland",
    caption: ["Pebble Walkway", "Villa Acland"],
    tags: [ACLAND, OUT],
  },
  {
    id: "gate",
    src: "/assets/images/grounds/entrance-gate.webp",
    alt: "The open gate and stone path at the entrance to Kintsugi Station",
    caption: ["Entrance Gate", "Kintsugi Station"],
    tags: [OUT],
  },
  {
    id: "path",
    src: "/assets/images/grounds/entrance-path.webp",
    alt: "Stone path beside a moss-covered wall at the entrance to Kintsugi Station",
    caption: ["The Stone Path", "Kintsugi Station"],
    tags: [OUT],
  },
];

const featuredIds = ["passage", "veranda", "king", "jacuzzi", "cinema", "garden"];
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
                <Tile photo={byId("passage")} wait={0} onOpen={openPhoto} className="h-96 lg:h-[26.75rem]" sizes="(min-width: 900px) 31vw, 100vw" />
                <Tile photo={byId("veranda")} wait={150} onOpen={openPhoto} className="h-80 lg:h-[20.44rem]" sizes="(min-width: 900px) 31vw, 100vw" />
              </div>
              <div className="grid gap-2 lg:gap-[0.5rem]">
                <div className="grid gap-2 sm:grid-cols-[363fr_297fr] lg:gap-[0.5rem]">
                  <Tile photo={byId("king")} wait={120} onOpen={openPhoto} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 36vw, 100vw" />
                  <Tile photo={byId("jacuzzi")} wait={240} onOpen={openPhoto} className="h-80 lg:h-[23.125rem]" sizes="(min-width: 900px) 29vw, 100vw" />
                </div>
                <div className="grid gap-2 sm:grid-cols-[331fr_328fr] lg:gap-[0.56rem]">
                  <Tile photo={byId("cinema")} wait={120} onOpen={openPhoto} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
                  <Tile photo={byId("garden")} wait={240} onOpen={openPhoto} className="h-80 lg:h-[24.06rem]" sizes="(min-width: 900px) 33vw, 100vw" />
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
