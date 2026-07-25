import Image from "next/image";
import Link from "next/link";
import SplitHeading from "@/components/SplitHeading";
import MagneticButton from "@/components/MagneticButton";

export default function ComingSoon({
  eyebrow,
  image,
  imageAlt,
}: {
  eyebrow: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center text-center overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative z-10 px-6 max-w-xl">
        <p className="eyebrow text-gold mb-4">{eyebrow}</p>
        <SplitHeading
          as="h1"
          immediate
          text="Coming soon"
          className="font-display text-white text-5xl sm:text-6xl leading-tight"
        />
        <p className="mt-6 text-white/80 leading-relaxed">
          We&rsquo;re putting the finishing touches on this page. Please
          check back soon, or get in touch directly in the meantime.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <Link
              href="/"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-charcoal font-semibold px-7 py-3.5 text-sm shadow-md transition-colors"
            >
              Back to home
            </Link>
          </MagneticButton>
          <Link
            href="/contact"
            className="link-underline text-sm font-medium text-white hover:text-gold transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
