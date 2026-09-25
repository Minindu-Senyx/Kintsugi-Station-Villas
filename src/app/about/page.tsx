import type { Metadata } from "next";
import Image from "next/image";
import { KintsugiVeins } from "@/components/brand/KintsugiVeins";
import { QuoteMark } from "@/components/brand/QuoteMark";
import { founders } from "@/lib/founders";
import { delay } from "@/lib/motion";
import { team, teamPhoto } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "The philosophy of restoration — where Japanese wabi-sabi meets the timeless mist of the Kandy hills at Kintsugi Station.",
};

const materials = [
  {
    src: "/assets/images/reclaimed_teak.jpg",
    alt: "Close-up of weathered reclaimed teak and a carved wooden bowl",
    title: "Reclaimed Ceylon Teak",
    text: "Heritage timber, given new life. Each beam carries a story, shaped by time, weather and craftsmanship.",
  },
  {
    src: "/assets/images/chiseled_stone.jpg",
    alt: "Hand-laid river stone wall softened by ferns",
    title: "Hand-Chiseled River Stone",
    text: "Locally sourced stone, shaped by hand, grounding the villa in the landscape it belongs to.",
  },
  {
    src: "/assets/images/mist_mountain_ridge.jpg",
    alt: "Rainforest ridges rising out of a sea of mist",
    title: "Living with the Mist",
    text: "Open to the elements, designed to breathe with the hills, where changing light and mist are part of the home.",
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p data-reveal="up" className="eyebrow text-[0.6rem] font-medium tracking-[0.3em] text-taupe">
      {children}
    </p>
  );
}

