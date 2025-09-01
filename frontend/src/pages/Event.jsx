// src/pages/Event.jsx
import { useMemo, useState } from "react";

/** ---- Helpers / formatters ---- */
const fmtDayShort = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const fmtMonthShort = new Intl.DateTimeFormat("en-US", { month: "short" });
const fmtMonthLong = new Intl.DateTimeFormat("en-US", { month: "long" });
const fmtDateNum = new Intl.DateTimeFormat("en-US", { day: "numeric" });
const fmtYear = new Intl.DateTimeFormat("en-US", { year: "numeric" });
const fmtTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
const fmtLong = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Seed data – replace with your own or fetch later */
const EVENTS = [
  // upcoming examples
  {
    id: "1",
    title: "Sunday Worship Service (EM)",
    start: "2025-09-07T10:30:00-05:00",
    end: "2025-09-07T12:00:00-05:00",
    location: "Springwell Presbyterian Church, Sanctuary",
    description: "EM worship service. Fellowship to follow.",
  },
  {
    id: "2",
    title: "Young Adults Bible Study",
    start: "2025-09-12T19:00:00-05:00",
    end: "2025-09-12T20:30:00-05:00",
    location: "Fellowship Hall",
    description: "Weekly study and discussion. Snacks provided.",
  },
  // past examples
  {
    id: "3",
    title: "Thanksgiving Fellowship Dinner",
    start: "2024-11-24T17:30:00-06:00",
    end: "2024-11-24T19:30:00-06:00",
    location: "Fellowship Hall",
    description: "Potluck-style dinner. Bring a dish to share!",
  },
];

