import Link from "next/link";
import SiteLogo from "@/components/site/SiteLogo";
import { bookHref, contact, primaryEmail, primaryPhone, social } from "@/lib/site";

const explore = [
  { href: "/", label: "Home" },
  { href: "/villas/avalon", label: "Avalon Villa" },
  { href: "/villas/acland", label: "Villa Acland" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: bookHref, label: "Book on Airbnb" },
];

const heading = "text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#a2a59b]";
const link = "inline-block py-[0.28rem] text-[0.85rem] text-[#e6e5df] transition-colors hover:text-[#e6cc93]";

export default function SiteFooter() {
  return (
    <footer className="bg-night">
      <div className="frame px-5 pb-8 pt-12 lg:px-[3.625rem] lg:pb-[1.8rem] lg:pt-[3.2rem]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr] lg:gap-8">
          <div>
            <SiteLogo fade className="h-[4.75rem] lg:h-[5rem]" />
            <p className="mt-4 max-w-[17rem] text-[0.85rem] leading-[1.3rem] text-[#a2a59b]">
              Two private villas on a quiet hillside in Kandy, Sri Lanka.
            </p>
          </div>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="mt-3">
              <li>
                <a href={primaryPhone.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                  {primaryPhone.phone}
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${primaryEmail}`} className={link}>
                  {primaryEmail}
                </a>
              </li>
              <li>
                <a href={social.instagram[0].href} target="_blank" rel="noopener noreferrer" className={link}>
                  @{social.instagram[0].handle}
                  <span className="sr-only"> on Instagram (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={heading}>Find us</h2>
            <ul className="mt-3">
              <li className="py-[0.28rem] text-[0.85rem] text-[#e6e5df]">Kandy, Sri Lanka</li>
              <li>
                <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className={link}>
                  Open in Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li className="py-[0.28rem] text-[0.78rem] text-[#a2a59b]">{contact.coordinates}</li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className={heading}>Explore</h2>
            <ul className="mt-3">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-5 text-[0.75rem] text-[#8b8d85]">
          © {new Date().getFullYear()} Kintsugi Station Villas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
