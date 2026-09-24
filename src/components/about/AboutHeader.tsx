import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { MountainMark } from "@/components/brand/MountainMark";
import { bookHref, navLinks } from "@/lib/site";

export default function AboutHeader() {
  return (
    <header className="relative z-40 border-b border-[#e9e6de] bg-paper shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="frame flex h-16 items-center px-5 lg:h-[3.375rem] lg:pl-[4.25rem] lg:pr-[3.69rem]">
        <Link href="/" className="flex items-center gap-[0.45rem]" aria-label="Kintsugi Station, Kandy — home">
          <MountainMark className="h-[1.65rem] w-[3.5rem] text-[#a88d4a]" />
          <span className="whitespace-nowrap font-serif text-[0.68rem] font-semibold tracking-[0.05em] text-[#1d2f2a]">
            KINTSUGI STATION · KANDY
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-[11.7rem] hidden self-stretch lg:block">
          <ul className="flex h-full gap-[2.5rem] font-serif text-[0.88rem] text-[#2a3530]">
            {navLinks.map((link) => {
              const active = link.href === "/about";
              return (
                <li key={link.href} className="relative flex items-center">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className="transition-colors hover:text-gold-olive"
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-px -left-[1rem] -right-[1rem] h-[2px] bg-[#af9b5e]"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={bookHref}
          className="ml-auto hidden h-[1.95rem] w-[5.75rem] items-center justify-center bg-gold-olive font-serif text-[0.85rem] text-[#f6f1e1] transition-colors hover:bg-[#86702f] lg:flex"
        >
          Book Now
        </Link>
        <div className="ml-auto lg:hidden">
          <MobileMenu active="/about" tone="light" />
        </div>
      </div>
    </header>
  );
}
