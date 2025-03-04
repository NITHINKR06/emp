import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "../../Css/Navbar.css"; // Import the separate CSS file

// Desktop navigation links
const desktopLinks = [
  { path: "/about", label: "About Us" },
  { path: "/contacts", label: "Contact" },
  { path: "/faq", label: "FAQ" },
  { path: "/user/booking", label: "Bookings" },
  { path: "/user/booking/status", label: "Booking Status" },
];

// Mobile navigation links
const mobileLinks = [
  { path: "/about", label: "About" },
  { path: "/contacts", label: "Contact" },
  { path: "/faq", label: "FAQ" },
  { path: "/support", label: "Support" },
];

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  const handleNavClose = () => setNavOpen(false);

  return (
    <div className="blu">
      <header className="navbar-header">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            Edzzz
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {desktopLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  pathname === link.path ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/auth/login">
              <button className="desktop-login-button">Login</button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <IoClose className="mobile-menu-icon" />
            ) : (
              <IoReorderThreeOutline className="mobile-menu-icon" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="mobile-menu"
            >
              {mobileLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${
                    pathname === link.path ? "active" : ""
                  }`}
                  onClick={handleNavClose}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/auth/login">
                <button className="mobile-login-button">Login</button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

export default Navbar;
