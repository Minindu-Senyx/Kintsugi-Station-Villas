import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import SplitHeading from "@/components/SplitHeading";

const items = [
  {
    title: "Wi-Fi & home cinema",
    description: "Complimentary high-speed Wi-Fi throughout, plus a dedicated home cinema for slow evenings in.",
    image: images.cinema,
    href: "/kandy",
  },
  {
    title: "Sri Lankan dining",
    description: "In-villa dining built around local, seasonal ingredients — cooked to order by our own kitchen team.",
    image: images.dining1,
    href: "/trincomalee",
  },
  {
    title: "On-site host team",
    description: "A dedicated team lives on the property, on call for anything a guest needs during their stay.",
    image: images.hospitality,
    href: "/about",
  },
  {
    title: "Private pool & lounging",
    description: "A private pool and shaded outdoor lounging areas, set apart from the road and neighbouring homes.",
    image: images.poolSunset,
    href: "/trincomalee",
  },
];

export default function AmenitiesGrid() {
  return (
    <div className="bg-cream">
      <HorizontalScrollSection
        className="py-24 sm:py-32"
        trackClassName="gap-6 lg:gap-8 px-6 sm:px-10"
      >
        <div className="shrink-0 w-[85vw] sm:w-[60vw] lg:w-[26vw] flex flex-col justify-center snap-start">
          <p className="eyebrow text-teal mb-4">What to expect</p>
          <SplitHeading
            as="h2"
            text="Every stay is built around the same quiet standard"
            className="font-display text-3xl sm:text-4xl leading-tight"
          />
          <p className="mt-5 text-sm text-charcoal/55 hidden lg:block">
            Scroll to explore &rarr;
          </p>
        </div>

        {items.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="group shrink-0 w-[85vw] sm:w-[60vw] lg:w-[30vw] snap-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 30vw, 85vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-xl mt-5">{item.title}</h3>
            <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
              {item.description}
            </p>
            <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors group-hover:text-gold-dark after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
              View detail <ArrowUpRight size={15} />
            </span>
          </Link>
        ))}
      </HorizontalScrollSection>
    </div>
  );
}
