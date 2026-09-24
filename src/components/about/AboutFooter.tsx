import Link from "next/link";
import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MountainMark } from "@/components/brand/MountainMark";
import { contact, navLinks, social } from "@/lib/site";

export default function AboutFooter() {
  return (
    <footer className="bg-pine text-[#e5e9e6]">
      <div className="frame px-5 lg:pl-[4.25rem] lg:pr-[4.2rem]">
        <div className="flex flex-col gap-8 pb-8 pt-10 lg:flex-row lg:gap-0 lg:pb-0 lg:pt-[1.4rem]">
          <div className="lg:w-[18.25rem]">
            <Link href="/" className="flex items-center gap-[0.45rem]" aria-label="Kintsugi Station, Kandy — home">
              <MountainMark className="h-[1.45rem] w-[3.4rem] text-[#d9e0da]" />
              <span className="whitespace-nowrap font-serif text-[0.64rem] font-semibold tracking-[0.05em] text-[#eef1ee]">
                KINTSUGI STATION · KANDY
              </span>
            </Link>
            <p className="mt-[0.9rem] whitespace-nowrap text-[0.53rem] tracking-[0.42em] text-[#a9b5ae]">
              A PRIVATE VILLA IN THE HILLS
            </p>
          </div>

          <ul className="grid gap-x-[1.8rem] gap-y-[0.55rem] text-[0.74rem] leading-none lg:mt-[0.3rem] lg:grid-cols-[auto_auto] lg:self-start">
            <li className="lg:col-span-2">
              <a href={contact.phoneHref} className="flex items-center gap-[0.55rem] hover:text-white">
                <FaPhoneAlt className="size-[0.72rem]" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-[0.55rem] hover:text-white">
                <IoMail className="size-[0.8rem]" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.mapsHref} className="flex items-center gap-[0.55rem] hover:text-white">
                <FaLocationDot className="size-[0.72rem]" aria-hidden="true" />
                Kandy, Sri Lanka
              </a>
            </li>
          </ul>

          <div className="flex flex-col gap-4 border-[#3f564f] lg:ml-auto lg:h-[2.65rem] lg:items-end lg:gap-[0.55rem] lg:border-l lg:pl-[2.55rem]">
            <nav aria-label="Footer">
              <ul className="flex gap-[1.45rem] text-[0.74rem] leading-none text-[#e8ece9] lg:gap-[1.35rem]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#d6c48f]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-[0.95rem]">
              <a href={social.instagram} aria-label="Instagram" className="hover:text-[#d6c48f]">
                <FaInstagram className="size-[0.85rem]" />
              </a>
              <a href={social.facebook} aria-label="Facebook" className="hover:text-[#d6c48f]">
                <FaFacebook className="size-[0.85rem]" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-8 sm:flex-row sm:items-center sm:justify-between lg:pb-[1.1rem] lg:pt-[1.55rem]">
          <p className="text-[0.62rem] text-[#a9b5ae]">© 2024 Kintsugi Station. All rights reserved.</p>
          <p className="text-[0.48rem] tracking-[0.32em] text-[#6f8279]">SLOWER DAYS. BRIGHTER TOMORROWS.</p>
        </div>
      </div>
    </footer>
  );
}
