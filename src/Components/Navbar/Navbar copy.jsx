import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode"; // Import jwt-decode to decode the token
import { useLocation, Link } from "react-router-dom";
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "../../Css/Navbar.css";

// Navigation links for different roles
const userLinks = [
  { path: "/user-dashboard", label: "Dashboard" },
  { path: "/profile", label: "Profile" },
  // ...other user-specific links
];

const employeeLinks = [
  { path: "/employee-dashboard", label: "Employee Dashboard" },
  { path: "/tasks", label: "My Tasks" },
  // ...other employee-specific links
];

// Fallback public links
const publicLinks = [
  { path: "/about", label: "About Us" },
  { path: "/contacts", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Get the token from cookies and check if logged in
  const token = Cookies.get("token");
  const isLoggedIn = Boolean(token);
  let role = null;

  // Decode token to extract role if user is logged in
  if (isLoggedIn) {
    try {
      const decodedToken = jwt_decode(token);
      role = decodedToken.role; // Ensure your token includes a "role" field
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Select navigation links based on role
  let navigationLinks = publicLinks;
  if (role === "employee") {
    navigationLinks = employeeLinks;
  } else if (role === "user") {
    navigationLinks = userLinks;
  }

  const handleNavClose = () => setNavOpen(false);

  const handleLogout = () => {
    // Remove the authentication token from cookies and navigate to login page
    Cookies.remove("token");
    navigate("/auth/login");
  };

  return (
    <div className="blu">
      <header className="navbar-header">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            KaarmiQ
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${pathname === link.path ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            ) : (
              <Link to="/auth/login">
                <button className="desktop-login-button">Login</button>
              </Link>
            )}
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
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`mobile-nav-link ${pathname === link.path ? "active" : ""}`}
                  onClick={handleNavClose}
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              ) : (
                <Link to="/auth/login">
                  <button className="mobile-login-button">Login</button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

export default Navbar;
