import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

function slugify(str = "") {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function AlbumView() {
  const { albumSlug } = useParams();
  const [data, setData] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null | number

  useEffect(() => {
    fetch("/albums.json")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => console.error("albums.json load failed", e));
  }, []);

  const album = useMemo(() => {
    if (!data) return null;
    return (data.albums || []).find((a) => slugify(a.name) === albumSlug) || null;
  }, [data, albumSlug]);

  // Flatten photos from items (fallback to assets[].url if photos not present)
  const photos = useMemo(() => {
    if (!album?.items?.length) return [];
    return album.items.flatMap((it) => {
      const urls = (it.photos && it.photos.length ? it.photos : (it.assets || []).map(a => a.url)) || [];
      return urls.map((url, idx) => ({
        id: `${it.id}-${idx}`,
        url,
        title: it.title || album.name
      }));
    });
  }, [album]);

  // Close / navigate lightbox with keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (!photos.length) return;
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos]);

  if (!data) {
    return <div className="p-6 text-[#0e5a96]">Loading…</div>;
  }

  if (!album) {
    return (
      <div className="p-6 text-[#0e5a96]">
        <Link to="/gallery" className="underline">← Back to Albums</Link>
        <p className="mt-4">Album not found.</p>
      </div>
    );
  }

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const next = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % photos.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  const currentUrl =
    lightboxIndex !== null ? photos[lightboxIndex]?.url : null;

  return (
    <div className="bg-min-h-screen pt-36 text-[#0e5a96]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <Link
          to="/gallery"
          className="text-sm px-3 py-2 rounded-lg border border-[#116db5]/30 text-[#0e5a96] hover:bg-[#116db5]/10 inline-block"
        >
          ← Back to Albums
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-[#116db5]">{album.name}</h1>
        <p className="text-sm text-[#0e5a96]/70">{photos.length} item(s)</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((p, idx) => (
            <button
              key={p.id || p.url}
              onClick={() => p.url && openLightbox(idx)}
              className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition text-left"
              title={p.title || album.name}
            >
              <img
                src={p.url || "/placeholder.png"}
                alt={p.title || album.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <h3 className="font-semibold text-sm">{p.title || "Untitled"}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox with arrows */}
      {lightboxIndex !== null && currentUrl && (
        <div
          className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white text-2xl"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl"
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl"
              aria-label="Next"
            >
              ›
            </button>

            {/* Image */}
            <img
              src={currentUrl}
              alt="Expanded"
              className="w-full h-auto rounded-xl shadow-2xl select-none"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

