import bg3 from "../assets/images/bg3.jpg"

export default function Gallery() {
  return (
    <div className="bg-min-h-screen text-[#0e5a96]">
      {/* Hero Section */}
      <section className="relative h-[32vh] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/0" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-[#116db5] drop-shadow-md">Gallery 갤러리</h1>
          <p className="mt-2 text-base md:text-lg text-[#0e5a96]/80">Moments of worship, community, and service</p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="max-w-6xl mx-auto -mt-10 bg-white/55 backdrop-blur-md ring-1 ring-white/40 shadow-sm rounded-2xl px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {['All', 'Sunday Service', 'Events', 'Youth', 'Retreats', 'Community', 'Missions'].map((tag) => (
            <button key={tag} className="px-4 py-2 text-sm rounded-full border border-[#116db5]/20 text-[#0e5a96] hover:bg-[#116db5]/10 focus:outline-none focus:ring-2 focus:ring-[#116db5]/40">
              {tag}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Search" className="px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none" />
          <select className="px-3 py-2 rounded-full border border-gray-200 text-sm">
            <option>Newest</option>
            <option>Most Liked</option>
            <option>Album A-Z</option>
          </select>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto mt-12 px-4 md:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]"></div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 break-inside-avoid relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transform transition duration-200">
            <img src={bg3} alt={`Gallery ${i}`} className="w-full object-cover min-h-[220px]" />
            <span className="absolute top-3 left-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#0e5a96]">Album Tag</span>
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <h3 className="font-semibold text-sm">Event Title</h3>
              <p className="text-xs opacity-80">August 2025</p>
            </div>
            {/* Hover Quick Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white text-xl transition">
              <button title="View">👁️</button>
              <button title="Share">🔗</button>
              <button title="Add">➕</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

