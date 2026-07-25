// Placeholder photography sourced from Pexels (free, royalty-free) while the
// client's own property photography is prepared. Swap any entry below for a
// local /public path once real photos are supplied — every consumer reads
// through this file, so no other file needs to change.
function pexels(id: number, w = 1600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const images = {
  // Client-supplied real property photography
  kandyCard: "/assets/images/kandy.png",
  trincoCard: "/assets/images/trinco.png",
  contactCard: "/assets/images/contact.png",
  aboutCard: "/assets/images/about.png",

  // Kandy hill country
  kandyVillaExterior: pexels(30520324),
  kandyVillaGarden: pexels(16513917),
  teaFog: pexels(6130794),
  teaAerial: pexels(32262521),
  teaMountains: pexels(6130867),

  // Trincomalee / Dutch Bay
  trincoVillaAerial: pexels(12011525),
  trincoVillaPool: pexels(31817156),
  poolBeach: pexels(3155666),
  poolSunset: pexels(6437583),
  beachPalm1: pexels(11496553),
  beachPalm2: pexels(3214944),
  beachOcean1: pexels(31790312),
  beachOcean2: pexels(29773805),
  tangalleDrone: pexels(16508231),

  // Interiors
  bedroom1: pexels(18254581),
  bedroom2: pexels(33837741),
  bedroom3: pexels(31737843),
  bedroom4: pexels(8135502),
  bedroom5: pexels(20439293),
  bedroom6: pexels(18285941),
  resortInterior: pexels(6640056),
  cinema: pexels(8583821),
  living1: pexels(7060811),
  living2: pexels(5825398),
  living3: pexels(7166926),
  living4: pexels(5825527),
  living5: pexels(19689230),
  dining1: pexels(5116976),
  dining2: pexels(5864590),
  dining3: pexels(11160491),
  dining4: pexels(37475434),
  spa1: pexels(7031704),
  spa2: pexels(3872899),
  hospitality: pexels(3770110),

  // Team portraits
  prasanna: pexels(12871449, 800),
  rasu: pexels(18658795, 800),
  manjula: pexels(36291553, 800),
  kasthuri: pexels(34786869, 800),
} as const;

export type ImageKey = keyof typeof images;
