import Link from "next/link";
import { MountainMark } from "@/components/brand/MountainMark";
import { navLinks } from "@/lib/site";

export default function ContactFooter() {
  return (
    <footer className="bg-[#1c251d]">
      <div className="frame flex flex-col items-center gap-10 px-5 py-12 text-center lg:h-[8.69rem] lg:flex-row lg:items-start lg:gap-0 lg:py-0 lg:pl-[3.875rem] lg:pr-[3.6rem] lg:text-left">
        <div className="lg:w-[26.8rem] lg:pt-[2.2rem]">
          <Link
            href="/"
            className="whitespace-nowrap font-serif text-[1.1rem] tracking-[0.1em] text-[#c9ac85]"
          >
            KINTSUGI STATION · KANDY
          </Link>
          <p className="mt-[1.05rem] text-[0.6rem] leading-[1.2rem] tracking-[0.3em] text-[#8c8f85]">
            NATURE RESTORES
            <br />
            WHAT MATTERS
          </p>
        </div>

        <nav aria-label="Footer" className="lg:pt-[1.95rem]">
          <ul className="space-y-[0.28rem] text-center text-[0.72rem] leading-[0.93rem] text-[#e0ded6]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#c9ac85]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex w-[9.7rem] flex-col items-center lg:ml-auto lg:pt-[1.85rem]">
          <MountainMark className="h-[1.05rem] w-[2.65rem] text-[#b89a6c]" />
          <p className="mt-[0.6rem] text-[0.78rem] text-[#eeece4]">Kandy, Sri Lanka</p>
          <span aria-hidden="true" className="mt-[0.55rem] h-px w-full bg-[#3a4439]" />
          <p className="mt-[0.85rem] whitespace-nowrap text-[0.6rem] tracking-[0.3em] text-[#a4a69c]">
            A QUIETER TOMORROW
          </p>
        </div>
      </div>
    </footer>
  );
}
