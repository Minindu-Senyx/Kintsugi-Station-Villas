import type { Metadata } from "next";
import Image from "next/image";
import { CarFront, Languages, Mail, MapPin } from "lucide-react";
import { PiInstagramLogoLight, PiWhatsappLogoLight } from "react-icons/pi";
import ContactForm from "@/components/contact/ContactForm";
import EstateMap from "@/components/contact/EstateMap";
import BookOnAirbnb from "@/components/villas/BookOnAirbnb";
import { delay } from "@/lib/motion";
import { contact, distances, nearbyRecommendations, social } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Kintsugi Station on Airbnb, or message us on WhatsApp with any questions. Avalon Villa and Villa Acland, Kandy, Sri Lanka.",
};

const iconClass = "size-[2rem] text-[#785a35]";
const linkClass = "block text-[1.05rem] text-[#1d1f1d] transition-colors hover:text-[#785a35]";

function Eyebrow({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p style={style} className={`eyebrow text-[0.7rem] tracking-[0.3em] text-[#7e6545] ${className}`}>
      {children}
    </p>
  );
}

function DetailRow({ icon, title, index, children }: { icon: React.ReactNode; title: string; index: number; children: React.ReactNode }) {
  return (
    <li data-reveal="up" style={delay(250 + index * 100)} className="flex gap-[1.75rem]">
      <span className="shrink-0 pl-[0.2rem]">{icon}</span>
      <div>
        <p className="text-[0.98rem] leading-[1.1rem] text-[#1d1f1d]">{title}</p>
        {children}
      </div>
    </li>
  );
}

