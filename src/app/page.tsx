import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/home/BookingBar";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { airbnbListings, airbnbUrl, bookHref, discountNote } from "@/lib/booking";
import { delay } from "@/lib/motion";
import { featuredTestimonials } from "@/lib/testimonials";
import { allVillas } from "@/lib/villas";

const glimpses = [
  { src: "/assets/images/villas/avalon/avalon-living-overview.jpg", alt: "Veranda dining table at Avalon Villa looking out over the forest" },
  { src: "/assets/images/villas/acland/acland-garden-terrace.jpg", alt: "Terrace at Villa Acland under the canopy of an old tree" },
  { src: "/assets/images/villas/avalon/avalon-deck-panoramic.jpg", alt: "Cinema room and piano at Avalon Villa" },
  { src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg", alt: "King-size bed in the bedroom at Villa Acland" },
];

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-[#6f675d]";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]";
const textLink = "inline-flex min-h-6 items-center text-[0.85rem] font-medium text-gold underline-offset-4 transition-colors hover:text-gold-hover hover:underline";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="relative h-auto min-h-[36rem] lg:h-[27.3125rem] lg:min-h-0">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/images/villas/avalon/avalon-exterior-pool.jpg"
            alt="Morning sunbeams breaking through the forest canopy beside the villas"
            fill
            preload
            sizes="100vw"
            className="enter-settle object-cover object-[50%_42%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,18,16,0.6)_0%,rgba(14,18,16,0.45)_60%,rgba(14,18,16,0.55)_100%)] lg:bg-[linear-gradient(90deg,rgba(14,18,16,0.66)_0%,rgba(14,18,16,0.3)_50%,rgba(14,18,16,0.05)_100%)]"
          />
        </div>
        <div className="frame relative flex h-full flex-col px-5 pb-6 pt-24 lg:block lg:px-[3.625rem] lg:pb-0 lg:pt-[6.4rem]">
          <h1
            style={delay(150)}
            className="enter-rise max-w-[30rem] font-serif text-[2.5rem] leading-[1.08] text-white lg:text-[2.98rem] lg:leading-[3.02rem]"
          >
            Two private villas in the hills of Kandy
          </h1>
          <p style={delay(400)} className="enter-rise mt-[1rem] max-w-[24rem] text-[0.95rem] leading-[1.35rem] text-white">
            A short walk from the Temple of the Tooth. Each villa is yours alone for the length of your stay.
          </p>
          <div
            style={delay(700)}
            className="enter-rise relative z-30 mt-auto pt-10 lg:absolute lg:left-1/2 lg:top-[21.7rem] lg:mt-0 lg:w-[49.5rem] lg:max-w-[calc(100%-2rem)] lg:-translate-x-1/2 lg:pt-0 xl:w-[53rem]"
          >
            <BookingBar />
          </div>
        </div>
      </section>

      {/* The villas */}
      <section className="bg-ivory">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <div data-reveal="up" className="max-w-[30rem]">
            <p className={eyebrow}>The villas</p>
            <h2 className={`mt-4 ${h2}`}>Two villas, one quiet hillside</h2>
            <p className="mt-4 text-[0.95rem] leading-[1.5rem] text-ink-soft">
              Each villa is reserved for one party at a time, with breakfast included.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-12">
            {allVillas.map((villa, i) => {
              const l = airbnbListings[villa.slug];
              return (
                <article key={villa.slug} data-reveal="up" style={delay(i * 120)} className="group">
                  <Link href={`/villas/${villa.slug}`} className="block overflow-hidden" aria-label={`${villa.name}: view the villa`}>
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={villa.heroImage}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>
                  <h3 className="mt-5 font-serif text-[1.7rem] leading-none text-ink">{villa.name}</h3>
                  <p className="mt-2 text-[0.88rem] text-[#3c3e3b]">
                    {l.bedrooms} {l.bedrooms === 1 ? "bedroom" : "bedrooms"} · sleeps {l.sleeps} · from USD {l.nightlyUSD} a night
                  </p>
                  <p className="mt-3 max-w-[26rem] text-[0.9rem] leading-[1.4rem] text-ink-soft">{villa.short}</p>
                  <p className="mt-3">
                    <Link href={`/villas/${villa.slug}`} className={textLink}>
                      View {villa.name}
                    </Link>
                  </p>
                </article>
              );
            })}
          </div>

          <p data-reveal="up" className="mt-10 border-t border-[#e0d9cc] pt-5 text-[0.88rem] text-[#3c3e3b]">
            Travelling in a larger group? Book both villas together: sleeps {airbnbListings.both.sleeps}, USD {airbnbListings.both.nightlyUSD} a night.{" "}
            <Link href="/villas" className="font-medium text-gold underline underline-offset-4 hover:text-gold-hover">
              Compare the villas
            </Link>
          </p>
        </div>
      </section>

      {/* Photographs */}
      <section className="bg-ivory">
        <div className="frame px-5 pb-16 lg:px-[3.625rem] lg:pb-[4.2rem]">
          <div className="flex items-baseline justify-between gap-4 border-t border-[#e0d9cc] pt-6">
            <p data-reveal="up" className={eyebrow}>
              Gallery
            </p>
            <Link href="/gallery" className={textLink}>
              View all photos
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {glimpses.map((img, i) => (
              <div key={img.src} data-reveal="image" style={delay(i * 100)} className="relative h-40 overflow-hidden lg:h-[10.5rem]">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 900px) 24vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest reviews */}
      <section className="bg-linen">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
            <div data-reveal="up">
              <p className={eyebrow}>Guest reviews</p>
              <h2 className={`mt-4 ${h2}`}>What guests say</h2>
            </div>
            <div data-reveal="up" style={delay(150)} className="lg:max-w-[34rem]">
              <TestimonialCarousel items={featuredTestimonials} />
              <p className="mt-6 border-t border-[#d9d2c5] pt-4 text-[0.82rem] text-[#3c3e3b]">
                Rated {airbnbListings.avalon.rating?.score.toFixed(1)} on Airbnb. Guest favourite, in the top 5% of homes.{" "}
                <a href={airbnbUrl("avalon")} target="_blank" rel="noopener noreferrer" className="font-medium text-gold underline underline-offset-4 hover:text-gold-hover">
                  Read all reviews
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="bg-ivory">
        <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
          <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-12">
            <div data-reveal="up">
              <p className={eyebrow}>Book</p>
              <h2 className={`mt-4 ${h2}`}>Book your stay</h2>
              <p className="mt-4 max-w-[20rem] text-[0.92rem] leading-[1.45rem] text-ink-soft">
                Booked securely on Airbnb. Meals, transfers and tours can be arranged once you&rsquo;ve booked.
              </p>
            </div>
            <div data-reveal="up" style={delay(150)} className="lg:max-w-[34rem]">
              <dl className="border-b border-[#d9d2c5]">
                {(["avalon", "acland", "both"] as const).map((key) => (
                  <div key={key} className="flex items-baseline justify-between gap-4 border-t border-[#d9d2c5] py-4">
                    <dt className="text-[0.95rem] text-ink">
                      {airbnbListings[key].name}
                      <span className="ml-3 text-[0.8rem] text-[#5a5c58]">sleeps {airbnbListings[key].sleeps}</span>
                    </dt>
                    <dd className="font-serif text-[1.35rem] text-ink">
                      USD {airbnbListings[key].nightlyUSD} <span className="font-sans text-[0.75rem] text-[#5a5c58]">/ night</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.82rem] text-[#5a5c58]">{discountNote}.</p>
              <Link
                href={bookHref}
                className="mt-6 inline-flex h-[2.6rem] items-center bg-gold px-8 text-[0.85rem] font-medium text-[#f7f1e4] transition-colors hover:bg-gold-hover"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
