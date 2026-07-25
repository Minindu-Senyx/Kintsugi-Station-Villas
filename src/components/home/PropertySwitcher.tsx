import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { regionInfo } from "@/lib/villas";
import { images } from "@/lib/images";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

const cardImages = {
  kandy: images.kandyCard,
  trinco: images.trincoCard,
};

export default function PropertySwitcher() {
  const regions = [
    { ...regionInfo.kandy, cardImage: cardImages.kandy },
    { ...regionInfo.trinco, cardImage: cardImages.trinco },
  ];

  return (
    <section className="grid sm:grid-cols-2">
      {regions.map((region, i) => (
        <Reveal key={region.slug} delayMs={i * 120}>
          <Link
            href={`/${region.slug}`}
            className="group relative block h-[70vh] min-h-[480px] overflow-hidden"
          >
            <Image
              src={region.cardImage}
              alt={region.label}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/35 group-hover:bg-charcoal/45 transition-colors" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12">
              <p className="eyebrow text-gold mb-3">Explore</p>
              <SplitHeading
                as="h2"
                text={region.label}
                className="font-display text-white text-3xl sm:text-4xl leading-tight max-w-xs"
              />
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-white text-sm font-medium transition-colors group-hover:text-gold w-fit after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
                View property <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
