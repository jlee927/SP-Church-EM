import logo2 from "../assets/logo2.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseLinkClass =
    "cursor-pointer py-2 px-2 rounded-lg !text-gray-500 !no-underline transition duration-200";

  return (
    <nav
      className="
        relative flex flex-row justify-between bg-transparent gap-4 pt-4
        md:mx-16 md:gap-8 lg:mx-36
      "
    >
      {/* Soft overlay behind content */}
      <div className="absolute inset-0 bg-white/20 mix-blend-multiply pointer-events-none z-0" />

      {/* Left-aligned logo */}
      <div className="py-3 cursor-pointer z-10">
        <NavLink to="/" className="no-underline">
          <img src={logo2} alt="Logo" className="w-70 h-auto" />
        </NavLink>
      </div>

      {/* Nav items */}
      <div className="flex items-center my-3 w-3/5 h-12 bg-gray-100/50 backdrop-blur-md shadow-lg rounded-full z-10">
        <nav className="flex gap-8 px-8 text-gray-500">
          {[
            { to: "/about", label: "About" },
            { to: "/connect", label: "Connect" },
            { to: "/events", label: "Events" },
            { to: "/korean", label: "Korean" },
            { to: "/giving", label: "Giving" },
            { to: "/gallery", label: "Gallery" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive
                  ? "bg-white" // active styles
                  : "hover:bg-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </nav>
  );
}

