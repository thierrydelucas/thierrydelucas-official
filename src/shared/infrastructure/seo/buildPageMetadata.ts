import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  SITE_NAME,
  type SitePage,
  languageAlternates,
  localeToOgLocale,
  pageUrl,
} from "./site";

export async function getPageMetadata(
  locale: string,
  page: SitePage,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.${page}` });
  const title = t("title");
  const description = t("description");
  const url = pageUrl(locale, page);
  const ogLocale = localeToOgLocale(locale);

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(page),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: ogLocale,
      alternateLocale: ogLocale === "en_US" ? ["pt_BR"] : ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