/** Utility */
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** Build a simple ICS data URI for "Add to Calendar" buttons (optional pill in list items) */
function buildICS({ title, description = "", location = "", startISO, endISO }) {
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtstart = new Date(startISO).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtend = endISO
    ? new Date(endISO).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : dtstart;

  const escape = (s) =>
    String(s || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//Springwell Church//EN",
    "BEGIN:VEVENT",
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return "data:text/calendar;charset=utf8," + encodeURIComponent(ics);
}

/** ---- Component ---- */
export default function Event() {
  const now = new Date();

  // Controls
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list"); // 'list' | 'month' | 'day'
  const [cursorMonth, setCursorMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [cursorDay, setCursorDay] = useState(new Date(now));

  // Filtered lists
  const { upcoming, past } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = EVENTS.filter((e) => {
      const text = `${e.title} ${e.description || ""} ${e.location || ""}`.toLowerCase();
      return q ? text.includes(q) : true;
    });
    const future = [];
    const before = [];
    filtered.forEach((e) => {
      const d = new Date(e.start);
      (d >= now ? future : before).push(e);
    });
    future.sort((a, b) => new Date(a.start) - new Date(b.start));
    before.sort((a, b) => new Date(b.start) - new Date(a.start));
    return { upcoming: future, past: before };
  }, [query]);

  /** Month-grid data for Month view */
  const monthGrid = useMemo(() => {
    if (view !== "month") return [];
    const first = new Date(cursorMonth.getFullYear(), cursorMonth.getMonth(), 1);
    const startWeekday = (first.getDay() + 7) % 7; // 0=Sun
    const startDate = new Date(first);
    startDate.setDate(first.getDate() - startWeekday); // start from Sunday
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dayEvents = EVENTS.filter((e) => sameDay(new Date(e.start), d)).sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      cells.push({ date: d, events: dayEvents, inMonth: d.getMonth() === cursorMonth.getMonth() });
    }
    return cells;
  }, [view, cursorMonth]);

  /** ---- UI ---- */
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Heading strip (subtle like your hero overlay tone) */}
      <section className="relative h-[24vh] bg-cover pt-60 bg-center md:bg-top flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-white/0" />
        <div className="relative z-10 w-full mx-6 md:mx-24 lg:mx-36 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold !text-[#116db5] drop-shadow-sm">
            Events
          </h1>
        </div>
      </section>

      {/* Search + button + view toggles */}
      <section className="mx-6 md:mx-24 lg:mx-36 mt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for events"
              className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button
              onClick={() => { }}
              className="shrink-0 rounded-md px-4 py-2 bg-[#116db5] text-white hover:opacity-95"
            >
              Find Events
            </button>
          </div>

          <div className="flex items-center gap-4 text-[#0e5a96]">
            <button
              onClick={() => setView("list")}
              className={`underline-offset-4 ${view === "list" ? "font-semibold underline" : "hover:underline"
                }`}
            >
              List
            </button>
            <button
              onClick={() => setView("month")}
              className={`underline-offset-4 ${view === "month" ? "font-semibold underline" : "hover:underline"
                }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("day")}
              className={`underline-offset-4 ${view === "day" ? "font-semibold underline" : "hover:underline"
                }`}
            >
              Day
            </button>
          </div>
        </div>
      </section>

      {/* Month/Day header row like the screenshot */}
      {(view === "month" || view === "day") && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={() => {
                  if (view === "month") {
                    setCursorMonth(
                      new Date(cursorMonth.getFullYear(), cursorMonth.getMonth() - 1, 1)
                    );
                  } else {
                    const d = new Date(cursorDay);
                    d.setDate(d.getDate() - 1);
                    setCursorDay(d);
                  }
                }}
                className="text-[#116db5] hover:underline"
                aria-label="Previous"
                title="Previous"
              >
                ‹
              </button>

              {/* This Month link */}
              <button
                onClick={() => {
                  setCursorMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                  setCursorDay(new Date(now));
                }}
                className="text-[#116db5] underline underline-offset-4"
              >
                This Month
              </button>

              {/* Title */}
              <div className="text-gray-800">
                {view === "month" ? (
                  <span className="ml-2">
                    {fmtMonthLong.format(cursorMonth)} {fmtYear.format(cursorMonth)}
                  </span>
                ) : (
                  <span className="ml-2">{fmtLong.format(cursorDay)}</span>
                )}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => {
                  if (view === "month") {
                    setCursorMonth(
                      new Date(cursorMonth.getFullYear(), cursorMonth.getMonth() + 1, 1)
                    );
                  } else {
                    const d = new Date(cursorDay);
                    d.setDate(d.getDate() + 1);
                    setCursorDay(d);
                  }
                }}
                className="text-[#116db5] hover:underline"
                aria-label="Next"
                title="Next"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- Views ---- */}
      {view === "list" && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-10">
          {/* Upcoming (screenshot shows the empty state) */}
          <h2 className="sr-only">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="text-center text-gray-600 my-14">There are no upcoming events.</p>
          ) : (
            <div className="space-y-6">
              {upcoming.map((e) => (
                <ListRow key={e.id} event={e} accent />
              ))}
            </div>
          )}

          {/* Latest Past Events */}
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-14 mb-6">
            Latest Past Events
          </h3>
          {past.length === 0 ? (
            <p className="text-gray-600">No past events.</p>
          ) : (
            <div className="space-y-6">
              {past.slice(0, 12).map((e) => (
                <ListRow key={e.id} event={e} />
              ))}
            </div>
          )}
        </section>
      )}

      {view === "month" && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-6 mb-12">
          <div className="grid grid-cols-7 border border-gray-200 rounded-lg overflow-hidden">
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="border-b border-gray-200 bg-gray-50 px-2 py-2 text-sm text-gray-600 text-center"
              >
                {d}
              </div>
            ))}
            {/* Cells */}
            {monthGrid.map(({ date, events, inMonth }, i) => (
              <div
                key={i}
                className={`min-h-[90px] border-t border-r last:border-r-0 border-gray-200 p-2 ${inMonth ? "bg-white" : "bg-gray-50"
                  }`}
              >
                <div
                  className={`text-xs mb-1 ${sameDay(date, now)
                    ? "inline-block px-2 py-0.5 rounded-full bg-sky-100 text-[#0e5a96]"
                    : "text-gray-700"
                    }`}
                >
                  {fmtDateNum.format(date)}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      className="truncate text-xs border border-sky-200 bg-sky-50 px-2 py-1 rounded"
                      title={`${e.title} • ${fmtTime.format(new Date(e.start))}`}
                    >
                      {fmtTime.format(new Date(e.start))} — {e.title}
                    </div>
                  ))}
                  {events.length > 3 && (
                    <div className="text-xs text-gray-500">+{events.length - 3} more…</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "day" && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-10 mb-16">
          <h2 className="text-xl font-semibold text-[#0e5a96] mb-4">
            {fmtLong.format(cursorDay)}
          </h2>
          <div className="space-y-6">
            {EVENTS.filter((e) => sameDay(new Date(e.start), cursorDay)).length === 0 ? (
              <p className="text-gray-600">No events for this day.</p>
            ) : (
              EVENTS.filter((e) => sameDay(new Date(e.start), cursorDay))
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .map((e) => <ListRow key={e.id} event={e} accent />)
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/** One row like the screenshot: left date column + right details */
function ListRow({ event, accent = false }) {
  const d = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;

  return (
    <article className="grid grid-cols-[80px_1fr] gap-6">
      {/* Left date block */}
      <div className="flex flex-col items-start">
        <div className="text-sm text-gray-600">{fmtMonthShort.format(d)}</div>
        <div className="text-2xl font-bold text-[#116db5] leading-none">
          {fmtDateNum.format(d)}
        </div>
        <div className="text-sm text-gray-600">{fmtYear.format(d)}</div>
      </div>

      {/* Right content */}
      <div
        className={`rounded-lg border ${accent ? "border-sky-200 bg-sky-50/60" : "border-gray-200 bg-white"
          } p-4`}
      >
        <h4 className="text-lg font-semibold text-[#0e5a96]">
          {fmtLong.format(d)}{" "}
          {end ? (
            <span className="text-gray-700 font-normal">
              @ {fmtTime.format(d)} – {fmtTime.format(end)}
            </span>
          ) : (
            <span className="text-gray-700 font-normal">@ {fmtTime.format(d)}</span>
          )}
        </h4>

        <div className="mt-1">
          <div className="text-base font-medium text-gray-900">{event.title}</div>
          {event.location && <div className="text-gray-700">📍 {event.location}</div>}
        </div>

        {event.description && (
          <p className="text-gray-700 mt-2">{event.description}</p>
        )}

        <div className="mt-3">
          <a
            href={buildICS({
              title: event.title,
              description: event.description,
              location: event.location,
              startISO: event.start,
              endISO: event.end,
            })}
            download={`${event.title.replace(/\s+/g, "_")}.ics`}
            className="inline-flex items-center gap-2 rounded-full border border-[#116db5] px-3 py-1.5 text-sm text-[#116db5] hover:bg-sky-50"
          >
            ➕ Add to Calendar
          </a>
        </div>
      </div>
    </article>
  );
}

