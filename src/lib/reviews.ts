import type { Region } from "./villas";

// Sample / illustrative guest feedback. Clearly labelled as such wherever
// displayed — to be replaced with verified guest reviews once available.
export type Review = {
  quote: string;
  guestName: string;
  villa: string;
  region: Region;
};

export const reviews: Review[] = [
  {
    quote:
      "We woke up to mist over the tea gardens every morning and never wanted to leave the verandah. Prasanna and the team looked after us like family.",
    guestName: "Sample review — A. Fernando",
    villa: "Villa Acland, Kandy",
    region: "kandy",
  },
  {
    quote:
      "The pool deck at sunset was worth the trip on its own. Kasthuri organised a boat trip for us within the hour of asking — nothing was too much trouble.",
    guestName: "Sample review — J. & M. Wickramasinghe",
    villa: "Villa 232, Trincomalee",
    region: "trinco",
  },
  {
    quote:
      "Quiet, private, and beautifully kept. It felt like staying in someone's real home rather than a rental — because it is.",
    guestName: "Sample review — R. Silva",
    villa: "Villa 234, Trincomalee",
    region: "trinco",
  },
  {
    quote:
      "Rasu and Manjula went out of their way for us all week — fresh curry every night and the garden was immaculate. We'll be back.",
    guestName: "Sample review — T. Perera",
    villa: "Villa Acland, Kandy",
    region: "kandy",
  },
  {
    quote:
      "Villa 252 is worth the extra drive to the quiet end of the bay. Total privacy, and the sea view from the pool is hard to beat.",
    guestName: "Sample review — N. & S. Gunasekara",
    villa: "Villa 252, Trincomalee",
    region: "trinco",
  },
];

export function getReviewsByRegion(region: Region) {
  return reviews.filter((r) => r.region === region);
}
