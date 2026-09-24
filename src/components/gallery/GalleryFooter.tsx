import Link from "next/link";
import { FaInstagram, FaSquareFacebook, FaYoutube } from "react-icons/fa6";
import GalleryBrand from "@/components/gallery/GalleryBrand";
import { navLinks, social } from "@/lib/site";

export default function GalleryFooter() {
  return (
    <footer className="bg-moss text-[#e6e2d4]">
      <div className="frame px-5 lg:px-[2.5rem]">
        <div className="flex flex-col items-center gap-10 py-12 lg:h-[8.375rem] lg:flex-row lg:items-start lg:gap-0 lg:py-0 lg:pt-[2.4rem]">
          <GalleryBrand />

          <div className="flex flex-col items-center lg:ml-[10.5rem] lg:mt-[1.1rem]">
            <p className="text-center font-serif text-[0.64rem] leading-[1.05rem] tracking-[0.22em] text-[#dcd8c8]">
              A QUIETER
              <br />
              KANDY AWAITS
            </p>
            <span aria-hidden="true" className="mt-[0.55rem] h-px w-[2.5rem] bg-[#8e7a4c]" />
          </div>

          <div className="flex flex-col items-center gap-[1.05rem] lg:ml-auto lg:mt-[0.7rem] lg:items-end">
            <nav aria-label="Footer">
              <ul className="flex gap-[1.38rem] font-serif text-[1.03rem] leading-none">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-[#c9af7b]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-[0.75rem]">
              <a href={social.instagram} aria-label="Instagram" className="hover:text-[#c9af7b]">
                <FaInstagram className="size-[0.85rem]" />
              </a>
              <a href={social.facebook} aria-label="Facebook" className="hover:text-[#c9af7b]">
                <FaSquareFacebook className="size-[0.8rem]" />
              </a>
              <a href={social.youtube} aria-label="YouTube" className="hover:text-[#c9af7b]">
                <FaYoutube className="size-[1rem]" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-[#2f3c30] pb-10 pt-[1.1rem] sm:flex-row sm:justify-between lg:pb-[2.35rem] lg:pt-[0.95rem]">
          <p className="font-serif text-[0.66rem] text-[#d7d4c6]">© 2024 Kintsugi Station. All rights reserved.</p>
          <p className="font-serif text-[0.5rem] tracking-[0.22em] text-[#cfcbb9]">SRI LANKA LIVES DIFFERENTLY HERE</p>
        </div>
      </div>
    </footer>
  );
}
