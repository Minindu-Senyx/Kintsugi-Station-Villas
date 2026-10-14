import { ExternalLink, Star } from "lucide-react";
import { airbnbListings, airbnbUrl, discountNote, type ListingKey } from "@/lib/booking";
import { delay } from "@/lib/motion";

const order: ListingKey[] = ["avalon", "acland", "both"];

/**
 * The three Airbnb listings side by side, each with its price, capacity and
 * Airbnb awards, and a button that opens the listing. `stack` lists them in one
 * column for narrow spots.
 */
export default function BookOnAirbnb({ stack = false }: { stack?: boolean }) {
  return (
    <div className={`grid gap-4 ${stack ? "" : "md:grid-cols-3"}`}>
      {order.map((key, i) => {
        const l = airbnbListings[key];
        return (
          <article
            key={key}
            data-reveal="up"
            style={delay(100 + i * 100)}
            className="flex flex-col rounded-[3px] border border-[#e4ded3] bg-[#faf8f4] p-6 shadow-[0_2px_12px_rgba(12,16,14,0.03)]"
          >
            <p className="text-[0.7rem] uppercase leading-[1.5] tracking-[0.2em] text-[#6f675d]">
              {l.badges.length > 0 ? l.badges.map((badge) => badge.replace(" of homes", "")).join(" · ") : "Both villas together"}
            </p>
            <h3 className="mt-2 font-serif text-[1.5rem] leading-none text-ink">{l.name}</h3>
            <p className="mt-2 text-[0.8rem] text-[#5a5c58]">
              Sleeps {l.sleeps} · {l.bedrooms} {l.bedrooms === 1 ? "bedroom" : "bedrooms"} · {l.beds}{" "}
              {l.beds === 1 ? "bed" : "beds"} · {l.bathrooms} {l.bathrooms === 1 ? "bath" : "baths"}
            </p>
            {l.rating && (
              <p className="mt-2 flex items-center gap-1.5 text-[0.76rem] text-[#3c3e3b]">
                <Star className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                <span>
                  {l.rating.score.toFixed(1)} on Airbnb · {l.rating.count} reviews
                </span>
              </p>
            )}
            <div className="mt-auto pt-5">
              <p className="font-serif text-[1.9rem] leading-none text-ink">
                USD {l.nightlyUSD}{" "}
                <span className="font-sans text-[0.72rem] font-normal text-[#6b665e]">/ night</span>
              </p>
              <p className="mt-1.5 text-[0.7rem] text-[#6a6864]">{discountNote}</p>
              <a
                href={airbnbUrl(key)}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen mt-6 flex h-[2.5rem] items-center justify-center gap-2 bg-gold px-6 text-[0.8rem] font-medium tracking-[0.06em] text-[#f7f1e4] shadow-sm transition-colors hover:bg-gold-hover"
              >
                Book on Airbnb
                <ExternalLink className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
