import Link from "next/link";
import HeaderShell from "@/components/site/HeaderShell";
import MobileMenu from "@/components/site/MobileMenu";
import NavLinks from "@/components/site/NavLinks";
import SiteLogo from "@/components/site/SiteLogo";
import { bookHref } from "@/lib/site";

export default function SiteHeader() {
  return (
    <HeaderShell>
      <div className="frame relative flex items-center justify-between px-5 py-3 lg:h-[5.25rem] lg:px-[3.625rem] lg:py-0">
        <div className="flex shrink-0 items-center">
          <SiteLogo animate />
        </div>

        <nav aria-label="Primary" className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-4 xl:px-8">
          <NavLinks />
        </nav>

        <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:justify-end">
          <Link
            href={bookHref}
            className="sheen flex h-[2.0625rem] w-[6.125rem] items-center justify-center bg-gold text-[0.75rem] text-[#f7f1e4] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#8f6d31]"
          >
            Book Now
          </Link>
        </div>

        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  );
}
