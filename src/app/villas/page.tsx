import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookOnAirbnb from "@/components/villas/BookOnAirbnb";
import { airbnbListings, airbnbUrl } from "@/lib/booking";
import { delay } from "@/lib/motion";
import { contact } from "@/lib/site";
import { allVillas } from "@/lib/villas";

export const metadata: Metadata = {
  title: "The Villas · Kandy Estate · Kintsugi Station",
  description:
    "Two private villas in Kandy, Sri Lanka: Avalon Villa (3 bedrooms, sleeps 6) and Villa Acland (1 bedroom, sleeps 2), or book both together for 8. Reserve on Airbnb.",
};

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-gold";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]";

export default function VillasOverviewPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-ivory text-ink">
      {/* Title */}
      <section className="frame px-5 pb-8 pt-14 lg:px-[3.625rem] lg:pb-[2.5rem] lg:pt-[4rem]">
        <p style={delay(100)} className={`enter-rise ${eyebrow}`}>
          The villas
        </p>
        <h1 style={delay(220)} className="enter-rise mt-4 font-serif text-[2.8rem] leading-none sm:text-[3.6rem]">
          Avalon and Acland
        </h1>
        <p style={delay(340)} className="enter-rise mt-4 max-w-[30rem] text-[1rem] leading-[1.5rem] text-ink-soft">
          Two private villas on a quiet Kandy hillside. Each is reserved for one party at a time. Book either one, or
          both together.
        </p>
      </section>

      {/* The two villas */}
      <section className="frame px-5 pb-16 lg:px-[3.625rem] lg:pb-[4rem]">
        <div className="flex flex-col gap-16 lg:gap-20">
          {allVillas.map((villa, idx) => {
            const l = airbnbListings[villa.slug];
            return (
              <article key={villa.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <Link
                  href={`/villas/${villa.slug}`}
                  aria-label={`${villa.name}: view the villa`}
                  data-reveal="image"
                  style={delay(100)}
                  className={`group relative block aspect-[3/2] overflow-hidden lg:col-span-7 ${idx % 2 ? "lg:order-last" : ""}`}
                >
                  <Image
                    src={villa.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 900px) 55vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="lg:col-span-5">
                  <h2 data-reveal="up" style={delay(150)} className={h2}>
                    {villa.name}
                  </h2>
                  <p data-reveal="up" style={delay(220)} className="mt-3 text-[0.9rem] text-ink-soft">
                    {l.bedrooms} {l.bedrooms === 1 ? "bedroom" : "bedrooms"} · {l.beds} {l.beds === 1 ? "bed" : "beds"} · sleeps {l.sleeps}
                  </p>
                  <p data-reveal="up" style={delay(280)} className="mt-4 max-w-[26rem] text-[0.95rem] leading-[1.5rem] text-ink-soft">
                    {villa.short}
                  </p>
                  <p data-reveal="up" style={delay(340)} className="mt-5 font-serif text-[1.5rem] leading-none">
                    USD {l.nightlyUSD} <span className="font-sans text-[0.78rem] text-muted">/ night</span>
                  </p>
                  <div data-reveal="up" style={delay(400)} className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/villas/${villa.slug}`}
                      className="flex h-[2.5rem] items-center border border-ink px-6 text-[0.82rem] text-ink transition-colors hover:bg-ink hover:text-white"
                    >
                      View the villa
                    </Link>
                    <a
                      href={airbnbUrl(villa.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sheen btn-primary"
                    >
                      Book on Airbnb
                      <span className="sr-only">: {villa.name} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Book */}
      <section id="book" className="scroll-mt-16 border-t border-line bg-linen">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4rem]">
          <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
            <div data-reveal="up">
              <p className={eyebrow}>Reserve</p>
              <h2 className={`mt-4 ${h2}`}>Book on Airbnb</h2>
              <p className="mt-3 max-w-[16rem] text-[0.9rem] leading-[1.4rem] text-ink-soft">
                Live availability and our guest reviews are on Airbnb.
              </p>
            </div>
            <div data-reveal="up" style={delay(120)}>
              <BookOnAirbnb />
              <p className="mt-6 text-[0.85rem] text-ink-soft">
                Travelling with pets, or planning an event? Message us on{" "}
                <a href={contact.people[0].whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-gold underline underline-offset-4 hover:text-gold-hover">
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                first, as we can often be flexible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
