import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Guest Reviews — Trincomalee | Kintsugi Station Villas",
  description: "Guest feedback from stays at our Trincomalee Dutch Bay villas.",
};

export default function TrincomaleeReviewsPage() {
  return (
    <ComingSoon
      eyebrow="Guest Reviews — Trincomalee"
      image={images.trincoCard}
      imageAlt="Trincomalee Dutch Bay villas"
    />
  );
}
