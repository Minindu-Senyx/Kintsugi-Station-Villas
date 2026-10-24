import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/home/BookingBar";
import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
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

const heroSlides: HeroSlide[] = [
  {
    src: "/assets/images/villas/acland/acland-hero.jpg",
    alt: "Villa Acland among old trees, with its blue-grey walls and stone urns",
    position: "50% 55%",
  },
  {
    src: "/assets/images/villas/avalon/avalon-pavilion-view.jpg",
    alt: "The lounge at Avalon Villa, with teal shutters, rattan chairs and warm lamps",
    position: "50% 55%",
  },
  {
    src: "/assets/images/villas/avalon/avalon-living-overview.jpg",
    alt: "The veranda dining table at Avalon Villa, open to the forest",
    position: "50% 62%",
  },
  {
    src: "/assets/images/villas/acland/acland-bedroom-lighting.jpg",
    alt: "The bedroom at Villa Acland, with morning light through the trees",
    position: "50% 60%",
  },
  {
    src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg",
    alt: "Morning sunbeams breaking through the forest canopy beside the villas",
    position: "50% 42%",
  },
];

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-gold";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]";
const textLink = "inline-flex min-h-6 items-center text-[0.85rem] font-medium text-gold link-underline hover:text-gold-hover";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <HeroCarousel slides={heroSlides} bar={<BookingBar />}>
        <h1
          style={delay(150)}
          className="enter-rise max-w-[30rem] font-serif text-[2.5rem] leading-[1.08] text-white [text-shadow:0_1px_14px_rgba(6,20,30,0.45)] lg:text-[2.98rem] lg:leading-[3.02rem]"
        >
          Two private villas in the hills of Kandy
        </h1>
        <p style={delay(400)} className="enter-rise mt-[1rem] max-w-[24rem] text-[0.95rem] leading-[1.35rem] text-white [text-shadow:0_1px_10px_rgba(6,20,30,0.55)]">
          A short walk from the Temple of the Tooth. Each villa is yours alone for the length of your stay.
        </p>
      </HeroCarousel>

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
                  <p className="mt-2 text-[0.88rem] text-ink-soft">
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

          <p data-reveal="up" className="mt-10 border-t border-line pt-5 text-[0.88rem] text-ink-soft">
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
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-6">
            <p data-reveal="up" className={eyebrow}>
              Gallery
            </p>
            <Link href="/gallery" className={textLink}>
              View all photos
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {glimpses.map((img, i) => (
              <div key={img.src} data-reveal="image" style={delay(i * 100)} className="group relative h-40 overflow-hidden lg:h-[10.5rem]">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 900px) 24vw, 50vw" className="object-cover group-hover:scale-[1.06]" />
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
              <p className="mt-6 border-t border-line pt-4 text-[0.82rem] text-ink-soft">
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
              <dl className="border-b border-line">
                {(["avalon", "acland", "both"] as const).map((key) => (
                  <div key={key} className="flex items-baseline justify-between gap-4 border-t border-line py-4">
                    <dt className="text-[0.95rem] text-ink">
                      {airbnbListings[key].name}
                      <span className="ml-3 text-[0.8rem] text-muted">sleeps {airbnbListings[key].sleeps}</span>
                    </dt>
                    <dd className="font-serif text-[1.35rem] text-ink">
                      USD {airbnbListings[key].nightlyUSD} <span className="font-sans text-[0.75rem] text-muted">/ night</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.82rem] text-muted">{discountNote}.</p>
              <Link
                href={bookHref}
                className="sheen btn-primary mt-6"
              >
                Book on Airbnb
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
