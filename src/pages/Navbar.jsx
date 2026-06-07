import { useState, useEffect } from "react";
import { NAV_LINKS } from "./home/homeData";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import calibreLogo from "../assets/calibre-logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 sm:h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-1">
            <img
              src={calibreLogo}
              alt="Calibre Tutorials Logo"
              className="h-7 sm:h-8 w-auto object-contain rounded-md"
            />
            <span className="font-bold text-blue-600 text-base sm:text-lg tracking-tight">
              Calibre Tutorials
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`;
              const isActive = location.pathname === path;
              return (
                <li key={link}>
                  <Link
                    to={path}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:block bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              Join Now!
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <img src={calibreLogo} alt="Calibre Tutorials Logo" className="h-7 w-auto rounded-md" />
              <span className="font-bold text-blue-600 text-sm">Calibre Tutorials</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`;
              const isActive = location.pathname === path;
              return (
                <Link
                  key={link}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link}
                </Link>
              );
            })}
          </div>

          {/* Drawer CTA */}
          <div className="px-4 pb-8 pt-2 border-t border-gray-100">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
            >
              Join Now! 🎓
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}