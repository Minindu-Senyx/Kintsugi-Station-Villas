import type { MetadataRoute } from "next";
import { villas } from "@/lib/villas";

const siteUrl = "https://www.kintsugistationvillas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/kandy",
    "/trincomalee",
    "/about",
    "/contact",
    "/reviews/kandy",
    "/reviews/trincomalee",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const villaRoutes = villas.map((villa) => ({
    url: `${siteUrl}/villas/${villa.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...villaRoutes];
}
