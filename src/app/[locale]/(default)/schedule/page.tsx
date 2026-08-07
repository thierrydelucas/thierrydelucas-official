import { getCalendarEvents } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import ScheduleContent from "@/src/modules/schedule/presentation/components/ScheduleContent";

export const revalidate = 120;

export default async function Schedule() {
  const { events } = await getCalendarEvents();

  return <ScheduleContent events={events ?? []} />;
}
