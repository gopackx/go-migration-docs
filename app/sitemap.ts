import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://go-migration.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = source.getPages();

  const docsEntries = pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...docsEntries,
  ];
}
