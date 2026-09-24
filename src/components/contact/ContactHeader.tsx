import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { bookHref, navLinks } from "@/lib/site";

export default function ContactHeader() {
  return (
    <header className="relative z-40 bg-forest">
      <div className="frame flex h-16 items-center px-5 lg:h-[4.0625rem] lg:pl-[3.875rem] lg:pr-[2.43rem]">
        <Link
          href="/"
          className="whitespace-nowrap font-serif text-[1rem] tracking-[0.1em] text-[#d3bb95] lg:text-[1.02rem]"
        >
          KINTSUGI STATION · KANDY
        </Link>

        <nav aria-label="Primary" className="ml-[6.4rem] hidden self-stretch lg:block">
          <ul className="flex h-full gap-[2.05rem] text-[0.86rem] text-[#efece4]">
            {navLinks.map((link) => {
              const active = link.href === "/contact";
              return (
                <li key={link.href} className="relative flex items-center">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={active ? "text-[#c8a97e]" : "transition-colors hover:text-[#c8a97e]"}
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[0.7rem] bg-[#bda27b]" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={bookHref}
          className="ml-auto hidden h-[2.625rem] w-[7.56rem] items-center justify-center rounded-[3px] bg-[linear-gradient(180deg,#ad8b5a,#9d7c4c)] text-[0.92rem] text-[#f7f1e6] shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-[filter] hover:brightness-110 lg:flex"
        >
          Book Now
        </Link>
        <div className="ml-auto lg:hidden">
          <MobileMenu active="/contact" tone="dark" />
        </div>
      </div>
    </header>
  );
}
