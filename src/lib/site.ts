export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavHref = (typeof navLinks)[number]["href"];

export const contact = {
  phone: "+94 77 123 4567",
  phoneHref: "tel:+94771234567",
  whatsappHref: "https://wa.me/94771234567",
  email: "hello@kintsugistation.com",
  reservationsEmail: "stay@kintsugistation.com",
  coordinates: "7.2906° N, 80.6337° E",
  mapsHref: "https://maps.google.com/?q=7.2906,80.6337",
};

export const social = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
};

export const bookHref = "/contact#inquiry";
