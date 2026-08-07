import type { ScheduleEvent } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import ScheduleEventItem from "@/src/modules/schedule/presentation/components/ScheduleEventItem";

type ScheduleEventListProps = {
  events: ScheduleEvent[];
  emptyMessage: string;
  locale: string;
};

type EventLabels = {
  dateLabel: string;
  timeLabel?: string;
  timeZoneLabel?: string;
};

function getScheduleTimeZone(locale: string) {
  if (locale.startsWith("en")) {
    return { timeZone: "America/New_York", label: "ET" };
  }

  return { timeZone: "America/Sao_Paulo", label: "BRT" };
}

function formatTimedLabel(date: Date, locale: string, timeZone: string) {
  if (locale.startsWith("en")) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(date);
  }

  const parts = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).formatToParts(date);

  const hours = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minutes = parts.find((part) => part.type === "minute")?.value ?? "00";

  return minutes === "00" ? `${hours}h` : `${hours}h${minutes}`;
}

function formatEventLabels(start: string, locale: string): EventLabels {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(start);
  const { timeZone, label: timeZoneLabel } = getScheduleTimeZone(locale);
  const dateLocale = locale.startsWith("en") ? "en-US" : "pt-BR";

  if (isDateOnly) {
    const date = new Date(`${start}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
      return { dateLabel: start };
    }

    const dateLabel = new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);

    return { dateLabel };
  }

  const date = new Date(start);

  if (Number.isNaN(date.getTime())) {
    return { dateLabel: start };
  }

  const dateLabel = new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(date);

  return {
    dateLabel,
    timeLabel: formatTimedLabel(date, locale, timeZone),
    timeZoneLabel,
  };
}

export default function ScheduleEventList({
  events,
  emptyMessage,
  locale,
}: ScheduleEventListProps) {
  if (events.length === 0) {
    return (
      <p className="py-16 text-center font-inter text-base font-medium tracking-normal text-white/70 md:text-lg">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-8">
      {events.map((event) => {
        const { dateLabel, timeLabel, timeZoneLabel } = formatEventLabels(
          event.start,
          locale,
        );

        return (
          <li key={event.id}>
            <ScheduleEventItem
              title={event.title}
              description={event.description}
              location={event.location}
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              timeZoneLabel={timeZoneLabel}
            />
          </li>
        );
      })}
    </ul>
  );
}
