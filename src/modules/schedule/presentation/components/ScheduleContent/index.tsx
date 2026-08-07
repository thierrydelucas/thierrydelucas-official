import { getLocale } from "next-intl/server";
import type { ScheduleEvent } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import ScheduleMonthFilter from "@/src/modules/schedule/presentation/components/ScheduleMonthFilter";

interface ScheduleContentProps {
  events: ScheduleEvent[];
}

export default async function ScheduleContent({
  events,
}: ScheduleContentProps) {
  const locale = await getLocale();

  return (
    <section className="flex w-full flex-col px-0 py-10 text-white md:mx-auto md:max-w-3xl md:py-16">
      <ScheduleMonthFilter locale={locale} events={events} />
    </section>
  );
}
