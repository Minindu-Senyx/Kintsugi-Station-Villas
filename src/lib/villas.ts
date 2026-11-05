import { airbnbListings } from "@/lib/booking";

export type RoomSpace = {
  id: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  photos: { src: string; alt: string; caption: string }[];
};

/** An equirectangular (2:1) panorama, shown in the 360° viewer. */
export type PanoramaTour = {
  id: string;
  name: string;
  src: string;
};

/*
 * Photos are made from the camera originals by `npm run images:villas`
 * (scripts/process-villa-photos.mjs), which writes them as WebP.
 */
const avalon = (name: string) => `/assets/images/villas/avalon/${name}.webp`;
const acland = (name: string) => `/assets/images/villas/acland/${name}.webp`;

export type VillaPhoto = {
  src: string;
  alt: string;
  caption: string;
  category: "all" | "bedroom" | "living" | "outdoor";
};

export type Villa = {
  slug: "avalon" | "acland";
  name: string;
  tagline: string;
  eyebrow: string;
  summary: string;
  /** One sentence for cards and lists. */
  short: string;
  /** The eight things guests ask about first, shown at a glance above the full amenity lists. */
  highlights: string[];
  description: string[];
  specs: {
    bedrooms: number;
    beds: number;
    bathrooms: number;
    maxGuests: number;
    /** The one feature that sets this villa apart, shown beside the specs. */
    feature: string;
    view: string;
    setting: string;
    nightlyUSD: number;
  };
  heroImage: string;
  architectureImage: {
    src: string;
    alt: string;
    caption: string;
  };
  spaces: RoomSpace[];
  gallery: VillaPhoto[];
  /** 360° panoramas for the "Look around" viewer. */
  tours: PanoramaTour[];
  amenities: { category: string; items: string[] }[];
  inclusions: string[];
};

