import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { KintsugiVeins } from "@/components/brand/KintsugiVeins";
import SiteLogo from "@/components/site/SiteLogo";
import { bookHref, contact } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: bookHref, label: "Book Now" },
];

type ContactItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
  href: string;
  external?: boolean;
};

/** One contact channel: a ringed icon beside a small label and its value. */
function ContactItem({ icon, label, value, detail, href, external }: ContactItemProps) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex items-start gap-[0.7rem] whitespace-nowrap"
    >
      <span className="grid size-[2rem] shrink-0 place-items-center rounded-full border border-[#9b7d45]/50 text-[#c9a96a] transition-colors group-hover:border-[#d9bf87] group-hover:bg-[#d9bf87]/10 group-hover:text-[#e6cc93]">
        {icon}
      </span>
      <span className="flex flex-col pt-[0.2rem] leading-none">
        <span className="text-[0.52rem] tracking-[0.22em] text-[#a88d58] uppercase">{label}</span>
        <span className="mt-[0.5rem] text-[0.76rem] text-[#ecebe6] transition-colors group-hover:text-[#d9bf87]">
          {value}
        </span>
        {detail && <span className="mt-[0.4rem] text-[0.6rem] tracking-[0.02em] text-[#7a7d74]">{detail}</span>}
      </span>
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-night">
      <KintsugiVeins
        variant="footer"
        className="pointer-events-none absolute left-[calc(max(0rem,50vw-32rem)-30rem)] top-0 hidden h-[14.375rem] w-[40rem] max-w-none opacity-90 lg:block"
      />
      <KintsugiVeins
        variant="footer-mobile"
        className="pointer-events-none absolute right-0 top-0 h-[20rem] w-[9rem] opacity-90 lg:hidden"
      />
      <div className="frame relative px-5 lg:px-[3.625rem]">
        <div className="flex flex-col gap-10 pb-8 pt-12 lg:flex-row lg:gap-0 lg:pb-[1.05rem] lg:pt-[1.85rem]">
          <SiteLogo tone="dark" className="self-start lg:mt-[0.35rem]" />

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 lg:ml-[2rem] lg:mr-[1.4rem] lg:mt-[1.35rem] lg:gap-[1.5rem] lg:self-start">
            <ContactItem
              icon={<PiWhatsappLogoLight className="size-[1.05rem]" />}
              label="WhatsApp"
              value={contact.phone}
              href={contact.whatsappHref}
              external
            />
            <ContactItem
              icon={<Mail className="size-[0.95rem]" strokeWidth={1.3} />}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactItem
              icon={<MapPin className="size-[0.95rem]" strokeWidth={1.3} />}
              label="Location"
              value="Kandy Hills, Sri Lanka"
              detail={contact.coordinates}
              href={contact.mapsHref}
              external
            />
          </div>

          <nav
            aria-label="Quick links"
            className="shrink-0 whitespace-nowrap border-[#6b5a37]/70 lg:ml-auto lg:border-l lg:pl-[1.9rem] lg:pr-[1rem]"
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
