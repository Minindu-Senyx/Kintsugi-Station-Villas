import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { KintsugiVeins } from "@/components/brand/KintsugiVeins";
import { bookHref, contact } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: bookHref, label: "Book Now" },
];

type ColumnProps = {
  icon: React.ReactNode;
  bullet: React.ReactNode;
  href?: string;
  lines: string[];
  meta?: string;
};

function ContactColumn({ icon, bullet, href, lines, meta }: ColumnProps) {
  const [primary, ...rest] = lines;
  return (
    <div className="relative">
      <span className="block h-[1.1rem] text-[#9b7d45]">{icon}</span>
      <div className="mt-[0.7rem] flex">
        <span className="absolute -left-[0.95rem] mt-[0.2rem] text-[#9b7d45]">{bullet}</span>
        <div className="leading-[1.1rem]">
          {href ? (
            <a href={href} className="text-[0.76rem] text-[#ecebe6] hover:text-[#d9bf87]">
              {primary}
            </a>
          ) : (
            <p className="text-[0.76rem] text-[#ecebe6]">{primary}</p>
          )}
          {rest.map((line) => (
            <p key={line} className="text-[0.7rem] text-[#c9c8c0]">
              {line}
            </p>
          ))}
          {meta && <p className="mt-[0.2rem] text-[0.62rem] text-[#5f625b]">{meta}</p>}
        </div>
      </div>
    </div>
  );
}

export default function HomeFooter() {
  return (
    <footer className="relative overflow-hidden bg-night">
      <KintsugiVeins
        variant="footer"
        className="pointer-events-none absolute left-0 top-0 h-[9.6rem] w-[7.6rem] opacity-70"
      />
      <div className="frame relative px-5 lg:px-[3.625rem]">
        <div className="flex flex-col gap-10 pb-8 pt-12 lg:flex-row lg:gap-0 lg:pb-[1.05rem] lg:pt-[1.85rem]">
          <Link href="/" className="flex w-fit shrink-0 flex-col items-center self-start whitespace-nowrap leading-none lg:mt-[0.9rem]">
            <span className="font-serif text-[1.19rem] tracking-[0.075em] text-[#f2f1ec]">KINTSUGI STATION</span>
            <span className="mt-[0.45rem] text-[0.55rem] tracking-[0.32em] text-[#8c7650]">· KANDY ·</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 whitespace-nowrap pl-4 sm:grid-cols-3 lg:ml-[3.6rem] lg:flex lg:gap-0 lg:pl-0">
            <div className="lg:w-[9.25rem]">
              <ContactColumn
                icon={<FaWhatsapp className="size-[1.05rem]" />}
                bullet={<MessageCircle className="size-[0.6rem]" strokeWidth={2.2} />}
                href={contact.whatsappHref}
                lines={[contact.phone, "WhatsApp"]}
              />
            </div>
            <div className="lg:w-[12.35rem]">
              <ContactColumn
                icon={<Mail className="size-[1.1rem]" strokeWidth={1.4} />}
                bullet={<MessageCircle className="size-[0.6rem]" strokeWidth={2.2} />}
                href={`mailto:${contact.email}`}
                lines={[contact.email, "Email"]}
              />
            </div>
            <div className="lg:w-[10.8rem]">
              <ContactColumn
                icon={<MapPin className="size-[1.05rem]" strokeWidth={1.4} />}
                bullet={<MapPin className="size-[0.6rem]" strokeWidth={2.2} />}
                href={contact.mapsHref}
                lines={["Kandy Hills", "Sri Lanka"]}
                meta={contact.coordinates}
              />
            </div>
          </div>

          <nav
            aria-label="Quick links"
            className="shrink-0 whitespace-nowrap border-[#6b5a37]/70 lg:ml-auto lg:border-l lg:pl-[1.9rem] lg:pr-[3.2rem]"
          >
            <p className="text-[0.69rem] text-[#e6e5df]">Quick Links</p>
            <ul className="mt-[0.45rem] space-y-[0.28rem] text-[0.64rem] leading-[0.82rem] text-[#d8d7d0]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#d9bf87]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#3b3526] pb-10 pt-[1.1rem] sm:flex-row sm:items-center sm:justify-between lg:pb-[2.9rem] lg:pt-[1rem]">
          <p className="text-[0.62rem] text-[#8b8d85]">© 2024 Kintsugi Station. All rights reserved.</p>
          <p className="flex items-center gap-[0.6rem] text-[0.58rem] tracking-[0.12em] text-[#a8997a]">
            <span aria-hidden="true" className="h-px w-[2.5rem] bg-[#8e7440]" />
            NATURE RESTORES WHAT TIME BREAKS
          </p>
        </div>
      </div>
    </footer>
  );
}
