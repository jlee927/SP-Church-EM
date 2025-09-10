import logo2 from "../assets/logo2.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY === 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Close mobile menu when clicking a link ---
  useEffect(() => {
    const checkbox = document.getElementById("nav-toggle");
    const mobileLinks = document.querySelectorAll("#mobile-nav a");

    const closeMenu = () => {
      if (checkbox) {
        checkbox.checked = false;
      }
    };

    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    return () => {
      mobileLinks.forEach((link) =>
        link.removeEventListener("click", closeMenu)
      );
    };
  }, []);

  const baseLinkClass =
    "cursor-pointer py-2 px-2 rounded-lg !text-gray-500 !no-underline transition duration-200";

  const links = [
    { to: "/about", label: "About" },
    { to: "/connect", label: "Connect" },
    { to: "/events", label: "Events" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-300
        ${atTop
          ? "bg-pink"
          : "bg-white/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm"
        }
      `}
    >
      {/* Hidden checkbox that drives the mobile menu */}
      <input id="nav-toggle" type="checkbox" className="peer/nav hidden" />

      {/* Inner container */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">
          {/* Logo */}
          <div className="cursor-pointer mt-0.5 z-10 shrink-0">
            <NavLink to="/" className="no-underline">
              <img src={logo2} alt="Logo" className="h-10 md:h-12 w-auto" />
            </NavLink>
          </div>

          {/* Hamburger toggle */}
          <label
            htmlFor="nav-toggle"
            aria-label="Toggle navigation"
            className="md:hidden mr-1 p-2 rounded-lg cursor-pointer z-10 select-none
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <span className="block w-7 h-0.5 bg-gray-600 mb-1.5 rounded" />
            <span className="block w-7 h-0.5 bg-gray-600 mb-1.5 rounded" />
            <span className="block w-7 h-0.5 bg-gray-600 rounded" />
          </label>

          {/* Desktop pill nav */}
          <div className="hidden md:flex items-center z-10 flex-1 justify-center">
            <div className="h-12 w-full max-w-[720px] bg-gray-100/50 backdrop-blur-md shadow-lg rounded-full">
              <nav className="flex items-center gap-6 md:gap-8 px-6 md:px-8 h-full text-gray-500 justify-center">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `${baseLinkClass} ${isActive ? "bg-white" : "hover:bg-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <a
                  href="https://springwellpc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseLinkClass} hover:bg-white`}
                >
                  Korean
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`
          md:hidden absolute top-full left-0 right-0
          hidden peer-checked/nav:block
          px-4 sm:px-6 md:px-8
        `}
      >
        <div className="mt-2 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
          <nav className="flex flex-col py-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 mb-1 ${baseLinkClass} rounded-none !text-gray-700 ${isActive ? "bg-gray-50" : "hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://springwellpc.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 ${baseLinkClass} rounded-none !text-gray-700 hover:bg-gray-50`}
            >
              Korean
            </a>
          </nav>
        </div>
      </div>
    </nav>
  );
}

