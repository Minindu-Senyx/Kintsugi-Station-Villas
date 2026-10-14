import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, ChefHat, ConciergeBell, ExternalLink, Leaf, Star } from "lucide-react";
import BookingBar from "@/components/home/BookingBar";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { KintsugiVeins } from "@/components/brand/KintsugiVeins";
import { delay } from "@/lib/motion";
import { airbnbListings, airbnbUrl, bookHref, discountNote } from "@/lib/booking";
import { featuredTestimonials } from "@/lib/testimonials";

const estateVillas = [
  {
    slug: "avalon",
    name: "Avalon Villa",
    badge: "3 Bedrooms · Hot Tub",
    tagline: "The Grand Panoramic Villa",
    src: "/assets/images/villas/avalon/avalon-hero.jpg",
    alt: "Stone courtyard and garden pavilion at Avalon Villa in Kandy",
    specs: "3 Bedrooms · Sleeps 6",
  },
  {
    slug: "acland",
    name: "Villa Acland",
    badge: "1 Bedroom · Two Balconies",
    tagline: "The Secluded Forest Haven",
    src: "/assets/images/villas/acland/acland-hero.jpg",
    alt: "Villa Acland stone architecture and lush canopy in Kandy",
    specs: "1 Bedroom · Sleeps 2",
  },
];

const glimpses = [
  { src: "/assets/images/villas/avalon/avalon-exterior-pool.jpg", caption: "Morning Light Through the Canopy (Avalon)", alt: "Morning sunbeams streaming through the forest canopy at Avalon Villa" },
  { src: "/assets/images/villas/avalon/avalon-b1-master.jpg", caption: "Cloud Master Suite (Avalon)", alt: "Teak-panelled master bedroom with private balcony" },
  { src: "/assets/images/villas/acland/acland-veranda-lounge.jpg", caption: "Scenic Veranda Lounge (Acland)", alt: "Open veranda overlooking forest canopy" },
  { src: "/assets/images/villas/acland/acland-stone-bath.jpg", caption: "Artisan Stone Bath (Acland)", alt: "Carved stone soaking tub in natural garden" },
];

