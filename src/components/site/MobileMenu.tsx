"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { delay } from "@/lib/motion";
import { bookHref, navLinks } from "@/lib/site";

/** Collapsible navigation shown below the desktop breakpoint. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const icon = "absolute transition-[opacity,rotate] duration-500 ease-soft";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative grid size-10 place-items-center text-ink"
      >
        <Menu size={22} strokeWidth={1.5} className={`${icon} ${open ? "rotate-90 opacity-0" : ""}`} />
        <X size={22} strokeWidth={1.5} className={`${icon} ${open ? "" : "-rotate-90 opacity-0"}`} />
      </button>
      <nav
        id="mobile-nav"
        inert={!open}
        className={`absolute inset-x-0 top-full z-50 grid bg-ivory text-ink transition-[grid-template-rows,box-shadow] duration-600 ease-soft ${
          open ? "grid-rows-[1fr] shadow-lg" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/5 px-5 pb-6 pt-2">
            <ul>
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  style={delay(open ? 80 + i * 60 : 0)}
                  className={`transition-[opacity,translate] delay-(--d) duration-600 ease-soft ${
                    open ? "" : "-translate-y-2 opacity-0"
                  }`}
                >
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
              style={delay(open ? 80 + navLinks.length * 60 : 0)}
              className={`sheen mt-3 block rounded-[3px] bg-gold py-3 text-center text-sm text-white transition-[opacity,translate] delay-(--d) duration-600 ease-soft ${
                open ? "" : "-translate-y-2 opacity-0"
              }`}
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
