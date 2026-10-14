import Link from "next/link";
import HeaderShell from "@/components/site/HeaderShell";
import MobileMenu from "@/components/site/MobileMenu";
import NavLinks from "@/components/site/NavLinks";
import SiteLogo from "@/components/site/SiteLogo";
import { bookHref } from "@/lib/site";

/*
 * The logo is as tall as the header and bleeds off the left edge of the screen
 * (the negative margin cancels the frame's padding and, on very wide screens,
 * the centred frame's side margin), with its right side fading into the page.
 */
export default function SiteHeader() {
  return (
    <HeaderShell>
      <div className="frame relative flex h-[4.5rem] items-center justify-between px-5 lg:h-[5.25rem] lg:px-[3.625rem]">
        <SiteLogo priority fade className="-ml-5 h-full lg:-ml-[calc(3.625rem+max(0px,(100vw-64rem)/2))]" />

        <nav aria-label="Primary" className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-4 xl:px-8">
          <NavLinks />
        </nav>

        <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:justify-end">
          <Link
            href={bookHref}
            className="sheen flex h-[2.0625rem] w-[6.125rem] items-center justify-center bg-gold text-[0.75rem] text-[#f7f1e4] transition-[background-color,box-shadow] duration-300 hover:bg-gold-hover hover:shadow-[0_6px_18px_-8px_rgba(95,74,35,0.65)]"
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
