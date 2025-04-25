import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation, Link } from "react-router-dom";
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Button } from "react-bootstrap";
import "../../Css/Navbar.css";
import Cookies from "js-cookie";
import DocumentationModal from "../../Modules/Documentation";

const userLinks = [
  { path: "/user/booking", label: "Bookings" },
  { path: "/user/booking/status", label: "Booking Status" },
  { path: "/user/profile", label: "Profile" },
];

const employeeLinks = [
  { path: "/employee/booking", label: "Bookings" },
  { path: "/employee/profile", label: "Dashboard" },
];

const publicLinks = [
  { label: "Documentation", onClick: true },
  { path: "/about", label: "About Us" },
  { path: "/contacts", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  const isLoggedIn = Boolean(token);
  let role = null;

  if (isLoggedIn) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.user.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  let navigationLinks = [...publicLinks];
  if (role === "employee") {
    navigationLinks = [...publicLinks, ...employeeLinks];
  } else if (role === "user") {
    navigationLinks = [...publicLinks, ...userLinks];
  }

  const handleNavClose = () => setNavOpen(false);

  const handleLogoutConfirm = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  const renderLink = (link, isMobile = false) => {
    if (link.path) {
      return (
        <Link
          key={link.path}
          to={link.path}
          className={`${isMobile ? "mobile-" : ""}nav-link ${
            pathname === link.path ? "active" : ""
          }`}
          onClick={handleNavClose}
        >
          {link.label}
        </Link>
      );
    }
    if (link.onClick) {
      return (
        <button
          key={link.label}
          className={`${isMobile ? "mobile-" : ""}nav-link`}
          onClick={() => setShowDocsModal(true)}
        >
          {link.label}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="blu">
      <header className="navbar-header">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            Shram
          </Link>

          <nav className="desktop-nav">
            {navigationLinks.map((link) => renderLink(link))}
            {isLoggedIn ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="logout-button"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth/login">
                <button className="desktop-login-button">Login</button>
              </Link>
            )}
          </nav>

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

        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="mobile-menu"
            >
              {navigationLinks.map((link) => renderLink(link, true))}
              {isLoggedIn ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="logout-button"
                >
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

      <DocumentationModal
        show={showDocsModal}
        onHide={() => setShowDocsModal(false)}
      />

      {/* this is logout section */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="logout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="logout-modal"
              initial={{ y: "-50%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-50%" }}
              transition={{ duration: 0.3 }}
            >
              <h2>Confirm Logout</h2>
              <p>Are you sure you want to logout?</p>
              <div className="modal-buttons">
                <button className="confirm-logout" onClick={handleLogoutConfirm}>
                  Yes
                </button>
                <button
                  className="cancel-logout"
                  onClick={() => setShowLogoutModal(false)}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* this is docs section */}
      {/* <AnimatePresence>
        {showDocsModal && (
          <motion.div
            className="logout-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="logout-modal"
              initial={{ y: "-50%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-50%" }}
              transition={{ duration: 0.3 }}
            >
                    <DocumentationModal
                      // onHide={() => setShowDocsModal(false)}
                    />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

    </div>
  );
}

export default Navbar;