import Image from "next/image";
import type { CSSProperties } from "react";
import { rootSize, type RootVariant } from "@/lib/kintsugiRoots";

type Props = {
  variant: RootVariant;
  className?: string;
};

// Where the gold starts spreading from as the roots scroll into view (see
// "Kintsugi roots" in globals.css): roughly the middle of the edges each
// variant's roots grow in from, so every root fills in at a similar pace.
const origins: Record<RootVariant, string> = {
  "top-right": "55% 0%",
  "bottom-left": "0% 20%",
  footer: "30% 0%",
  "footer-mobile": "100% 0%",
  founders: "25% 0%",
};

/*
 * Gilded "kintsugi" roots (see lib/kintsugiRoots). The artwork is served as a
 * static, cacheable SVG rather than inlined, so its path data isn't repeated
 * in every page's HTML.
 */
export function KintsugiVeins({ variant, className }: Props) {
  const { width, height } = rootSize(variant);
  return (
    <Image
      src={`/roots/${variant}.svg`}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      data-reveal="roots"
      style={{ "--origin": origins[variant] } as CSSProperties}
      className={className}
    />
  );
}
