import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

const stats = [
  { label: "2 unique locations" },
  { label: "Hosted, not just rented" },
  { label: "On-site teams, around the clock" },
];

export default function AboutIntro() {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.kandyVillaGarden}
              alt="A restored Kintsugi Station villa surrounded by tropical garden"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delayMs={100}>
          <p className="eyebrow text-teal mb-4">About Kintsugi Station Villas</p>
          <SplitHeading
            as="h2"
            text="Access only the finest private villas in Sri Lanka's most desirable destinations"
            className="font-display text-3xl sm:text-4xl leading-tight max-w-lg"
          />
          <p className="mt-6 text-charcoal/75 leading-relaxed max-w-lg">
            Each of our villas is a restored colonial-era home, brought back
            to life with a careful hand and finished with the comforts of
            modern living. We don&rsquo;t just hand over a set of keys — every
            stay is hosted by a dedicated on-site team who look after the
            house, the garden, and the guests, so you can arrive and simply
            settle in.
          </p>
          <Link
            href="/about"
            className="link-underline mt-6 inline-block text-sm font-medium hover:text-gold-dark transition-colors"
          >
            Read more about us
          </Link>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-hairline">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-lg leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
