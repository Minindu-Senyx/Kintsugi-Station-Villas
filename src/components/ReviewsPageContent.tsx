import Link from "next/link";
import { Star } from "lucide-react";
import type { Region } from "@/lib/villas";
import { regionInfo, getVillasByRegion } from "@/lib/villas";
import { getReviewsByRegion } from "@/lib/reviews";
import Reveal from "@/components/Reveal";

export default function ReviewsPageContent({ region }: { region: Region }) {
  const info = regionInfo[region];
  const regionReviews = getReviewsByRegion(region);
  const regionVillas = getVillasByRegion(region);
  const otherRegion = region === "kandy" ? "trincomalee" : "kandy";
  const otherLabel = region === "kandy" ? regionInfo.trinco.shortLabel : regionInfo.kandy.shortLabel;

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
      <Reveal className="max-w-2xl mb-6">
        <p className="eyebrow text-teal mb-4">Guest Reviews</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight">
          {info.label}
        </h1>
        <p className="mt-6 text-charcoal/70 leading-relaxed">
          A collection of guest feedback from stays at {info.label}. These
          are illustrative sample quotes while we compile and verify a full
          set of real guest reviews — clearly marked as such below.
        </p>
      </Reveal>

      <div className="mt-14 space-y-6">
        {regionReviews.length === 0 && (
          <p className="text-charcoal/60">
            No sample reviews are available for this property yet.
          </p>
        )}
        {regionReviews.map((review) => (
          <Reveal key={review.guestName}>
            <div className="p-7 sm:p-8 border border-hairline rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-xs eyebrow text-charcoal/40">Sample review</span>
              </div>
              <p className="text-charcoal/80 text-lg leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 pt-5 border-t border-hairline flex flex-wrap justify-between gap-2">
                <p className="text-sm font-medium">{review.guestName}</p>
                <p className="text-sm text-charcoal/50">{review.villa}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-hairline flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm text-charcoal/60">
            Looking at {regionVillas.length === 1 ? "the villa" : "our villas"} in{" "}
            {info.shortLabel}?
          </p>
          <Link
            href={`/${info.slug}`}
            className="link-underline mt-1 inline-block text-sm font-medium hover:text-gold-dark transition-colors"
          >
            View {info.shortLabel} property
          </Link>
        </div>
        <Link
          href={`/reviews/${otherRegion}`}
          className="link-underline text-sm font-medium hover:text-gold-dark transition-colors"
        >
          Read {otherLabel} reviews
        </Link>
      </div>
    </div>
  );
}
