import { images } from "./images";

export type Region = "kandy" | "trinco";

export type Amenity =
  | "wifi"
  | "dining"
  | "pool"
  | "gym"
  | "entertainment"
  | "security"
  | "concierge";

export type Villa = {
  slug: string;
  name: string;
  region: Region;
  locationLabel: string;
  heroImage: string;
  supportingImages: [string, string];
  galleryImages: string[];
  description: string;
  priceNote: string;
  amenities: Amenity[];
  reviewCount: number | null;
};

export const regionInfo: Record<
  Region,
  {
    label: string;
    shortLabel: string;
    slug: string;
    heroImage: string;
    blurb: string;
  }
> = {
  kandy: {
    label: "Kandy Hill Country",
    shortLabel: "Kandy",
    slug: "kandy",
    heroImage: images.kandyVillaExterior,
    blurb:
      "In the misted hills above Kandy, Avalon Villa Gallery sits among tea gardens and old-growth trees — a restored colonial home turned private retreat.",
  },
  trinco: {
    label: "Trincomalee Dutch Bay",
    shortLabel: "Trincomalee",
    slug: "trincomalee",
    heroImage: images.trincoVillaAerial,
    blurb:
      "On the quiet curve of Dutch Bay, our Trincomalee villas open straight onto the sand — barefoot living, ocean light, and a team that knows the coast.",
  },
};

export const villas: Villa[] = [
  {
    slug: "villa-acland",
    name: "Villa Acland",
    region: "kandy",
    locationLabel: "Kandy, Sri Lanka",
    heroImage: images.kandyVillaExterior,
    supportingImages: [images.kandyVillaGarden, images.teaFog],
    galleryImages: [
      images.kandyVillaExterior,
      images.kandyVillaGarden,
      images.teaFog,
      images.teaAerial,
      images.teaMountains,
      images.bedroom1,
      images.living1,
      images.dining1,
      images.cinema,
      images.spa1,
    ],
    description:
      "A restored planter's bungalow set among tea gardens above Kandy, Villa Acland pairs teak verandahs and antique furnishings with the quiet comforts of a modern home. Mornings arrive with mist over the hills and the smell of fresh-brewed Ceylon tea; evenings are for the terrace, a slow dinner, and the sound of the valley settling in.",
    priceNote: "Contact us for current nightly rates",
    amenities: ["wifi", "dining", "pool", "entertainment", "security", "concierge"],
    reviewCount: null,
  },
  {
    slug: "villa-238",
    name: "Villa 238",
    region: "trinco",
    locationLabel: "Trincomalee, Sri Lanka",
    heroImage: images.trincoVillaAerial,
    supportingImages: [images.poolBeach, images.beachPalm1],
    galleryImages: [
      images.trincoVillaAerial,
      images.poolBeach,
      images.beachPalm1,
      images.beachOcean1,
      images.bedroom2,
      images.living2,
      images.dining2,
      images.cinema,
      images.spa2,
    ],
    description:
      "Villa 238 sits closest to the water on Dutch Bay, with a pool deck that runs almost to the sand. Interiors are open and breeze-cooled, built for slow beach days that drift into long dinners under the frangipani trees.",
    priceNote: "Contact us for current nightly rates",
    amenities: ["wifi", "dining", "pool", "gym", "entertainment", "security", "concierge"],
    reviewCount: null,
  },
  {
    slug: "villa-232",
    name: "Villa 232",
    region: "trinco",
    locationLabel: "Trincomalee, Sri Lanka",
    heroImage: images.trincoVillaPool,
    supportingImages: [images.poolSunset, images.beachPalm2],
    galleryImages: [
      images.trincoVillaPool,
      images.poolSunset,
      images.beachPalm2,
      images.beachOcean2,
      images.bedroom3,
      images.living3,
      images.dining3,
      images.resortInterior,
      images.spa1,
    ],
    description:
      "Villa 232 is the largest of our Trincomalee homes, built around a central infinity pool that catches the last of the evening light. It suits families and groups who want space to spread out, with several living areas and a kitchen built for the villa's own chefs.",
    priceNote: "Contact us for current nightly rates",
    amenities: ["wifi", "dining", "pool", "gym", "entertainment", "security", "concierge"],
    reviewCount: null,
  },
  {
    slug: "villa-234",
    name: "Villa 234",
    region: "trinco",
    locationLabel: "Trincomalee, Sri Lanka",
    heroImage: images.poolSunset,
    supportingImages: [images.beachOcean1, images.bedroom4],
    galleryImages: [
      images.poolSunset,
      images.beachOcean1,
      images.bedroom4,
      images.living4,
      images.dining4,
      images.tangalleDrone,
      images.cinema,
      images.spa2,
    ],
    description:
      "A quieter, more intimate villa a short walk from the main Dutch Bay stretch, Villa 234 is built for couples and small groups. Expect an uncluttered layout, a private plunge pool, and a host team happy to arrange everything from boat trips to a private dinner on the sand.",
    priceNote: "Contact us for current nightly rates",
    amenities: ["wifi", "dining", "pool", "entertainment", "security", "concierge"],
    reviewCount: null,
  },
  {
    slug: "villa-252",
    name: "Villa 252",
    region: "trinco",
    locationLabel: "Trincomalee, Sri Lanka",
    heroImage: images.tangalleDrone,
    supportingImages: [images.beachPalm1, images.bedroom5],
    galleryImages: [
      images.tangalleDrone,
      images.beachPalm1,
      images.bedroom5,
      images.bedroom6,
      images.living5,
      images.dining1,
      images.poolBeach,
      images.spa1,
    ],
    description:
      "Villa 252 sits at the far, quiet end of the bay, favoured by returning guests for its privacy and its wide, uninterrupted sea view. The villa is fully staffed, with a dedicated cook and housekeeping team available throughout the stay.",
    priceNote: "Contact us for current nightly rates",
    amenities: ["wifi", "dining", "pool", "gym", "entertainment", "security", "concierge"],
    reviewCount: null,
  },
];

export function getVillaBySlug(slug: string) {
  return villas.find((v) => v.slug === slug);
}

export function getVillasByRegion(region: Region) {
  return villas.filter((v) => v.region === region);
}

export const amenityLabels: Record<Amenity, string> = {
  wifi: "Complimentary Wi-Fi",
  dining: "Private chef & dining",
  pool: "Private pool",
  gym: "Home gym",
  entertainment: "Home cinema",
  security: "24-hour security",
  concierge: "Concierge on call",
};
