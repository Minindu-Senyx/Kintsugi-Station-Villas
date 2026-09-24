import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import GalleryBrand from "@/components/gallery/GalleryBrand";
import { bookHref, navLinks } from "@/lib/site";

export default function GalleryHeader() {
  return (
    <header className="relative z-40 bg-moss">
      <div className="frame flex items-center px-5 py-5 lg:h-[7.125rem] lg:py-0 lg:pl-[2.5rem] lg:pr-[2.4rem]">
        <GalleryBrand className="lg:-mt-[0.2rem]" />

        <nav aria-label="Primary" className="ml-[6.3rem] hidden lg:block">
          <ul className="flex gap-[2.12rem] font-serif text-[1.075rem] text-[#e1e0d6]">
            {navLinks.map((link) => {
              const active = link.href === "/gallery";
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={active ? "text-[#c9af7b]" : "transition-colors hover:text-[#c9af7b]"}
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[0.55rem] -left-[0.9rem] -right-[0.15rem] h-px bg-[#c9af7b]"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={bookHref}
          className="ml-[2.5rem] hidden h-[2.45rem] w-[7.25rem] items-center justify-center rounded-[1px] bg-[linear-gradient(180deg,#c2a45c,#ab8c47)] font-serif text-[1.08rem] text-[#2c2a19] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-[filter] hover:brightness-110 lg:flex"
        >
          Book Now
        </Link>

        <p className="ml-auto hidden font-serif text-[0.42rem] leading-[0.75rem] tracking-[0.2em] text-[#b7b5a6] lg:block">
          NATURE
          <br />
          PEOPLE
          <br />A MORE
          <br />
          MEANINGFUL STAY
        </p>

        <div className="ml-auto lg:hidden">
          <MobileMenu active="/gallery" tone="dark" />
        </div>
      </div>
    </header>
  );
}
