import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/lib/reviews";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

export default function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      <Reveal className="max-w-xl mb-14">
        <p className="eyebrow text-teal mb-4">Sample guest feedback</p>
        <SplitHeading
          as="h2"
          text="What guests have told us"
          className="font-display text-3xl sm:text-4xl leading-tight"
        />
        <p className="mt-4 text-sm text-charcoal/55">
          Illustrative quotes shown while we compile verified reviews — see
          full, real guest reviews on the pages below.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <Reveal key={review.guestName} delayMs={i * 90}>
            <div className="h-full flex flex-col p-7 border border-hairline">
              <div className="flex gap-0.5 mb-4" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={15} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-charcoal/80 leading-relaxed flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 pt-5 border-t border-hairline">
                <p className="text-sm font-medium">{review.guestName}</p>
                <p className="text-xs text-charcoal/50 mt-0.5">{review.villa}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
        <Link
          href="/reviews/kandy"
          className="link-underline text-sm font-medium hover:text-gold-dark transition-colors"
        >
          All Kandy guest reviews
        </Link>
        <Link
          href="/reviews/trincomalee"
          className="link-underline text-sm font-medium hover:text-gold-dark transition-colors"
        >
          All Trincomalee guest reviews
        </Link>
      </div>
    </section>
  );
}
