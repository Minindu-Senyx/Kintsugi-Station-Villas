"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, ViewTransition } from "react";
import { ChevronDown } from "lucide-react";
import { navItems, type NavItem } from "@/lib/site";

/**
 * Desktop primary navigation; highlights the link for the current route. A
 * gold hairline draws under links on hover, and the current page's underline
 * glides across to the new link on navigation (a shared view transition).
 *
 * "Villas" has a dropdown listing both villas. It is a disclosure, not an ARIA
 * menu: the link still goes to the Villas page, and a separate chevron button
 * opens the list (also on hover). Escape closes it and returns focus to the
 * button; ArrowDown from the button moves into the list.
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-[0.75rem] xl:gap-[1.35rem] 2xl:gap-[1.6rem] text-[0.74rem] xl:text-[0.78rem] text-[#353737] whitespace-nowrap">
      {navItems.map((item) => {
        const active = item.href === pathname || (!!item.children && pathname.startsWith(`${item.href}/`));
        return item.children ? (
          <VillasMenu key={item.href} item={item} active={active} pathname={pathname} />
        ) : (
          <li key={item.href}>
            <NavLink href={item.href} label={item.label} active={active} />
          </li>
        );
      })}
    </ul>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative block py-[0.3rem] ${active ? "text-[#7c6546]" : "transition-colors hover:text-gold"}`}
    >
      {label}
      {active ? (
        <ViewTransition name="nav-indicator">
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[#816430]" />
        </ViewTransition>
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 ease-soft group-hover:scale-x-100"
        />
      )}
    </Link>
  );
}

function VillasMenu({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  // "Open" is remembered with the page it was opened on, so navigating anywhere closes the list.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
    const next = typeof value === "function" ? value(open) : value;
    setOpenOn(next ? pathname : null);
  };
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A click or tap outside closes it (covers touch laptops, where there's no hover).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short grace period so the pointer can cross the gap to the list.
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <div className="flex items-center">
        <NavLink href={item.href} label={item.label} active={active} />
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          aria-label="Show villas"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              // The list mounts on the next render; focus its first link then.
              requestAnimationFrame(() => listRef.current?.querySelector("a")?.focus());
            }
          }}
          className="-mr-1 ml-[0.15rem] grid size-6 place-items-center text-[#353737] transition-colors hover:text-gold"
        >
          <ChevronDown
            className={`size-[0.8rem] transition-transform duration-300 ease-soft ${open ? "rotate-180" : ""}`}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-[0.7rem]">
          <ul
            ref={listRef}
            id={menuId}
            className="enter-fade w-[17.5rem] rounded-[3px] border border-[#e0dad0] bg-[#fbf9f5] p-[0.4rem] shadow-[0_12px_36px_rgba(20,24,21,0.18)]"
            style={{ animationDuration: "0.35s" }}
          >
            {item.children?.map((child) => {
              const current = child.href === pathname;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="block rounded-[2px] px-[0.8rem] py-[0.6rem] transition-colors hover:bg-[#f2ece2] focus-visible:bg-[#f2ece2]"
                  >
                    <span className={`block font-serif text-[1.05rem] leading-tight ${current ? "text-gold" : "text-ink"}`}>
                      {child.label}
                    </span>
                    <span className="mt-[0.2rem] block text-[0.74rem] text-[#5a5c58]">{child.detail}</span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-[0.3rem] border-t border-[#e8e2d8] pt-[0.3rem]">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-[2px] px-[0.8rem] py-[0.55rem] text-[0.76rem] font-medium text-gold transition-colors hover:bg-[#f2ece2] hover:text-gold-hover"
              >
                Compare the villas
              </Link>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
