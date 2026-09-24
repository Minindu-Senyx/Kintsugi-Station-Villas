import Image from "next/image";
import { rootSize, type RootVariant } from "@/lib/kintsugiRoots";

type Props = {
  variant: RootVariant;
  className?: string;
};

/*
 * Gilded "kintsugi" roots (see lib/kintsugiRoots). The artwork is served as a
 * static, cacheable SVG rather than inlined, so its path data isn't repeated
 * in every page's HTML.
 */
export function KintsugiVeins({ variant, className }: Props) {
  const { width, height } = rootSize(variant);
  return <Image src={`/roots/${variant}.svg`} alt="" aria-hidden="true" width={width} height={height} className={className} />;
}
