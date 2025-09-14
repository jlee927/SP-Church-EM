import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import bgHero from "../assets/images/bg4.jpg";

function slugify(str = "") {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function Gallery() {
  const [data, setData] = useState(null);
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";

  useEffect(() => {
    fetch("/albums.json")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => console.error("albums.json load failed", e));
  }, []);

  const albums = data?.albums ?? [];
  const filtered = useMemo(() => {
    if (!q) return albums;
    const qq = q.toLowerCase();
    return albums.filter((a) => a.name.toLowerCase().includes(qq));
  }, [albums, q]);

  return (
    <div className="min-h-screen bg-white !font-sans text-[#0e5a96]">
      {/* Hero */}
      <section
        className="relative h-[50vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${bgHero})` }}
        aria-label="Gallery hero"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0" />
        <div className="mt-2 relative mx-6 md:mx-24 lg:mx-36">
          <h1 className="!font-heading-en text-5xl font-bold !text-[#116db5] drop-shadow-md">
            Gallery
          </h1>
          <p className="!font-subhead text-base/7 opacity-90">Browse Album</p>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-full mx-6 md:mx-24 lg:mx-36 -mt-10 bg-gray-50 backdrop-blur-md ring-1 ring-white/40 shadow-sm rounded-2xl px-4 md:px-6 py-4 flex items-center justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})}
          type="text"
          placeholder="Search albums…"
          className="w-full px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none !font-sans"
        />
      </div>

      {/* Album banners */}
      <div className="max-w-7xl mx-auto mt-10 px-4 md:px-8 space-y-6">
        {filtered.map((album) => {
          const firstItem = album.items?.[0];
          const cover =
            firstItem?.cover ||
            firstItem?.photos?.[0] ||
            "/default-banner.jpg"; // fallback for safety

          const slug = slugify(album.name);
          return (
            <Link
              key={album.name}
              to={`/gallery/${slug}`}
              className="relative block h-48 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              {/* Background */}
              <img
                src={cover}
                alt={album.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h3 className="!font-heading-en text-2xl md:text-3xl font-bold drop-shadow-lg">
                  {album.name}
                </h3>
                <p className="!font-subhead text-sm opacity-90 mt-1">
                  {album.count} photo(s)
                </p>
              </div>
            </Link>
          );
        })}
        {!filtered.length && (
          <p className="!font-subhead text-sm text-[#0e5a96]/70">No albums match “{q}”.</p>
        )}
      </div>
    </div>
  );
}

