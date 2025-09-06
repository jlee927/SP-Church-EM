// src/pages/Event.jsx
import { useEffect, useMemo, useState } from "react";
import bgHero from "../assets/images/bg4.jpg";
import forestbg from "../assets/images/forestbg.jpg";

/** ---- Helpers / formatters ---- */
const fmtMonthLong = new Intl.DateTimeFormat("en-US", { month: "long" });
const fmtMonthShort = new Intl.DateTimeFormat("en-US", { month: "short" });
const fmtDateNum = new Intl.DateTimeFormat("en-US", { day: "numeric" });
const fmtYear = new Intl.DateTimeFormat("en-US", { year: "numeric" });
const fmtTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
const fmtLong = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** Utilities */
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

function parseDateSafe(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function monthNameToIndex(name) {
  if (!name) return null;
  const map = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };
  return map[String(name).toLowerCase()] ?? null;
}

/** Prefer ISO; fallback to Month/Day/Year */
function getEventStartDate(event) {
  const d = parseDateSafe(event.start);
  if (d) return d;
  const mIdx = monthNameToIndex(event.startMonth);
  if (event.startYear && mIdx != null && event.startDay) {
    return new Date(Number(event.startYear), mIdx, Number(event.startDay));
  }
  return null;
}

/** Build ICS data URI */
function buildICS({ title, description = "", location = "", startISO, endISO }) {
  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const dtstart = parseDateSafe(startISO)
    ? new Date(startISO).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : dtstamp;
  const dtend = parseDateSafe(endISO)
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

  // Data from /events.json
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/events.json")
      .then((r) => r.json())
      .then((data) => setEvents(Array.isArray(data?.events) ? data.events : []))
      .catch(() => setError("Failed to load events."))
      .finally(() => setLoading(false));
  }, []);

  // Controls
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list"); // 'list' | 'month' | 'day'
  const [cursorMonth, setCursorMonth] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [cursorDay, setCursorDay] = useState(new Date(now));

  // Filtered lists
  const { upcoming, past } = useMemo(() => {
    const q = query.trim().toLowerCase();

    const normalized = events
      .map((e) => ({ ...e, _startDate: getEventStartDate(e) }))
      .filter((e) => e._startDate); // keep only events with a workable date

    const filtered = normalized.filter((e) => {
      const text = `${e.title} ${e.description || ""} ${e.location || ""}`.toLowerCase();
      return q ? text.includes(q) : true;
    });

    const future = [];
    const before = [];
    filtered.forEach((e) => ((e._startDate >= now ? future : before).push(e)));
    future.sort((a, b) => a._startDate - b._startDate);
    before.sort((a, b) => b._startDate - a._startDate);

    return { upcoming: future, past: before };
  }, [events, query]);

  /** Month-grid data for Month view */
  const monthGrid = useMemo(() => {
    if (view !== "month") return [];
    const first = new Date(cursorMonth.getFullYear(), cursorMonth.getMonth(), 1);
    const startWeekday = (first.getDay() + 7) % 7; // 0=Sun
    const startDate = new Date(first);
    startDate.setDate(first.getDate() - startWeekday); // start from Sunday

    const withDates = events
      .map((e) => ({ ...e, _startDate: getEventStartDate(e) }))
      .filter((e) => e._startDate);

    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dayEvents = withDates
        .filter((e) => sameDay(e._startDate, d))
        .sort((a, b) => a._startDate - b._startDate);
      cells.push({ date: d, events: dayEvents, inMonth: d.getMonth() === cursorMonth.getMonth() });
    }
    return cells;
  }, [view, cursorMonth, events]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen !font-sans">
        <section className="mx-6 md:mx-24 lg:mx-36 pt-24 !text-gray-600">Loading events…</section>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white min-h-screen !font-sans">
        <section className="mx-6 md:mx-24 lg:mx-36 pt-24 !text-red-600">{error}</section>
      </div>
    );
  }

  /** ---- UI ---- */
  return (
    <div className="bg-white min-h-screen !font-sans">
      {/* Heading strip with photo (matches Home style) */}
      <section
        className="h-[50vh] bg-cover bg-center bg md:bg-top flex"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <div className="mt-48 z-10 w-full mx-6 md:mx-24 lg:mx-36 pb-6">
          <h1 className="!font-heading-en !text-4xl md:!text-5xl !font-bold !text-[#116db5] drop-shadow-sm">
            Events
          </h1>
          <p className="!font-subhead !text-[#0e5a96]/90 mt-1">
            Gatherings, studies, and special services
          </p>
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
              className="w-full rounded-md border border-gray-200 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button
              onClick={() => {}}
              className="shrink-0 rounded-md px-4 py-2 bg-[#116db5] !text-white hover:opacity-95"
            >
              Find Events
            </button>
          </div>

          <div className="flex items-center gap-4 !text-[#0e5a96] !font-subhead">
            <button
              onClick={() => setView("list")}
              className={`underline-offset-4 ${
                view === "list" ? "!font-semibold underline" : "hover:underline"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setView("month")}
              className={`underline-offset-4 ${
                view === "month" ? "!font-semibold underline" : "hover:underline"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("day")}
              className={`underline-offset-4 ${
                view === "day" ? "!font-semibold underline" : "hover:underline"
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </section>

      {/* Month/Day header row */}
      {(view === "month" || view === "day") && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 !font-subhead !text-[#0e5a96]">
              {/* Left arrow */}
              <button
                onClick={() => {
                  if (view === "month") {
                    setCursorMonth(new Date(cursorMonth.getFullYear(), cursorMonth.getMonth() - 1, 1));
                  } else {
                    const d = new Date(cursorDay);
                    d.setDate(d.getDate() - 1);
                    setCursorDay(d);
                  }
                }}
                className="hover:underline"
                aria-label="Previous"
                title="Previous"
              >
                ‹
              </button>

              {/* This Month */}
              <button
                onClick={() => {
                  setCursorMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                  setCursorDay(new Date(now));
                }}
                className="underline underline-offset-4"
              >
                This Month
              </button>

              {/* Title */}
              <div className="!text-gray-800 !font-sans">
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
                    setCursorMonth(new Date(cursorMonth.getFullYear(), cursorMonth.getMonth() + 1, 1));
                  } else {
                    const d = new Date(cursorDay);
                    d.setDate(d.getDate() + 1);
                    setCursorDay(d);
                  }
                }}
                className="hover:underline"
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
          <h2 className="sr-only">Upcoming Events</h2>
          {upcoming.length === 0 ? (
            <p className="text-center !text-gray-600 my-14">There are no upcoming events.</p>
          ) : (
            <div className="space-y-6">
              {upcoming.map((e) => (
                <ListRow key={e.id} event={e} accent />
              ))}
            </div>
          )}

          <h3 className="!font-heading-en !text-2xl md:!text-3xl !font-semibold !text-gray-900 mt-14 mb-6">
            Latest Past Events
          </h3>
          {past.length === 0 ? (
            <p className="!text-gray-600">No past events.</p>
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
          <div className="grid grid-cols-7 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="border-b border-gray-200 bg-gray-50/70 px-2 py-2 !text-sm !text-gray-600 text-center !font-subhead"
              >
                {d}
              </div>
            ))}
            {monthGrid.map(({ date, events, inMonth }, i) => (
              <div
                key={i}
                className={`min-h-[90px] border-t border-r last:border-r-0 border-gray-200 p-2 ${
                  inMonth ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div
                  className={`!text-xs mb-1 ${
                    sameDay(date, now)
                      ? "inline-block px-2 py-0.5 rounded-full bg-sky-100 !text-[#0e5a96]"
                      : "!text-gray-700"
                  }`}
                >
                  {fmtDateNum.format(date)}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 3).map((e) => {
                    const d = getEventStartDate(e);
                    return (
                      <div
                        key={e.id}
                        className="truncate !text-xs border border-sky-200 bg-sky-50/70 px-2 py-1 rounded"
                        title={`${e.title}${d ? ` • ${fmtTime.format(d)}` : ""}`}
                      >
                        {d ? `${fmtTime.format(d)} — ` : ""}
                        {e.title}
                      </div>
                    );
                  })}
                  {events.length > 3 && (
                    <div className="!text-xs !text-gray-500">+{events.length - 3} more…</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "day" && (
        <section className="mx-6 md:mx-24 lg:mx-36 mt-10 mb-16">
          <h2 className="!font-heading-en !text-xl !font-semibold !text-[#0e5a96] mb-4">
            {fmtLong.format(cursorDay)}
          </h2>
          <div className="space-y-6">
            {events.filter((e) => {
              const d = getEventStartDate(e);
              return d ? sameDay(d, cursorDay) : false;
            }).length === 0 ? (
              <p className="!text-gray-600">No events for this day.</p>
            ) : (
              events
                .map((e) => ({ e, d: getEventStartDate(e) }))
                .filter(({ d }) => d && sameDay(d, cursorDay))
                .sort((a, b) => a.d - b.d)
                .map(({ e }) => <ListRow key={e.id} event={e} accent />)
            )}
          </div>
        </section>
      )}
    </div>
  );
}

/** Event row with photo background + gradient overlay (matches site theme) */
function ListRow({ event, accent = false }) {
  const d = getEventStartDate(event);
  const end = event.end ? parseDateSafe(event.end) : null;

  const leftMonth = event.startMonth || (d ? fmtMonthShort.format(d) : "");
  const leftDay = event.startDay ?? (d ? Number(fmtDateNum.format(d)) : "");
  const leftYear = event.startYear ?? (d ? Number(fmtYear.format(d)) : "");

  return (
    <article className="grid grid-cols-[80px_1fr] gap-6">
      {/* Left date block */}
      <div className="flex flex-col items-start">
        <div className="!font-subhead !text-xs !text-gray-600">{leftMonth}</div>
        <div className="!font-heading-en !text-3xl !font-bold !text-[#116db5] leading-none">{leftDay}</div>
        <div className="!font-subhead !text-xs !text-gray-600">{leftYear}</div>
      </div>

      {/* Right content with photo background */}
      <div className="relative rounded-2xl border border-sky-200 overflow-hidden shadow-sm">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${forestbg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/65 to-sky-50/50 backdrop-blur-[1px]" />

        <div className="relative z-10 p-4">
          <h4 className="!font-heading-en !text-lg !font-semibold !text-[#0e5a96]">
            {d ? fmtLong.format(d) : `${leftMonth} ${leftDay}, ${leftYear}`}{" "}
            {d ? (
              end ? (
                <span className="!font-subhead !text-gray-700 !font-normal">
                  @ {fmtTime.format(d)} – {fmtTime.format(end)}
                </span>
              ) : (
                <span className="!font-subhead !text-gray-700 !font-normal">@ {fmtTime.format(d)}</span>
              )
            ) : null}
          </h4>

          <div className="mt-1">
            <div className="!font-heading-en !text-base !font-semibold !text-gray-900">{event.title}</div>
            {event.location && <div className="!font-subhead !text-gray-700">📍 {event.location}</div>}
          </div>

          {event.description && (
            <p className="!font-sans !text-gray-700 mt-2">{event.description}</p>
          )}
        </div>
      </div>
    </article>
  );
}
