import { images } from "@/lib/images";

const siteUrl = "https://www.kintsugistationvillas.com";

// Only verifiable facts from the brief go here (name, phone, locality) — no
// invented ratings, review counts, or addresses we don't actually have.
const locations = [
  {
    "@type": "LodgingBusiness",
    name: "Kintsugi Station Villas — Avalon Villa Gallery, Kandy",
    telephone: "+94775917528",
    url: `${siteUrl}/kandy`,
    image: images.kandyVillaExterior,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kandy",
      addressCountry: "LK",
    },
  },
  {
    "@type": "LodgingBusiness",
    name: "Kintsugi Station Villas — Trincomalee Dutch Bay",
    telephone: "+94775917528",
    url: `${siteUrl}/trincomalee`,
    image: images.trincoVillaAerial,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trincomalee",
      addressCountry: "LK",
    },
  },
];

export default function StructuredData() {
  return (
    <>
      {locations.map((location) => (
        <script
          key={location.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...location,
            }),
          }}
        />
      ))}
    </>
  );
}
