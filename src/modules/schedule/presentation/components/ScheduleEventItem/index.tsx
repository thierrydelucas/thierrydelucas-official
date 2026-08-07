type ScheduleEventItemProps = {
  title: string;
  description?: string;
  location?: string;
  dateLabel: string;
  timeLabel?: string;
  timeZoneLabel?: string;
};

function TimeWithZone({
  timeLabel,
  timeZoneLabel,
}: {
  timeLabel: string;
  timeZoneLabel?: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span>{timeLabel}</span>
      {timeZoneLabel ? (
        <span className="text-[0.85em] tracking-[0.08em] opacity-60">
          {timeZoneLabel}
        </span>
      ) : null}
    </span>
  );
}

export default function ScheduleEventItem({
  title,
  description,
  location,
  dateLabel,
  timeLabel,
  timeZoneLabel,
}: ScheduleEventItemProps) {
  return (
    <article className="flex flex-col gap-3 border-b border-white/20 py-6 md:gap-4 md:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <h2 className="font-cormorant text-[32px] font-medium leading-[110%] tracking-[0.2em] text-white">
          {title}
        </h2>

        <div className="font-inter text-[10px] font-medium tracking-normal text-white opacity-50 md:shrink-0 md:text-right md:text-[12px]">
          <p className="md:hidden">
            {dateLabel}
            {timeLabel ? (
              <>
                {" • "}
                <TimeWithZone
                  timeLabel={timeLabel}
                  timeZoneLabel={timeZoneLabel}
                />
              </>
            ) : null}
          </p>
          <div className="hidden md:block">
            <p>{dateLabel}</p>
            {timeLabel ? (
              <p>
                <TimeWithZone
                  timeLabel={timeLabel}
                  timeZoneLabel={timeZoneLabel}
                />
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {description ? (
        <p className="max-w-3xl whitespace-pre-line font-inter text-base font-medium leading-[150%] tracking-normal text-white opacity-85">
          {description}
        </p>
      ) : null}

      {location ? (
        <p className="font-inter text-[12px] font-medium text-white opacity-50 md:text-[14px]">
          {location}
        </p>
      ) : null}
    </article>
  );
}
