"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function VillaVideoModal({ videoUrl, villaName }: { videoUrl: string; villaName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-black/30 px-5 py-2.5 text-[0.78rem] tracking-[0.06em] text-white backdrop-blur-md transition-all hover:border-gold hover:bg-black/60 hover:text-white"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-gold text-[#2c2a19] shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>
        <span className="font-serif text-[0.95rem]">Watch Villa Film</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <span className="font-serif text-[1rem] tracking-wide text-white/90">
                {villaName} · Cinematic Film
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close video"
                className="rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
