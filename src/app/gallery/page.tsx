import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryFooter from "@/components/gallery/GalleryFooter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { bookHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Visual moments — light, mist, and silence across our private hill country estate in Kandy.",
};

export default function GalleryPage() {
  return (
    <div className="bg-mist">
      <GalleryHeader />
      <main>
        <section className="pb-[1.95rem] pt-[2.2rem]">
          <p className="eyebrow text-center font-serif text-[0.66rem] font-medium tracking-[0.36em] text-[#3f3f38]">Gallery</p>
          <h1 className="mt-[0.75rem] text-center font-serif text-[2.6rem] leading-none text-ink lg:text-[3.36rem]">
            Visual Moments
          </h1>
          <p className="mt-[0.45rem] px-5 text-center font-serif text-[1.09rem] text-[#4a4a43]">
            Light, mist, and silence across our private hill country estate.
          </p>
          <GalleryGrid />
        </section>

        <section className="relative flex h-[10.44rem] flex-col items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/gallery_cta_mist.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[#d9d6d1]/25" />
          <h2 className="relative -mt-[0.6rem] px-5 text-center font-serif text-[1.78rem] leading-tight text-[#1b1d1a]">
            Experience the stillness yourself
          </h2>
          <Link
            href={bookHref}
            className="relative mt-[0.95rem] flex h-[2.4rem] w-[10rem] items-center justify-center bg-[#c0a257] font-serif text-[0.97rem] text-[#2c2a19] transition-[filter] hover:brightness-105"
          >
            Reserve the Villa
          </Link>
        </section>
      </main>
      <GalleryFooter />
    </div>
  );
}
