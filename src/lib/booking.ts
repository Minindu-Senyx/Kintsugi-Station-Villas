/*
 * Booking goes through Airbnb. Capacity, beds and badges are read from the three
 * live listings (checked 14 Oct 2026); nightly rates and the weekly/monthly
 * discounts are the owners' own figures. Update here and every page follows.
 */
export type ListingKey = "avalon" | "acland" | "both";

export type AirbnbListing = {
  key: ListingKey;
  name: string;
  roomId: string;
  sleeps: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  /** Nightly rate in USD when booking on Airbnb. */
  nightlyUSD: number;
  /** Airbnb's own awards for the listing, shown as written there. */
  badges: string[];
  /** Overall Airbnb rating. Left out where a listing has too few reviews to quote. */
  rating?: { score: number; count: number };
};

export const airbnbListings: Record<ListingKey, AirbnbListing> = {
  avalon: {
    key: "avalon",
    name: "Avalon Villa",
    roomId: "1248474764719710578",
    sleeps: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    nightlyUSD: 355,
    badges: ["Guest favourite", "Top 5% of homes"],
    rating: { score: 5.0, count: 15 },
  },
  acland: {
    key: "acland",
    name: "Villa Acland",
    roomId: "1253403062767505407",
    sleeps: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    nightlyUSD: 148,
    badges: ["Guest favourite", "Top 10% of homes"],
    rating: { score: 5.0, count: 16 },
  },
  both: {
    key: "both",
    name: "Avalon + Acland",
    roomId: "1253436063611925160",
    sleeps: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    nightlyUSD: 473,
    badges: [],
  },
};

export const stayDiscounts = { weeklyPercent: 10, monthlyPercent: 30 };

export const discountNote = `Weekly stays ${stayDiscounts.weeklyPercent}% off · Monthly stays ${stayDiscounts.monthlyPercent}% off`;

type StayOptions = { checkIn?: string; checkOut?: string; guests?: number };

/** The listing's Airbnb page, optionally with the guest's dates and party size filled in. */
export function airbnbUrl(key: ListingKey, { checkIn, checkOut, guests }: StayOptions = {}) {
  const url = new URL(`https://www.airbnb.com/rooms/${airbnbListings[key].roomId}`);
  if (checkIn) url.searchParams.set("check_in", checkIn);
  if (checkOut) url.searchParams.set("check_out", checkOut);
  if (guests) url.searchParams.set("adults", String(guests));
  return url.toString();
}

/** Where every general "Book Now" button lands: the three listings side by side. */
export const bookHref = "/villas#book";
