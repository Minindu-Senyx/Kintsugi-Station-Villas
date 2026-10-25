import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SpaceExplorer from "@/components/villas/SpaceExplorer";
import VillaAmenities from "@/components/villas/VillaAmenities";
import VillaGalleryLightbox from "@/components/villas/VillaGalleryLightbox";
import { airbnbListings, airbnbUrl, discountNote } from "@/lib/booking";
import { delay } from "@/lib/motion";
import { allVillas, getVillaBySlug, villas } from "@/lib/villas";

export function generateStaticParams() {
  return allVillas.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-gold";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]";
const label = "eyebrow text-[0.7rem] tracking-[0.2em] text-muted";

export default async function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    notFound();
  }

  const sisterVilla = slug === "avalon" ? villas.acland : villas.avalon;
  const listing = airbnbListings[villa.slug];
  const sister = airbnbListings[sisterVilla.slug];
  const bookUrl = airbnbUrl(villa.slug);
  const proof = [
    listing.rating && `${listing.rating.score.toFixed(1)} on Airbnb · ${listing.rating.count} reviews`,
    ...listing.badges,
  ].filter(Boolean);

  return (
    <main id="main-content" tabIndex={-1} className="bg-ivory text-ink">
      {/* Hero */}
      <section className="relative min-h-[36rem] overflow-hidden lg:h-[34rem] lg:min-h-0">
        <Image src={villa.heroImage} alt="" fill priority sizes="100vw" className="enter-settle object-cover object-[50%_40%]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25 lg:bg-[linear-gradient(90deg,rgba(14,18,16,0.7)_0%,rgba(14,18,16,0.35)_55%,rgba(14,18,16,0.1)_100%)]"
        />

        <div className="frame relative flex h-full flex-col justify-end px-5 pb-10 pt-28 sm:pb-12 lg:justify-center lg:px-[3.625rem] lg:pt-16">
          <div className="max-w-2xl">
            <p style={delay(100)} className="enter-rise eyebrow text-[0.72rem] tracking-[0.2em] text-white/90">
              {villa.eyebrow}
            </p>
            <h1 style={delay(200)} className="enter-rise mt-4 font-serif text-[2.8rem] leading-[1.05] text-white sm:text-[3.6rem] lg:text-[4.2rem]">
              {villa.name}
            </h1>
            <p style={delay(320)} className="enter-rise mt-3 max-w-xl font-serif text-[1.2rem] italic leading-snug text-white/90">
              {villa.tagline}
            </p>
            {proof.length > 0 && (
              <p style={delay(420)} className="enter-rise mt-4 text-[0.82rem] text-white/90">
                {proof.join(" · ")}
              </p>
            )}

            <div style={delay(520)} className="enter-rise mt-7 flex flex-wrap items-center gap-3">
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen btn-primary"
              >
                Book on Airbnb
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="#spaces"
                className="flex h-[2.6rem] items-center border border-white/60 px-7 text-[0.85rem] text-white transition-colors hover:bg-white/15"
              >
                See the spaces
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-line bg-linen">
        <div className="frame px-5 py-7 lg:px-[3.625rem]">
          <dl className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-4 sm:divide-x sm:divide-line">
            {[
              { term: "Sleeps", value: `Up to ${villa.specs.maxGuests}`, note: `${villa.specs.bedrooms} ${villa.specs.bedrooms === 1 ? "bedroom" : "bedrooms"}, ${villa.specs.beds} ${villa.specs.beds === 1 ? "bed" : "beds"}` },
              { term: "Bathrooms", value: String(villa.specs.bathrooms), note: "Hot water throughout" },
              { term: "Feature", value: villa.specs.feature, note: villa.specs.setting },
              { term: "Airbnb rate", value: `USD ${villa.specs.nightlyUSD} / night`, note: "Weekly 10% off · monthly 30% off" },
            ].map((f, i) => (
              <div key={f.term} data-reveal="up" style={delay(i * 70)} className="flex flex-col sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <dt className={label}>{f.term}</dt>
                <dd className="mt-2 font-serif text-[1.3rem] leading-[1.15] text-ink">{f.value}</dd>
                <dd className="mt-1 text-[0.78rem] leading-[1.15rem] text-muted">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About the villa */}
      <section>
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p data-reveal="up" className={eyebrow}>
                About the villa
              </p>
              <h2 data-reveal="up" style={delay(100)} className={`mt-4 ${h2}`}>
                {villa.name}
              </h2>
              <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.55rem] text-ink-soft">
                {villa.description.map((paragraph, i) => (
                  <p key={paragraph} data-reveal="up" style={delay(180 + i * 80)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div data-reveal="image" style={delay(150)} className="relative aspect-[16/11] w-full overflow-hidden lg:col-span-7">
              <Image
                src={villa.architectureImage.src}
                alt={villa.architectureImage.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div data-reveal="up" className="mt-14 border-t border-line pt-8">
            <h3 className={label}>Included in your stay</h3>
            <ul className="mt-4 grid gap-x-12 sm:grid-cols-2">
              {villa.inclusions.map((inc) => (
                <li key={inc} className="border-b border-line py-3 text-[0.9rem] leading-[1.4rem] text-ink-soft">
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The spaces */}
      <section id="spaces" className="scroll-mt-16 border-t border-line bg-ivory">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <p data-reveal="up" className={eyebrow}>
            Step inside
          </p>
          <h2 data-reveal="up" style={delay(100)} className={`mb-10 mt-4 ${h2}`}>
            The spaces
          </h2>
          <SpaceExplorer spaces={villa.spaces} />
        </div>
      </section>

      {/* Amenities */}
      <VillaAmenities amenities={villa.amenities} highlights={villa.highlights} villaName={villa.name} />

      {/* Photographs */}
      <section className="border-t border-line bg-linen">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <p data-reveal="up" className={eyebrow}>
            Photographs
          </p>
          <h2 data-reveal="up" style={delay(100)} className={`mb-10 mt-4 ${h2}`}>
            {villa.name} in pictures
          </h2>
          <VillaGalleryLightbox photos={villa.gallery} />
        </div>
      </section>

      {/* The other villa, and booking */}
      <section className="border-t border-line bg-ivory">
        <div className="frame grid gap-10 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:px-[3.625rem] lg:py-[3.6rem]">
          <div data-reveal="up">
            <p className={eyebrow}>Also at Kintsugi Station</p>
            <h2 className="mt-4 font-serif text-[1.9rem] leading-[1.1] text-ink">{sisterVilla.name}</h2>
            <p className="mt-2 text-[0.9rem] text-ink-soft">
              {sister.bedrooms} {sister.bedrooms === 1 ? "bedroom" : "bedrooms"} · sleeps {sister.sleeps} · USD {sister.nightlyUSD} a night
            </p>
            <p className="mt-3 text-[0.9rem] leading-[1.4rem] text-ink-soft">
              Or book both villas together for up to {airbnbListings.both.sleeps} guests.
            </p>
            <p className="mt-4">
              <Link href={`/villas/${sisterVilla.slug}`} className="inline-flex min-h-6 items-center text-[0.88rem] font-medium text-gold underline underline-offset-4 hover:text-gold-hover">
                View {sisterVilla.name}
              </Link>
            </p>
          </div>

          <div data-reveal="up" style={delay(120)} className="lg:border-l lg:border-line lg:pl-16">
            <p className={eyebrow}>Reserve</p>
            <h2 className="mt-4 font-serif text-[1.9rem] leading-[1.1] text-ink">Book {villa.name}</h2>
            <p className="mt-2 font-serif text-[1.6rem] leading-none">
              USD {villa.specs.nightlyUSD} <span className="font-sans text-[0.78rem] text-muted">/ night</span>
            </p>
            <p className="mt-2 text-[0.82rem] text-muted">{discountNote}. Breakfast is included.</p>
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen btn-primary mt-5"
            >
              Book on Airbnb
              <span className="sr-only">: {villa.name} (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
