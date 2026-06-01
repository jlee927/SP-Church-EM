export default function QuickInfo() {
  const cardBase =
    "relative overflow-hidden rounded-3xl bg-white/75 md:bg-white/80 backdrop-blur-md " +
    "ring-1 ring-white/70 shadow-[0_18px_45px_-18px_rgba(17,109,181,0.28)]";

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=2025+S+Goebbert+Rd+Arlington+Heights+IL+60005";

  return (
    <section className="relative py-12 md:py-14 !font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/50 via-white/80 to-white" />

      <div className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-8">
        <svg viewBox="0 0 1440 80" className="h-full w-full fill-white/70">
          <path d="M0,64 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-left md:text-center">
          <h2 className="!font-heading-en !text-4xl md:!text-5xl !font-bold leading-tight !text-[#116db5] tracking-[-0.01em]">
            Join Us This Sunday
          </h2>

          <p className="!font-subhead mt-3 !text-base md:!text-lg !text-[#0e5a96]/80 tracking-[0.01em]">
            A welcoming community of worship, connection, and hope
          </p>
        </div>

        <div className="mt-10 mx-auto max-w-5xl">
          <div className={cardBase}>
            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="p-6 md:p-8 lg:p-10">
                <div className="space-y-7">
                  <div>
                    <p className="!font-heading-en !text-2xl md:!text-3xl !font-semibold tracking-[-0.01em] !text-[#0e5a96]">
                      Sunday Worship
                    </p>

                    <div className="mt-4 space-y-1 !text-[#334155]">
                      <p className="!text-lg !font-semibold">Sundays · 1:00 PM</p>
                      <p className="!text-base">English Ministry Worship</p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-[#116db5]/10" />

                  <div>
                    <p className="!font-semibold !text-[#0e5a96]">Location</p>

                    <div className="mt-2 space-y-1 !text-[#334155]">
                      <p className="!font-medium">2025 S Goebbert Rd</p>
                      <p>Arlington Heights, IL 60005</p>
                    </div>
                  </div>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#116db5] px-5 py-2.5 !text-sm !font-semibold !text-white shadow-[0_10px_25px_-12px_rgba(17,109,181,0.8)] transition hover:bg-[#0e5a96]"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="relative min-h-[240px] md:min-h-[320px]">
                <iframe
                  title="Springwell Presbyterian Church Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.824169429409!2d-87.629799!3d41.878113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzQxLjIiTiA4N8KwMzcnNDcuMyJX!5e0!3m2!1sen!2sus!4v1700000000000"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -top-6 h-10 bg-gradient-to-b from-white/50 to-transparent" />
    </section>
  );
}
