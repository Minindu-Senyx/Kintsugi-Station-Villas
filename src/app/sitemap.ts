import type { MetadataRoute } from "next";
import { navLinks } from "@/lib/site";

const siteUrl = "https://www.kintsugistation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: `${siteUrl}${link.href === "/" ? "" : link.href}`,
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
