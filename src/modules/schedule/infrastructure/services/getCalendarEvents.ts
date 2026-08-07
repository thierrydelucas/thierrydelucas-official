export type ScheduleEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  start: string;
  end?: string;
  htmlLink?: string;
};

type GoogleCalendarDate = {
  dateTime?: string;
  date?: string;
};

type GoogleCalendarEventItem = {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: GoogleCalendarDate;
  end?: GoogleCalendarDate;
  htmlLink?: string;
};

type GoogleCalendarEventsResponse = {
  items?: GoogleCalendarEventItem[];
  error?: {
    message?: string;
  };
};

export type GetCalendarEventsResult = {
  events: ScheduleEvent[];
  error: string | null;
};

function resolveEventDate(value?: GoogleCalendarDate): string | undefined {
  return value?.dateTime ?? value?.date;
}

export async function getCalendarEvents(): Promise<GetCalendarEventsResult> {
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID_BR;

  if (!apiKey || !calendarId) {
    return {
      events: [],
      error: "Calendar is not configured",
    };
  }

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
  );
  url.searchParams.set("key", apiKey);
  url.searchParams.set("timeMin", new Date().toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "50");

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    const data = (await response.json()) as GoogleCalendarEventsResponse;

    if (!response.ok) {
      console.error("[getCalendarEvents]", data.error?.message ?? response.statusText);
      return {
        events: [],
        error: "Failed to load calendar events",
      };
    }

    const events: ScheduleEvent[] = [];

    for (const item of data.items ?? []) {
      const start = resolveEventDate(item.start);
      if (!item.id || !start) {
        continue;
      }

      const event: ScheduleEvent = {
        id: item.id,
        title: item.summary?.trim() || "Untitled event",
        start,
      };

      if (item.description) {
        event.description = item.description;
      }
      if (item.location) {
        event.location = item.location;
      }
      const end = resolveEventDate(item.end);
      if (end) {
        event.end = end;
      }
      if (item.htmlLink) {
        event.htmlLink = item.htmlLink;
      }

      events.push(event);
    }

    return { events, error: null };
  } catch (error) {
    console.error("[getCalendarEvents]", error);
    return {
      events: [],
      error: "Failed to load calendar events",
    };
  }
}
