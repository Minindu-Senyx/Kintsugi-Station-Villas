import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Compass, Users, Waves } from "lucide-react";
import { allVillas } from "@/lib/villas";

export const metadata: Metadata = {
  title: "The Villas · Kandy Branch · Kintsugi Station",
  description:
    "Discover our two private luxury villas in Kandy, Sri Lanka: Avalon Villa (3-Bedroom Hillside Residence) and Villa Acland (Artisan Secluded Sanctuary).",
};

export default function VillasOverviewPage() {
  return (
    <main className="bg-ivory text-ink">
      {/* Hero */}
      <section className="border-b border-[#e2dcd2] bg-mist py-16 sm:py-20">
        <div className="frame px-5 text-center lg:px-[3.625rem]">
          <p className="eyebrow text-[0.66rem] tracking-[0.24em] text-gold uppercase">
            Kandy Branch · Sri Lanka
          </p>
          <h1 className="mt-2 font-serif text-[2.8rem] text-ink sm:text-[3.5rem]">
            Two Private Sanctuaries
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[0.92rem] text-ink-soft">
            Perched high in the mist-veiled hills of Upper Hantana, our Kandy estate comprises two distinct villas, each reserved exclusively for one party at a time.
          </p>
        </div>
      </section>

      {/* Villas Showcase */}
      <section className="py-16 sm:py-24">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="flex flex-col gap-16 lg:gap-24">
            {allVillas.map((villa, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={villa.slug}
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Villa Image */}
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-[2px] shadow-sm lg:col-span-7 ${
                      isEven ? "lg:col-start-6" : ""
                    }`}
                  >
                    <Image
                      src={villa.heroImage}
                      alt={villa.name}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[0.64rem] font-medium tracking-[0.14em] text-white uppercase backdrop-blur-md">
                      {villa.specs.bedrooms} {villa.specs.bedrooms === 1 ? "Bedroom Suite" : "Bedroom Residence"}
                    </div>
                  </div>

                  {/* Villa Info */}
                  <div className={`flex flex-col lg:col-span-5 ${isEven ? "lg:col-start-1" : ""}`}>
                    <p className="eyebrow text-[0.64rem] tracking-[0.18em] text-gold uppercase">
                      {villa.eyebrow}
                    </p>
                    <h2 className="mt-2 font-serif text-[2.4rem] leading-tight text-ink sm:text-[2.8rem]">
                      {villa.name}
                    </h2>
                    <p className="mt-2 font-serif text-[1rem] italic text-[#6a5e4b]">
                      {villa.tagline}
                    </p>
                    <p className="mt-4 text-[0.875rem] leading-[1.65] text-ink-soft">
                      {villa.summary}
                    </p>

                    {/* Specs Pills */}
                    <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#e2dcd2] py-4 text-[0.8rem] text-[#4d4e4b]">
                      <div className="flex items-center gap-2">
                        <BedDouble className="size-4 text-gold" />
                        <span>{villa.specs.bedrooms} Luxury {villa.specs.bedrooms === 1 ? "Suite" : "Suites"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-gold" />
                        <span>Up to {villa.specs.maxGuests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Waves className="size-4 text-gold" />
                        <span>{villa.specs.poolType.includes("Infinity") ? "Infinity Pool" : "Stone Bath & Grounds"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="size-4 text-gold" />
                        <span>USD {villa.specs.rateFromUSD} / night</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/villas/${villa.slug}`}
                        className="sheen flex h-[2.4rem] items-center justify-center bg-gold px-6 text-[0.8rem] font-medium tracking-[0.06em] text-[#2c2a19] transition-colors hover:bg-[#8f6d31]"
                      >
                        <span>Step Inside & Explore</span>
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                      <Link
                        href={`/contact?villa=${villa.slug}#inquiry`}
                        className="flex h-[2.4rem] items-center justify-center rounded-[2px] border border-[#cfc8bc] bg-white px-5 text-[0.8rem] text-[#333] transition-colors hover:border-gold hover:text-gold"
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
