import { delay } from "@/lib/motion";
import { contact } from "@/lib/site";

export interface AmenityGroup {
  category: string;
  items: string[];
}

type Props = {
  amenities: AmenityGroup[];
  /** The eight things guests ask about first. */
  highlights: string[];
  villaName: string;
};

const label = "eyebrow text-[0.72rem] tracking-[0.2em] text-[#5a5c58]";

/*
 * Amenities in two layers: eight highlights at a glance, then the full lists as
 * accordions. The accordions are native <details>, so they work with the keyboard
 * and without JavaScript, and opening one closes the others (the shared `name`).
 */
export default function VillaAmenities({ amenities, highlights, villaName }: Props) {
  return (
    <section className="border-t border-[#e0d9cc] bg-ivory">
      <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
        <div className="grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
          <div data-reveal="up" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-[0.72rem] tracking-[0.2em] text-[#6f675d]">Amenities</p>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]">At {villaName}</h2>
            <p className="mt-4 max-w-[16rem] text-[0.9rem] leading-[1.4rem] text-ink-soft">
              What&rsquo;s included in your stay, and what we can arrange on request.
            </p>
            <p className="mt-6 max-w-[16rem] text-[0.85rem] leading-[1.35rem] text-[#3c3e3b]">
              Pets, events, special diets or tours?{" "}
              <a
                href={contact.people[0].whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold underline underline-offset-4 hover:text-gold-hover"
              >
                Message us on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              . We&rsquo;re often flexible.
            </p>
          </div>

          <div>
            <h3 className={label}>At a glance</h3>
            <ul className="mt-4 grid grid-cols-2 border-l border-t border-[#d9d2c5] sm:grid-cols-4">
              {highlights.map((item, i) => (
                <li
                  key={item}
                  data-reveal="up"
                  style={delay(i * 50)}
                  className="flex min-h-[5.2rem] items-end border-b border-r border-[#d9d2c5] p-4 font-serif text-[1.15rem] leading-[1.2] text-ink transition-colors duration-500 ease-soft hover:bg-white/70"
                >
                  {item}
                </li>
              ))}
            </ul>

            <h3 className={`${label} mt-14`}>Everything included</h3>
            <div className="mt-4 border-b border-[#d9d2c5]">
              {amenities.map((group, i) => (
                <details key={group.category} {...{ name: "amenities" }} open={i === 0} className="group border-t border-[#d9d2c5]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-[1.35rem] leading-none text-ink">{group.category}</span>
                    <span className="flex items-center gap-4 text-[0.8rem] text-[#5a5c58]">
                      {group.items.length} items
                      <span aria-hidden="true" className="w-3 text-center text-[1.2rem] leading-none text-ink group-open:hidden">
                        +
                      </span>
                      <span aria-hidden="true" className="hidden w-3 text-center text-[1.2rem] leading-none text-ink group-open:block">
                        &minus;
                      </span>
                    </span>
                  </summary>
                  <ul className="pb-5 sm:columns-2 sm:gap-12">
                    {group.items.map((item) => (
                      <li key={item} className="break-inside-avoid border-t border-[#e8e2d8] py-[0.6rem] text-[0.9rem] leading-[1.35rem] text-[#3c3e3b]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
