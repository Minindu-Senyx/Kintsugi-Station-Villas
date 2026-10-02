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
  architectureImage: {
    src: string;
    alt: string;
    caption: string;
  };
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
    architectureImage: {
      src: "/assets/images/villas/avalon/avalon-living-overview.jpg",
      alt: "Grand timber-beamed open-air dining and living pavilion at Avalon Villa",
      caption: "The Open-Air Living Pavilion & Banquet Dining",
    },
    videoUrl: "/assets/videos/avalon-teaser.mp4",
    spaces: [
      {
        id: "suite-b1",
        name: "The Cloud Master Suite (B1)",
        badge: "Upper Level · Panoramic Balcony",
        description:
          "An expansive master sanctuary framed by floor-to-ceiling glass doors opening directly onto a private balcony overlooking the mist-filled valley. Features a handcrafted king-size bed, rich Ceylon teak details, vaulted timber ceilings, and a luminous en-suite bathroom with a sunken stone bath.",
        features: [
          "King-size bed framed by double balcony doors",
          "Private cantilevered balcony overlooking mountain ridges",
          "En-suite bathroom with sunken stone soaking bath & dual vanity",
          "Vaulted timber ceilings and handcrafted teak vanity dresser",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b1-bed-detail.jpg", alt: "Cloud Master Suite king bed and balcony doors", caption: "Cloud Master Suite (B1) King Bed & Balcony Access" },
          { src: "/assets/images/villas/avalon/avalon-b1-balcony.jpg", alt: "Private balcony framing misty mountain ridges", caption: "Private Balcony Framing Misty Mountain Ridges" },
          { src: "/assets/images/villas/avalon/avalon-b1-master.jpg", alt: "Cloud Master en-suite with sunken stone bath and vanity", caption: "Master En-Suite with Sunken Stone Bath & Dual Basins" },
          { src: "/assets/images/villas/avalon/avalon-b1-ensuite.jpg", alt: "Vaulted ceilings and vintage teak vanity mirror", caption: "Vaulted Ceilings & Vintage Teak Vanity" },
        ],
      },
      {
        id: "suite-b2",
        name: "The Valley Suite (B2)",
        badge: "Mid Level · Mountain Vistas",
        description:
          "Facing the verdant slopes of the tea country, this spacious suite features twin beds adorned with artisanal teal throws, a custom teak wardrobe, and wide windows inviting in mountain breezes.",
        features: [
          "Twin bed configuration with artisanal handwoven throws",
          "Deep-set picture windows facing forested hills",
          "Private en-suite with white pedestal basin and timber shelving",
          "Handcrafted teak wardrobe and dedicated dressing area",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b2-room.jpg", alt: "Valley Suite twin bedroom with teal throws and vaulted ceiling", caption: "Valley Suite (B2) Twin Bedroom with Garden Breezes" },
          { src: "/assets/images/villas/avalon/avalon-b2-window.jpg", alt: "Twin bedroom teak wardrobe and garden-facing windows", caption: "Twin Suite Teak Wardrobe & Garden Windows" },
          { src: "/assets/images/villas/avalon/avalon-b2-ensuite.jpg", alt: "Valley Suite en-suite with pedestal basin and timber shelving", caption: "Valley Suite En-Suite with Pedestal Basin & Shelving" },
        ],
      },
      {
        id: "suite-b3",
        name: "The Ridge Suite (B3)",
        badge: "Garden Level · Circular Bath",
        description:
          "Nestled close to the estate's lush mountain canopy, Suite B3 is an intimate retreat featuring high timber rafters, an open-concept ensuite, and an artisan circular soaking tub set right beside the garden picture window.",
        features: [
          "King-size bed framed by dark timber finishes & vaulted ceiling",
          "Freestanding circular soaking tub beside garden picture window",
          "Open-concept bath suite overlooking canopy foliage",
          "Polished brass bath fixtures and handheld shower",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-b3-room.jpg", alt: "Ridge Suite king bedroom with vaulted timber ceilings", caption: "Ridge Suite (B3) King Bed with Vaulted Ceilings" },
          { src: "/assets/images/villas/avalon/avalon-b3-bed.jpg", alt: "Circular freestanding soaking tub facing garden window", caption: "Circular Freestanding Soaking Tub Beside Garden Window" },
          { src: "/assets/images/villas/avalon/avalon-b3-detail.jpg", alt: "Open bath suite flowing seamlessly into Ridge bedroom", caption: "Open Bath Suite Concept Overlooking Canopy Foliage" },
          { src: "/assets/images/villas/avalon/avalon-b3-ensuite.jpg", alt: "Close-up of circular tub with polished brass fixtures", caption: "Artisan Soaking Tub Detail with Polished Brass Fixtures" },
        ],
      },
      {
        id: "living-dining",
        name: "Living Lounges, Library & Cinema",
        badge: "Interior Living · Entertainment",
        description:
          "A collection of bespoke indoor social spaces, including a private cinema lounge with projection screen, a floor-to-ceiling library room, and an artisan breakfast bar with exposed brick columns.",
        features: [
          "Private cinema lounge with plush sectional & media projection screen",
          "Atmospheric evening lounge with warm ambient sconce lighting",
          "Dedicated library room with floor-to-ceiling bookshelves",
          "Artisan timber breakfast bar and exposed brick pillars",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg", alt: "Private cinema room with projection screen and sectional sofa", caption: "Private Cinema Lounge with Projection Screen" },
          { src: "/assets/images/villas/avalon/avalon-dining-patio.jpg", alt: "Cinema lounge illuminated with warm ambient sconce lighting", caption: "Evening Cinema Lounge with Ambient Sconces" },
          { src: "/assets/images/villas/avalon/avalon-dining-interior.jpg", alt: "Spacious library lounge with floor-to-ceiling wooden bookshelves", caption: "The Library Lounge with Floor-to-Ceiling Bookshelf" },
          { src: "/assets/images/villas/avalon/avalon-sun-terrace.jpg", alt: "Timber breakfast bar with exposed brick column leading to lounge", caption: "Artisan Bar Counter & Feature Brick Pillar" },
        ],
      },
      {
        id: "pool-deck",
        name: "Verandas, Courtyards & Forest Pavilion",
        badge: "Outdoor Living · Estate Grounds",
        description:
          "Expansive stone courtyards, rain chains, and shaded outdoor verandas surrounded by ancient trees and morning sunbeams, seamlessly blending tropical architecture with nature.",
        features: [
          "Stone courtyard and garden pavilion in the morning mist",
          "Sheltered veranda lounge with handcrafted cane armchairs",
          "Al fresco dining table seating eight overlooking tropical foliage",
          "Artisan courtyard facade with brass reliefs and rain chains",
          "Winding stone pathways through estate forest grounds",
        ],
        photos: [
          { src: "/assets/images/villas/avalon/avalon-hero.jpg", alt: "Avalon Villa stone courtyard and garden pavilion at dawn", caption: "Stone Courtyard & Garden Pavilion at Dawn" },
          { src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg", alt: "Morning sunbeams streaming through mountain forest canopy", caption: "Morning Sunbeams Filtering Through Mountain Canopy" },
          { src: "/assets/images/villas/avalon/avalon-pavilion-view.jpg", alt: "Sheltered veranda lounge with cane armchairs and antique safe", caption: "Sheltered Veranda Lounge with Rattan Armchairs" },
          { src: "/assets/images/villas/avalon/avalon-pool-loungers.jpg", alt: "Al fresco dining table on covered veranda facing lush trees", caption: "Al Fresco Veranda Dining Table for Gatherings" },
          { src: "/assets/images/villas/avalon/avalon-living-overview.jpg", alt: "Veranda dining and living terrace with vaulted timber ceilings", caption: "Canopy-Facing Veranda Dining & Living Terrace" },
          { src: "/assets/images/villas/avalon/avalon-lounge-interior.jpg", alt: "Courtyard exterior with brass reliefs, rain chain, and river stones", caption: "Courtyard Garden Facade with Brass Reliefs & Rain Chains" },
          { src: "/assets/images/villas/avalon/avalon-kitchen-bar.jpg", alt: "Stone pathway winding through forest grounds", caption: "Stone Pathway Winding Through Forest Grounds" },
        ],
      },
    ],
    gallery: [
      { src: "/assets/images/villas/avalon/avalon-hero.jpg", alt: "Avalon Villa stone courtyard and garden pavilion at dawn", caption: "Stone Courtyard & Garden Pavilion at Dawn", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg", alt: "Sunbeams streaming through the forest canopy at Avalon Villa", caption: "Morning Sunbeams Filtering Through Mountain Canopy", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-pavilion-view.jpg", alt: "Covered veranda lounge with cane chairs overlooking garden foliage", caption: "Sheltered Veranda Lounge with Rattan Armchairs", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-pool-loungers.jpg", alt: "Eight-seat timber dining table on the covered veranda facing lush trees", caption: "Al Fresco Veranda Dining Table for Gatherings", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg", alt: "Indoor cinema lounge featuring deep sectional sofa and media projection screen", caption: "Private Cinema Lounge with Projection Screen", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-living-overview.jpg", alt: "Veranda dining and lounge space with vaulted timber ceilings facing the trees", caption: "Canopy-Facing Veranda Dining & Living Terrace", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-dining-patio.jpg", alt: "Cinema room illuminated with warm ambient sconces and plush seating", caption: "Evening Cinema Lounge with Ambient Sconces", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-dining-interior.jpg", alt: "Spacious library lounge with floor-to-ceiling wooden bookshelves and comfortable sofa", caption: "The Library Lounge with Floor-to-Ceiling Bookshelf", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-lounge-interior.jpg", alt: "Courtyard exterior with artistic brass wall reliefs, rain chain, and river stones", caption: "Courtyard Garden Facade with Brass Reliefs & Rain Chains", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-kitchen-bar.jpg", alt: "Paved garden pathway along stone retaining walls under tropical trees", caption: "Stone Pathway Winding Through Forest Grounds", category: "outdoor" },
      { src: "/assets/images/villas/avalon/avalon-sun-terrace.jpg", alt: "Timber breakfast and cocktail bar with exposed brick column and living area beyond", caption: "Artisan Bar Counter & Feature Brick Pillar", category: "living" },
      { src: "/assets/images/villas/avalon/avalon-b1-master.jpg", alt: "Spacious en-suite bathroom with sunken bathtub and dual vanity basins", caption: "Master En-Suite with Sunken Stone Bath & Dual Basins", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-balcony.jpg", alt: "Bedroom balcony looking out across the emerald green mountain range", caption: "Private Balcony Framing Misty Mountain Ridges", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-bed-detail.jpg", alt: "King bed with crisp white linens and French doors opening onto private balcony", caption: "Cloud Master Suite (B1) King Bed & Balcony Access", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b1-ensuite.jpg", alt: "Handcrafted teak vanity mirror and high timber-beam ceiling in master bedroom", caption: "Vaulted Ceilings & Vintage Teak Vanity", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-room.jpg", alt: "Spacious twin bedroom with teal woven throws, desk, and vaulted ceilings", caption: "Valley Suite (B2) Twin Bedroom with Garden Breezes", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-window.jpg", alt: "Bedroom with heritage teak wardrobe and windows overlooking tropical greenery", caption: "Twin Suite Teak Wardrobe & Garden Windows", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b2-ensuite.jpg", alt: "Private bathroom featuring white pedestal washbasin and natural timber shelving", caption: "Valley Suite En-Suite with Pedestal Basin & Shelving", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-room.jpg", alt: "Inviting king bedroom with dark wood finishes and vaulted timber roof structure", caption: "Ridge Suite (B3) King Bed with Vaulted Ceilings", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-bed.jpg", alt: "Deep circular bathtub set beside garden picture windows in Ridge Suite", caption: "Circular Freestanding Soaking Tub Beside Garden Window", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-detail.jpg", alt: "En-suite soaking tub harmoniously integrated with bedroom and garden view", caption: "Open Bath Suite Concept Overlooking Canopy Foliage", category: "bedroom" },
      { src: "/assets/images/villas/avalon/avalon-b3-ensuite.jpg", alt: "Close-up of deep freestanding bath and handheld shower wand", caption: "Artisan Soaking Tub Detail with Polished Brass Fixtures", category: "bedroom" },
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
    architectureImage: {
      src: "/assets/images/villas/acland/acland-stone-architecture.jpg",
      alt: "Hand-chiseled river stone foundation, breezeway, and timber joinery at Villa Acland",
      caption: "Hand-Chiseled River Stone Foundation & Open Forest Breezeway",
    },
    spaces: [
      {
        id: "master-sanctuary",
        name: "The Artisan Master Suite",
        badge: "Private Sanctuary · Canopy Views",
        description:
          "An extraordinarily atmospheric bedroom lined with heritage Ceylon teak beams, hand-loomed textiles, and warm ambient sunlight. Features an intimate sliding barn door antechamber, craftsman writing desk, and direct flow into the open en-suite.",
        features: [
          "Hand-carved reclaimed teak king bed bathed in morning sunflare",
          "Bedroom antechamber with artisan sliding teak barn door",
          "Vaulted timber ceilings and reading desk overlooking forest canopy",
          "Open architectural flow into double-vanity stone en-suite",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-bedroom-suite.jpg", alt: "Master bedroom entryway with sliding teak barn door and console", caption: "Master Bedroom Antechamber with Sliding Teak Barn Door" },
          { src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg", alt: "Reclaimed teak king bed with soft morning sunlight streaming across linen", caption: "Master King Bed Bathed in Morning Sunflare" },
          { src: "/assets/images/villas/acland/acland-bedroom-artisan-desk.jpg", alt: "Spacious master bedroom with high ceilings, writing desk, and leafy outlook", caption: "Vaulted Master Suite with Forest Canopy Windows" },
          { src: "/assets/images/villas/acland/acland-bedroom-teak.jpg", alt: "Master king bed looking through to the stone vanity and bathroom", caption: "King Bed Flowing into Open Double-Vanity En-Suite" },
        ],
      },
      {
        id: "living-veranda",
        name: "Living Lounge, Kitchen & Breezeway",
        badge: "Indoor-Outdoor · Open Living",
        description:
          "An architectural living space featuring an upper mezzanine reading lounge, open gourmet kitchen with floating stone stairs, and indoor dining opening wide to the breezy covered veranda.",
        features: [
          "Upper reading lounge with comfortable sofa and craftsman desk",
          "Open gourmet kitchen with timber cabinetry & floating stone staircase",
          "Indoor dining room framing the outdoor canopy sun deck",
          "Covered veranda lounge with heritage woven cane armchairs",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-deck-view.jpg", alt: "Upper living nook with comfortable couch, desk, and vaulted ceiling", caption: "Upper Reading Lounge with Sofa & Craftsman Writing Desk" },
          { src: "/assets/images/villas/acland/acland-exterior-veranda.jpg", alt: "Contemporary open kitchen with timber cabinets and floating stone staircase", caption: "Gourmet Kitchen & Floating Architectural Staircase" },
          { src: "/assets/images/villas/acland/acland-dining-space.jpg", alt: "Overhead view from staircase showing kitchen bar and dining area", caption: "Open Living & Dining Space Framed from the Staircase" },
          { src: "/assets/images/villas/acland/acland-pathway-foliage.jpg", alt: "Teak dining table positioned by full-height glass doors leading to deck", caption: "Open-Plan Dining Table Seamlessly Opening to Sun Deck" },
          { src: "/assets/images/villas/acland/acland-veranda-lounge.jpg", alt: "Indoor dining room connected directly to stone veranda and garden", caption: "Dining Area Opening Wide to Shaded Garden Breezeway" },
          { src: "/assets/images/villas/acland/acland-living-room.jpg", alt: "Open veranda lounge with heritage woven cane armchairs and stone floor", caption: "Covered Breezeway Veranda with Teak & Cane Armchairs" },
        ],
      },
      {
        id: "stone-bath",
        name: "Artisan Stone Bath & Vanity",
        badge: "En-suite Spa · Nature Immersion",
        description:
          "A spa-inspired sanctuary featuring a sunken stone soaking bath, walk-in rain shower, and dual pedestal washbasins with handcrafted mirrors overlooking tree ferns.",
        features: [
          "Sunken stone soaking bath with tranquil forest window views",
          "Overhead rain shower nestled in chiseled river stone",
          "Dual pedestal washbasins with minimalist black tapware",
          "Botanical Ceylon herbal bath products and organic salts",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-bedroom-bed.jpg", alt: "Luxurious stone bathroom with sunken bath and overhead rain shower", caption: "Spa En-Suite with Sunken Bath & Rain Shower" },
          { src: "/assets/images/villas/acland/acland-stone-bath.jpg", alt: "Sunken stone bathtub and twin vanity basins with leafy window view", caption: "Sunken Stone Bath & Dual Basins with Forest Outlook" },
          { src: "/assets/images/villas/acland/acland-ensuite-vanity.jpg", alt: "Two minimalist white pedestal basins with black tapware and oval mirrors", caption: "Dual Pedestal Washbasins with Handcrafted Mirrors" },
        ],
      },
      {
        id: "gardens-terraces",
        name: "Canopy Sun Deck & Terraces",
        badge: "Grounds · Forest Immersion",
        description:
          "A secluded outdoor sanctuary immersed in high-altitude flora, featuring a cantilevered timber sun deck with loungers, terracotta-adorned pergolas, and stone courtyard water basins.",
        features: [
          "Expansive timber sun terrace and loungers immersed in the tree canopy",
          "Timber pergola walkway with terracotta planters along chiseled stone wall",
          "Covered breezeway with polished river stones and teak pillars",
          "Stone courtyard patio featuring a hand-carved stone water basin",
        ],
        photos: [
          { src: "/assets/images/villas/acland/acland-hero.jpg", alt: "Villa Acland exterior with terracotta urns framed by lush hill country trees", caption: "Sanctuary Pavilion & Terracotta Urns Amidst Canopy" },
          { src: "/assets/images/villas/acland/acland-garden-terrace.jpg", alt: "Expansive timber sun terrace with loungers surrounded by lush tree ferns", caption: "Private Sun Deck & Loungers Immersed in Forest Canopy" },
          { src: "/assets/images/villas/acland/acland-veranda-patio.jpg", alt: "Covered walkway bordered by smooth river stones and wooden architectural posts", caption: "Sheltered Breezeway with River Pebbles & Teak Columns" },
          { src: "/assets/images/villas/acland/acland-stone-architecture.jpg", alt: "Stone-paved path under timber pergola adorned with hanging plants", caption: "Pergola Walkway with Terracotta Pots & Chiseled Stone Wall" },
          { src: "/assets/images/villas/acland/acland-hillside-canopy.jpg", alt: "Stone courtyard patio with sculptural stone water bowl and lush hill canopy", caption: "Courtyard Patio Featuring Carved Stone Water Basin" },
        ],
      },
    ],
    gallery: [
      { src: "/assets/images/villas/acland/acland-hero.jpg", alt: "Villa Acland exterior with terracotta urns framed by lush hill country trees", caption: "Sanctuary Pavilion & Terracotta Urns Amidst Canopy", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-exterior-veranda.jpg", alt: "Contemporary open kitchen with timber cabinets and floating stone staircase", caption: "Gourmet Kitchen & Floating Architectural Staircase", category: "living" },
      { src: "/assets/images/villas/acland/acland-garden-terrace.jpg", alt: "Expansive timber sun terrace with loungers surrounded by lush tree ferns", caption: "Private Sun Deck & Loungers Immersed in Forest Canopy", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-pathway-foliage.jpg", alt: "Teak dining table positioned by full-height glass doors leading to deck", caption: "Open-Plan Dining Table Seamlessly Opening to Sun Deck", category: "living" },
      { src: "/assets/images/villas/acland/acland-bedroom-suite.jpg", alt: "Intimate bedroom entryway featuring sliding reclaimed timber door and console", caption: "Master Bedroom Antechamber with Sliding Teak Barn Door", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-bed.jpg", alt: "Luxurious stone bathroom with sunken bath and overhead rain shower", caption: "Spa En-Suite with Sunken Bath & Rain Shower", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg", alt: "Reclaimed teak king bed with soft morning sunlight streaming across linen", caption: "Master King Bed Bathed in Morning Sunflare", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-artisan-desk.jpg", alt: "Spacious master bedroom with high ceilings, writing desk, and leafy outlook", caption: "Vaulted Master Suite with Forest Canopy Windows", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-bedroom-teak.jpg", alt: "Master king bed looking through to the stone vanity and bathroom", caption: "King Bed Flowing into Open Double-Vanity En-Suite", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-living-room.jpg", alt: "Open veranda lounge with heritage woven cane armchairs and stone floor", caption: "Covered Breezeway Veranda with Teak & Cane Armchairs", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-dining-space.jpg", alt: "Overhead view from staircase showing kitchen bar and dining area", caption: "Open Living & Dining Space Framed from the Staircase", category: "living" },
      { src: "/assets/images/villas/acland/acland-veranda-lounge.jpg", alt: "Indoor dining room connected directly to stone veranda and garden", caption: "Dining Area Opening Wide to Shaded Garden Breezeway", category: "living" },
      { src: "/assets/images/villas/acland/acland-veranda-patio.jpg", alt: "Covered walkway bordered by smooth river stones and wooden architectural posts", caption: "Sheltered Breezeway with River Pebbles & Teak Columns", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-deck-view.jpg", alt: "Upper living nook with comfortable couch, desk, and vaulted ceiling", caption: "Upper Reading Lounge with Sofa & Craftsman Writing Desk", category: "living" },
      { src: "/assets/images/villas/acland/acland-stone-bath.jpg", alt: "Sunken stone bathtub and twin vanity basins with leafy window view", caption: "Sunken Stone Bath & Dual Basins with Forest Outlook", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-ensuite-vanity.jpg", alt: "Two minimalist white pedestal basins with black tapware and oval mirrors", caption: "Dual Pedestal Washbasins with Handcrafted Mirrors", category: "bedroom" },
      { src: "/assets/images/villas/acland/acland-stone-architecture.jpg", alt: "Stone-paved path under timber pergola adorned with hanging plants", caption: "Pergola Walkway with Terracotta Pots & Chiseled Stone Wall", category: "outdoor" },
      { src: "/assets/images/villas/acland/acland-hillside-canopy.jpg", alt: "Stone courtyard patio with sculptural stone water bowl and lush hill canopy", caption: "Courtyard Patio Featuring Carved Stone Water Basin", category: "outdoor" },
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
