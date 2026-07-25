import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] w-full flex items-end sm:items-center">
      <Image
        src={images.teaFog}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 py-20">
        <p className="eyebrow text-gold mb-4">404</p>
        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-xl">
          This path doesn&rsquo;t lead where you expected
        </h1>
        <p className="mt-6 text-white/75 max-w-md leading-relaxed">
          The page you&rsquo;re looking for may have moved or no longer
          exists. Here are a few places to pick up from instead.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-charcoal font-semibold px-7 py-3.5 text-sm transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center border border-white/30 hover:border-white text-white px-7 py-3.5 text-sm transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
