// src/client/components/common/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/images/shared/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);

  return (
    <nav
      className="sticky top-0 bg-white shadow-sm z-50"
      aria-label="Main navigation"
    >
      {/* Skip to content link - visible only when tabbed to */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   bg-client-rose text-white px-4 py-2 rounded-lg z-50
                   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                   min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 min-h-[44px] 
                       transition-all duration-200 hover:scale-105"
            aria-label="Baraka Bliss - Home"
          >
            <img
              src={logo}
              alt="Baraka Bliss"
              className="h-8 w-auto"
              loading="eager"
            />
            <span className="text-xl font-bold text-client-green">
              Baraka Bliss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-client-text-primary hover:text-client-green 
                         transition-all duration-200 hover:scale-105
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-0 after:h-0.5 after:bg-client-green
                         after:transition-all after:duration-300
                         hover:after:w-full min-h-[44px] inline-flex items-center"
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              to="/apartments"
              className="text-client-text-primary hover:text-client-green 
                         transition-all duration-200 hover:scale-105
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-0 after:h-0.5 after:bg-client-green
                         after:transition-all after:duration-300
                         hover:after:w-full min-h-[44px] inline-flex items-center"
              aria-current={
                location.pathname === "/apartments" ? "page" : undefined
              }
            >
              Apartments
            </Link>
            <Link
              to="/contact"
              className="text-client-text-primary hover:text-client-green 
                         transition-all duration-200 hover:scale-105
                         relative after:absolute after:bottom-0 after:left-0 
                         after:w-0 after:h-0.5 after:bg-client-green
                         after:transition-all after:duration-300
                         hover:after:w-full min-h-[44px] inline-flex items-center"
              aria-current={
                location.pathname === "/contact" ? "page" : undefined
              }
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-client-text-primary rounded-lg
                       transition-all duration-200 hover:bg-gray-100
                       hover:scale-110 active:scale-95
                       min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FaTimes size={24} aria-hidden="true" />
            ) : (
              <FaBars size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 border-t border-client-border animate-slideIn"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-client-text-primary hover:text-client-green 
                           transition-all duration-200 hover:translate-x-2
                           py-3 px-4 rounded-lg hover:bg-gray-50
                           min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                <span className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-5 w-auto" />
                  Home
                </span>
              </Link>
              <Link
                to="/apartments"
                className="text-client-text-primary hover:text-client-green 
                           transition-all duration-200 hover:translate-x-2
                           py-3 px-4 rounded-lg hover:bg-gray-50
                           min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
                aria-current={
                  location.pathname === "/apartments" ? "page" : undefined
                }
              >
                Apartments
              </Link>
              <Link
                to="/contact"
                className="text-client-text-primary hover:text-client-green 
                           transition-all duration-200 hover:translate-x-2
                           py-3 px-4 rounded-lg hover:bg-gray-50
                           min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
                aria-current={
                  location.pathname === "/contact" ? "page" : undefined
                }
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
