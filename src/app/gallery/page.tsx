import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { delay } from "@/lib/motion";
import { bookHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of Avalon Villa, Villa Acland and the grounds at Kintsugi Station in Kandy.",
};

export default function GalleryPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-ivory">
      <section className="pb-[1.95rem] pt-[2.2rem]">
        <p
          style={delay(100)}
          className="enter-rise eyebrow text-center font-serif text-[0.7rem] font-medium tracking-[0.36em] text-ink-soft"
        >
          Gallery
        </p>
        <h1
          style={delay(220)}
          className="enter-rise mt-[0.75rem] text-center font-serif text-[2.6rem] leading-none text-ink lg:text-[3.36rem]"
        >
          Gallery
        </h1>
        <p style={delay(380)} className="enter-rise mt-[0.45rem] px-5 text-center font-serif text-[1.09rem] text-ink-soft">
          Both villas, in photographs.
        </p>
        <GalleryGrid />
      </section>

      <section className="relative flex h-[10.44rem] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/villas/avalon/avalon-courtyard-seat.webp"
          alt="Teal wall and a wooden armchair on a paved terrace under tall trees at Avalon Villa"
          fill
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-marble/55" />
        <h2
          data-reveal="up"
          className="relative -mt-[0.6rem] px-5 text-center font-serif text-[1.78rem] leading-tight text-white"
        >
          Book your stay
        </h2>
        <div data-reveal="up" style={delay(150)} className="relative mt-[0.95rem]">
          <Link
            href={bookHref}
            className="sheen btn-primary"
          >
            Book on Airbnb
          </Link>
        </div>
      </section>
    </main>
  );
}
