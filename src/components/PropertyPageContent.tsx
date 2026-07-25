import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Region } from "@/lib/villas";
import { regionInfo, getVillasByRegion } from "@/lib/villas";
import { getTeamByRegion } from "@/lib/team";
import { getReviewsByRegion } from "@/lib/reviews";
import { images } from "@/lib/images";
import VillaCard from "@/components/VillaCard";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

const galleryStrips: Record<Region, string[]> = {
  kandy: [images.teaFog, images.teaAerial, images.teaMountains, images.kandyVillaGarden],
  trinco: [images.beachPalm1, images.beachOcean1, images.poolBeach, images.tangalleDrone],
};

export default function PropertyPageContent({ region }: { region: Region }) {
  const info = regionInfo[region];
  const regionVillas = getVillasByRegion(region);
  const teamMembers = getTeamByRegion(region);
  const regionReviews = getReviewsByRegion(region);
  const gallery = galleryStrips[region];

  return (
    <div>
      <div className="relative h-[65vh] min-h-[460px] w-full">
        <Image
          src={info.heroImage}
          alt={info.label}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-14">
          <p className="eyebrow text-gold mb-4">
            {region === "kandy" ? "Hill Country" : "Dutch Bay"}
          </p>
          <SplitHeading
            as="h1"
            immediate
            text={info.label}
            className="font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl"
          />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-charcoal/75 text-lg leading-relaxed">{info.blurb}</p>
        </Reveal>

        <div className="mt-14">
          <p className="eyebrow text-teal mb-6">
            {regionVillas.length > 1 ? "Our villas" : "The villa"}
          </p>
          <div
            className={`grid gap-8 sm:gap-10 ${
              regionVillas.length === 1
                ? "sm:grid-cols-1 max-w-xl"
                : "sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {regionVillas.map((villa, i) => (
              <Reveal key={villa.slug} delayMs={i * 90}>
                <VillaCard villa={villa} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE4] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="max-w-lg mb-10">
            <p className="eyebrow text-teal mb-4">Gallery</p>
            <h2 className="font-display text-3xl leading-tight">
              A feel for {info.shortLabel}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {gallery.map((src, i) => (
              <Reveal key={src} delayMs={i * 80}>
                <div className="relative aspect-square rounded-xl overflow-hidden hover-scale">
                  <Image
                    src={src}
                    alt={`${info.label} scenery`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20">
          <Reveal className="max-w-lg mb-10">
            <p className="eyebrow text-teal mb-4">Your hosts</p>
            <h2 className="font-display text-3xl leading-tight">
              The {info.shortLabel} team
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delayMs={i * 90} className="flex gap-5 items-start">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg">{member.name}</h3>
                  <p className="text-xs eyebrow text-gold-dark mt-1 mb-2">{member.role}</p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {regionReviews.length > 0 && (
        <section className="bg-teal py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <Reveal className="max-w-lg mb-10">
              <p className="eyebrow text-gold mb-4">Sample guest feedback</p>
              <h2 className="font-display text-white text-3xl leading-tight">
                Stories from {info.shortLabel}
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {regionReviews.map((review, i) => (
                <Reveal key={review.guestName} delayMs={i * 90}>
                  <div className="h-full p-7 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex gap-0.5 mb-4" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={15} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-white/85 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                    <p className="mt-5 text-sm text-white/60">{review.guestName}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Link
              href={`/reviews/${region === "kandy" ? "kandy" : "trincomalee"}`}
              className="link-underline mt-8 inline-block text-sm font-medium text-white hover:text-gold transition-colors"
            >
              Read all {info.shortLabel} reviews
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
