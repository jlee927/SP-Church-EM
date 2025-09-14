import logo from "../assets/logo2.png";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-x-clip bg-gradient-to-b from-white via-sky-50/80 to-sky-100 text-[#0e5a96]">
      {/* wave divider */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-4">
        <svg viewBox="0 0 1440 80" className="h-full w-full fill-white">
          <path d="M0,64 C240,16 480,16 720,48 C960,80 1200,80 1440,48 L1440,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* container */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Identity */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Springwell logo" className="h-12 w-auto mx-auto md:mx-0 max-w-full" />
            <h3 className="mt-4 text-xl font-semibold">Springwell Presbyterian Church</h3>
            <p className="mt-2 text-sm text-[#0e5a96]/80 max-w-xs mx-auto md:mx-0">
              Living in God’s grace, growing in faith, and serving our community.
            </p>
            <p className="mt-1 text-sm italic text-[#0e5a96]/60">
              “Be still, and know that I am God.” — Psalm 46:10
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-[#116db5] !no-underline break-words">About Us</a></li>
              <li><a href="#ministries" className="hover:text-[#116db5] !no-underline break-words">Ministries</a></li>
              <li><a href="#sermons" className="hover:text-[#116db5] !no-underline break-words">Sermons</a></li>
              <li><a href="#events" className="hover:text-[#116db5] !no-underline break-words">Events</a></li>
              <li><a href="#giving" className="hover:text-[#116db5] !no-underline break-words">Giving</a></li>
              <li><a href="#contact" className="hover:text-[#116db5] !no-underline break-words">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <p className="mt-4 text-sm text-[#0e5a96]/80">Join our community online:</p>
            <div className="mt-3 flex justify-center md:justify-start gap-3">
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white ring-1 ring-[#116db5]/20 text-[#116db5] hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-[#116db5]/40" aria-label="Instagram">
                {/* Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 max-w-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white ring-1 ring-[#116db5]/20 text-[#116db5] hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-[#116db5]/40" aria-label="Facebook">
                {/* Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 max-w-full" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M13 22v-8h3l1-4h-4V7.5A1.5 1.5 0 0 1 14.5 6H17V2h-3.5A5.5 5.5 0 0 0 8 7.5V10H5v4h3v8h5z" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white ring-1 ring-[#116db5]/20 text-[#116db5] hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-[#116db5]/40" aria-label="YouTube">
                {/* YouTube */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 max-w-full" viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true">
                  <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.4A3 3 0 0 0 1 7c-.4 1.9-.4 5.9-.4 5.9s0 4 .4 5.9A3 3 0 0 0 3.1 21C5 21.5 12 21.5 12 21.5s7 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-5.9.4-5.9s0-4-.4-5.9zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>

            {/* Optional newsletter */}
            <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                placeholder="Your email"
                className="w-full sm:flex-1 rounded-full sm:rounded-l-full sm:rounded-r-none border border-[#116db5]/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#116db5]/40"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full sm:rounded-r-full sm:rounded-l-none bg-[#116db5] px-4 py-2 text-sm text-white hover:bg-[#0e5a96] focus:outline-none focus:ring-2 focus:ring-[#116db5]/40"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/60 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row text-sm">
            <p className="text-center md:text-left text-[#0e5a96]/70">
              © {new Date().getFullYear()} Springwell Presbyterian Church. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-[#116db5]">Privacy</a>
              <a href="#terms" className="hover:text-[#116db5]">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

