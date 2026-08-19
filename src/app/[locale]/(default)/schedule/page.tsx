import { getCalendarEvents } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import ScheduleContent from "@/src/modules/schedule/presentation/components/ScheduleContent";
import { getPageMetadata } from "@/src/shared/infrastructure/seo/buildPageMetadata";
import { musicEventsJsonLd } from "@/src/shared/infrastructure/seo/jsonLd";
import JsonLd from "@/src/shared/presentation/components/JsonLd";

export const revalidate = 120;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return getPageMetadata(locale, "schedule");
}

export default async function Schedule({ params }: Props) {
  const { locale } = await params;
  const { events } = await getCalendarEvents();
  const eventList = events ?? [];
  const eventsJsonLd = musicEventsJsonLd(eventList, locale);

  return (
    <>
      {eventsJsonLd ? <JsonLd data={eventsJsonLd} /> : null}
      <ScheduleContent events={eventList} />
    </>
  );
}