export const villas: Record<"avalon" | "acland", Villa> = {
  avalon: {
    slug: "avalon",
    name: "Avalon Villa",
    eyebrow: "Kandy · 3-Bedroom Villa · Sleeps 6",
    tagline: "The Grand Panoramic Hillside Residence",
    short: "Three bedrooms, a library, a cinema room and a jacuzzi hot tub, with open verandas and forest views.",
    highlights: [
      "Jacuzzi hot tub",
      "Cinema room with projector",
      "Library",
      "Private garden",
      "Fast Wi-Fi",
      "Air conditioning",
      "Free parking",
      "Breakfast included",
    ],
    summary:
      "A restored three-bedroom villa on a quiet Kandy hillside, a short walk from the Temple of the Tooth. Open verandas, a private garden, balconies, a library, a cinema room and a jacuzzi hot tub, with views across the forest to the Hanthana mountain range.",
    description: [
      "Avalon Villa sits among trees on a Kandy hillside, a short walk from the Temple of the Tooth and about 15 minutes on foot from the lake and city centre. It sleeps up to six, and the whole villa and its garden are yours for the length of your stay.",
      "Days here centre on the open verandah, the spacious living and dining areas, the private garden and the balconies, where monkeys and birds are regular visitors. The views take in sunrises, morning mist, the forest, the Hanthana mountain range and the lights of Kandy at night.",
      "Inside there is a fully equipped kitchen, a library, a cinema room with a projector and a jacuzzi hot tub. Breakfast is included, and the team can arrange home-cooked meals, transfers, tours and anything else you need.",
    ],
    specs: {
      bedrooms: airbnbListings.avalon.bedrooms,
      beds: airbnbListings.avalon.beds,
      bathrooms: airbnbListings.avalon.bathrooms,
      maxGuests: airbnbListings.avalon.sleeps,
      feature: "Jacuzzi Hot Tub",
      view: "Forest, Hanthana Mountains & Kandy City Lights",
      setting: "Kandy hillside, 1.2 km from the Temple of the Tooth",
      nightlyUSD: airbnbListings.avalon.nightlyUSD,
    },
    heroImage: avalon("avalon-patio"),
    architectureImage: {
      src: avalon("avalon-veranda-table"),
      alt: "The covered veranda at Avalon Villa, with a long dining table and lanterns under a timber roof",
      caption: "The covered veranda, set for dinner",
    },
    spaces: [
      {
        id: "bedrooms",
        name: "The Bedrooms",
        badge: "Three bedrooms · Sleeps 6",
        description:
          "Three bedrooms with timber headboards, vaulted ceilings and air conditioning: two king-size rooms and a twin room. French doors open onto a balcony or the garden.",
        features: [
          "Two king-size bedrooms and one twin room",
          "French doors to a balcony or the garden",
          "Vaulted timber ceilings",
          "Air conditioning and fans",
        ],
        photos: [
          { src: avalon("avalon-bedroom-king"), alt: "King-size bed with a timber headboard under a vaulted ceiling, with French doors to the garden", caption: "King-size bedroom with French doors" },
          { src: avalon("avalon-bedroom-balcony"), alt: "King-size bed with bedside lamps and glass doors onto the balcony", caption: "King-size bedroom opening onto the balcony" },
          { src: avalon("avalon-bedroom-doors"), alt: "Second king-size bedroom with French doors onto a terrace with a lounger", caption: "Second king-size bedroom, with a terrace outside" },
          { src: avalon("avalon-twin-bedroom"), alt: "Twin bedroom with two single beds and garden-facing windows", caption: "The twin bedroom" },
          { src: avalon("avalon-twin-bedroom-wardrobe"), alt: "Twin bedroom with a teak wardrobe and dressing table", caption: "Twin bedroom, with wardrobe and dressing table" },
        ],
      },
      {
        id: "bathrooms",
        name: "Bathrooms & Jacuzzi",
        badge: "Three bathrooms",
        description:
          "A jacuzzi tub beside a wide picture window onto the trees, a sunken stone bath, and a twin-basin vanity. Every bedroom has a bathroom of its own.",
        features: [
          "Jacuzzi hot tub beside a garden picture window",
          "Sunken stone bath",
          "Twin-basin vanity",
          "Hot water throughout",
        ],
        photos: [
          { src: avalon("avalon-jacuzzi-bath"), alt: "Round white bathtub in front of a large window looking onto the trees", caption: "Bathtub beside the garden picture window" },
          { src: avalon("avalon-jacuzzi"), alt: "Round jacuzzi tub with jets in a marble-tiled bathroom", caption: "The jacuzzi tub" },
          { src: avalon("avalon-stone-bath"), alt: "Sunken bath set in stone, below a timber-framed window", caption: "Sunken stone bath" },
          { src: avalon("avalon-bathroom-vanity"), alt: "Bathroom with two basins set in a stone counter with open shelves", caption: "Twin-basin vanity" },
        ],
      },
      {
        id: "library-cinema",
        name: "Library & Cinema",
        badge: "Indoor living · Film nights",
        description:
          "A room lined with bookshelves, with a deep sectional sofa and a projector screen for film nights. A Bluetooth sound system is included.",
        features: [
          "Floor-to-ceiling bookshelves",
          "Projector and screen",
          "Deep sectional sofa",
          "Bluetooth sound system",
        ],
        photos: [
          { src: avalon("avalon-library"), alt: "Sectional sofa facing built-in white bookshelves under a timber ceiling", caption: "The library, with its bookshelves and sectional sofa" },
          { src: avalon("avalon-library-lounge"), alt: "Library lounge with a large sofa, books and a framed poster", caption: "The library lounge" },
          { src: avalon("avalon-cinema"), alt: "Sofa facing a projector screen playing a film", caption: "The cinema room, with its projector screen" },
        ],
      },
      {
        id: "kitchen-living",
        name: "Kitchen & Living",
        badge: "Open-plan · Fully equipped",
        description:
          "A fully equipped kitchen with a breakfast bar, a gas hob and an oven, open to the living room. There is a vintage piano in the hall.",
        features: [
          "Fully equipped kitchen with gas hob and oven",
          "Breakfast bar",
          "Open living room",
          "Vintage piano",
        ],
        photos: [
          { src: avalon("avalon-living-kitchen"), alt: "Living room with armchairs and open doors, with the kitchen bar beyond", caption: "Living room and kitchen bar" },
          { src: avalon("avalon-living-room"), alt: "Sofas and armchairs in the high-ceilinged living room, with the dining area behind", caption: "The living room" },
          { src: avalon("avalon-kitchen-bar"), alt: "Kitchen breakfast bar with high stools under pendant lamps", caption: "Kitchen breakfast bar" },
          { src: avalon("avalon-kitchen"), alt: "Kitchen with open timber shelves, a black granite worktop and a bowl of fruit", caption: "The kitchen" },
          { src: avalon("avalon-kitchen-living"), alt: "Kitchen counter with the living room beyond", caption: "Kitchen counter, open to the living room" },
          { src: avalon("avalon-piano-hall"), alt: "Hall with a piano and a brick pillar, open to the garden", caption: "The hall, with its piano" },
        ],
      },
      {
        id: "verandas-grounds",
        name: "Verandas & Courtyard",
        badge: "Outdoor living · Private garden",
        description:
          "Covered verandas with a dining table and lounge chairs, a stone-paved courtyard and a private garden under old trees. Monkeys and birds are regular visitors.",
        features: [
          "Covered veranda with dining table",
          "Veranda lounge chairs",
          "Stone-paved courtyard",
          "Private garden",
        ],
        photos: [
          { src: avalon("avalon-veranda-dining"), alt: "Dining table on the veranda, with sliding doors into the house", caption: "The veranda dining table" },
          { src: avalon("avalon-veranda-table"), alt: "Long veranda dining table laid for dinner, with lanterns above", caption: "The veranda, set for dinner" },
          { src: avalon("avalon-veranda-lounge"), alt: "Veranda seating area with cane armchairs and a sofa", caption: "Veranda lounge" },
          { src: avalon("avalon-veranda-walk"), alt: "Covered walkway along the teal wall, with a timber lounger", caption: "The covered walkway" },
          { src: avalon("avalon-patio"), alt: "Stone patio with a lounger, in front of a teal wall and French doors", caption: "The stone patio" },
          { src: avalon("avalon-courtyard"), alt: "Cobbled courtyard under mature trees, in front of a dark timber building", caption: "The courtyard" },
        ],
      },
    ],
    gallery: [
      { src: avalon("avalon-patio"), alt: "Stone patio with a lounger, in front of a teal wall and French doors", caption: "The stone patio", category: "outdoor" },
      { src: avalon("avalon-courtyard-seat"), alt: "Teal wall and a wooden armchair on a paved terrace under tall trees", caption: "Terrace under the trees", category: "outdoor" },
      { src: avalon("avalon-courtyard"), alt: "Cobbled courtyard under mature trees, in front of a dark timber building", caption: "The courtyard", category: "outdoor" },
      { src: avalon("avalon-courtyard-path"), alt: "Paved courtyard beside a stone wall, with a clay urn and the roofline of the villa", caption: "Courtyard and stone wall", category: "outdoor" },
      { src: avalon("avalon-veranda-walk"), alt: "Covered walkway along the teal wall, with a timber lounger", caption: "The covered walkway", category: "outdoor" },
      { src: avalon("avalon-veranda-dining"), alt: "Dining table on the veranda, with sliding doors into the house", caption: "The veranda dining table", category: "living" },
      { src: avalon("avalon-veranda-table"), alt: "Long veranda dining table laid for dinner, with lanterns above", caption: "The veranda, set for dinner", category: "living" },
      { src: avalon("avalon-veranda-lounge"), alt: "Veranda seating area with cane armchairs and a sofa", caption: "Veranda lounge", category: "living" },
      { src: avalon("avalon-library"), alt: "Sectional sofa facing built-in white bookshelves under a timber ceiling", caption: "The library", category: "living" },
      { src: avalon("avalon-library-lounge"), alt: "Library lounge with a large sofa, books and a framed poster", caption: "The library lounge", category: "living" },
      { src: avalon("avalon-cinema"), alt: "Sofa facing a projector screen playing a film", caption: "The cinema room", category: "living" },
      { src: avalon("avalon-living-room"), alt: "Sofas and armchairs in the high-ceilinged living room, with the dining area behind", caption: "The living room", category: "living" },
      { src: avalon("avalon-living-kitchen"), alt: "Living room with armchairs and open doors, with the kitchen bar beyond", caption: "Living room and kitchen bar", category: "living" },
      { src: avalon("avalon-piano-hall"), alt: "Hall with a piano and a brick pillar, open to the garden", caption: "The hall, with its piano", category: "living" },
      { src: avalon("avalon-piano-hall-portrait"), alt: "Piano and tall lamp in the hall, with the living room beyond", caption: "Piano and hall", category: "living" },
      { src: avalon("avalon-kitchen-bar"), alt: "Kitchen breakfast bar with high stools under pendant lamps", caption: "Kitchen breakfast bar", category: "living" },
      { src: avalon("avalon-kitchen"), alt: "Kitchen with open timber shelves, a black granite worktop and a bowl of fruit", caption: "The kitchen", category: "living" },
      { src: avalon("avalon-kitchen-living"), alt: "Kitchen counter with the living room beyond", caption: "Kitchen counter", category: "living" },
      { src: avalon("avalon-kitchen-counter"), alt: "Kitchen counter with a knife block and a bowl of tropical fruit, with a gas hob behind", caption: "Kitchen worktop and hob", category: "living" },
      { src: avalon("avalon-kitchen-portrait"), alt: "Narrow kitchen with timber shelves, a cooker hood and a black fridge", caption: "The kitchen, from the end", category: "living" },
      { src: avalon("avalon-kitchen-shelves"), alt: "Double sink under a barred window, with open timber shelves of glasses and mugs", caption: "Kitchen sink and shelves", category: "living" },
      { src: avalon("avalon-kitchen-tea"), alt: "Kettle, tea jars and a stove below timber shelves", caption: "Tea and coffee corner", category: "living" },
      { src: avalon("avalon-bedroom-king"), alt: "King-size bed with a timber headboard under a vaulted ceiling, with French doors to the garden", caption: "King-size bedroom with French doors", category: "bedroom" },
      { src: avalon("avalon-bedroom-balcony"), alt: "King-size bed with bedside lamps and glass doors onto the balcony", caption: "King-size bedroom opening onto the balcony", category: "bedroom" },
      { src: avalon("avalon-bedroom-doors"), alt: "Second king-size bedroom with French doors onto a terrace with a lounger", caption: "Second king-size bedroom", category: "bedroom" },
      { src: avalon("avalon-twin-bedroom"), alt: "Twin bedroom with two single beds and garden-facing windows", caption: "The twin bedroom", category: "bedroom" },
      { src: avalon("avalon-twin-bedroom-wardrobe"), alt: "Twin bedroom with a teak wardrobe and dressing table", caption: "Twin bedroom wardrobe", category: "bedroom" },
      { src: avalon("avalon-bedside-lamp"), alt: "Black bedside lamp on a round teak table", caption: "Bedside detail", category: "bedroom" },
      { src: avalon("avalon-jacuzzi-bath"), alt: "Round white bathtub in front of a large window looking onto the trees", caption: "Bathtub beside the garden window", category: "bedroom" },
      { src: avalon("avalon-jacuzzi"), alt: "Round jacuzzi tub with jets in a marble-tiled bathroom", caption: "The jacuzzi tub", category: "bedroom" },
      { src: avalon("avalon-stone-bath"), alt: "Sunken bath set in stone, below a timber-framed window", caption: "Sunken stone bath", category: "bedroom" },
      { src: avalon("avalon-bathroom-vanity"), alt: "Bathroom with two basins set in a stone counter with open shelves", caption: "Twin-basin vanity", category: "bedroom" },
    ],
    tours: [
      { id: "living", name: "Living room & kitchen", src: "/assets/images/tours/avalon-living.webp" },
      { id: "cinema", name: "Library & cinema", src: "/assets/images/tours/avalon-cinema.webp" },
      { id: "bedroom", name: "King-size bedroom", src: "/assets/images/tours/avalon-bedroom.webp" },
      { id: "veranda", name: "Veranda", src: "/assets/images/tours/avalon-veranda.webp" },
      { id: "courtyard", name: "Courtyard", src: "/assets/images/tours/avalon-courtyard.webp" },
    ],
    amenities: [
      {
        category: "Hospitality & Services",
        items: [
          "Entire villa reserved for your group",
          "Manager and caretakers on hand",
          "Airport and railway station transfers",
          "Tours and shuttles with English-speaking, licensed tourist drivers",
          "Tuk-tuk rides, guided walks and tea estate visits",
          "Local recommendations and bookings: dance shows, gem, jewellery and batik shops, temples",
        ],
      },
      {
        category: "Food & Dining",
        items: [
          "Breakfast included, Sri Lankan or Western",
          "Home-cooked Sri Lankan rice and curry lunch or dinner on request, LKR 5,000 per person",
          "Private chef for Sri Lankan and Western meals on request",
          "Daily Ceylon tea ritual",
          "Fully equipped kitchen with gas stove, oven, microwave and toaster",
          "Complimentary water, tea and coffee",
        ],
      },
      {
        category: "Outdoor & Wellness",
        items: [
          "Jacuzzi hot tub",
          "Private garden",
          "Balconies and an open verandah",
          "Open-air pavilion and tea terrace",
          "Yoga and meditation space",
          "Views of the forest and the Hanthana mountains",
        ],
      },
      {
        category: "Comfort & Leisure",
        items: [
          "Fast Wi-Fi and a dedicated workspace",
          "Air conditioning, fans and hot water",
          "Cinema room with projector and Bluetooth sound system",
          "Library, games and a vintage piano",
          "Laundry, a safe and free parking",
          "Mosquito nets, vaporizers and an electronic mosquito catcher",
          "Baby cot, mattress and high chair",
          "MagGo wireless charger and charging ports",
        ],
      },
    ],
    inclusions: [
      "The entire 3-bedroom villa and its private garden for your group",
      "Breakfast every morning, Sri Lankan or Western",
      "Complimentary water, tea and coffee, and a daily Ceylon tea ritual",
      "Home-cooked lunch and dinner, or a private chef, on request",
      "A manager and caretakers on hand, with local recommendations and trip planning",
      "Transfers, tours and shuttles arranged on request",
    ],
  },

  acland: {
    slug: "acland",
    name: "Villa Acland",
    eyebrow: "Kandy · 1-Bedroom Villa · Sleeps 2",
    tagline: "The Secluded Sanctuary & Artisan Haven",
    short: "One bedroom for two, with a king-size bed, two balconies and a full kitchen, in a leafy garden.",
    highlights: [
      "King-size bed",
      "Two private balconies",
      "Fully equipped kitchen",
      "Private garden",
      "Fast Wi-Fi",
      "Air conditioning",
      "Free parking",
      "Breakfast included",
    ],
    summary:
      "A private one-bedroom villa beside Avalon Villa, made for two. A king-size bed, two balconies, a fully equipped kitchen and a leafy setting alive with birdsong, a short walk from the centre of Kandy.",
    description: [
      "Villa Acland sits in the grounds of Avalon Villa, among the same trees and quiet hillside. It was made for couples, honeymooners and solo travellers who want stillness close to the centre of Kandy, and it sleeps two.",
      "The bedroom has a king-size bed, and there are two balconies for slow mornings with a view of the trees, the birds and the occasional macaque. A fully equipped kitchen, air conditioning and a Bluetooth speaker make it easy to settle in.",
      "Breakfast is included, and the team can arrange home-cooked meals, transfers, tours and anything else you need, or leave you to your own devices when you'd rather have quiet.",
    ],
    specs: {
      bedrooms: airbnbListings.acland.bedrooms,
      beds: airbnbListings.acland.beds,
      bathrooms: airbnbListings.acland.bathrooms,
      maxGuests: airbnbListings.acland.sleeps,
      feature: "Two Private Balconies",
      view: "Garden, Trees & Birdlife",
      setting: "In the grounds of Avalon Villa, Kandy",
      nightlyUSD: airbnbListings.acland.nightlyUSD,
    },
    heroImage: acland("acland-exterior-garden"),
    architectureImage: {
      src: acland("acland-breezeway"),
      alt: "Covered timber walkway along the teal wall of Villa Acland, laid with river pebbles and stepping stones",
      caption: "The covered walkway, with its pebbles and stepping stones",
    },
    spaces: [
      {
        id: "bedroom",
        name: "Bedroom & Bathroom",
        badge: "King-size bed · Vaulted ceiling",
        description:
          "A king-size bed with a teak headboard under a vaulted timber ceiling, wide windows into the trees and air conditioning. The bathroom has twin basins and round mirrors.",
        features: [
          "King-size bed with a teak headboard",
          "Vaulted timber ceiling and wide windows",
          "Air conditioning",
          "Bathroom with twin basins",
        ],
        photos: [
          { src: acland("acland-bedroom-bed"), alt: "King-size bed with a teak headboard and a green cover, with a window onto the trees", caption: "The king-size bed" },
          { src: acland("acland-bedroom-wide"), alt: "Bedroom with a wide bank of windows, a rattan side table and a woven rug", caption: "The bedroom, with windows onto the trees" },
          { src: acland("acland-bedroom-vaulted"), alt: "Bedroom under a vaulted timber ceiling, with a sliding barn door and a ceiling fan", caption: "Vaulted ceiling and barn door" },
          { src: acland("acland-bathroom"), alt: "Long bathroom with two pedestal basins, round mirrors and a window at the end", caption: "The bathroom" },
        ],
      },
      {
        id: "living-kitchen",
        name: "Living, Kitchen & Dining",
        badge: "Open-plan · Fully equipped",
        description:
          "A fully equipped kitchen and a round dining table under a floating staircase, with a sofa and a desk close by. The doors open straight onto the balcony.",
        features: [
          "Fully equipped kitchen",
          "Round dining table for two",
          "Sofa and desk",
          "Doors onto the balcony",
        ],
        photos: [
          { src: acland("acland-kitchen-stairs"), alt: "Kitchen and round dining table beside a floating staircase", caption: "Kitchen, dining table and staircase" },
          { src: acland("acland-dining-balcony"), alt: "Round dining table by open glass doors onto the balcony, with the kitchen behind", caption: "Dining table by the balcony doors" },
          { src: acland("acland-dining-table"), alt: "Dining table with a bowl of fruit, in front of the kitchen and balcony", caption: "Dining table and kitchen" },
          { src: acland("acland-living-lounge"), alt: "Sofa and desk in a sitting area under a vaulted ceiling, with windows onto the trees", caption: "The sitting area" },
        ],
      },
      {
        id: "balconies",
        name: "Balconies",
        badge: "Two balconies · Canopy views",
        description:
          "Two private balconies among the trees, with chairs for slow mornings. Birds and the occasional macaque come to the branches beside you.",
        features: [
          "Two private balconies",
          "Teak chairs among the branches",
          "Views of the trees and birdlife",
          "Doors straight from the living area",
        ],
        photos: [
          { src: acland("acland-balcony-veranda"), alt: "Covered balcony with two wooden armchairs, with the sitting room behind", caption: "The covered balcony" },
          { src: acland("acland-balcony-chairs"), alt: "Wooden armchairs on a balcony, looking into the branches of an old tree", caption: "Balcony chairs among the branches" },
          { src: acland("acland-balcony-canopy"), alt: "Looking down from the balcony through the branches of a large tree", caption: "Looking into the canopy" },
          { src: acland("acland-terrace-lounger"), alt: "Timber sun lounger on a deck beside the teal wall, among tropical plants", caption: "The deck, with its lounger" },
          { src: acland("acland-balcony-garden"), alt: "The upper balcony of Villa Acland above a garden terrace of tropical plants", caption: "The balcony, from the garden" },
        ],
      },
      {
        id: "garden",
        name: "Garden & Walkways",
        badge: "Private garden · Hillside",
        description:
          "The villa sits among old trees in the grounds of Avalon Villa. Stone-paved paths and a covered pebble walkway lead through the garden.",
        features: [
          "Private garden among old trees",
          "Covered walkway with river pebbles",
          "Stone-paved passage along a green wall",
          "Free parking",
        ],
        photos: [
          { src: acland("acland-exterior-garden"), alt: "Villa Acland from the garden, its teal walls and balcony among tall trees", caption: "Villa Acland from the garden" },
          { src: acland("acland-exterior-balcony"), alt: "The balcony and teal walls of Villa Acland seen through the leaves", caption: "The balcony, through the leaves" },
          { src: acland("acland-breezeway"), alt: "Covered timber walkway laid with river pebbles and stepping stones", caption: "The covered walkway" },
          { src: acland("acland-stone-passage"), alt: "Stone-paved passage under a pergola, beside a wall of ferns and plants", caption: "Stone passage under the pergola" },
        ],
      },
    ],
    gallery: [
      { src: acland("acland-exterior-garden"), alt: "Villa Acland from the garden, its teal walls and balcony among tall trees", caption: "Villa Acland from the garden", category: "outdoor" },
      { src: acland("acland-exterior-balcony"), alt: "The balcony and teal walls of Villa Acland seen through the leaves", caption: "The balcony, through the leaves", category: "outdoor" },
      { src: acland("acland-breezeway"), alt: "Covered timber walkway laid with river pebbles and stepping stones", caption: "The covered walkway", category: "outdoor" },
      { src: acland("acland-stone-passage"), alt: "Stone-paved passage under a pergola, beside a wall of ferns and plants", caption: "Stone passage under the pergola", category: "outdoor" },
      { src: acland("acland-balcony-garden"), alt: "The upper balcony of Villa Acland above a garden terrace of tropical plants", caption: "The balcony, from the garden", category: "outdoor" },
      { src: acland("acland-terrace-lounger"), alt: "Timber sun lounger on a deck beside the teal wall, among tropical plants", caption: "The deck, with its lounger", category: "outdoor" },
      { src: acland("acland-balcony-veranda"), alt: "Covered balcony with two wooden armchairs, with the sitting room behind", caption: "The covered balcony", category: "outdoor" },
      { src: acland("acland-balcony-chairs"), alt: "Wooden armchairs on a balcony, looking into the branches of an old tree", caption: "Balcony chairs among the branches", category: "outdoor" },
      { src: acland("acland-balcony-canopy"), alt: "Looking down from the balcony through the branches of a large tree", caption: "Looking into the canopy", category: "outdoor" },
      { src: acland("acland-living-lounge"), alt: "Sofa and desk in a sitting area under a vaulted ceiling, with windows onto the trees", caption: "The sitting area", category: "living" },
      { src: acland("acland-kitchen-stairs"), alt: "Kitchen and round dining table beside a floating staircase", caption: "Kitchen, dining table and staircase", category: "living" },
      { src: acland("acland-dining-balcony"), alt: "Round dining table by open glass doors onto the balcony, with the kitchen behind", caption: "Dining table by the balcony doors", category: "living" },
      { src: acland("acland-dining-table"), alt: "Dining table with a bowl of fruit, in front of the kitchen and balcony", caption: "Dining table and kitchen", category: "living" },
      { src: acland("acland-bedroom-bed"), alt: "King-size bed with a teak headboard and a green cover, with a window onto the trees", caption: "The king-size bed", category: "bedroom" },
      { src: acland("acland-bedroom-wide"), alt: "Bedroom with a wide bank of windows, a rattan side table and a woven rug", caption: "The bedroom, with windows onto the trees", category: "bedroom" },
      { src: acland("acland-bedroom-vaulted"), alt: "Bedroom under a vaulted timber ceiling, with a sliding barn door and a ceiling fan", caption: "Vaulted ceiling and barn door", category: "bedroom" },
      { src: acland("acland-bathroom"), alt: "Long bathroom with two pedestal basins, round mirrors and a window at the end", caption: "The bathroom", category: "bedroom" },
    ],
    tours: [
      { id: "bedroom", name: "Bedroom", src: "/assets/images/tours/acland-bedroom.webp" },
      { id: "kitchen", name: "Kitchen & dining", src: "/assets/images/tours/acland-kitchen.webp" },
      { id: "garden", name: "Garden", src: "/assets/images/tours/acland-garden.webp" },
    ],
    amenities: [
      {
        category: "Hospitality & Services",
        items: [
          "Entire villa reserved for you",
          "Manager and caretakers on hand, daily housekeeping",
          "Airport and railway station transfers",
          "Tours and shuttles with English-speaking, licensed tourist drivers",
          "Tuk-tuk rides, guided walks and tea estate visits",
          "Local recommendations and bookings: dance shows, gem, jewellery and batik shops, temples",
        ],
      },
      {
        category: "Food & Dining",
        items: [
          "Breakfast included, Sri Lankan or Western",
          "Home-cooked Sri Lankan rice and curry lunch or dinner on request, LKR 5,000 per person",
          "Private chef for Sri Lankan and Western meals on request",
          "Daily Ceylon tea ritual",
          "Fully equipped kitchen with gas stove, oven, microwave and toaster",
          "Complimentary water, tea and coffee",
        ],
      },
      {
        category: "Outdoor & Wellness",
        items: [
          "Two private balconies",
          "Private garden",
          "Open-air pavilion and tea terrace",
          "Yoga and meditation space",
          "Birds and monkeys outside your window",
        ],
      },
      {
        category: "Comfort & Leisure",
        items: [
          "Fast Wi-Fi and a dedicated workspace",
          "Air conditioning, fans and hot water",
          "TV and a Bluetooth speaker",
          "Games and a vintage piano",
          "Laundry, a safe and free parking",
          "Mosquito nets, vaporizers and an electronic mosquito catcher",
          "Baby cot, mattress and high chair",
          "MagGo wireless charger and charging ports",
        ],
      },
    ],
    inclusions: [
      "Exclusive use of Villa Acland and its two balconies",
      "Breakfast every morning, Sri Lankan or Western",
      "Complimentary water, tea and coffee, and a daily Ceylon tea ritual",
      "Home-cooked lunch and dinner, or a private chef, on request",
      "A manager and caretakers on hand, with local recommendations and trip planning",
      "Transfers, tours and shuttles arranged on request",
    ],
  },
};

export const allVillas = Object.values(villas);

export function getVillaBySlug(slug: string): Villa | undefined {
  if (slug === "avalon" || slug === "acland") {
    return villas[slug];
  }
  return undefined;
}
