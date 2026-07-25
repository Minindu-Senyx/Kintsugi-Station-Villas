import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SplitHeading from "@/components/SplitHeading";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Book Your Stay | Kintsugi Station Villas",
  description:
    "Enquire about booking a stay at Kintsugi Station Villas in Kandy or Trincomalee, Sri Lanka.",
};

type SearchParams = Promise<{
  villa?: string;
  checkin?: string;
  checkout?: string;
  guests?: string;
  email?: string;
}>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <div>
      <div className="relative h-[55vh] min-h-[400px] w-full">
        <Image
          src={images.contactCard}
          alt="Kintsugi Station Villas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-14">
          <p className="eyebrow text-gold mb-4">Enquire</p>
          <SplitHeading
            as="h1"
            immediate
            text="Book your stay"
            className="font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl"
          />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="text-charcoal/75 leading-relaxed">
            Please drop us a message to inquire about booking your stay and
            we&rsquo;ll get back to you within 24hrs. Alternatively, feel
            free to call / WhatsApp our manager Prasanna on:
          </p>
          <a
            href="tel:+94775917528"
            className="mt-3 inline-flex items-center gap-2 text-gold-dark font-semibold text-lg"
          >
            <Phone size={18} /> +94 77 591 7528
          </a>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          <ContactForm
            initialVilla={params.villa}
            initialCheckin={params.checkin}
            initialCheckout={params.checkout}
            initialGuests={params.guests}
            initialEmail={params.email}
          />

          <aside className="lg:pt-1">
            <div className="border border-hairline p-6 sm:p-7">
              <p className="text-sm font-medium mb-2">Prefer Airbnb?</p>
              <p className="text-sm text-charcoal/65 leading-relaxed">
                You can also book directly via Airbnb.
              </p>
              <a
                href="https://www.airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-block text-sm font-medium hover:text-gold-dark transition-colors"
              >
                View our Airbnb listings
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#F3EEE4] py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <p className="eyebrow text-teal mb-10">Find us</p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium mb-3">
                <MapPin size={15} /> Kandy Hill Country
              </p>
              <div className="aspect-video overflow-hidden border border-hairline">
                <iframe
                  src="https://www.google.com/maps?q=Kandy,Sri+Lanka&output=embed"
                  title="Map — Kandy Hill Country villa"
                  loading="lazy"
                  className="w-full h-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium mb-3">
                <MapPin size={15} /> Trincomalee Dutch Bay
              </p>
              <div className="aspect-video overflow-hidden border border-hairline">
                <iframe
                  src="https://www.google.com/maps?q=Trincomalee,Sri+Lanka&output=embed"
                  title="Map — Trincomalee Dutch Bay villas"
                  loading="lazy"
                  className="w-full h-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
