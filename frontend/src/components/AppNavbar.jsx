import logo2 from "../assets/logo2.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY === 0);
    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseLinkClass =
    "cursor-pointer py-2 px-2 rounded-lg !text-gray-500 !no-underline transition duration-200";

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        flex flex-row justify-between gap-4 pt-4
        md:px-16 md:gap-8 lg:px-36
        transition-all duration-300
        ${atTop ? "bg-transparent" : "bg-white/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur shadow-sm"}
      `}
    >
      {/* Left-aligned logo */}
      <div className="pt-1 pb-4 cursor-pointer z-10">
        <NavLink to="/" className="no-underline">
          <img src={logo2} alt="Logo" className="w-70 h-auto" />
        </NavLink>
      </div>

      {/* Nav items pill */}
      <div className="flex items-center my-2.5 w-3/5 h-12 bg-gray-100/50 backdrop-blur-md shadow-lg rounded-full z-10">
        <nav className="flex gap-8 px-8 text-gray-500">
          {[
            { to: "/about", label: "About" },
            { to: "/connect", label: "Connect" },
            { to: "/events", label: "Events" },
            { to: "/giving", label: "Giving" },
            { to: "/gallery", label: "Gallery" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? "bg-white" : "hover:bg-white"}`
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
    </nav>
  );
}

