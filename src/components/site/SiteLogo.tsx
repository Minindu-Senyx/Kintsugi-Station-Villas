import Image from "next/image";
import Link from "next/link";

/*
 * The owners' logo: a banner of blue marble with gold kintsugi veins and the
 * name on it. Header and footer use a 720px WebP (27 KB); the full-size PNG
 * next to it is the master. With `fade`, the banner's cream right-hand side
 * dissolves into the page so the logo and the surface behind it read as one.
 */
const LOGO = { src: "/assets/brand/kintsugi-station-villas-logo-720.webp", width: 720, height: 202 };

type Props = {
  /** Mark the logo as the page's largest image so it loads first (the header's). */
  priority?: boolean;
  /** Dissolve the right edge into the background. */
  fade?: boolean;
  /** Sizes and places the logo, e.g. "h-12 -ml-5". */
  className?: string;
};

/** Links home. The image is decorative: the link's label carries the name. */
export default function SiteLogo({ priority = false, fade = false, className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="Kintsugi Station Villas, Sri Lanka: home"
      className={`block w-fit shrink-0 ${className}`}
    >
      <Image
        src={LOGO.src}
        alt=""
        width={LOGO.width}
        height={LOGO.height}
        priority={priority}
        className={`h-full w-auto max-w-none ${fade ? "logo-fade" : ""}`}
      />
    </Link>
  );
}
