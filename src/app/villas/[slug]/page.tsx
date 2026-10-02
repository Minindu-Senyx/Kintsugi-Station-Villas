import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  Compass,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import SpaceExplorer from "@/components/villas/SpaceExplorer";
import VillaGalleryLightbox from "@/components/villas/VillaGalleryLightbox";
import VillaVideoModal from "@/components/villas/VillaVideoModal";
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
              {villa.videoUrl && (
                <VillaVideoModal videoUrl={villa.videoUrl} villaName={villa.name} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Villa Specifications Ribbon with Staggered Entrance */}
      <section className="border-b border-[#e2dcd2] bg-linen">
        <div className="frame px-5 py-5 sm:py-6 lg:px-[3.625rem]">
          <div className="grid grid-cols-2 gap-4 divide-y divide-[#e2dcd2] sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-[#e2dcd2]">
            <div
              data-reveal="up"
              style={delay(50)}
              className="flex items-center gap-3 pt-2 sm:pt-0 sm:pr-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e0d4] text-gold">
                <BedDouble className="size-4" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#827a6f]">Bedrooms</p>
                <p className="font-serif text-[1.05rem] text-ink">{villa.specs.bedrooms} Luxury Suites</p>
              </div>
            </div>

            <div
              data-reveal="up"
              style={delay(120)}
              className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e0d4] text-gold">
                <Users className="size-4" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#827a6f]">Occupancy</p>
                <p className="font-serif text-[1.05rem] text-ink">Up to {villa.specs.maxGuests} Guests</p>
              </div>
            </div>

            <div
              data-reveal="up"
              style={delay(190)}
              className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e0d4] text-gold">
                <Waves className="size-4" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#827a6f]">Pool & Wellness</p>
                <p className="font-serif text-[1.05rem] text-ink">{villa.specs.poolType}</p>
              </div>
            </div>

            <div
              data-reveal="up"
              style={delay(260)}
              className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e0d4] text-gold">
                <Compass className="size-4" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-[#827a6f]">Rates From</p>
                <p className="font-serif text-[1.05rem] text-ink">USD {villa.specs.rateFromUSD} / night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Philosophy Section */}
      <section className="bg-ivory py-16 sm:py-24">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p
                data-reveal="up"
                style={delay(100)}
                className="eyebrow flex items-center gap-2.5 text-[0.66rem] tracking-[0.2em] text-gold uppercase"
              >
                Estate Architecture
                <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              </p>
              <h2
                data-reveal="up"
                style={delay(200)}
                className="mt-3 font-serif text-[2.4rem] leading-[1.1] text-ink sm:text-[2.8rem]"
              >
                Crafted for Solitude.
                <br />
                Framed by Mist.
              </h2>
              <p
                data-reveal="up"
                style={delay(300)}
                className="mt-4 text-[0.92rem] leading-[1.65] text-ink-soft"
              >
                {villa.summary}
              </p>
              <div
                data-reveal="up"
                style={delay(400)}
                className="mt-8 border-l-2 border-gold pl-4 italic text-[#6a5e4b]"
              >
                &ldquo;Where the Japanese spirit of kintsugi embraces the timeless mist of the Sri Lankan highlands.&rdquo;
              </div>
            </div>

            <div className="space-y-4 text-[0.875rem] leading-[1.7] text-ink-soft lg:col-span-7">
              {villa.description.map((para, i) => (
                <p
                  key={i}
                  data-reveal="up"
                  style={delay(150 + i * 80)}
                >
                  {para}
                </p>
              ))}

              <div
                data-reveal="up"
                style={delay(380)}
                className="mt-8 rounded-[2px] border border-[#e2dcd2] bg-linen p-6 shadow-xs"
              >
                <h4 className="flex items-center gap-2 font-serif text-[1.1rem] text-ink">
                  <Sparkles className="size-4 text-gold" />
                  Curated Villa Inclusions
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-[0.82rem] text-[#3e3f3d]">
                  {villa.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2">
                      <span className="mt-1 flex size-3 shrink-0 items-center justify-center rounded-full bg-gold/25 text-[#7a591e]">
                        ✓
                      </span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

      {/* Amenities Grid */}
      <section className="bg-ivory py-16 border-t border-[#e2dcd2] sm:py-20">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="text-center">
            <p
              data-reveal="up"
              style={delay(100)}
              className="eyebrow text-[0.66rem] tracking-[0.2em] text-gold uppercase"
            >
              Curated Comfort
            </p>
            <h2
              data-reveal="up"
              style={delay(200)}
              className="mt-2 font-serif text-[2.2rem] text-ink sm:text-[2.6rem]"
            >
              Amenities & Estate Services
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {villa.amenities.map((group, gIdx) => (
              <div
                key={group.category}
                data-reveal="up"
                style={delay(100 + gIdx * 90)}
                className="rounded-[2px] border border-[#e2dcd2] bg-linen/60 p-6 transition-all duration-300 hover:border-gold/60 hover:bg-linen shadow-xs"
              >
                <h3 className="font-serif text-[1.12rem] text-ink">{group.category}</h3>
                <ul className="mt-4 space-y-2 text-[0.8rem] text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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
