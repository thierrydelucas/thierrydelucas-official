import type { MetadataRoute } from "next";
import { routing } from "@/src/shared/infrastructure/i18n/routing";
import { SITE_PAGES, languageAlternates, pageUrl } from "@/src/shared/infrastructure/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    SITE_PAGES.map((page) => ({
      url: pageUrl(locale, page),
      lastModified: new Date(),
      changeFrequency:
        page === "schedule" || page === "discography" ? "daily" : "weekly",
      priority: page === "home" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(page),
      },
    })),
  );
}
