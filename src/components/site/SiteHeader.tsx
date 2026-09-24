import Link from "next/link";
import MobileMenu from "@/components/site/MobileMenu";
import NavLinks from "@/components/site/NavLinks";
import SiteLogo from "@/components/site/SiteLogo";
import { bookHref } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="relative z-40 bg-ivory">
      <div className="frame relative flex items-center px-5 py-3 lg:h-[5.25rem] lg:px-[3.625rem] lg:py-0">
        <SiteLogo />

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <NavLinks />
        </nav>

        <Link
          href={bookHref}
          className="ml-auto hidden h-[2.0625rem] w-[6.125rem] items-center justify-center bg-gold text-[0.75rem] text-[#f7f1e4] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#8f6d31] lg:flex"
        >
          Book Now
        </Link>
        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
