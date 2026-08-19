export const SITE_URL = "https://www.thierrydelucas.com";
export const SITE_NAME = "Thierry de Lucas";
export const SITE_EMAIL = "thierrydelucas.violin@gmail.com";

export const SITE_PAGES = [
  "home",
  "biography",
  "schedule",
  "discography",
  "media",
  "contact",
] as const;

export type SitePage = (typeof SITE_PAGES)[number];

export function pagePath(locale: string, page: SitePage) {
  return `/${locale}/${page}`;
}

export function pageUrl(locale: string, page: SitePage) {
  return `${SITE_URL}${pagePath(locale, page)}`;
}

export function languageAlternates(page: SitePage) {
  return {
    en: pageUrl("en", page),
    pt: pageUrl("pt", page),
    "x-default": pageUrl("en", page),
  };
}

export function localeToOgLocale(locale: string) {
  return locale === "pt" ? "pt_BR" : "en_US";
}
