import { delay } from "@/lib/motion";
import { contact } from "@/lib/site";

export interface AmenityGroup {
  category: string;
  items: string[];
}

/** What comes with the stay, as four plain lists. */
export default function VillaAmenities({ amenities, villaName }: { amenities: AmenityGroup[]; villaName: string }) {
  return (
    <section className="border-t border-[#e0d9cc] bg-ivory">
      <div className="frame px-5 py-16 lg:px-[3.625rem] lg:py-[4.2rem]">
        <p data-reveal="up" className="eyebrow text-[0.72rem] tracking-[0.2em] text-[#6f675d]">
          Amenities
        </p>
        <h2 data-reveal="up" style={delay(100)} className="mt-4 font-serif text-[2.2rem] leading-[1.1] text-ink sm:text-[2.5rem]">
          At {villaName}
        </h2>

        <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {amenities.map((group, i) => (
            <div key={group.category} data-reveal="up" style={delay(i * 80)}>
              <h3 className="eyebrow text-[0.72rem] tracking-[0.2em] text-[#3c3e3b]">{group.category}</h3>
              <ul className="mt-3">
                {group.items.map((item) => (
                  <li key={item} className="border-t border-[#e0d9cc] py-[0.65rem] text-[0.9rem] leading-[1.35rem] text-[#3c3e3b]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p data-reveal="up" className="mt-12 max-w-[34rem] text-[0.9rem] leading-[1.45rem] text-ink-soft">
          Pets, events or parties, special diets, tours and trips can be arranged in advance, and we are often flexible.{" "}
          <a
            href={contact.people[0].whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold underline underline-offset-4 hover:text-gold-hover"
          >
            Message us on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
