"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

// Placeholder clip — will be replaced with the client's own AI-generated
// aerial footage. Wired through the same /assets/video path as the hero so
// swapping the real file is a one-line change in src/lib/video.ts.
const PLACEHOLDER_VIDEO_SRC = "/assets/video/hero-placeholder.mp4";

type VideoLightboxProps = {
  posterImage: string;
  posterAlt: string;
};

export default function VideoLightbox({
  posterImage,
  posterAlt,
}: VideoLightboxProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden aspect-video text-left"
      >
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-20 h-20 bg-white/90 group-hover:bg-gold transition-colors">
            <Play size={28} className="text-charcoal ml-1" fill="currentColor" />
          </span>
        </span>
        <span className="sr-only">Play property video</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Property video"
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 text-white/80 hover:text-white p-2"
          >
            <X size={30} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={PLACEHOLDER_VIDEO_SRC}
              controls
              autoPlay
              className="w-full h-full"
            >
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