function DistanceList({ rows }: { rows: { place: string; distance: string; time: string }[] }) {
  return (
    <dl className="mt-[0.35rem] space-y-[0.2rem] text-[0.82rem] leading-[1.2rem] text-[#1d1f1d]">
      {rows.map((r) => (
        <div key={r.place} className="flex justify-between gap-4">
          <dt>{r.place}</dt>
          <dd className="shrink-0 text-[#5a5c58]">
            {r.distance} · {r.time}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-sand">
      {/* Hero */}
      <section className="relative overflow-hidden lg:h-[18.19rem]">
        <Image
          src="/assets/images/villas/avalon/avalon-hero.jpg"
          alt="Morning light filtering through forest trees into the stone courtyard at Avalon Villa"
          fill
          preload
          sizes="100vw"
          className="enter-settle object-cover object-[50%_35%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,236,224,0.92)_0%,rgba(244,236,224,0.78)_45%,rgba(244,236,224,0.1)_78%)]"
        />
        <div className="frame relative px-5 py-16 lg:px-[3.875rem] lg:py-0 lg:pt-[4.6rem]">
          <Eyebrow className="enter-rise" style={delay(100)}>
            A Place to Belong
          </Eyebrow>
          <h1
            style={delay(250)}
            className="enter-rise mt-[0.75rem] font-serif text-[2.8rem] leading-none tracking-[-0.01em] text-ink lg:text-[3.9rem]"
          >
            Connect With Us
          </h1>
          <p
            style={delay(450)}
            className="enter-rise mt-[0.7rem] max-w-[24rem] text-[1.03rem] leading-[1.55rem] text-[#161816]"
          >
            Book on Airbnb, or message us with any question before you do.
          </p>
        </div>
      </section>

      {/* Details + booking */}
      <section className="frame flex flex-col gap-12 px-5 pb-6 pt-10 lg:flex-row lg:gap-0 lg:px-0 lg:pb-[1.5rem] lg:pl-[3.875rem] lg:pr-[2.43rem] lg:pt-[1.62rem]">
        <div className="lg:w-[28.1rem] lg:pt-[1rem]">
          <div data-reveal="up">
            <Eyebrow>Contact &amp; Arrival</Eyebrow>
          </div>
          <h2 data-reveal="up" style={delay(100)} className="mt-[0.75rem] font-serif text-[2.2rem] leading-none text-ink">
            We&rsquo;re Here for You
          </h2>
          <p
            data-reveal="up"
            style={delay(200)}
            className="mt-[0.8rem] max-w-[24.6rem] text-[0.92rem] leading-[1.31rem] text-[#151716]"
          >
            Questions about the villas, pets, events or a special request? Message us on WhatsApp. We&rsquo;re often
            flexible, and we look forward to welcoming you.
          </p>

          <ul className="mt-[1.6rem] space-y-[1.3rem]">
            <DetailRow icon={<PiWhatsappLogoLight className={iconClass} />} title="WhatsApp & Phone" index={0}>
              <ul className="mt-[0.3rem] space-y-[0.15rem]">
                {contact.people.map((p) => (
                  <li key={p.name} className="text-[1.05rem] text-[#1d1f1d]">
                    <a href={p.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#785a35]">
                      {p.phone}
                    </a>{" "}
                    <span className="text-[0.82rem] text-[#5a5c58]">
                      {p.name}, {p.role}
                    </span>
                  </li>
                ))}
              </ul>
            </DetailRow>

            <DetailRow icon={<Mail className={iconClass} strokeWidth={1.1} />} title="Email" index={1}>
              <div className="mt-[0.3rem]">
                {contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                ))}
              </div>
            </DetailRow>

            <DetailRow icon={<PiInstagramLogoLight className={iconClass} />} title="Instagram" index={2}>
              <div className="mt-[0.3rem]">
                {social.instagram.map((ig) => (
                  <a key={ig.handle} href={ig.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    @{ig.handle}
                  </a>
                ))}
              </div>
            </DetailRow>

            <DetailRow icon={<Languages className={iconClass} strokeWidth={1.1} />} title="Languages" index={3}>
              <p className="mt-[0.3rem] text-[1.05rem] text-[#1d1f1d]">{contact.languages.join(", ")}</p>
            </DetailRow>

            <DetailRow icon={<MapPin className={iconClass} strokeWidth={1.1} />} title="Address" index={4}>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className={`mt-[0.3rem] ${linkClass}`}>
                Kandy, Sri Lanka · Open in Google Maps
              </a>
            </DetailRow>

            <DetailRow icon={<CarFront className={iconClass} strokeWidth={1.1} />} title="Arrival & Transfers" index={5}>
              <p className="mt-[0.35rem] text-[0.85rem] leading-[1.29rem] text-[#1d1f1d]">
                A short walk or tuk-tuk ride from the centre of Kandy. Transfers from the airport and railway station,
                and tours with English-speaking, licensed tourist drivers, are arranged on request.
              </p>
              <p className="mt-[0.9rem] text-[0.74rem] tracking-[0.12em] text-[#6f675d] uppercase">In and around Kandy</p>
              <DistanceList rows={distances.kandy} />
              <p className="mt-[0.9rem] text-[0.74rem] tracking-[0.12em] text-[#6f675d] uppercase">Further afield</p>
              <DistanceList rows={distances.further} />
              <p className="mt-[0.5rem] text-[0.7rem] leading-[1rem] text-[#6b665e]">
                By road from the villa. Allow extra time for traffic and hill roads.
              </p>
              <p className="mt-[0.9rem] text-[0.74rem] tracking-[0.12em] text-[#6f675d] uppercase">We recommend nearby</p>
              <p className="mt-[0.35rem] text-[0.82rem] leading-[1.2rem] text-[#1d1f1d]">{nearbyRecommendations.join(" · ")}</p>
            </DetailRow>
          </ul>

          <div data-reveal="up" className="mt-[1.35rem]">
            <EstateMap />
          </div>
        </div>

        <div className="flex h-fit flex-col gap-6 lg:ml-auto lg:w-[27.875rem]">
          <div
            id="book"
            data-reveal="up"
            style={delay(200)}
            className="scroll-mt-6 rounded-[8px] border border-[#ebe5dc] bg-card px-5 pb-[1.25rem] pt-[1.55rem] shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:px-[1.56rem]"
          >
            <p className="eyebrow text-[0.7rem] font-medium tracking-[0.3em] text-[#1d1f1d]">Reservations</p>
            <h2 className="mt-[0.6rem] font-serif text-[2.23rem] leading-none text-ink">Book on Airbnb</h2>
            <p className="mt-[0.55rem] mb-[1.2rem] text-[0.88rem] text-[#1d1f1d]">
              Choose a villa to see live availability and our guest reviews on Airbnb.
            </p>
            <BookOnAirbnb stack />
          </div>

          <div
            id="message"
            data-reveal="up"
            style={delay(300)}
            className="scroll-mt-6 rounded-[8px] border border-[#ebe5dc] bg-card px-5 pb-[1.5rem] pt-[1.55rem] shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:px-[1.56rem]"
          >
            <p className="eyebrow text-[0.7rem] font-medium tracking-[0.3em] text-[#1d1f1d]">Questions</p>
            <h2 className="mt-[0.6rem] font-serif text-[2.23rem] leading-none text-ink">Send Us a Message</h2>
            <p className="mt-[0.55rem] mb-[1.2rem] text-[0.88rem] text-[#1d1f1d]">
              Pets, events, special requests or anything else. It goes straight to the team by email.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