function Signoff({ children }: { children: React.ReactNode }) {
  return (
    <p
      data-reveal="fade"
      className="eyebrow flex items-center gap-[0.75rem] text-[0.53rem] font-medium tracking-[0.38em] text-[#b5a06a]"
    >
      <span data-reveal="line" style={delay(300)} aria-hidden="true" className="h-px w-[2rem] bg-[#c7b27a]" />
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden lg:h-[12.8rem]">
        <div className="absolute inset-y-0 right-0 w-full lg:left-[max(20.5rem,calc(50vw-11.5rem))] lg:w-auto">
          <Image
            src="/assets/images/about_hero_panorama.jpg"
            alt="Misty forested hills and a still lake near Kandy"
            fill
            preload
            sizes="(min-width: 900px) 70vw, 100vw"
            className="enter-settle object-cover object-[50%_58%] [mask-image:linear-gradient(90deg,transparent_0%,#000_28%)]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-paper/60 lg:hidden" />
        <div className="frame relative px-5 py-14 lg:px-[4.25rem] lg:py-0 lg:pt-[1.72rem]">
          <h1
            style={delay(150)}
            className="enter-rise font-serif text-[2.4rem] leading-[1.05] text-pine-ink lg:text-[2.78rem] lg:leading-[2.85rem]"
          >
            The Philosophy
            <br />
            of Restoration
          </h1>
          <p
            style={delay(400)}
            className="enter-rise mt-[0.9rem] max-w-[17rem] text-[0.82rem] leading-[1.16rem] text-[#474d4a]"
          >
            Where Japanese wabi-sabi philosophy meets the timeless mist of the Kandy hills.
          </p>
          <span
            aria-hidden="true"
            style={delay(650)}
            className="enter-line mt-[1.05rem] block h-px w-[15.6rem] bg-[linear-gradient(90deg,#d8c9a3,#e6dcc2_70%,transparent)]"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="relative mt-[1.05rem]">
        <div
          data-reveal="image"
          style={delay(200)}
          className="relative h-72 overflow-hidden lg:absolute lg:inset-y-0 lg:left-[max(29.25rem,calc(50vw-2.75rem))] lg:right-0 lg:h-auto"
        >
          <Image
            src="/assets/images/villa_forest_exterior.jpg"
            alt="Timber villa with a stone plinth set in misty rainforest"
            fill
            sizes="(min-width: 900px) 55vw, 100vw"
            className="object-cover object-[45%_50%]"
          />
        </div>
        <div className="frame px-5 py-10 lg:h-[25.45rem] lg:px-[4.25rem] lg:py-0 lg:pt-[1.3rem]">
          <div className="lg:w-[22.7rem]">
            <Label>Our Story</Label>
            <h2 data-reveal="up" style={delay(100)} className="mt-[0.55rem] font-serif text-[1.9rem] leading-[1.95rem] text-pine-ink">
              More Than a Villa,
              <br />
              A Meeting of Worlds
            </h2>
            <div className="mt-[0.95rem] space-y-[0.85rem] text-[0.79rem] leading-[1.16rem] text-[#494d4b]">
              <p data-reveal="up" style={delay(200)}>
                Kintsugi Station is named for the Japanese art of kintsugi — the practice of mending what is broken
                with gold, finding deeper beauty in the scars. It is a philosophy that reminds us that life&rsquo;s
                imperfections are not flaws, but part of a richer story.
              </p>
              <p data-reveal="up" style={delay(300)}>
                Set in the misty hills of Kandy, our villa is a sanctuary dedicated to slowing down, mending the
                spirit, and finding beauty in simplicity. Here, Japanese wabi-sabi meets Sri Lanka&rsquo;s colonial
                hill-country railway heritage — a place where time moves differently, and the everyday feels
                extraordinary.
              </p>
              <p data-reveal="up" style={delay(400)}>
                Once a station along a journey, Kintsugi Station is now a destination — a private home for those who
                seek stillness, connection and renewal, surrounded by lush mountain valleys and the gentle rhythm of
                nature.
              </p>
            </div>
            <div className="mt-[1rem]">
              <Signoff>Beauty Lives On</Signoff>
            </div>
          </div>
        </div>
      </section>

      {/* The Founders */}
      <section className="relative overflow-hidden">
        <KintsugiVeins
          variant="founders"
          className="pointer-events-none absolute right-[calc(max(0rem,50vw-32rem)-30rem)] top-0 hidden h-[23.375rem] w-[48rem] max-w-none lg:block"
        />
        <div className="frame relative flex flex-col gap-8 px-5 pb-8 pt-4 lg:flex-row lg:items-center lg:pb-0 lg:gap-[2.7rem] lg:px-[4.25rem] lg:pt-[2.4rem]">
          <div data-reveal="image" className="relative h-[26rem] shrink-0 overflow-hidden lg:h-[21rem] lg:w-[15.75rem]">
            <Image
              src={founders.photo.src}
              alt={founders.photo.alt}
              fill
              sizes="(min-width: 900px) 25vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="lg:w-[24rem]">
            <Label>The Founders</Label>
            <h2 data-reveal="up" style={delay(100)} className="mt-[0.55rem] font-serif text-[1.9rem] leading-[1.95rem] text-pine-ink">
              At Home in Sri Lanka
              <br />
              Since 2011
            </h2>
            <div className="mt-[0.95rem] space-y-[0.85rem] text-[0.79rem] leading-[1.16rem] text-[#494d4b]">
              {founders.bio.map((paragraph, i) => (
                <p key={paragraph} data-reveal="up" style={delay(200 + i * 100)}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-[1rem]">
              <Signoff>{founders.names || "A New Lease of Life"}</Signoff>
            </div>
          </div>
        </div>
      </section>

      {/* Craft & Materials */}
      <section className="frame px-5 pt-4 lg:px-[4.25rem] lg:pt-[2.4rem]">
        <Label>Craft &amp; Materials</Label>
        <h2 data-reveal="up" style={delay(100)} className="mt-[0.7rem] font-serif text-[1.935rem] leading-[2rem] text-pine-ink">
          Rooted in Place, Crafted for a Kinder Tomorrow.
        </h2>
        <div className="mt-[0.7rem] grid gap-8 border-b border-[#ece9e1] pb-6 sm:grid-cols-3 sm:gap-[1.27rem] lg:pb-[0.9rem]">
          {materials.map((item, i) => (
            <article key={item.title} className="group">
              <div data-reveal="image" style={delay(i * 160)} className="relative h-44 overflow-hidden lg:h-[8rem]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 28vw, 100vw"
                  className="object-cover group-hover:scale-[1.05]"
                />
              </div>
              <div data-reveal="up" style={delay(i * 160 + 300)} className="px-[0.2rem]">
                <h3 className="mt-[0.6rem] font-serif text-[1.16rem] leading-[1.3rem] text-[#1c2e2a]">{item.title}</h3>
                <p className="mt-[0.2rem] text-[0.82rem] leading-[1.13rem] text-[#747573]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The Host Experience */}
      <section className="frame flex flex-col gap-8 px-5 pb-4 pt-8 lg:flex-row lg:items-start lg:gap-[2.7rem] lg:px-[4.25rem] lg:pb-[0.9rem] lg:pt-[1.05rem]">
        <div data-reveal="image" className="relative h-56 shrink-0 overflow-hidden lg:h-[12.625rem] lg:w-[27.75rem]">
          <Image
            src="/assets/images/host_dining_ritual.jpg"
            alt="Private chef's Sri Lankan dishes served with a cast-iron teapot"
            fill
            sizes="(min-width: 900px) 44vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:pt-[0.2rem]">
          <Label>The Host Experience</Label>
          <h2 data-reveal="up" style={delay(100)} className="mt-[0.75rem] font-serif text-[1.9rem] leading-[1.95rem] text-pine-ink">
            Thoughtful Living,
            <br />
            Exclusively Yours
          </h2>
          <p data-reveal="up" style={delay(200)} className="mt-[1rem] max-w-[24rem] text-[0.8rem] leading-[1.16rem] text-[#3f4442]">
            Enjoy private, resident chef dining inspired by Sri Lankan flavors, bespoke morning Ceylon tea rituals, and
            absolute privacy with only one party at a time. Every detail is curated for a slower, more meaningful stay.
          </p>
          <div className="mt-[1.2rem]">
            <Signoff>A More Human Way to Travel</Signoff>
          </div>
        </div>
      </section>

      {/* The People Behind Your Stay */}
      <section className="frame px-5 pb-14 pt-8 lg:px-[4.25rem] lg:pb-[2.4rem] lg:pt-[1.6rem]">
        <div className="flex flex-col gap-8 border-t border-[#ece9e1] pt-8 lg:flex-row lg:items-center lg:gap-[2.7rem] lg:pt-[1.6rem]">
          <div
            data-reveal="image"
            className="relative h-[28rem] shrink-0 overflow-hidden lg:order-last lg:h-[21rem] lg:w-[15.75rem]"
          >
            <Image
              src={teamPhoto.src}
              alt={teamPhoto.alt}
              fill
              sizes="(min-width: 900px) 25vw, 100vw"
              className="object-cover object-[50%_80%]"
            />
          </div>
          <div className="flex-1">
            <Label>The People Behind Your Stay</Label>
            <h2 data-reveal="up" style={delay(100)} className="mt-[0.75rem] font-serif text-[1.9rem] leading-[1.95rem] text-pine-ink">
              Meet the Kandy Team
            </h2>
            <ul className="mt-[0.9rem] divide-y divide-[#ece9e1]">
              {team.map((member, i) => (
                <li key={member.name} data-reveal="up" style={delay(200 + i * 150)} className="py-[0.9rem]">
                  {member.quote ? (
                    <blockquote>
                      <QuoteMark className="h-[1.2rem] text-[2.6rem]" />
                      <p className="mt-[0.3rem] font-serif text-[1.05rem] italic leading-[1.4rem] text-[#1c2e2a]">
                        {member.quote}
                      </p>
                    </blockquote>
                  ) : (
                    <p className="text-[0.8rem] leading-[1.16rem] text-[#3f4442]">{member.about}</p>
                  )}
                  <p className="eyebrow mt-[0.65rem] text-[0.55rem] font-medium tracking-[0.3em] text-taupe">
                    {member.name}
                    <span className="text-[#a9a59c]"> · {member.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
