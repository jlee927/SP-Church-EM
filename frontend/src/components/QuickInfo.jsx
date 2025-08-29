export default function QuickInfo() {
  const cardBase =
    "relative rounded-2xl bg-white/55 md:bg-white/60 backdrop-blur-md " +
    "ring-1 ring-white/50 shadow-[0_10px_30px_-10px_rgba(17,109,181,0.18)] " +
    "transition-all duration-300 hover:shadow-[0_16px_40px_-10px_rgba(17,109,181,0.28)] hover:-translate-y-0.5";

  const iconWrap =
    "inline-flex h-10 w-10 items-center justify-center rounded-full " +
    "bg-[#116db5]/10 ring-1 ring-[#116db5]/15 shadow-[0_0_0_4px_rgba(17,109,181,0.06)]";

  return (
    <section className="relative py-14 md:py-16">
      {/* soft sky wash behind cards so they feel connected to the hero clouds */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/60 via-white/70 to-white" />

      {/* top wave that tucks under the cloud banner */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-8">
        <svg viewBox="0 0 1440 80" className="h-full w-full fill-white/70">
          <path d="M0,64 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="text-left md:text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#116db5] tracking-tight">
            Join Us This Sunday
          </h2>
          <p className="mt-2 text-base md:text-lg text-[#0e5a96]/80">
            A welcoming community of worship, connection, and hope
          </p>
          <p className="mt-1 text-sm italic text-[#0e5a96]/60">
            “Let us not give up meeting together…” — Hebrews 10:25
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {/* Service Times */}
          <div className={cardBase}>
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3">
                <span className={iconWrap}>
                  {/* church bell icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-[#116db5]"
                  >
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-[#0e5a96]">Service Times</h3>
              </div>
              <div className="mt-4 space-y-1 text-gray-700">
                <p className="font-medium">Sundays · 1:00 PM</p>
                <p>Friday Prayer · 7:30 PM</p>
              </div>
            </div>
          </div>

          {/* Location + Embedded Map */}
          <div className={cardBase}>
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3">
                <span className={iconWrap}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-[#116db5]"
                  >
                    <path d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10Z" />
                    <path d="M12 8v6M9 11h6" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-[#0e5a96]">Location</h3>
              </div>
              <div className="mt-3 text-gray-700">
                <p className="font-medium">2025 S Goebbert Rd</p>
                <p>Arlington Heights, IL 60005</p>
              </div>

              {/* map */}
              <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-black/5">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title="Springwell Presbyterian Church Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.824169429409!2d-87.629799!3d41.878113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzQxLjIiTiA4N8KwMzcnNDcuMyJX!5e0!3m2!1sen!2sus!4v1700000000000"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute left-0 top-0 h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* New Visitors */}
          <div className={cardBase}>

            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3">
                <span className={iconWrap}>
                  {/* dove-like / fellowship icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 text-[#116db5]"
                  >
                    <path d="M3 20c3-5 7-7 11-7" />
                    <path d="M14 13c0 3 2 5 7 5-3 2-6 3-9 3a9 9 0 01-9-9 9 9 0 019-9c-2 2-2 4-2 6" />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-[#0e5a96]">New Here?</h3>
              </div>
              <p className="mt-3 text-gray-700">
                We’d love to welcome you. Let us know you’re coming and we’ll help you get connected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* gentle upward blend into hero clouds */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-10 bg-gradient-to-b from-white/50 to-transparent" />
    </section>
  );
}

