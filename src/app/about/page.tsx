import type { Metadata } from "next";
import Image from "next/image";
import { founders } from "@/lib/founders";
import { delay } from "@/lib/motion";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Kintsugi Station Villas in Kandy, Sri Lanka, the owners, and the team who look after your stay.",
};

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-[#6f675d]";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-pine-ink sm:text-[2.5rem]";
const section = "frame px-5 py-14 lg:px-[4.25rem] lg:py-[3.8rem]";
const body = "text-[0.95rem] leading-[1.55rem] text-[#3f4442]";

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-paper">
      {/* Title and story */}
      <section className="frame px-5 pb-14 pt-14 lg:px-[4.25rem] lg:pb-[3.8rem] lg:pt-[4rem]">
        <p style={delay(100)} className={`enter-rise ${eyebrow}`}>
          About
        </p>
        <h1 style={delay(220)} className="enter-rise mt-4 font-serif text-[2.8rem] leading-none text-pine-ink lg:text-[3.6rem]">
          Kintsugi Station
        </h1>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="max-w-[28rem] space-y-4">
            <p data-reveal="up" style={delay(100)} className={body}>
              Kintsugi Station is named for the Japanese art of kintsugi: mending what is broken with gold, and finding
              beauty in the repair.
            </p>
            <p data-reveal="up" style={delay(180)} className={body}>
              Our two villas stand on a quiet hillside in Kandy, a short walk from the city. They are places to slow
              down, with breakfast on the veranda and the forest all around.
            </p>
          </div>
          <div data-reveal="image" style={delay(150)} className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/assets/images/villas/acland/acland-garden-terrace.jpg"
              alt="A terrace at Villa Acland under the canopy of an old tree"
              fill
              sizes="(min-width: 900px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* The founders */}
      <section className="border-t border-[#e6e2d8]">
        <div className={section}>
          <div className="grid items-start gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16">
            <div data-reveal="image" className="relative aspect-[3/4] w-full max-w-[17rem] overflow-hidden">
              <Image
                src={founders.photo.src}
                alt={founders.photo.alt}
                fill
                sizes="17rem"
                className="object-cover object-top"
              />
            </div>
            <div className="max-w-[32rem]">
              <p data-reveal="up" className={eyebrow}>
                The founders
              </p>
              <h2 data-reveal="up" style={delay(100)} className={`mt-4 ${h2}`}>
                {founders.names}
              </h2>
              <div className="mt-6 space-y-4">
                {founders.bio.map((paragraph, i) => (
                  <p key={paragraph} data-reveal="up" style={delay(180 + i * 80)} className={body}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The team */}
      <section className="border-t border-[#e6e2d8]">
        <div className={section}>
          <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-16">
            <div data-reveal="up">
              <p className={eyebrow}>The team</p>
              <h2 className={`mt-4 ${h2}`}>Your hosts in Kandy</h2>
            </div>
            <ul className="max-w-[36rem] border-b border-[#e6e2d8]">
              {team.map((member, i) => (
                <li key={member.name} data-reveal="up" style={delay(i * 100)} className="border-t border-[#e6e2d8] py-5">
                  <p className="font-serif text-[1.35rem] leading-none text-pine-ink">
                    {member.name}
                    <span className="ml-3 font-sans text-[0.8rem] text-[#5a5c58]">{member.role}</span>
                  </p>
                  {member.quote ? (
                    <blockquote className="mt-3 font-serif text-[1.1rem] italic leading-[1.5rem] text-pine-ink">
                      &ldquo;{member.quote}&rdquo;
                    </blockquote>
                  ) : (
                    <p className={`mt-3 ${body}`}>{member.about}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
