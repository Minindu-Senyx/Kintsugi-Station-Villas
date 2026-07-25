import { Star } from "lucide-react";

// reviewCount === null means we don't yet have verified review data —
// show an honest "new listing" state instead of a fabricated rating.
export default function RatingStars({
  reviewCount,
  filled = 5,
}: {
  reviewCount: number | null;
  filled?: number;
}) {
  if (reviewCount === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-charcoal/60">
        <div className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} strokeWidth={1.5} className="text-charcoal/30" />
          ))}
        </div>
        <span>New listing &mdash; reviews coming soon</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            strokeWidth={1.5}
            className={i < filled ? "text-gold fill-gold" : "text-charcoal/25"}
          />
        ))}
      </div>
      <span className="text-charcoal/70">
        {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
      </span>
    </div>
  );
}
