import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Trincomalee Dutch Bay | Kintsugi Station Villas",
  description:
    "Four private villas on Dutch Bay, Trincomalee — barefoot beach living with a dedicated host team.",
};

export default function TrincomaleePage() {
  return (
    <ComingSoon
      eyebrow="Trincomalee Dutch Bay"
      image={images.trincoCard}
      imageAlt="Trincomalee Dutch Bay villas"
    />
  );
}
