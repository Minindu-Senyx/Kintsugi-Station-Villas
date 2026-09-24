"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { bookHref, navLinks } from "@/lib/site";

/** Collapsible navigation shown below the desktop breakpoint. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-10 place-items-center text-ink"
      >
        {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 border-t border-black/5 bg-ivory px-5 pb-6 pt-2 text-ink shadow-lg"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className={`block py-3 font-serif text-lg ${link.href === pathname ? "text-[#c3a56d]" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={bookHref}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-[3px] bg-gold py-3 text-center text-sm text-white"
          >
            Book Now
          </Link>
        </nav>
      )}
    </div>
  );
}
