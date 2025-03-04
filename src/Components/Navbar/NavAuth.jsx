import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Css/AuthNavbar.css"; // Import the separate CSS file

const AuthNavbar = () => {
  const { pathname } = useLocation();
  const authPages = ["/auth/login"];

  return (
    <header className="auth-navbar-header">
      <div className="auth-navbar-inner">
        {/* Logo */}
        <Link to="/" className="auth-navbar-logo">
          Edzzz
        </Link>

        {/* Navigation Links */}
        <nav className="auth-navbar-nav">
          {authPages.includes(pathname) ? (
            <Link to="/auth/signup">
              <button className="auth-navbar-button">Sign Up</button>
            </Link>
          ) : (
            <Link to="/auth/login">
              <button className="auth-navbar-button">Login</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AuthNavbar;
