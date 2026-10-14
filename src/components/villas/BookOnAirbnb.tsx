import { airbnbListings, airbnbUrl, discountNote, type ListingKey } from "@/lib/booking";

const order: ListingKey[] = ["avalon", "acland", "both"];

/**
 * The three Airbnb listings as plain rows: name and capacity on the left, the
 * nightly price and the booking button on the right. Used on the Villas and
 * Contact pages.
 */
export default function BookOnAirbnb() {
  return (
    <div>
      <ul className="border-b border-[#d9d2c5]">
        {order.map((key) => {
          const l = airbnbListings[key];
          const awards = l.badges.map((badge) => badge.replace(" of homes", ""));
          const proof = [l.rating && `${l.rating.score.toFixed(1)} · ${l.rating.count} reviews`, ...awards].filter(Boolean);
          return (
            <li key={key} className="grid gap-4 border-t border-[#d9d2c5] py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
              <div>
                <h3 className="font-serif text-[1.45rem] leading-none text-ink">{l.name}</h3>
                <p className="mt-2 text-[0.85rem] text-[#3c3e3b]">
                  Sleeps {l.sleeps} · {l.bedrooms} {l.bedrooms === 1 ? "bedroom" : "bedrooms"} · {l.beds}{" "}
                  {l.beds === 1 ? "bed" : "beds"} · {l.bathrooms} {l.bathrooms === 1 ? "bath" : "baths"}
                </p>
                {proof.length > 0 && <p className="mt-1 text-[0.78rem] text-[#5a5c58]">{proof.join(" · ")}</p>}
              </div>
              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <p className="font-serif text-[1.6rem] leading-none text-ink">
                  USD {l.nightlyUSD} <span className="font-sans text-[0.75rem] text-[#5a5c58]">/ night</span>
                </p>
                <a
                  href={airbnbUrl(key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sheen flex h-[2.5rem] items-center justify-center whitespace-nowrap bg-gold px-6 text-[0.8rem] font-medium text-[#f7f1e4] transition-[background-color,box-shadow] duration-300 hover:bg-gold-hover hover:shadow-[0_6px_18px_-8px_rgba(95,74,35,0.65)]"
                >
                  Book on Airbnb
                  <span className="sr-only">: {l.name} (opens in a new tab)</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[0.8rem] text-[#5a5c58]">{discountNote}.</p>
    </div>
  );
}
