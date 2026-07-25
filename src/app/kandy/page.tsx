import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Kandy Hill Country | Kintsugi Station Villas",
  description:
    "Avalon Villa Gallery — a restored colonial-era home set among the tea gardens above Kandy, Sri Lanka.",
};

export default function KandyPage() {
  return (
    <ComingSoon
      eyebrow="Kandy Hill Country"
      image={images.kandyCard}
      imageAlt="Avalon Villa Gallery, Kandy"
    />
  );
}
