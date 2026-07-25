import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Guest Reviews — Kandy | Kintsugi Station Villas",
  description: "Guest feedback from stays at Avalon Villa Gallery, Kandy.",
};

export default function KandyReviewsPage() {
  return (
    <ComingSoon
      eyebrow="Guest Reviews — Kandy"
      image={images.kandyCard}
      imageAlt="Villa Acland, Kandy"
    />
  );
}
