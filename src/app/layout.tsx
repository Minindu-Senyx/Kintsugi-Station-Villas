import type { Metadata } from "next";
import { ViewTransition } from "react";
import { EB_Garamond, Figtree } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import RevealObserver from "@/components/motion/RevealObserver";
import { revealBootScript } from "@/lib/motion";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Placeholder production domain — update once the real domain is chosen.
const siteUrl = "https://www.kintsugistation.com";
const siteTitle = "Kintsugi Station · Kandy | A Private Villa in Sri Lanka";
const siteDescription =
  "An exclusive private estate in the mist-veiled hills of Kandy, Sri Lanka — one villa, reserved for one group at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Kintsugi Station · Kandy",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Kintsugi Station",
    locale: "en_US",
    type: "website",
    images: ["/assets/images/homepage_hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The boot script adds `.js` to <html> before hydration, hence suppressHydrationWarning.
    <html lang="en" className={`${garamond.variable} ${figtree.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <SiteHeader />
        {/* Crossfades each page into the next on navigation (see "Page transitions" in globals.css). */}
        <ViewTransition update="page" default="none">
          {children}
        </ViewTransition>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
