import type { ScheduleEvent } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import type { YoutubeVideo } from "@/src/modules/discography/infrastructure/services/getYoutubePlaylistVideos";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  pageUrl,
  type SitePage,
} from "./site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    alternateName: "Thierry de Lucas Neves",
    url: SITE_URL,
    image: `${SITE_URL}/images/image_1.png`,
    email: SITE_EMAIL,
    jobTitle: "Concert Violinist",
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    affiliation: [
      { "@type": "PerformingGroup", name: "Sphinx Virtuosi" },
      { "@type": "MusicGroup", name: "Savannah Philharmonic" },
      { "@type": "CollegeOrUniversity", name: "Manhattan School of Music" },
    ],
    sameAs: [
      "https://www.instagram.com/thierrydelucas",
      "https://www.facebook.com/thierry.delucasneves",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": PERSON_ID },
    inLanguage: ["en", "pt"],
  };
}

export function webPageJsonLd(locale: string, page: SitePage, name: string) {
  return {
    "@type": "WebPage",
    "@id": `${pageUrl(locale, page)}#webpage`,
    url: pageUrl(locale, page),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: locale,
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd()],
  };
}

export function musicEventsJsonLd(events: ScheduleEvent[], locale: string) {
  if (events.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MusicEvent",
        name: event.title,
        startDate: event.start,
        ...(event.end ? { endDate: event.end } : {}),
        ...(event.description ? { description: event.description } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.location || event.title,
        },
        performer: { "@id": PERSON_ID },
        organizer: { "@id": PERSON_ID },
        url: event.htmlLink || pageUrl(locale, "schedule"),
      },
    })),
  };
}

export function videoObjectJsonLd(video: YoutubeVideo) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
  };
}
