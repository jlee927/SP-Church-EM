import React from "react";

export default function CommunityStrip({ items = [], variant = "minimal" }) {
  if (!items.length) return null;

  const normalized = items.map((it, i) =>
    typeof it === "string"
      ? {
        src: it,
        title: "",
        text: "",
        alt: `Community photo ${i + 1}`,
      }
      : it
  );

  const isHover = variant === "hover";
  const featured = normalized[0];
  const sideItems = normalized.slice(1, 3);

  const ImageCard = ({ item, featured = false }) => (
    <figure className="group relative overflow-hidden rounded-3xl bg-white/70 ring-1 ring-white/70 shadow-[0_18px_45px_-22px_rgba(17,109,181,0.45)]">
      <img
        src={item.src}
        alt={item.alt || item.title || "Community photo"}
        loading="lazy"
        className={[
          "w-full object-cover transition duration-500 group-hover:scale-[1.03]",
          featured ? "h-[280px] md:h-[440px]" : "h-[220px] md:h-[210px]",
        ].join(" ")}
      />

      {isHover && (item.title || item.text) ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.title ? (
            <h3 className="!font-heading-en !text-xl md:!text-2xl !font-semibold !text-white drop-shadow">
              {item.title}
            </h3>
          ) : null}

          {item.text ? (
            <p className="mt-1 !font-subhead !text-sm !text-white/90">
              {item.text}
            </p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );

  return (
    <section
      aria-label="Snapshots of our community"
      className="relative mx-auto max-w-6xl px-6 md:px-10 !font-sans"
    >
      <div className="mx-auto max-w-2xl text-left md:text-center pt-12">
        <p className="!font-subhead !text-sm !font-semibold uppercase tracking-[0.18em] !text-[#116db5]/65">
          Our Community
        </p>

        <h2 className="mt-3 !font-heading-en !text-4xl md:!text-5xl !font-bold tracking-[-0.01em] !text-[#116db5]">
          Community at Spring Well
        </h2>

        <p className="mt-3 !font-subhead !text-base md:!text-lg !text-[#0e5a96]/75">
          Glimpses of worship, fellowship, and service
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-12">
        <div className="md:col-span-7">
          <ImageCard item={featured} featured />
        </div>

        <div className="grid gap-5 md:col-span-5">
          {sideItems.map((item, index) => (
            <ImageCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/gallery"
          className="rounded-full bg-[#116db5] px-6 py-3 !text-sm !font-semibold !text-white shadow-[0_12px_28px_-14px_rgba(17,109,181,0.8)] transition hover:bg-[#0e5a96]"
        >
          View Full Gallery
        </a>
      </div>
    </section>
  );
}
