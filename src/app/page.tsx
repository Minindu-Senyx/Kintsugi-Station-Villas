import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, ChefHat, ConciergeBell, Leaf } from "lucide-react";
import BookingBar from "@/components/home/BookingBar";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { KintsugiVeins } from "@/components/brand/KintsugiVeins";
import { delay } from "@/lib/motion";
import { bookHref } from "@/lib/site";
import { featuredTestimonials } from "@/lib/testimonials";

const estateImages = [
  { src: "/assets/images/stone_bath.jpg", caption: "A Private Stone Bath", alt: "Carved stone soaking tub in a tropical garden" },
  { src: "/assets/images/open_air_pavilion.jpg", caption: "Open-Air Pavilion", alt: "Open-air timber pavilion overlooking misty hills" },
];

const glimpses = [
  { src: "/assets/images/pool_mist.jpg", caption: "Misty Mountain Pool", alt: "Infinity pool facing mist-covered mountains" },
  { src: "/assets/images/teak_bedroom.jpg", caption: "Ceylon Teak Master Bedroom", alt: "Teak-panelled master bedroom" },
  { src: "/assets/images/tea_terrace.jpg", caption: "Private Tea Terrace", alt: "Tea set on a terrace above the valley" },
  { src: "/assets/images/artisanal_breakfast.jpg", caption: "Artisanal Breakfast", alt: "Sri Lankan breakfast spread on a wooden table" },
];

const features = [
  { icon: BedDouble, title: "Entire villa for your exclusive use", text: "One group. Complete privacy." },
  { icon: ChefHat, title: "Private chef", text: "Seasonal Sri Lankan and international cuisine." },
  { icon: Leaf, title: "Daily tea ritual", text: "A taste of Ceylon, each morning." },
  { icon: ConciergeBell, title: "Mountain concierge", text: "Curated experiences in Kandy and beyond." },
];

function Eyebrow({ children, tone }: { children: React.ReactNode; tone: "taupe" | "gold" }) {
  return (
    <p
      data-reveal="up"
      className={`eyebrow flex items-center gap-[0.6rem] text-[0.66rem] tracking-[0.14em] ${
        tone === "gold" ? "text-[#b0915e]" : "text-[#8e8578]"
      }`}
    >
      {children}
      <span data-reveal="line" style={delay(350)} aria-hidden="true" className="h-px w-[2.5rem] bg-[#c3a876]" />
    </p>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-auto min-h-[36rem] overflow-hidden lg:h-[27.3125rem] lg:min-h-0">
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
            className="enter-rise mt-[1.05rem] max-w-[19.2rem] text-[0.91rem] leading-[1.25rem] text-white/95"
          >
            An exclusive private estate in the mist-veiled hills of Kandy, Sri Lanka.
          </p>
          <span
            aria-hidden="true"
            style={delay(700)}
            className="enter-line mt-[1.85rem] block h-px w-[3.2rem] bg-[#b89a5f]"
          />
          <div
            style={delay(850)}
            className="enter-rise mt-auto pt-10 lg:absolute lg:left-1/2 lg:top-[21.7rem] lg:mt-0 lg:w-[43.5rem] lg:-translate-x-1/2 lg:pt-0"
          >
            <BookingBar />
          </div>
        </div>
      </section>

      {/* The Estate */}
      <section className="bg-ivory">
        <div className="frame px-5 lg:px-[3.625rem]">
          <div className="flex flex-col gap-10 py-12 lg:flex-row lg:gap-0 lg:pb-[1.3rem] lg:pt-[1.8rem]">
            <div className="lg:w-[22rem] lg:pt-[0.6rem]">
              <Eyebrow tone="taupe">The Estate</Eyebrow>
              <h2 data-reveal="up" style={delay(120)} className="mt-[1.3rem] font-serif text-[2.7rem] leading-[2.75rem] text-ink">
                One Villa.
                <br />
                Complete Solitude.
              </h2>
              <p
                data-reveal="up"
                style={delay(240)}
                className="mt-[0.85rem] text-[0.875rem] leading-[1.26rem] tracking-[0.004em] text-ink-soft"
              >
                Kintsugi Station is an exclusive private villa, reserved entirely for one group or couple at a time. A
                sanctuary for those who seek quieter days, deeper connection and the restorative beauty of nature.
                Here, time slows, and life feels whole again.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:ml-auto lg:w-[31.5rem] lg:gap-[0.75rem]">
              {estateImages.map((img, i) => (
                <figure key={img.src} className="group">
                  <div data-reveal="image" style={delay(i * 180)} className="relative aspect-[246/259] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 900px) 25vw, 50vw"
                      className="object-cover group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption
                    data-reveal="fade"
                    style={delay(i * 180 + 500)}
                    className="mt-[0.7rem] text-[0.6rem] font-medium tracking-[0.08em] text-[#2b2c2a] uppercase"
                  >
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e6e0d7] pb-12 pt-[1.6rem] lg:pb-[1.85rem] lg:pt-[1.2rem]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow tone="taupe">Glimpses of Kintsugi</Eyebrow>
              <Link
                href="/gallery"
                className="group flex items-center gap-[0.35rem] text-[0.7rem] text-[#2b2c2a] transition-colors hover:text-gold"
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
                    className="mt-[0.7rem] text-[0.6rem] font-medium tracking-[0.08em] text-[#2b2c2a] uppercase"
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
        <div className="frame relative flex flex-col gap-10 px-5 py-12 lg:h-[14.8rem] lg:flex-row lg:gap-0 lg:px-[3.625rem] lg:py-0">
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
                  <p className="mt-[0.15rem] text-[0.66rem] leading-[0.9rem] text-[#646260]">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div
            data-reveal="up"
            style={delay(500)}
            className="border-[#d9cfbf] lg:mb-[1.75rem] lg:ml-[0.1rem] lg:mt-[1.8rem] lg:border-l lg:pl-[1.8rem]"
          >
            <p className="eyebrow pt-[0.55rem] text-[0.62rem] tracking-[0.14em] text-[#a89a86]">Rates From</p>
            <p className="mt-[0.7rem] font-serif text-[2.05rem] leading-none tracking-[0.01em] text-[#8a7d6b]">USD 650</p>
            <p className="mt-[0.45rem] text-[0.7rem] text-[#4a4a48]">per night (entire villa)</p>
            <Link
              href={bookHref}
              className="sheen mt-[1.4rem] flex h-[2.25rem] w-full items-center justify-center bg-gold text-[0.78rem] text-[#f7f1e4] transition-colors hover:bg-[#8f6d31] lg:w-[10.7rem]"
            >
              Book Your Stay
            </Link>
            <p className="mt-[0.9rem] text-[0.68rem] text-[#6a6864]">A rare place. A more mindful you.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
