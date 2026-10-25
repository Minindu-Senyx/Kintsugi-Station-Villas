import type { Metadata } from "next";
import { ViewTransition } from "react";
import { EB_Garamond, Figtree } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import RevealObserver from "@/components/motion/RevealObserver";
import { revealBootScript } from "@/lib/motion";
import { siteUrl } from "@/lib/site";
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

const siteTitle = "Kintsugi Station · Kandy | Private Villas in Sri Lanka";
const siteDescription =
  "Two private villas in the mist-veiled hills of Kandy, Sri Lanka: Avalon Villa (sleeps 6) and Villa Acland (sleeps 2), each reserved for one group at a time. Book on Airbnb.";

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
    images: [
      {
        url: "/assets/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kintsugi Station Villas, Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/brand/og-image.jpg"],
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
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
