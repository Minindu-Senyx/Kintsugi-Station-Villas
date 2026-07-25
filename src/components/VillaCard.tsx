import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Villa } from "@/lib/villas";
import RatingStars from "@/components/RatingStars";

export default function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link href={`/villas/${villa.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={villa.heroImage}
          alt={villa.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="font-display text-xl mt-5">{villa.name}</h3>
      <div className="mt-2">
        <RatingStars reviewCount={villa.reviewCount} />
      </div>
      <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors group-hover:text-gold-dark after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
        View villa <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}
