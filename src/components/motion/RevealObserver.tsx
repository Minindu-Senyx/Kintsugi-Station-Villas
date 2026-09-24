"use client";

import { useEffect } from "react";

/*
 * Reveals every [data-reveal] element as it scrolls into view by setting
 * [data-shown], which globals.css animates. One observer serves the whole
 * site; a MutationObserver hands it elements from later renders (route
 * changes, gallery filters). An attribute is used rather than a class so a
 * React re-render of the element's className can't hide it again.
 */
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-reveal-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Anything already scrolled past (e.g. a restored scroll position) is shown too.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.setAttribute("data-shown", "");
            io.unobserve(entry.target);
          }
        }
      },
      // Small enough that content at the very bottom of the page still triggers.
      { rootMargin: "0px 0px -32px 0px" },
    );

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
