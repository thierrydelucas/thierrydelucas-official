"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ScheduleEvent } from "@/src/modules/schedule/infrastructure/services/getCalendarEvents";
import ScheduleEventList from "@/src/modules/schedule/presentation/components/ScheduleEventList";

const MAX_YEAR_OFFSET = 4;

type ScheduleMonthFilterProps = {
  locale: string;
  events: ScheduleEvent[];
};

function getMonthLabel(locale: string, month: number, year: number) {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(
    new Date(year, month, 1),
  );
}

function capitalize(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getScheduleTimeZone(locale: string) {
  return locale.startsWith("en") ? "America/New_York" : "America/Sao_Paulo";
}

function eventMatchesMonth(
  event: ScheduleEvent,
  month: number,
  year: number,
  locale: string,
) {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(event.start);

  if (isDateOnly) {
    const [eventYear, eventMonth] = event.start.split("-").map(Number);
    return eventMonth - 1 === month && eventYear === year;
  }

  const date = new Date(event.start);
  if (Number.isNaN(date.getTime())) return false;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: getScheduleTimeZone(locale),
    year: "numeric",
    month: "numeric",
  }).formatToParts(date);

  const eventYear = Number(parts.find((part) => part.type === "year")?.value);
  const eventMonth = Number(parts.find((part) => part.type === "month")?.value);

  return eventMonth - 1 === month && eventYear === year;
}

const navButtonClassName =
  "text-white transition-opacity enabled:cursor-pointer enabled:hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30";

export default function ScheduleMonthFilter({
  locale,
  events,
}: ScheduleMonthFilterProps) {
  const t = useTranslations("schedule");
  const now = useMemo(() => new Date(), []);
  const minYear = now.getFullYear();
  const maxYear = minYear + MAX_YEAR_OFFSET;

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(minYear);

  const canGoPreviousMonth = month > 0;
  const canGoNextMonth = month < 11;
  const canGoPreviousYear = year > minYear;
  const canGoNextYear = year < maxYear;

  const monthLabel = capitalize(getMonthLabel(locale, month, year));

  const visibleEvents = useMemo(() => {
    if (!isFilterActive) return events;
    return events.filter((event) =>
      eventMatchesMonth(event, month, year, locale),
    );
  }, [events, isFilterActive, locale, month, year]);

  const emptyMessage = isFilterActive ? t("emptyFiltered") : t("empty");

  return (
    <div className="flex w-full flex-col gap-10 md:gap-14">
      <div className="flex w-full flex-col border-y border-white/10 py-5 md:py-6">
        {!isFilterActive ? (
          <div className="flex flex-col items-center gap-3">
            <p className="font-inter text-[11px] font-medium tracking-[0.12em] text-white/40 uppercase md:text-[12px]">
              {t("filter.showingAll")}
            </p>
            <button
              type="button"
              onClick={() => setIsFilterActive(true)}
              className="font-inter text-sm font-medium tracking-wide text-white opacity-40 transition-opacity hover:opacity-100 cursor-pointer md:text-base "
            >
              {t("filter.enable")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <button
                type="button"
                onClick={() => setMonth((current) => current - 1)}
                disabled={!canGoPreviousMonth}
                aria-label={t("filter.previousMonth")}
                className={navButtonClassName}
              >
                <ChevronLeft className="size-5 md:size-6" strokeWidth={1.5} />
              </button>

              <p className="min-w-[8ch] text-center font-cormorant text-[36px] font-normal tracking-[0.02em] text-white md:text-[48px]">
                {monthLabel}
              </p>

              <button
                type="button"
                onClick={() => setMonth((current) => current + 1)}
                disabled={!canGoNextMonth}
                aria-label={t("filter.nextMonth")}
                className={navButtonClassName}
              >
                <ChevronRight className="size-5 md:size-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setYear((current) => current - 1)}
                disabled={!canGoPreviousYear}
                aria-label={t("filter.previousYear")}
                className={navButtonClassName}
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>

              <p className="min-w-[4ch] text-center font-inter text-base font-normal tracking-normal text-white/60">
                {year}
              </p>

              <button
                type="button"
                onClick={() => setYear((current) => current + 1)}
                disabled={!canGoNextYear}
                aria-label={t("filter.nextYear")}
                className={navButtonClassName}
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFilterActive(false)}
              className="mt-1 font-inter text-[12px] font-medium tracking-[0.08em] text-white/45 transition-opacity hover:opacity-100 cursor-pointer md:text-[13px]"
            >
              {t("filter.disable")}
            </button>
          </div>
        )}
      </div>

      <ScheduleEventList
        events={visibleEvents}
        emptyMessage={emptyMessage}
        locale={locale}
      />
    </div>
  );
}
