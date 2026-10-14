import Image from "next/image";
import Link from "next/link";

/*
 * The owners' logo: a banner of blue marble with gold kintsugi veins and the
 * name on it. Header and footer use a 720px WebP (27 KB); the full-size PNG
 * next to it is the master. The logo carries its own background, so it needs
 * no light or dark variant.
 */
const LOGO = { src: "/assets/brand/kintsugi-station-villas-logo-720.webp", width: 720, height: 202 };

type Props = {
  /** Mark the logo as the page's largest image so it loads first (the header's). */
  priority?: boolean;
  /** Sizes the logo by height, e.g. "h-11 lg:h-[3.6rem]". */
  className?: string;
};

/** Links home. The image is decorative: the link's label carries the name. */
export default function SiteLogo({ priority = false, className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="Kintsugi Station Villas, Sri Lanka: home"
      className={`block w-fit shrink-0 rounded-[2px] ${className}`}
    >
      <Image
        src={LOGO.src}
        alt=""
        width={LOGO.width}
        height={LOGO.height}
        priority={priority}
        className="h-full w-auto rounded-[2px]"
      />
    </Link>
  );
}
