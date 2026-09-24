"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";
import { navLinks } from "@/lib/site";

/**
 * Desktop primary navigation; highlights the link for the current route. A
 * gold hairline draws under links on hover, and the current page's underline
 * glides across to the new link on navigation (a shared view transition).
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-[1.72rem] text-[0.78rem] text-[#353737]">
      {navLinks.map((link) => {
        const active = link.href === pathname;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`group relative block py-[0.3rem] ${active ? "text-[#b39a78]" : "transition-colors hover:text-gold"}`}
            >
              {link.label}
              {active ? (
                <ViewTransition name="nav-indicator">
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#c3a876]" />
                </ViewTransition>
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-soft group-hover:scale-x-100"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
