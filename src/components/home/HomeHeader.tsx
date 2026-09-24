import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { bookHref, navLinks } from "@/lib/site";

export default function HomeHeader() {
  return (
    <header className="relative z-40 bg-ivory">
      <div className="frame flex h-16 items-center px-5 lg:h-[3.8125rem] lg:px-[3.625rem]">
        <Link href="/" className="flex flex-col items-center leading-none" aria-label="Kintsugi Station, Kandy — home">
          <span className="font-serif text-[1.2rem] tracking-[0.075em] text-[#191b1a] lg:text-[1.19rem]">
            KINTSUGI STATION
          </span>
          <span className="mt-[0.3rem] text-[0.53rem] tracking-[0.32em] text-[#5b5850]">· KANDY ·</span>
        </Link>

        <nav aria-label="Primary" className="ml-[8.25rem] hidden lg:block">
          <ul className="flex gap-[1.72rem] text-[0.78rem] text-[#353737]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === "/" ? "page" : undefined}
                  className={link.href === "/" ? "text-[#b39a78]" : "transition-colors hover:text-gold"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={bookHref}
          className="ml-auto hidden h-[2.0625rem] w-[6.125rem] items-center justify-center bg-gold text-[0.75rem] text-[#f7f1e4] shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#8f6d31] lg:flex"
        >
          Book Now
        </Link>
        <div className="ml-auto lg:hidden">
          <MobileMenu active="/" tone="light" />
        </div>
      </div>
    </header>
  );
}
