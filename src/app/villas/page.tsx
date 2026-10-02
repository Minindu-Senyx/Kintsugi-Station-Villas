import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Compass, Sparkles, Users, Waves } from "lucide-react";
import { delay } from "@/lib/motion";
import { allVillas } from "@/lib/villas";

export const metadata: Metadata = {
  title: "The Villas · Kandy Estate · Kintsugi Station",
  description:
    "Discover our two private luxury residences in Kandy, Sri Lanka: Avalon Villa (3-Bedroom Hillside Residence) and Villa Acland (Artisan Secluded Sanctuary).",
};

export default function VillasOverviewPage() {
  return (
    <main className="bg-ivory text-ink">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#e2dcd2] bg-mist py-16 sm:py-24">
        {/* Subtle background radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,191,135,0.12),transparent_70%)]"
        />

        <div className="frame relative px-5 text-center lg:px-[3.625rem]">
          <p
            style={delay(100)}
            className="enter-rise eyebrow inline-flex items-center gap-2 text-[0.66rem] tracking-[0.24em] text-gold uppercase"
          >
            <Sparkles className="size-3 text-gold" />
            <span>Kandy Branch · Sri Lanka</span>
          </p>

          <h1
            style={delay(200)}
            className="enter-rise mt-3 font-serif text-[2.8rem] leading-[1.08] text-ink sm:text-[3.8rem] lg:text-[4.2rem]"
          >
            Two Private Sanctuaries
          </h1>

          <p
            style={delay(350)}
            className="enter-rise mx-auto mt-4 max-w-2xl text-[0.95rem] leading-[1.65] text-ink-soft sm:text-[1rem]"
          >
            Perched high in the mist-veiled hills of Upper Hantana, our Kandy estate comprises two distinct architectural villas, each reserved exclusively for one party at a time.
          </p>

          <div
            aria-hidden="true"
            style={delay(500)}
            className="enter-line mx-auto mt-6 h-px w-16 bg-gold"
          />
        </div>
      </section>

      {/* Villas Showcase */}
      <section className="py-16 sm:py-24 lg:py-28">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="flex flex-col gap-20 lg:gap-32">
            {allVillas.map((villa, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={villa.slug}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Villa Hero Image */}
                  <div
                    data-reveal="image"
                    style={delay(100)}
                    className={`group relative aspect-[16/10] w-full overflow-hidden rounded-[2px] shadow-sm transition-shadow duration-500 hover:shadow-lg lg:col-span-7 ${
                      isEven ? "lg:col-start-6" : ""
                    }`}
                  >
                    <Image
                      src={villa.heroImage}
                      alt={villa.name}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3.5 py-1 text-[0.64rem] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-md">
                      {villa.specs.bedrooms} {villa.specs.bedrooms === 1 ? "Bedroom Suite" : "Bedroom Residence"}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
                      <p className="font-serif text-[0.95rem] font-light text-[#f0ebe3]">
                        {villa.specs.setting}
                      </p>
                    </div>
                  </div>

                  {/* Villa Info Column */}
                  <div className={`flex flex-col lg:col-span-5 ${isEven ? "lg:col-start-1" : ""}`}>
                    <p
                      data-reveal="up"
                      style={delay(150)}
                      className="eyebrow text-[0.64rem] tracking-[0.2em] text-gold uppercase"
                    >
                      {villa.eyebrow}
                    </p>

                    <h2
                      data-reveal="up"
                      style={delay(250)}
                      className="mt-2 font-serif text-[2.4rem] leading-[1.1] text-ink sm:text-[3rem]"
                    >
                      {villa.name}
                    </h2>

                    <p
                      data-reveal="up"
                      style={delay(350)}
                      className="mt-2.5 font-serif text-[1.05rem] italic text-[#6a5e4b]"
                    >
                      {villa.tagline}
                    </p>

                    <span
                      aria-hidden="true"
                      data-reveal="line"
                      style={delay(420)}
                      className="mt-4 block h-px w-12 bg-gold/70"
                    />

                    <p
                      data-reveal="up"
                      style={delay(460)}
                      className="mt-4 text-[0.88rem] leading-[1.7] text-ink-soft"
                    >
                      {villa.summary}
                    </p>

                    {/* Specs Pills Grid */}
                    <div
                      data-reveal="up"
                      style={delay(540)}
                      className="mt-6 grid grid-cols-2 gap-3.5 border-y border-[#e2dcd2] py-4.5 text-[0.8rem] text-[#4d4e4b]"
                    >
                      <div className="flex items-center gap-2.5">
                        <BedDouble className="size-4 text-gold shrink-0" />
                        <span>{villa.specs.bedrooms} Luxury {villa.specs.bedrooms === 1 ? "Suite" : "Suites"}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Users className="size-4 text-gold shrink-0" />
                        <span>Up to {villa.specs.maxGuests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Waves className="size-4 text-gold shrink-0" />
                        <span>{villa.specs.poolType.includes("Infinity") ? "Infinity Pool" : "Stone Soaking Bath"}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Compass className="size-4 text-gold shrink-0" />
                        <span>USD {villa.specs.rateFromUSD} / night</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      data-reveal="up"
                      style={delay(620)}
                      className="mt-7 flex flex-wrap items-center gap-4"
                    >
                      <Link
                        href={`/villas/${villa.slug}`}
                        className="sheen flex h-[2.5rem] items-center justify-center bg-gold px-6 text-[0.8rem] font-medium tracking-[0.06em] text-[#2c2a19] shadow-sm transition-all hover:bg-[#8f6d31]"
                      >
                        <span>Step Inside & Explore</span>
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                      <Link
                        href={`/contact?villa=${villa.slug}#inquiry`}
                        className="flex h-[2.5rem] items-center justify-center rounded-[2px] border border-[#cfc8bc] bg-white px-5 text-[0.8rem] text-[#333] transition-colors hover:border-gold hover:text-gold"
                      >
                        Reserve Villa
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
