import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  Compass,
  Users,
  Waves,
} from "lucide-react";
import { QuoteMark } from "@/components/brand/QuoteMark";
import SpaceExplorer from "@/components/villas/SpaceExplorer";
import VillaAmenities from "@/components/villas/VillaAmenities";
import VillaGalleryLightbox from "@/components/villas/VillaGalleryLightbox";
import { delay } from "@/lib/motion";
import { allVillas, getVillaBySlug, villas } from "@/lib/villas";

export function generateStaticParams() {
  return allVillas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    return { title: "Villa Not Found" };
  }

  return {
    title: `${villa.name} · Kintsugi Station Kandy`,
    description: villa.summary,
  };
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    notFound();
  }

  const sisterVilla = slug === "avalon" ? villas.acland : villas.avalon;

  return (
    <main className="bg-ivory text-ink">
      {/* Villa Hero Section */}
      <section className="relative min-h-[40rem] overflow-hidden lg:h-[36rem] lg:min-h-0">
        <Image
          src={villa.heroImage}
          alt={villa.name}
          fill
          priority
          sizes="100vw"
          className="enter-settle object-cover object-[50%_40%]"
        />
        {/* Cinematic gradient overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 lg:bg-[linear-gradient(90deg,rgba(16,19,17,0.8)_0%,rgba(16,19,17,0.5)_55%,rgba(16,19,17,0.22)_100%)]"
        />

        <div className="frame relative flex h-full flex-col justify-end px-5 pb-10 pt-28 sm:pb-12 lg:justify-center lg:px-[3.625rem] lg:pt-16">
          <div className="max-w-2xl">
            <p
              style={delay(100)}
              className="enter-rise eyebrow inline-block rounded-full bg-black/40 px-3.5 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-[#d9b877] uppercase backdrop-blur-md"
            >
              {villa.eyebrow}
            </p>
            <h1
              style={delay(200)}
              className="enter-rise mt-3 font-serif text-[2.8rem] leading-[1.05] text-white sm:text-[3.6rem] lg:text-[4.2rem]"
            >
              {villa.name}
            </h1>
            <p
              style={delay(350)}
              className="enter-rise mt-3 max-w-xl font-serif text-[1.12rem] italic leading-snug text-white/90 sm:text-[1.25rem]"
            >
              {villa.tagline}
            </p>

            <span
              aria-hidden="true"
              style={delay(500)}
              className="enter-line mt-5 block h-px w-14 bg-gold"
            />

            {/* CTAs */}
            <div style={delay(600)} className="enter-rise mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#spaces"
                className="sheen flex h-[2.5rem] items-center justify-center bg-gold px-6 text-[0.8rem] font-medium tracking-[0.06em] text-[#2c2a19] shadow transition-colors hover:bg-[#8f6d31]"
              >
                Step Inside & Explore
              </a>
              <Link
                href={`/contact?villa=${villa.slug}#inquiry`}
                className="flex h-[2.5rem] items-center justify-center rounded-[2px] border border-white/50 bg-white/10 px-6 text-[0.8rem] tracking-[0.06em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
              >
                Reserve This Villa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Specifications Architectural Ledger */}
      <section className="border-b border-[#e2dcd2] bg-mist/70">
        <div className="frame px-5 py-6 lg:px-[3.625rem]">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 sm:divide-x sm:divide-[#e2dcd2]">
            <div
              data-reveal="up"
              style={delay(50)}
              className="flex flex-col sm:pr-6"
            >
              <span className="eyebrow text-[0.58rem] tracking-[0.28em] text-[#8e8578] uppercase">
                Accommodates
              </span>
              <span className="mt-1 font-serif text-[1.18rem] text-ink sm:text-[1.25rem]">
                {villa.specs.bedrooms} Luxury {villa.specs.bedrooms === 1 ? "Suite" : "Suites"}
              </span>
              <span className="mt-0.5 text-[0.76rem] text-[#6b665e]">
                Up to {villa.specs.maxGuests} guests
              </span>
            </div>

            <div
              data-reveal="up"
              style={delay(120)}
              className="flex flex-col sm:px-6"
            >
              <span className="eyebrow text-[0.58rem] tracking-[0.28em] text-[#8e8578] uppercase">
                Bathrooms
              </span>
              <span className="mt-1 font-serif text-[1.18rem] text-ink sm:text-[1.25rem]">
                {villa.specs.bathrooms} {villa.specs.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
              </span>
              <span className="mt-0.5 text-[0.76rem] text-[#6b665e]">
                Sunken stone soaking bath & en-suite
              </span>
            </div>

            <div
              data-reveal="up"
              style={delay(190)}
              className="flex flex-col sm:px-6"
            >
              <span className="eyebrow text-[0.58rem] tracking-[0.28em] text-[#8e8578] uppercase">
                Setting &amp; Grounds
              </span>
              <span className="mt-1 font-serif text-[1.18rem] text-ink sm:text-[1.25rem]">
                {villa.specs.poolType.includes("Infinity") ? "Infinity Pool" : "Stone Soaking Bath"}
              </span>
              <span className="mt-0.5 text-[0.76rem] text-[#6b665e] line-clamp-1">
                {villa.specs.setting}
              </span>
            </div>

            <div
              data-reveal="up"
              style={delay(260)}
              className="flex flex-col sm:pl-6"
            >
              <span className="eyebrow text-[0.58rem] tracking-[0.28em] text-[#8e8578] uppercase">
                Estate Rate
              </span>
              <span className="mt-1 font-serif text-[1.18rem] text-ink sm:text-[1.25rem]">
                USD {villa.specs.rateFromUSD} <span className="font-sans text-[0.72rem] font-normal text-[#6b665e]">/ night</span>
              </span>
              <span className="mt-0.5 text-[0.76rem] text-[#6b665e]">
                Exclusive hire · Chef service included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Philosophy Section */}
      <section className="bg-ivory py-16 sm:py-24">
        <div className="frame px-5 lg:px-[3.625rem]">
          {/* Top Row: Editorial Narrative & Architectural Photography Feature */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p
                data-reveal="up"
                style={delay(100)}
                className="eyebrow flex items-center gap-2.5 text-[0.62rem] tracking-[0.28em] text-[#8e8578] uppercase"
              >
                <span>Estate Architecture</span>
                <span aria-hidden="true" className="h-px w-8 bg-[#c7b27a]" />
              </p>
              <h2
                data-reveal="up"
                style={delay(200)}
                className="mt-3 font-serif text-[2.4rem] leading-[1.1] text-ink sm:text-[2.85rem]"
              >
                {slug === "avalon" ? (
                  <>
                    Crafted for Solitude.
                    <br />
                    Framed by Mist.
                  </>
                ) : (
                  <>
                    Carved from River Stone.
                    <br />
                    Sheltered by Canopy.
                  </>
                )}
              </h2>
              <p
                data-reveal="up"
                style={delay(300)}
                className="mt-4 text-[0.9rem] leading-[1.7] text-ink-soft"
              >
                {villa.summary}
              </p>
              <blockquote
                data-reveal="up"
                style={delay(400)}
                className="mt-7 border-l border-[#d8caa4] pl-5"
              >
                <QuoteMark className="h-[1.1rem] text-[2.4rem]" />
                <p className="mt-1 font-serif text-[1.08rem] italic leading-[1.5] text-[#2c2e29]">
                  {slug === "avalon"
                    ? "Where the Japanese spirit of kintsugi embraces the timeless mist of the Sri Lankan highlands."
                    : "A quiet dwelling where weathered teak and river stone invite time to slow into stillness."}
                </p>
                <p className="eyebrow mt-3 flex items-center gap-2 text-[0.54rem] tracking-[0.32em] text-[#b5a06a] uppercase">
                  <span aria-hidden="true" className="h-px w-6 bg-[#c7b27a]" />
                  <span>Kintsugi Sanctuary · Upper Hantana</span>
                </p>
              </blockquote>
            </div>

            {/* Authentic Architectural Photograph Anchor */}
            <div className="lg:col-span-7">
              <div
                data-reveal="image"
                style={delay(250)}
                className="group relative aspect-[16/11] w-full overflow-hidden rounded-[2px] shadow-sm transition-shadow duration-500 hover:shadow-md"
              >
                <Image
                  src={villa.architectureImage.src}
                  alt={villa.architectureImage.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <p className="font-serif text-[0.92rem] italic text-white/95">
                    {villa.architectureImage.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Two-Column Editorial Narrative */}
          <div className="mt-12 border-t border-[#e8e2d8] pt-10 sm:mt-16 sm:pt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-14 text-[0.88rem] leading-[1.75] text-[#474c49]">
              <div>
                <p className="font-serif text-[1.12rem] italic text-ink mb-3 leading-snug">
                  {slug === "avalon"
                    ? "An intentional dialogue between raw highland timber, cantilevered decks, and shifting mountain light."
                    : "An organic sanctuary where hand-chiseled stone plinths open to the cool mountain breeze."}
                </p>
                <p>{villa.description[0]}</p>
              </div>
              <div className="space-y-4">
                <p>{villa.description[1]}</p>
                {villa.description[2] && <p>{villa.description[2]}</p>}
              </div>
            </div>
          </div>

          {/* Bottom Row: Curated Residence Inclusions (Bespoke Editorial Strip) */}
          <div
            data-reveal="up"
            style={delay(350)}
            className="mt-12 rounded-[2px] border-y border-[#e2dcd2] bg-mist/60 px-6 py-8 sm:mt-16 sm:px-10 sm:py-10"
          >
            <div className="flex flex-col justify-between border-b border-[#e2dcd2]/80 pb-5 sm:flex-row sm:items-baseline">
              <div>
                <p className="eyebrow text-[0.6rem] tracking-[0.3em] text-[#8e8578] uppercase">
                  Exclusive Residence Privileges
                </p>
                <h3 className="mt-1 font-serif text-[1.5rem] text-ink sm:text-[1.75rem]">
                  Every Stay, Thoughtfully Curated
                </h3>
              </div>
              <p className="mt-2 font-serif text-[0.85rem] italic text-[#786e60] sm:mt-0">
                Reserved exclusively for your party · Complete hillside seclusion
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {villa.inclusions.map((inc, i) => (
                <div key={inc} className="flex items-start gap-3.5">
                  <span className="mt-0.5 font-serif text-[0.85rem] font-medium text-gold select-none">
                    0{i + 1}
                  </span>
                  <p className="text-[0.82rem] leading-[1.55] text-[#3c3e3b]">
                    {inc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step Inside: Interactive Space Explorer */}
      <section id="spaces" className="scroll-mt-16 border-t border-[#e2dcd2] bg-mist py-16 sm:py-24">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="mb-10 text-center sm:mb-12">
            <p
              data-reveal="up"
              style={delay(100)}
              className="eyebrow inline-block text-[0.66rem] tracking-[0.24em] text-gold uppercase"
            >
              Step Inside
            </p>
            <h2
              data-reveal="up"
              style={delay(200)}
              className="mt-2 font-serif text-[2.4rem] leading-tight text-ink sm:text-[3rem]"
            >
              Explore the Spaces of {villa.name}
            </h2>
            <p
              data-reveal="up"
              style={delay(300)}
              className="mx-auto mt-3 max-w-xl text-[0.9rem] text-ink-soft"
            >
              Every room, suite, and terrace has been thoughtfully designed to balance raw natural textures with absolute modern comfort.
            </p>
            <span
              aria-hidden="true"
              data-reveal="line"
              style={delay(380)}
              className="mx-auto mt-4 block h-px w-14 bg-gold"
            />
          </div>

          <SpaceExplorer spaces={villa.spaces} />
        </div>
      </section>

      {/* Amenities & Estate Services */}
      <VillaAmenities
        amenities={villa.amenities}
        villaSlug={villa.slug}
        villaName={villa.name}
      />

      {/* Real Photography Visual Chronicle */}
      <section className="border-t border-[#e2dcd2] bg-linen py-16 sm:py-24">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="mb-10 text-center sm:mb-14">
            <p
              data-reveal="up"
              style={delay(100)}
              className="eyebrow text-[0.66rem] tracking-[0.24em] text-gold uppercase"
            >
              Visual Chronicle
            </p>
            <h2
              data-reveal="up"
              style={delay(200)}
              className="mt-2 font-serif text-[2.4rem] text-ink sm:text-[3rem]"
            >
              Moments at {villa.name}
            </h2>
            <p
              data-reveal="up"
              style={delay(300)}
              className="mx-auto mt-2 max-w-xl text-[0.88rem] text-ink-soft"
            >
              Authentic property photography capturing sunlight, timber textures, and mountain stillness. Hover over any frame to inspect details.
            </p>
            <span
              aria-hidden="true"
              data-reveal="line"
              style={delay(380)}
              className="mx-auto mt-4 block h-px w-14 bg-gold"
            />
          </div>

          <VillaGalleryLightbox photos={villa.gallery} />
        </div>
      </section>

      {/* Sister Villa Showcase */}
      <section className="border-t border-[#e2dcd2] bg-mist py-14">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div
            data-reveal="up"
            style={delay(100)}
            className="flex flex-col items-center justify-between gap-6 rounded-[2px] border border-[#dcd6ca] bg-ivory p-6 shadow-xs transition-shadow duration-500 hover:shadow-md sm:p-8 lg:flex-row lg:gap-10"
          >
            <div
              data-reveal="image"
              style={delay(150)}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] sm:w-72 lg:w-80 shrink-0"
            >
              <Image
                src={sisterVilla.heroImage}
                alt={sisterVilla.name}
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="eyebrow text-[0.62rem] tracking-[0.2em] text-gold uppercase">
                Also at Kandy Branch
              </p>
              <h3 className="mt-1 font-serif text-[1.8rem] text-ink sm:text-[2.1rem]">
                Discover {sisterVilla.name}
              </h3>
              <p className="mt-2 text-[0.85rem] text-ink-soft sm:max-w-xl">
                {sisterVilla.tagline} — {sisterVilla.specs.bedrooms} {sisterVilla.specs.bedrooms === 1 ? "suite" : "suites"}, accommodating up to {sisterVilla.specs.maxGuests} guests with dedicated host service.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href={`/villas/${sisterVilla.slug}`}
                className="sheen group flex items-center gap-2 rounded-[2px] bg-ink px-5 py-2.5 text-[0.8rem] text-white transition-colors hover:bg-gold hover:text-[#1c1d1a]"
              >
                <span>Explore {sisterVilla.name}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA Strip */}
      <section className="relative overflow-hidden bg-linen py-16 border-t border-[#e2dcd2]">
        <div
          data-reveal="up"
          style={delay(100)}
          className="frame relative flex flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:px-[3.625rem] lg:text-left"
        >
          <div>
            <p className="eyebrow text-[0.64rem] tracking-[0.2em] text-gold uppercase">
              Reserve Your Stay
            </p>
            <h2 className="mt-2 font-serif text-[2.4rem] leading-none text-ink sm:text-[2.8rem]">
              Experience {villa.name}
            </h2>
            <p className="mt-3 text-[0.88rem] text-ink-soft">
              Entire villa for your exclusive use · Dedicated private chef & mountain concierge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-right">
              <p className="text-[0.65rem] tracking-[0.14em] text-[#8a7d6b] uppercase">From</p>
              <p className="font-serif text-[1.8rem] leading-none text-ink">USD {villa.specs.rateFromUSD}</p>
              <p className="mt-0.5 text-[0.68rem] text-[#6a6864]">per night</p>
            </div>
            <Link
              href={`/contact?villa=${villa.slug}#inquiry`}
              className="sheen flex h-[2.6rem] items-center justify-center bg-gold px-7 text-[0.82rem] font-medium tracking-[0.06em] text-[#2c2a19] shadow transition-colors hover:bg-[#8f6d31]"
            >
              Book {villa.name}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
