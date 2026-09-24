"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

/** Desktop primary navigation; highlights the link for the current route. */
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
              className={active ? "text-[#b39a78]" : "transition-colors hover:text-gold"}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
