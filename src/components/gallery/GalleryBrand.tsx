import Link from "next/link";
import { RidgeLine } from "@/components/brand/MountainMark";

/** Centred wordmark with ridge line, shared by the Gallery header and footer. */
export default function GalleryBrand({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Kintsugi Station, Kandy — home"
      className={`flex w-fit flex-col items-center whitespace-nowrap leading-none ${className}`}
    >
      <RidgeLine className="h-[0.95rem] w-[5.75rem] text-[#b9ab8a]" />
      <span className="mt-[0.95rem] font-serif text-[1.02rem] tracking-[0.1em] text-[#eae5d5]">
        KINTSUGI STATION · KANDY
      </span>
      <span className="mt-[0.6rem] font-serif text-[0.52rem] tracking-[0.24em] text-[#9a9b8b]">
        A PRIVATE VILLA IN SRI LANKA
      </span>
    </Link>
  );
}