const features = [
  { icon: BedDouble, title: "Entire villa for your exclusive use", text: "One group. Complete privacy." },
  { icon: ChefHat, title: "Breakfast included", text: "Home-cooked meals and a private chef on request." },
  { icon: Leaf, title: "Daily tea ritual", text: "A taste of Ceylon, each morning." },
  { icon: ConciergeBell, title: "Local concierge", text: "Transfers, tours and trips arranged for you." },
];

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: "taupe" | "gold" }) {
  return (
    <p
      data-reveal="up"
      className={`eyebrow flex items-center gap-[0.6rem] text-[0.7rem] tracking-[0.14em] ${
        tone === "gold" ? "text-[#7d653d]" : "text-[#6f675d]"
      }`}
    >
      {children}
      <span data-reveal="line" style={delay(350)} aria-hidden="true" className="h-px w-[2.5rem] bg-[#c3a876]" />
    </p>
  );
}

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* Hero */}
      <section className="relative h-auto min-h-[36rem] lg:h-[27.3125rem] lg:min-h-0">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/images/homepage_hero.jpg"
            alt="Infinity pool and timber pavilion above a misty valley at sunset"
            fill
            preload
            sizes="100vw"
            className="enter-settle object-cover object-[50%_45%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,20,0.45)_0%,rgba(18,22,20,0.18)_45%,rgba(18,22,20,0)_70%)]"
          />
        </div>
        <div className="frame relative flex h-full flex-col px-5 pb-6 pt-24 lg:block lg:px-[3.625rem] lg:pb-0 lg:pt-[6.55rem]">
          <h1
            style={delay(150)}
            className="enter-rise font-serif text-[2.5rem] leading-[1.08] text-white lg:text-[2.98rem] lg:leading-[3.02rem]"
          >
            A Secluded Hill
            <br />
            Country Sanctuary
          </h1>
          <p
            style={delay(400)}
            className="enter-rise mt-[1.05rem] max-w-[21.5rem] text-[0.91rem] leading-[1.25rem] text-white/95"
          >
            Kandy · Two private villas in the mist-veiled hills of Sri Lanka, a short walk from the Temple of the Tooth.
          </p>
          <span
            aria-hidden="true"
            style={delay(700)}
            className="enter-line mt-[1.85rem] block h-px w-[3.2rem] bg-[#b89a5f]"
          />
          <div
            style={delay(850)}
            className="enter-rise relative z-30 mt-auto pt-10 lg:absolute lg:left-1/2 lg:top-[21.7rem] lg:mt-0 lg:w-[49.5rem] xl:w-[53rem] lg:max-w-[calc(100%-2rem)] lg:-translate-x-1/2 lg:pt-0"
          >
            <BookingBar />
          </div>
        </div>
      </section>

      {/* The Estate */}
      <section className="bg-ivory">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="flex flex-col gap-10 py-12 lg:flex-row lg:gap-0 lg:pb-[1.8rem] lg:pt-[1.8rem]">
            <div className="lg:w-[23rem] lg:pt-[0.6rem]">
              <Eyebrow tone="taupe">Kandy Branch · Sri Lanka</Eyebrow>
              <h2 data-reveal="up" style={delay(120)} className="mt-[1.3rem] font-serif text-[2.5rem] leading-[2.6rem] text-ink sm:text-[2.7rem]">
                Two Sanctuaries.
                <br />
                One Hilltop Estate.
              </h2>
              <p
                data-reveal="up"
                style={delay(240)}
                className="mt-[0.85rem] text-[0.875rem] leading-[1.35rem] tracking-[0.004em] text-ink-soft"
              >
                On a quiet Kandy hillside, our estate has two private villas: <strong className="font-medium text-ink">Avalon Villa</strong>, which sleeps six, and <strong className="font-medium text-ink">Villa Acland</strong>, which sleeps two. Each is reserved for one party at a time, with breakfast included and a team on hand for meals, transfers and tours. Book either one, or both together for eight.
              </p>
              <div data-reveal="up" style={delay(360)} className="mt-5 hidden lg:block">
                <Link
                  href="/villas"
                  className="group inline-flex min-h-6 items-center gap-2 text-[0.78rem] font-medium tracking-[0.06em] text-gold hover:text-gold-hover"
                >
                  <span>Compare Both Villas</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:ml-auto lg:w-[32.5rem] lg:gap-[0.9rem]">
              {estateVillas.map((villa, i) => (
                <article key={villa.slug} className="group flex flex-col rounded-[2px] border border-[#e4ded5] bg-linen/70 p-3 transition-colors hover:border-gold/60">
                  <div data-reveal="image" style={delay(i * 180)} className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
                    <Image
                      src={villa.src}
                      alt={villa.alt}
                      fill
                      sizes="(min-width: 900px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                    />
                    <div className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[0.7rem] font-medium tracking-[0.1em] text-[#e8d5b0] uppercase backdrop-blur-md">
                      {villa.badge}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-1 flex-col">
                    <h3 className="font-serif text-[1.25rem] text-ink">{villa.name}</h3>
                    <p className="mt-0.5 text-[0.72rem] text-[#6b6760]">{villa.specs}</p>
                    <Link
                      href={`/villas/${villa.slug}`}
                      className="mt-3 inline-flex min-h-6 items-center gap-1.5 text-[0.74rem] font-medium tracking-[0.04em] text-gold transition-colors hover:text-gold-hover"
                    >
                      <span>Explore {villa.name}</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e6e0d7] pb-12 pt-[1.6rem] lg:pb-[1.85rem] lg:pt-[1.2rem]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow tone="taupe">Glimpses of Kintsugi</Eyebrow>
              <Link
                href="/gallery"
                className="group flex min-h-6 items-center gap-[0.35rem] text-[0.75rem] text-[#2b2c2a] transition-colors hover:text-gold"
              >
                View Full Gallery (24 Photos)
                <ArrowRight
                  className="size-[0.8rem] transition-transform duration-500 ease-soft group-hover:translate-x-[0.25rem]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="mt-[1.2rem] grid grid-cols-2 gap-[0.625rem] lg:grid-cols-[226fr_224fr_223fr_203fr]">
              {glimpses.map((img, i) => (
                <figure key={img.src} className="group">
                  <div data-reveal="image" style={delay(i * 120)} className="relative h-40 overflow-hidden lg:h-[10.1875rem]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 900px) 23vw, 50vw"
                      className="object-cover group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption
                    data-reveal="fade"
                    style={delay(i * 120 + 450)}
                    className="mt-[0.7rem] text-[0.7rem] font-medium tracking-[0.08em] text-[#2b2c2a] uppercase"
                  >
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Voices */}
      <section className="bg-ivory">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="flex flex-col gap-8 border-t border-[#e6e0d7] py-12 lg:flex-row lg:gap-0 lg:pb-[2.4rem] lg:pt-[1.9rem]">
            <div className="lg:w-[22rem] lg:pt-[0.6rem]">
              <Eyebrow tone="taupe">Guest Voices</Eyebrow>
              <h2 data-reveal="up" style={delay(120)} className="mt-[1.2rem] font-serif text-[2.33rem] leading-[2.28rem] text-ink">
                Words From
                <br />
                Those Who Stayed
              </h2>
            </div>
            <div data-reveal="up" style={delay(240)} className="lg:ml-auto lg:w-[31.5rem] lg:pt-[0.3rem]">
              <TestimonialCarousel items={featuredTestimonials} />
              <p className="mt-[1.4rem] flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-[#e6e0d7] pt-[1rem] text-[0.74rem] text-[#4a4a48]">
                <Star className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                <span>
                  Rated {airbnbListings.avalon.rating?.score.toFixed(1)} on Airbnb. Guest favourite, in the top 5% of homes.
                </span>
                <a
                  href={airbnbUrl("avalon")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center gap-1 text-gold underline-offset-2 hover:text-gold-hover hover:underline"
                >
                  Read all reviews
                  <ExternalLink className="size-3" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve the Estate */}
      <section className="relative overflow-hidden bg-linen">
        <KintsugiVeins
          variant="top-right"
          className="pointer-events-none absolute right-[calc(max(0rem,50vw-32rem)-30rem)] top-0 h-[15.3rem] w-[36.875rem] max-w-none"
        />
        <KintsugiVeins
          variant="bottom-left"
          className="pointer-events-none absolute bottom-0 left-0 h-[5.6rem] w-[8.1rem]"
        />
        <div className="frame relative flex flex-col gap-10 px-5 py-12 lg:min-h-[14.8rem] lg:flex-row lg:gap-0 lg:px-[3.625rem] lg:py-0 lg:pb-[1.4rem]">
          <div className="lg:w-[22.3rem] lg:pt-[2.35rem]">
            <Eyebrow tone="gold">Reserve the Estate</Eyebrow>
            <h2 data-reveal="up" style={delay(120)} className="mt-[1.2rem] font-serif text-[2.33rem] leading-[2.28rem] text-ink">
              Your Private Escape
              <br />
              Awaits
            </h2>
          </div>

          <ul className="space-y-[1.02rem] lg:w-[20.25rem] lg:pt-[1.95rem]">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal="up" style={delay(150 + i * 110)} className="flex items-start gap-[1.2rem]">
                <Icon className="mt-[0.1rem] size-[1.55rem] shrink-0 text-[#2d2e2c]" strokeWidth={1.1} aria-hidden="true" />
                <div>
                  <p className="text-[0.79rem] leading-[1rem] text-[#2b2c2a]">{title}</p>
                  <p className="mt-[0.15rem] text-[0.75rem] leading-[1.05rem] text-[#5a5c58]">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div
            data-reveal="up"
            style={delay(500)}
            className="border-[#d9cfbf] lg:mb-[1.75rem] lg:ml-[0.1rem] lg:mt-[1.8rem] lg:border-l lg:pl-[1.8rem]"
          >
            <p className="eyebrow pt-[0.55rem] text-[0.7rem] tracking-[0.14em] text-[#746754]">Rates From</p>
            <p className="mt-[0.7rem] font-serif text-[2.05rem] leading-none tracking-[0.01em] text-[#73675a]">
              USD {airbnbListings.acland.nightlyUSD}
            </p>
            <p className="mt-[0.45rem] text-[0.75rem] text-[#4a4a48]">
              per night · Avalon USD {airbnbListings.avalon.nightlyUSD}
            </p>
            <p className="mt-[0.2rem] text-[0.75rem] text-[#5a5c58]">
              {discountNote.split(" · ").map((part) => (
                <span key={part} className="block">
                  {part}
                </span>
              ))}
            </p>
            <Link
              href={bookHref}
              className="sheen mt-[1.4rem] flex h-[2.25rem] w-full items-center justify-center bg-gold text-[0.78rem] text-[#f7f1e4] transition-colors hover:bg-gold-hover lg:w-[10.7rem]"
            >
              Book Your Stay
            </Link>
            <p className="mt-[0.9rem] text-[0.75rem] text-[#5a5c58]">Booked securely on Airbnb.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
