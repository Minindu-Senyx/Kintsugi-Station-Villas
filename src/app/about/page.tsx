import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { team } from "@/lib/team";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";

export const metadata: Metadata = {
  title: "About | Kintsugi Station Villas",
  description:
    "The story behind Kintsugi Station Villas — restored colonial-era homes in Kandy and Trincomalee, hosted by teams who live on the property.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="relative h-[55vh] min-h-[400px] w-full">
        <Image
          src={images.aboutCard}
          alt="A restored Kintsugi Station villa"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 sm:px-10 flex flex-col justify-end pb-14">
          <p className="eyebrow text-gold mb-4">About us</p>
          <SplitHeading
            as="h1"
            immediate
            text="Restored homes, hosted properly"
            className="font-display text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl"
          />
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-6 sm:px-10 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow text-teal mb-4">Our story</p>
          <SplitHeading
            as="h2"
            text="Two houses, one way of doing things"
            className="font-display text-3xl sm:text-4xl leading-tight mb-8"
          />
          <div className="space-y-6 text-charcoal/75 text-lg leading-relaxed">
            <p>
              Kintsugi Station Villas began with a simple idea: that the
              best way to see Sri Lanka is from inside a real home, not a
              hotel room. We take colonial-era houses — the kind with teak
              floors, deep verandahs, and gardens that have been growing for
              a century — and restore them carefully, keeping what makes
              them special while adding the comfort a modern stay needs.
            </p>
            <p>
              We now look after two properties: Avalon Villa Gallery in the
              hills above Kandy, and a cluster of villas on Dutch Bay in
              Trincomalee. They couldn&rsquo;t be more different in
              setting — misted tea country against open ocean — but they
              share the same approach. Every villa has its own on-site
              team, so guests are genuinely hosted rather than simply
              handed a set of keys.
            </p>
            <p>
              That&rsquo;s the philosophy the name comes from: kintsugi, the
              Japanese art of repairing broken pottery with gold, treating
              the repair as part of the object&rsquo;s story rather than
              something to hide. Our villas are old houses, carefully put
              back together — and we think that history is part of what
              makes them worth staying in.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="bg-[#F3EEE4] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.trincoCard}
                alt="Villa on Dutch Bay, Trincomalee"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="eyebrow text-teal mb-4">How we host</p>
            <SplitHeading
              as="h2"
              text="A team on the ground, not a call centre"
              className="font-display text-3xl sm:text-4xl leading-tight mb-6"
            />
            <p className="text-charcoal/75 leading-relaxed mb-6">
              Every Kintsugi Station villa is staffed by people who live
              locally and know the area well — not a remote booking desk.
              They handle the practical side of a stay (housekeeping, meals,
              maintenance) and the personal side too: recommending a
              restaurant, arranging a driver, or simply being on hand if
              something comes up.
            </p>
            <Link
              href="/contact"
              className="link-underline inline-block text-sm font-medium hover:text-gold-dark transition-colors"
            >
              Get in touch with our team
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28">
        <Reveal className="max-w-xl mb-14">
          <p className="eyebrow text-teal mb-4">Meet the teams</p>
          <SplitHeading
            as="h2"
            text="Kandy & Trincomalee, in good hands"
            className="font-display text-3xl sm:text-4xl leading-tight"
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <Reveal key={member.name} delayMs={i * 90}>
              <div className="relative aspect-square overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-lg">{member.name}</h3>
              <p className="text-xs eyebrow text-gold-dark mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
