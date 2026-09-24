import type { CSSProperties } from "react";

/** Delays an entrance or scroll reveal (see "Motion" in globals.css) by `ms`. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/*
 * Runs before first paint (inlined in the root layout's <head>). `.js` turns
 * on the hidden starting states of scroll reveals. If the app never
 * hydrates, the class is removed again so no content stays hidden.
 */
export const revealBootScript =
  "document.documentElement.classList.add('js');" +
  "setTimeout(function(){if(!document.documentElement.hasAttribute('data-reveal-ready'))" +
  "document.documentElement.classList.remove('js')},4000)";
