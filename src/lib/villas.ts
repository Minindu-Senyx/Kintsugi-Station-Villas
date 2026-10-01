export type RoomSpace = {
  id: string;
  name: string;
  badge: string;
  description: string;
  features: string[];
  photos: { src: string; alt: string; caption: string }[];
};

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
  description: string[];
  specs: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    poolType: string;
    view: string;
    setting: string;
    rateFromUSD: number;
  };
  heroImage: string;
  videoUrl?: string;
  spaces: RoomSpace[];
  gallery: VillaPhoto[];
  amenities: { category: string; items: string[] }[];
  inclusions: string[];
};

export const villas: Record<"avalon" | "acland", Villa> = {
  avalon: {
    slug: "avalon",
    name: "Avalon Villa",
    eyebrow: "Kandy Hilltop Estate · 3-Bedroom Residence",
    tagline: "The Grand Panoramic Hillside Residence",
    summary:
      "Commanding an eagle's nest vantage point across the mist-cloaked valley of Kandy, Avalon Villa is an expansive three-bedroom estate residence featuring a private cantilevered infinity pool, teak sundecks, soaring open-air living pavilions, and dedicated chef service.",
    description: [
      "Perched high on the Upper Hantana slopes above Kandy, Avalon Villa was conceived as an ode to openness, natural timber, and shifting mountain light. Designed for families, gatherings of friends, or couples seeking generous private space, it offers complete seclusion within private grounds.",
      "The residence centres around a grand timber-beamed living pavilion that transitions seamlessly onto a wide deck. Here, the private infinity pool appears to spill directly into the forested valley below, reflecting the morning mist and evening amber skies.",
      "Every detail — from the three individually designed bedroom suites to the long banquet dining table and private chef's kitchen — is curated to create an effortless retreat where time slows and every moment feels whole.",
    ],
    specs: {
      bedrooms: 3,
      bathrooms: 3.5,
      maxGuests: 8,
      poolType: "Private Cantilevered Infinity Pool",
      view: "360° Mountain, Valley & Forest Panorama",
      setting: "Upper Hantana Mountain Ridge, Kandy",
      rateFromUSD: 450,
    },
    heroImage: "/assets/images/villas/avalon/avalon-hero.jpg",
    videoUrl: "/assets/videos/avalon-teaser.mp4",
    spaces: [
      {
        id: "suite-b1",
        name: "The Cloud Master Suite (B1)",
        badge: "Upper Level · Panoramic Balcony",
        description:
          "An expansive master sanctuary framed by floor-to-ceiling glass doors opening directly onto a private balcony overlooking the mist-filled valley. Features a handcrafted king-size bed, rich Ceylon teak details, and a luminous en-suite bathroom.",
        features: [
          "King-size teak bed with organic cotton linen",
          "Private cantilevered sunrise balcony",
          "En-suite bathroom with walk-in rain shower",
          "Bespoke dressing alcove & reading lounger",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b1-master.jpg", alt: "Master Suite B1 King Bed", caption: "Master Suite Sanctuary" },
          { src: "/assets/images/villas/avalon/avalon-b1-balcony.jpg", alt: "Master Suite Balcony View", caption: "Private Valley Balcony" },
          { src: "/assets/images/villas/avalon/avalon-b1-bed-detail.jpg", alt: "Teak Bed Artisan Detail", caption: "Handcrafted Teak Details" },
          { src: "/assets/images/villas/avalon/avalon-b1-ensuite.jpg", alt: "En-suite Bathroom", caption: "Luminous Rain Shower En-suite" },
        ],
      },
      {
        id: "suite-b2",
        name: "The Valley Suite (B2)",
        badge: "Mid Level · Mountain Vistas",
        description:
          "Facing the verdant slopes of the tea country, this spacious double suite offers serene morning light and sweeping views through wide windows. Adorned with natural textures, soft tones, and a dedicated en-suite.",
        features: [
          "King or twin configuration with luxury bedding",
          "Deep-set picture windows facing forested hills",
          "Private en-suite with artisan stone vanity",
          "Handcrafted timber wardrobe and writing station",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b2-room.jpg", alt: "Valley Suite B2 Bedroom", caption: "Valley Suite Outlook" },
          { src: "/assets/images/villas/avalon/avalon-b2-window.jpg", alt: "Picture Window View", caption: "Hill Country Vistas" },
          { src: "/assets/images/villas/avalon/avalon-b2-ensuite.jpg", alt: "Suite B2 En-suite", caption: "Private En-Suite Bathroom" },
        ],
      },
      {
        id: "suite-b3",
        name: "The Ridge Suite (B3)",
        badge: "Garden Level · Secluded Serenity",
        description:
          "Nestled closer to the tropical hillside flora, Suite B3 provides an intimate, grounding atmosphere with direct outlooks onto indigenous trees and mountain foliage.",
        features: [
          "King-size bed with artisanal headboard",
          "Quiet tropical garden & canopy outlook",
          "En-suite bathroom with natural light well",
          "Intimate seating nook for quiet moments",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b3-room.jpg", alt: "Ridge Suite B3 Bedroom", caption: "Secluded Ridge Bedroom" },
          { src: "/assets/images/villas/avalon/avalon-b3-bed.jpg", alt: "Artisan Bed Detail", caption: "Custom Timber Headboard" },
          { src: "/assets/images/villas/avalon/avalon-b3-detail.jpg", alt: "Natural Textures", caption: "Natural Materials & Warm Tones" },
          { src: "/assets/images/villas/avalon/avalon-b3-ensuite.jpg", alt: "En-suite Bathroom B3", caption: "Garden En-Suite Shower" },
        ],
      },
      {
        id: "living-dining",
        name: "Living Pavilion & Banquet Dining",
        badge: "Main Level · Social Hearth",
        description:
          "An airy, light-filled great room with open-timber rafters, bespoke lounge seating, banquet dining table, and bar counter connecting seamlessly to the outdoor deck and pool.",
        features: [
          "Vaulted timber ceilings with natural cross-ventilation",
          "Banquet dining table seating up to 10 guests",
          "Cocktail bar & estate chef's open kitchen pass",
          "Plush lounge seating framing the mountain horizon",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-living-overview.jpg", alt: "Living Pavilion Overview", caption: "Open-Air Great Room" },
          { src: "/assets/images/villas/avalon/avalon-dining-patio.jpg", alt: "Dining Room & Patio", caption: "Banquet Dining & Patio" },
          { src: "/assets/images/villas/avalon/avalon-dining-interior.jpg", alt: "Indoor Dining Setup", caption: "Curated Dinner Setting" },
          { src: "/assets/images/villas/avalon/avalon-lounge-interior.jpg", alt: "Lounge Interior", caption: "Comfortable Fireplace Lounge" },
          { src: "/assets/images/villas/avalon/avalon-kitchen-bar.jpg", alt: "Kitchen & Bar Counter", caption: "Bar & Kitchen Pass" },
        ],
      },
      {
        id: "pool-deck",
        name: "Infinity Pool & Sun Terrace",
        badge: "Outdoor · Valley Edge",
        description:
          "The crowning highlight of Avalon Villa — a shimmering infinity pool cantilevered toward the mountain horizon, flanked by timber sun loungers, shaded pergola, and outdoor dining.",
        features: [
          "Private mountain-facing infinity swimming pool",
          "Expansive timber lounging deck with cushioned daybeds",
          "Shaded open-air pavilion for midday relaxation",
          "Al fresco dining terrace for sunset feasts and stargazing",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-hero.jpg", alt: "Avalon Villa Infinity Pool Deck", caption: "Cantilevered Infinity Pool" },
          { src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg", alt: "Pool & Hillside Forest", caption: "Pool Facing Misty Hills" },
          { src: "/assets/images/villas/avalon/avalon-pavilion-view.jpg", alt: "Open Pavilion View", caption: "Timber Shaded Pavilion" },
          { src: "/assets/images/villas/avalon/avalon-pool-loungers.jpg", alt: "Sun Loungers", caption: "Deckside Loungers" },
          { src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg", alt: "Panoramic Deck View", caption: "Panoramic Mountain Panorama" },
          { src: "/assets/images/villas/avalon/avalon-sun-terrace.jpg", alt: "Sun Terrace", caption: "Morning Sun Terrace" },
        ],
      },
    ],
    gallery: [
      { src: "/assets/images/villas/avalon/avalon-hero.jpg", alt: "Avalon Villa Pool & Deck", caption: "Cantilevered Infinity Pool at Twilight", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg", alt: "Avalon Exterior & Pool", caption: "Hillside Infinity Edge", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-pavilion-view.jpg", alt: "Open-Air Pavilion", caption: "Timber Pavilion Framing the Mist", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-pool-loungers.jpg", alt: "Deck Loungers", caption: "Deckside Sun Loungers", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg", alt: "Panoramic Mountain Ridge", caption: "Panoramic Valley Ridge", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-living-overview.jpg", alt: "Living Pavilion Overview", caption: "Light-Filled Living Pavilion", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-dining-patio.jpg", alt: "Dining & Patio", caption: "Indoor-Outdoor Dining", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-dining-interior.jpg", alt: "Banquet Dining Table", caption: "Evening Dinner Table", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-lounge-interior.jpg", alt: "Plush Lounge", caption: "Lounge Seating with View", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-kitchen-bar.jpg", alt: "Bar & Kitchen", caption: "Kitchen & Artisan Bar", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-b1-master.jpg", alt: "Master Bedroom Suite", caption: "Cloud Master Suite (B1)", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-balcony.jpg", alt: "Master Balcony", caption: "Private Master Balcony", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-bed-detail.jpg", alt: "Teak Bed Frame", caption: "Hand-Crafted Teak Bedding", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-ensuite.jpg", alt: "En-suite Bathroom", caption: "Rain Shower En-Suite", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-room.jpg", alt: "Valley Suite Bedroom", caption: "Valley Suite (B2)", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-window.jpg", alt: "Valley Suite Window", caption: "Misty Valley Morning Light", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-ensuite.jpg", alt: "Valley Suite Bath", caption: "Valley Suite En-Suite", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-room.jpg", alt: "Ridge Suite Bedroom", caption: "Ridge Suite (B3)", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-bed.jpg", alt: "Ridge Bed", caption: "King Bed in Ridge Suite", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-ensuite.jpg", alt: "Ridge Suite Bath", caption: "Ridge Suite En-Suite", category: "bedroom" },
    ],
    amenities: [
      {
        category: "Exclusivity & Service",
        items: ["Entire villa reserved for one group", "Dedicated private estate chef", "Personal villa host & butler", "Daily housekeeping & evening turndown"],
      },
      {
        category: "Dining & Culinary",
        items: ["Artisanal Ceylon breakfast included", "Bespoke seasonal dining menu", "Daily morning tea ritual", "Full open-pass kitchen & cocktail bar"],
      },
      {
        category: "Outdoor & Wellness",
        items: ["Private infinity pool with valley views", "Expansive timber sun terrace & daybeds", "Al fresco dining pergola", "Private garden trails"],
      },
      {
        category: "Comfort & Connectivity",
        items: ["High-speed fiber Wi-Fi throughout", "Organic Ceylon cotton linens & bathrobes", "Botanical bath amenities", "Sonos sound system"],
      },
    ],
    inclusions: [
      "Exclusive access to the entire 3-bedroom villa and private grounds",
      "Daily gourmet Sri Lankan and continental breakfast",
      "Personal estate chef to prepare curated meals on request",
      "Signature Ceylon morning and afternoon tea rituals",
      "Dedicated villa host and mountain concierge for Kandy excursions",
      "Full use of private infinity pool and sundecks",
    ],
  },

  acland: {
    slug: "acland",
    name: "Villa Acland",
    eyebrow: "Kandy Hilltop Estate · Artisan Sanctuary",
    tagline: "The Secluded Sanctuary & Artisan Haven",
    summary:
      "Tucked into the lush hillside canopy of the Kandy estate, Villa Acland is an intimate private hideaway carved out of reclaimed teak and river stone, offering pure restorative tranquility, open living verandas, and deep connection with nature.",
    description: [
      "Nestled along a quiet forested slope within the estate, Villa Acland was designed as a tranquil sanctuary for couples, honeymooners, or solo travelers seeking stillness and contemplation.",
      "The architecture celebrates organic textures: warm heritage Ceylon teak, hand-chiseled river stone, woven cane, and natural linen. The master bedroom suite opens directly onto an expansive covered veranda where the mountain breeze rustles through the bamboo canopy.",
      "A carved stone soaking bath brings the outside in, while dedicated host and dining services allow you to savor private meals overlooking the mist without ever having to leave your personal hillside haven.",
    ],
    specs: {
      bedrooms: 1,
      bathrooms: 1.5,
      maxGuests: 3,
      poolType: "Private Stone Bath & Estate Pool Access",
      view: "Lush Hillside Canopy & Valley Mist",
      setting: "Secluded Slope of Avalon Estate, Kandy",
      rateFromUSD: 320,
    },
    heroImage: "/assets/images/villas/acland/acland-hero.jpg",
    spaces: [
      {
        id: "master-sanctuary",
        name: "The Artisan Master Suite",
        badge: "Private Sanctuary · Canopy Views",
        description:
          "An extraordinarily atmospheric bedroom lined with heritage Ceylon teak beams, hand-loomed textiles, and warm ambient lighting. Direct access onto the covered veranda lets the cool mountain breeze flow gently through.",
        features: [
          "Hand-carved reclaimed teak king-size bed",
          "Custom artisan timber desk & writing chair",
          "Soft indirect architectural lighting",
          "Direct double doors opening onto the veranda",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-bedroom-suite.jpg", alt: "Artisan Bedroom Suite", caption: "The Artisan Master Bedroom" },
          { src: "/assets/images/villas/acland/acland-bedroom-bed.jpg", alt: "Teak King Bed", caption: "Hand-Carved Ceylon Teak Bed" },
          { src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg", alt: "Warm Ambient Lighting", caption: "Warm Ambient Lighting" },
          { src: "/assets/images/villas/acland/acland-bedroom-artisan-desk.jpg", alt: "Artisan Desk & Chair", caption: "Craftsman Desk & Reading Corner" },
          { src: "/assets/images/villas/acland/acland-bedroom-teak.jpg", alt: "Reclaimed Teak Detail", caption: "Heritage Teak Woodwork" },
        ],
      },
      {
        id: "living-veranda",
        name: "Living Lounge & Scenic Veranda",
        badge: "Indoor-Outdoor · Mountain Breeze",
        description:
          "A sheltered veranda lounge and intimate dining area perched over the garden slope, where guests can enjoy freshly brewed Ceylon tea, candlelit dinners, and birdwatching amidst the bamboo and ferns.",
        features: [
          "Comfortable deep-seated veranda lounge furniture",
          "Handcrafted solid wood dining table for intimate meals",
          "Open-air design sheltered from mountain showers",
          "Panoramic outlook over mist-veiled forest canopies",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-living-room.jpg", alt: "Living Lounge Room", caption: "Artisan Living Room" },
          { src: "/assets/images/villas/acland/acland-dining-space.jpg", alt: "Dining Space", caption: "Intimate Dining Area" },
          { src: "/assets/images/villas/acland/acland-veranda-lounge.jpg", alt: "Veranda Lounge", caption: "Sheltered Veranda Lounge" },
          { src: "/assets/images/villas/acland/acland-veranda-patio.jpg", alt: "Veranda Patio", caption: "Veranda Breakfast Patio" },
          { src: "/assets/images/villas/acland/acland-deck-view.jpg", alt: "Deck Valley View", caption: "Forest Canopy Deck View" },
        ],
      },
      {
        id: "stone-bath",
        name: "Artisan Stone Bath & Vanity",
        badge: "En-suite · Nature Immersion",
        description:
          "A spa-inspired sanctuary featuring a carved stone soaking bath and artisan timber vanity, harmonizing rustic natural materials with serene luxury.",
        features: [
          "Handcrafted river stone soaking tub",
          "Double artisan timber vanity with brass tapware",
          "Forest-facing frosted privacy windows",
          "Botanical Ceylon herbal bath products and organic salts",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-stone-bath.jpg", alt: "Carved Stone Soaking Bath", caption: "Handcrafted Stone Bath" },
          { src: "/assets/images/villas/acland/acland-ensuite-vanity.jpg", alt: "Artisan Timber Vanity", caption: "Artisan Timber Vanity" },
        ],
      },
      {
        id: "gardens-terraces",
        name: "Hillside Terraces & Forest Canopy",
        badge: "Grounds · Forest Path",
        description:
          "Paved pathways winding through native ferns, wild orchids, and bamboo groves, leading to secluded viewpoint terraces and stone architecture.",
        features: [
          "Private botanical garden pathways",
          "Hand-laid stone architectural details",
          "Intimate meditation and tea-drinking corners",
          "Direct access to estate walking trails",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-hero.jpg", alt: "Villa Acland Hillside Setting", caption: "Secluded Hillside Sanctuary" },
          { src: "/assets/images/villas/acland/acland-exterior-veranda.jpg", alt: "Exterior Veranda", caption: "Stone Architecture & Veranda" },
          { src: "/assets/images/villas/acland/acland-garden-terrace.jpg", alt: "Garden Terrace", caption: "Tropical Garden Terrace" },
          { src: "/assets/images/villas/acland/acland-pathway-foliage.jpg", alt: "Lush Pathway", caption: "Canopy Pathway" },
          { src: "/assets/images/villas/acland/acland-stone-architecture.jpg", alt: "Stone Craftsmanship", caption: "Hand-Chiseled Stone Wall" },
          { src: "/assets/images/villas/acland/acland-hillside-canopy.jpg", alt: "Hillside Canopy", caption: "Hillside Canopy Outlook" },
        ],
      },
    ],
    gallery: [
      { src: "/assets/images/villas/acland/acland-hero.jpg", alt: "Villa Acland Forest Sanctuary", caption: "Sanctuary Amidst the Canopy", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-exterior-veranda.jpg", alt: "Villa Acland Veranda", caption: "Private Stone Veranda", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-garden-terrace.jpg", alt: "Lush Garden Terrace", caption: "Tropical Terrace & Ferns", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-pathway-foliage.jpg", alt: "Garden Pathway", caption: "Forest Canopy Path", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-bedroom-suite.jpg", alt: "Artisan Bedroom Suite", caption: "Master Sanctuary Suite", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-bed.jpg", alt: "Teak King Bed", caption: "Hand-Crafted Teak King Bed", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg", alt: "Warm Bed Lighting", caption: "Ambient Evening Glow", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-artisan-desk.jpg", alt: "Artisan Desk", caption: "Writing Desk with Valley Views", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-teak.jpg", alt: "Heritage Teak Wood", caption: "Reclaimed Ceylon Teak Grain", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-living-room.jpg", alt: "Living Lounge", caption: "Living Room with Natural Light", category: "living" },
      { src: "/assets/images/villas/acland/acland-dining-space.jpg", alt: "Dining Room", caption: "Private Dining Table", category: "living" },
      { src: "/assets/images/villas/acland/acland-veranda-lounge.jpg", alt: "Veranda Lounge Seating", caption: "Veranda Lounge", category: "living" },
      { src: "/assets/images/villas/acland/acland-veranda-patio.jpg", alt: "Patio Seating", caption: "Morning Veranda Patio", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-deck-view.jpg", alt: "Canopy View", caption: "Hillside Canopy Outlook", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-stone-bath.jpg", alt: "Carved Stone Bath", caption: "Hand-Carved Stone Tub", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-ensuite-vanity.jpg", alt: "En-suite Vanity", caption: "Artisan Teak Vanity", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-stone-architecture.jpg", alt: "Stone Walls", caption: "Hand-Chiseled Stone Architecture", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-hillside-canopy.jpg", alt: "Misty Canopy", caption: "Mist Veiled Canopy", category: "outdoor" },
    ],
    amenities: [
      {
        category: "Intimate Seclusion",
        items: ["Entire villa reserved for private use", "Dedicated personal villa host", "Private in-villa dining service", "Daily housekeeping & turndown"],
      },
      {
        category: "Artisan Wellness",
        items: ["Carved river stone soaking tub", "Herbal bath salts & botanical oils", "Plush organic cotton robes & towels", "Private garden meditation spots"],
      },
      {
        category: "Culinary & Rituals",
        items: ["Artisanal Ceylon breakfast delivered to veranda", "Private chef dinners upon request", "Morning Ceylon tea ritual", "Espresso machine & curated tea selection"],
      },
      {
        category: "Comfort & Nature",
        items: ["High-speed fiber Wi-Fi", "Sheltered veranda with valley views", "Direct forest walking trail access", "Full access to estate grounds"],
      },
    ],
    inclusions: [
      "Exclusive private use of Villa Acland and its private terraces",
      "Daily gourmet Sri Lankan and continental breakfast",
      "Private veranda dining service with dedicated host",
      "Signature morning tea ritual with single-origin teas",
      "Access to the wider estate grounds and walking paths",
      "Full concierge assistance for excursions in Kandy and surrounding hills",
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
