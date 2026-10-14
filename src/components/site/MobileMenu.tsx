"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { delay } from "@/lib/motion";
import { bookHref, navItems } from "@/lib/site";

/** Collapsible navigation shown below the desktop breakpoint. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    // Escape closes the menu and hands focus back to the button that opened it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const icon = "absolute transition-[opacity,rotate] duration-500 ease-soft";

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
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
        aria-label="Mobile"
        inert={!open}
        className={`absolute inset-x-0 top-full z-50 grid bg-ivory text-ink transition-[grid-template-rows,box-shadow] duration-600 ease-soft ${
          open ? "grid-rows-[1fr] shadow-lg" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/5 px-5 pb-6 pt-2">
            <ul>
              {navItems.map((item, i) => (
                <li
                  key={item.href}
                  style={delay(open ? 80 + i * 60 : 0)}
                  className={`transition-[opacity,translate] delay-(--d) duration-600 ease-soft ${
                    open ? "" : "-translate-y-2 opacity-0"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.href === pathname ? "page" : undefined}
                    className={`block py-3 font-serif text-lg ${item.href === pathname ? "text-gold" : ""}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-1 border-l border-[#d9cfbf] pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            aria-current={child.href === pathname ? "page" : undefined}
                            className="block py-2"
                          >
                            <span className={`block font-serif text-base ${child.href === pathname ? "text-gold" : ""}`}>
                              {child.label}
                            </span>
                            <span className="block text-[0.8rem] text-[#5a5c58]">{child.detail}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={bookHref}
              onClick={() => setOpen(false)}
              style={delay(open ? 80 + navItems.length * 60 : 0)}
              className={`mt-3 block rounded-[3px] bg-gold py-3 text-center text-sm text-white transition-[opacity,translate] delay-(--d) duration-600 ease-soft ${
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
