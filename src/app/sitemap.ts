import type { MetadataRoute } from "next";
import { navItems, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Every page in the menus, without in-page anchors such as /villas#book.
  const routes = [...new Set(navItems.flatMap((i) => [i.href, ...(i.children ?? []).map((c) => c.href.split("#")[0])]))];
  return routes.map((href) => ({
    url: `${siteUrl}${href === "/" ? "" : href}`,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
