import type { MetadataRoute } from "next";
import { navLinks } from "@/lib/site";

const siteUrl = "https://www.kintsugistation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...navLinks.map((l) => l.href), "/villas"];
  return routes.map((href) => ({
    url: `${siteUrl}${href === "/" ? "" : href}`,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
