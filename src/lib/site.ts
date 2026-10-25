import { airbnbListings, bookHref } from "@/lib/booking";

export { bookHref };

export const siteUrl = "https://stationvillas.lk";

const capacity = (key: keyof typeof airbnbListings) => {
  const l = airbnbListings[key];
  return `${l.bedrooms} ${l.bedrooms === 1 ? "bedroom" : "bedrooms"} · sleeps ${l.sleeps}`;
};

export type NavChild = { href: string; label: string; detail: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

/** The two villas, plus both together: listed under "Villas" in the header menus. */
export const villaMenu: NavChild[] = [
  { href: "/villas/avalon", label: "Avalon Villa", detail: capacity("avalon") },
  { href: "/villas/acland", label: "Villa Acland", detail: capacity("acland") },
  { href: bookHref, label: "Both villas together", detail: capacity("both") },
];

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/villas", label: "Villas", children: villaMenu },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* Phone numbers are Sri Lankan mobiles; `e164` feeds the tel: and WhatsApp links. */
const person = (name: string, role: string, display: string, e164: string) => ({
  name,
  role,
  phone: display,
  phoneHref: `tel:+${e164}`,
  whatsappHref: `https://wa.me/${e164}`,
});

export const contact = {
  people: [
    person("Kian", "Owner", "+94 77 934 4582", "94779344582"),
    person("Janah", "Owner", "+94 77 870 3771", "94778703771"),
    person("Prasanna", "Manager", "+94 77 591 7528", "94775917528"),
  ],
  emails: ["bpgunarathna@gmail.com", "kianog@gmail.com"],
  languages: ["English", "Sinhala", "Tamil"],
  coordinates: "7.2990° N, 80.6397° E",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=7.298970,80.639688",
};

/*
 * Contact-form delivery through formsubmit.co. Messages go to the first email
 * and are copied to the rest. FormSubmit asks the first address to confirm
 * once, by email, before it will deliver anything. After that it offers a
 * random alias that can replace the address in the URL, which keeps the email
 * out of the page source.
 */
export const messageForm = {
  to: contact.emails[0],
  cc: contact.emails.slice(1).join(","),
  /** Plain POST: the no-JavaScript fallback. */
  action: `https://formsubmit.co/${contact.emails[0]}`,
  /** JSON POST: lets the page show its own thank-you instead of leaving the site. */
  ajax: `https://formsubmit.co/ajax/${contact.emails[0]}`,
  subject: "New message from the Kintsugi Station website",
};

/** The first owner and email are the "main" contact in the footer. */
export const primaryPhone = contact.people[0];
export const primaryEmail = contact.emails[0];

/* No Facebook or YouTube page exists yet: add them here once they're created. */
export const social = {
  instagram: [
    { handle: "station.avalon", href: "https://www.instagram.com/station.avalon/" },
    { handle: "pgunarathna_official", href: "https://www.instagram.com/pgunarathna_official/" },
  ],
};

/*
 * Driving distance from the villa's map pin, measured on OpenStreetMap roads
 * (OSRM). Times are rounded up for real traffic and the hill roads.
 */
export const distances = {
  kandy: [
    { place: "Temple of the Tooth", distance: "1.2 km", time: "5 min" },
    { place: "Kandy City Centre (KCC)", distance: "1.7 km", time: "5 min" },
    { place: "Kandy Railway Station", distance: "1.8 km", time: "5 min" },
    { place: "Peradeniya Botanical Gardens", distance: "7 km", time: "20 min" },
    { place: "Digana", distance: "16 km", time: "40 min" },
  ],
  further: [
    { place: "Dambulla", distance: "70 km", time: "1 hr 45 min" },
    { place: "Nuwara Eliya", distance: "78 km", time: "2 hr 30 min" },
    { place: "Sigiriya", distance: "89 km", time: "2 hr 15 min" },
    { place: "Colombo Airport (CMB)", distance: "118 km", time: "3 hr" },
    { place: "Ella", distance: "136 km", time: "4 hr 30 min" },
    { place: "Trincomalee", distance: "177 km", time: "4 hr 30 min" },
    { place: "Galle", distance: "223 km", time: "5 hr" },
  ],
};

export const nearbyRecommendations = [
  "Temple of the Tooth",
  "Kandy view point",
  "Wales Park",
  "Peradeniya Botanical Gardens",
  "Hanthana bird park",
  "Tea factory and estate visits",
  "Digana golf club",
  "Udawatta Kele forest",
  "Kandy Lake round",
];
