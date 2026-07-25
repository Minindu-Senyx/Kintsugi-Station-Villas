import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function OffersBand() {
  return (
    <section className="bg-charcoal py-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <p className="text-white text-base sm:text-lg font-display">
          Last-minute &amp; extended stay discounts available — please
          inquire for more info.
        </p>
        <MagneticButton className="shrink-0 inline-block">
          <Link
            href="/contact"
            className="inline-flex items-center bg-gold hover:bg-gold-dark text-charcoal font-semibold px-7 py-3.5 text-sm shadow-md transition-colors"
          >
            Book now
          </Link>
        </MagneticButton>
      </div>
    </section>
  );
}
