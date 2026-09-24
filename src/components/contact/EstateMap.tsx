"use client";

import { useState } from "react";
import { Maximize, Minus, Plus } from "lucide-react";
import { delay } from "@/lib/motion";
import { contact } from "@/lib/site";

/*
 * Stylised terrain map of the estate's surroundings, drawn in SVG so it stays
 * crisp at any size. Procedural noise supplies the vegetation patches; roads,
 * river and the forest reserve are hand-placed to echo the mockup.
 */
export default function EstateMap() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative h-60 overflow-hidden rounded-[6px] bg-[#dfe1d3] shadow-[0_1px_2px_rgba(0,0,0,0.06)] lg:h-[14.875rem]">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoom})`, transformOrigin: "53% 34%" }}
      >
        <svg viewBox="0 0 450 238" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <filter id="map-veg" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018 0.024" numOctaves="4" seed="7" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.62  0 0 0 0 0.70  0 0 0 0 0.58  0 0 0 -2.6 1.55"
              />
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
            <filter id="map-fine" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 0.97  0 0 0 -3 1.35" />
            </filter>
            <filter id="map-soft">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect width="450" height="238" fill="#dfe1d3" />
          <rect width="450" height="238" filter="url(#map-veg)" opacity="0.85" />

          {/* Hantana forest reserve */}
          <path
            d="M300 120 C330 95 380 105 420 90 C445 82 460 110 455 150 C450 200 440 240 400 245 C350 250 300 240 280 210 C265 185 280 140 300 120 Z"
            fill="#a8b89c"
            opacity="0.8"
            filter="url(#map-soft)"
          />
          <path
            d="M0 0 C40 10 80 -5 110 20 C130 40 90 70 60 80 C30 90 0 70 0 50 Z"
            fill="#b3c1a6"
            opacity="0.6"
            filter="url(#map-soft)"
          />
          {/* Kandy town, lighter built-up area */}
          <path
            d="M0 175 C30 150 90 150 140 170 C170 182 190 210 180 245 L0 245 Z"
            fill="#ebe9df"
            opacity="0.9"
            filter="url(#map-soft)"
          />
          <rect width="450" height="238" filter="url(#map-fine)" opacity="0.35" />

          {/* River */}
          <path
            d="M95 238 C120 215 140 205 170 190 C200 175 215 160 240 150 C270 138 300 132 330 118 C360 104 385 80 420 70 C435 66 445 58 455 52"
            fill="none"
            stroke="#bccacb"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Roads */}
          <g fill="none" stroke="#f6f5ee" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 120 C60 118 120 130 170 115 C210 104 230 100 245 70 C255 50 262 25 265 0" strokeWidth="2.6" />
            <path d="M245 70 C290 78 330 60 370 50 C400 42 430 30 455 25" strokeWidth="2.2" />
            <path d="M40 238 C60 200 80 180 120 165 C160 150 200 140 240 125 C270 114 300 100 330 108 C360 116 400 118 455 112" strokeWidth="2" />
            <path d="M170 115 C180 140 200 150 240 125" strokeWidth="1.4" />
            <path d="M120 165 C110 130 90 100 60 70 C40 50 20 40 0 38" strokeWidth="1.3" />
            <path d="M330 108 C335 140 330 170 310 200 C300 215 295 230 292 245" strokeWidth="1.3" />
            <path d="M265 0 C290 20 320 30 350 20 C380 10 410 12 440 0" strokeWidth="1" />
            <path d="M0 200 C20 190 40 185 60 195 C80 205 95 225 100 245" strokeWidth="1" />
            <path d="M150 0 C160 30 175 50 200 60 C220 68 235 72 245 70" strokeWidth="1" />
            <path d="M370 50 C380 80 395 95 420 105" strokeWidth="1" />
            <path d="M200 238 C210 210 230 190 255 180 C280 170 300 175 330 160" strokeWidth="0.9" />
          </g>
        </svg>
      </div>

      {/* Estate marker */}
      <div
        data-reveal="drop"
        style={delay(600)}
        className="pointer-events-none absolute left-[53.2%] top-[22.5%] flex -translate-x-1/2 flex-col items-center"
      >
        <span aria-hidden="true" className="pulse-ring absolute top-[2.1rem] h-[0.7rem] w-[1.6rem] rounded-[50%] bg-[#a8854f]/45" />
        <svg viewBox="0 0 28 38" className="relative h-[2.45rem] w-[1.8rem] drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" aria-hidden="true">
          <path d="M14 1 C6.8 1 1 6.8 1 14 C1 23.5 14 37 14 37 C14 37 27 23.5 27 14 C27 6.8 21.2 1 14 1 Z" fill="#a8854f" />
          <circle cx="14" cy="13.5" r="4.6" fill="#3d3a33" />
        </svg>
        <span className="mt-[0.45rem] whitespace-nowrap font-serif text-[0.82rem] tracking-[0.06em] text-[#3a3a33]">
          KINTSUGI STATION
        </span>
      </div>

      <p className="pointer-events-none absolute right-[0.95rem] top-[57%] text-right text-[0.97rem] leading-[1.4rem] text-[#3a3d38]">
        Hantana
        <br />
        Forest Reserve
      </p>
      <p className="pointer-events-none absolute bottom-[1.25rem] left-[3.8rem] text-[1.32rem] text-[#2f322e]">Kandy</p>

      <a
        href={contact.mapsHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Open in Google Maps"
        className="absolute right-[0.6rem] top-[0.6rem] grid size-[1.85rem] place-items-center rounded-[3px] bg-white/95 text-[#2f322e] shadow-sm hover:bg-white"
      >
        <Maximize className="size-[0.95rem]" strokeWidth={1.8} />
      </a>

      <div className="absolute bottom-[0.6rem] left-[0.55rem] flex flex-col overflow-hidden rounded-[3px] bg-white/95 shadow-sm">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + 0.35, 2.4))}
          aria-label="Zoom in"
          className="grid h-[2.05rem] w-[2.05rem] place-items-center border-b border-black/10 text-[#2f322e] hover:bg-white"
        >
          <Plus className="size-[1.05rem]" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - 0.35, 1))}
          aria-label="Zoom out"
          className="grid h-[2.05rem] w-[2.05rem] place-items-center text-[#2f322e] hover:bg-white"
        >
          <Minus className="size-[1.05rem]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
