import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { villas, getVillaBySlug } from "@/lib/villas";
import RatingStars from "@/components/RatingStars";
import AmenityIcon from "@/components/AmenityIcon";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import MagneticButton from "@/components/MagneticButton";

export function generateStaticParams() {
  return villas.map((villa) => ({ slug: villa.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) return {};
  return {
    title: `${villa.name} | Kintsugi Station Villas`,
    description: villa.description,
  };
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);
  if (!villa) notFound();

  return (
    <div>
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <Image
          src={villa.heroImage}
          alt={villa.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-1.5 bg-charcoal/70 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-2 rounded-full">
          <MapPin size={14} />
          {villa.locationLabel}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <SplitHeading
                as="h1"
                immediate
                text={villa.name}
                className="font-display text-4xl sm:text-5xl leading-tight"
              />
              <div className="mt-4">
                <RatingStars reviewCount={villa.reviewCount} />
              </div>
              <p className="mt-6 text-charcoal/75 leading-relaxed max-w-2xl">
                {villa.description}
              </p>
            </Reveal>

            <Reveal delayMs={100} className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
              {villa.supportingImages.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`${villa.name} — photo ${i + 2}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <Reveal delayMs={150}>
              <div className="border border-hairline rounded-xl p-6 sm:p-7">
                <p className="eyebrow text-charcoal/50 mb-2">Rates</p>
                <p className="font-display text-xl leading-snug">{villa.priceNote}</p>
                <MagneticButton className="mt-6 block w-full">
                  <Link
                    href={`/contact?villa=${villa.slug}`}
                    className="block text-center bg-gold hover:bg-gold-dark text-charcoal font-semibold text-sm py-3.5 shadow-md transition-colors"
                  >
                    Book now
                  </Link>
                </MagneticButton>

                <div className="mt-8 pt-7 border-t border-hairline grid grid-cols-3 gap-y-6 justify-items-center">
                  {villa.amenities.map((amenity) => (
                    <AmenityIcon key={amenity} amenity={amenity} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delayMs={100} className="mt-20">
          <p className="eyebrow text-teal mb-6">Gallery</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {villa.galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden hover-scale"
              >
                <Image
                  src={src}
                  alt={`${villa.name} — gallery photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
