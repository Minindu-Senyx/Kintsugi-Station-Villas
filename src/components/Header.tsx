"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const navLinks = [
  { href: "/kandy", label: "Kandy" },
  { href: "/trincomalee", label: "Trincomalee" },
  { href: "/about", label: "About" },
  { href: "/reviews/kandy", label: "Guest Reviews" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-transparent">
      {/*
        Soft top-down scrim (not a solid bar) so white nav text stays legible
        over any page content — image hero, video, or a plain light section —
        without the navbar itself having a visible background box.
      */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 flex items-center justify-between h-20">
        <Link
          href="/"
          className="font-display text-lg sm:text-xl tracking-wide text-white"
          onClick={() => setOpen(false)}
        >
          Kintsugi Station Villas
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={`relative text-sm transition-colors pb-1 ${
                  active ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gold hover:bg-gold-dark text-charcoal text-sm font-semibold px-5 py-2.5 shadow-md transition-colors"
            >
              Book your stay
            </Link>
          </MagneticButton>
        </nav>

        <button
          type="button"
          className="lg:hidden text-white p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-charcoal border-t border-white/10">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 border-b border-white/10 text-base ${
                    active ? "text-gold" : "text-white/90 hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-4 inline-flex justify-center bg-gold hover:bg-gold-dark text-charcoal text-sm font-semibold px-5 py-3 shadow-md transition-colors"
              onClick={() => setOpen(false)}
            >
              Book your stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
