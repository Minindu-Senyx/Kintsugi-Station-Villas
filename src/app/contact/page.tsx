import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import BookOnAirbnb from "@/components/villas/BookOnAirbnb";
import { delay } from "@/lib/motion";
import { contact, distances, nearbyRecommendations, social } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Kintsugi Station on Airbnb, or message us on WhatsApp or by email with any questions. Avalon Villa and Villa Acland, Kandy, Sri Lanka.",
};

const eyebrow = "eyebrow text-[0.72rem] tracking-[0.2em] text-gold";
const h2 = "font-serif text-[2.2rem] leading-[1.1] text-ink";
const section = "frame px-5 py-14 lg:px-[3.875rem] lg:py-[3.6rem]";
const rule = "border-t border-line";
const linkClass = "inline-block py-0.5 text-ink link-underline hover:text-gold";

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={`${rule} py-4 first:border-t-0 first:pt-0`}>
      <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-2 space-y-1 text-[1rem] leading-[1.45rem] text-ink">{children}</dd>
    </div>
  );
}

function Distances({ title, rows }: { title: string; rows: { place: string; distance: string; time: string }[] }) {
  return (
    <div>
      <h3 className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">{title}</h3>
      <dl className="mt-3">
        {rows.map((r) => (
          <div key={r.place} className={`${rule} flex justify-between gap-4 py-[0.55rem] text-[0.88rem]`}>
            <dt className="text-ink">{r.place}</dt>
            <dd className="shrink-0 text-muted">
              {r.distance} · {r.time}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-ivory">
      {/* Title */}
      <section className="frame px-5 pb-6 pt-14 lg:px-[3.875rem] lg:pb-[2rem] lg:pt-[4rem]">
        <p style={delay(100)} className={`enter-rise ${eyebrow}`}>
          Contact
        </p>
        <h1 style={delay(220)} className="enter-rise mt-4 font-serif text-[2.8rem] leading-none text-ink lg:text-[3.6rem]">
          Get in touch
        </h1>
        <p style={delay(340)} className="enter-rise mt-4 max-w-[28rem] text-[1rem] leading-[1.5rem] text-ink-soft">
          Book on Airbnb, or message us with any question before you do.
        </p>
      </section>

      {/* Book */}
      <section id="book" className={`${section} scroll-mt-6`}>
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
          </div>
        </div>
      </section>

      {/* Contact details and the message form */}
      <section id="message" className={`${section} ${rule} scroll-mt-6`}>
        <div className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <div data-reveal="up">
            <p className={eyebrow}>Talk to us</p>
            <h2 className={`mt-4 ${h2}`}>Contact</h2>
            <dl className="mt-8">
              <Group label="WhatsApp & phone">
                {contact.people.map((p) => (
                  <p key={p.name}>
                    <a href={p.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {p.phone}
                    </a>{" "}
                    <span className="text-[0.82rem] text-muted">
                      {p.name}, {p.role}
                    </span>
                  </p>
                ))}
              </Group>
              <Group label="Email">
                {contact.emails.map((email) => (
                  <p key={email}>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </p>
                ))}
              </Group>
              <Group label="Instagram">
                {social.instagram.map((ig) => (
                  <p key={ig.handle}>
                    <a href={ig.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      @{ig.handle}
                    </a>
                  </p>
                ))}
              </Group>
              <Group label="We speak">
                <p>{contact.languages.join(", ")}</p>
              </Group>
            </dl>
          </div>

          <div data-reveal="up" style={delay(120)} className="lg:max-w-[36rem]">
            <p className={eyebrow}>Questions</p>
            <h2 className={`mt-4 ${h2}`}>Send a message</h2>
            <p className="mb-7 mt-3 max-w-[28rem] text-[0.9rem] leading-[1.4rem] text-ink-soft">
              Pets, events, special requests or anything else. It goes straight to the team by email.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Finding us */}
      <section className={`${section} ${rule}`}>
        <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <div data-reveal="up">
            <p className={eyebrow}>Getting here</p>
            <h2 className={`mt-4 ${h2}`}>Finding us</h2>
            <p className="mt-3 max-w-[16rem] text-[0.9rem] leading-[1.4rem] text-ink-soft">
              A short walk or tuk-tuk ride from the centre of Kandy. We arrange airport and station transfers on request.
            </p>
          </div>

          <div data-reveal="up" style={delay(120)}>
            <div className="grid gap-10 sm:grid-cols-2">
              <Distances title="Around Kandy" rows={distances.kandy} />
              <Distances title="Further afield" rows={distances.further} />
            </div>
            <p className="mt-4 text-[0.8rem] text-muted">By road from the villa. Allow extra time for traffic and hill roads.</p>
            <p className="mt-6 max-w-[34rem] text-[0.88rem] leading-[1.4rem] text-ink-soft">
              <span className="text-[0.75rem] uppercase tracking-[0.14em] text-muted">Nearby we recommend</span>
              <br />
              {nearbyRecommendations.join(" · ")}
            </p>

            <div className="mt-8">
              <iframe
                title="Map showing the villas' location in Kandy"
                src="https://www.google.com/maps?q=7.298970,80.639688&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[20rem] w-full border-0 bg-linen"
              />
              <p className="mt-3 text-[0.82rem]">
                <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center font-medium text-gold underline underline-offset-4 hover:text-gold-hover">
                  Open in Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
