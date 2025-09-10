// src/components/CommunityStrip.jsx
import React from "react";

/**
 * Props:
 * - items: (string | {src,title?,text?,alt?})[]
 * - variant: "minimal" | "hover"   // default: "minimal"
 */
export default function CommunityStrip({ items = [], variant = "minimal" }) {
  if (!items.length) return null;

  const normalized = items.map((it, i) =>
    typeof it === "string" ? { src: it, title: ``, text: ``, alt: `Community photo ${i + 1}` } : it
  );

  const isHover = variant === "hover";

  return (
    <section
      aria-label="Snapshots of our community"
      className="relative mx-auto max-w-6xl px-5 md:px-6 py-10 md:py-14 min-h-screen !font-sans"
    >
      {/* Header stays; boxes themselves are blank */}
      <div className="mb-6 md:mb-8">
        <h2 className="!font-heading-en text-2xl md:text-3xl !font-bold text-[#1c5ea3] drop-shadow-sm">
          Community at Spring Well
        </h2>
        <p className="!font-subhead mt-1 text-base md:text-lg text-[#1c5ea3]/70">
          Glimpses of worship, fellowship, and service
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {normalized.slice(0, 3).map((it, idx) => {
          const alignLeft = idx % 2 === 0; // stagger
          return (
            <figure
              key={idx}
              className={[
                "relative",
                "w-[92%] sm:w-[85%] md:w-[78%] lg:w-[72%]",
                alignLeft ? "self-start" : "self-end",
                "rounded-2xl bg-white/65 backdrop-blur-md ring-1 ring-white/55",
                "shadow-[0_14px_30px_-12px_rgba(17,109,181,0.20)]",
                "overflow-hidden",
              ].join(" ")}
            >
              {/* Image only (clean / blank) */}
              <div className="relative">
                <div className="aspect-[16/9] md:aspect-[21/9]">
                  <img
                    src={it.src}
                    alt={it.alt || "Community photo"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Optional hover captions (off in 'minimal') */}
                {isHover && (it.title || it.text) && (
                  <figcaption
                    className={[
                      "absolute inset-x-0 bottom-0",
                      "px-4 py-3 md:px-5 md:py-4",
                      "bg-gradient-to-t from-black/45 via-black/20 to-transparent",
                      "opacity-0 hover:opacity-100 transition-opacity duration-300",
                    ].join(" ")}
                  >
                    {it.title ? (
                      <div className="!font-heading-en text-white text-sm md:text-base drop-shadow">
                        {it.title}
                      </div>
                    ) : null}
                    {it.text ? (
                      <p className="!font-subhead text-white/90 text-xs md:text-sm mt-0.5">
                        {it.text}
                      </p>
                    ) : null}
                  </figcaption>
                )}
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

