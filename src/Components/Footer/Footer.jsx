import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import "../../Css/Footer.css"; // Import the CSS file

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", link: "#", icon: <FaFacebookF /> },
    { name: "Instagram", link: "#", icon: <FaInstagram /> },
    { name: "Twitter", link: "#", icon: <FaTwitter /> },
    { name: "GitHub", link: "#", icon: <FaGithub /> },
    { name: "Dribbble", link: "#", icon: <FaDribbble /> },
  ];

  const location = useLocation();
  const pathname = location.pathname;
  const authPages = ["/auth/login", "/auth/signup", "/auth/resetpassword"];

  if (authPages.includes(pathname)) {
    return null; // Hide footer on auth pages
  }

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About", route: "/about" },
        { name: "Meet the Team", route: "/team" },
        { name: "Accounts Review", route: "/reviews" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { name: "Contact Us", route: "/contacts" },
        { name: "About Us", route: "/about" },
        { name: "FAQs", route: "/faqs" },
        { name: "Live Chat", route: "/livechat" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Accessibility", route: "/accessibility" },
        { name: "Refund Policy", route: "/refund-policy" },
        { name: "Privacy Policy", route: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Left Section */}
          <div className="footer-left">
            <h1 className="footer-logo">Shram</h1>
            <p className="footer-description">
              Join us to unlock your potential with a wide variety of courses designed just for you.
            </p>
            <ul className="social-links">
              {socialLinks.map((social, index) => (
                <li key={index} className="social-item">
                  <Link
                    to={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                  >
                    {social.icon}
                    <span className="tooltip">{social.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            {footerSections.map((section, index) => (
              <div key={index} className="footer-section">
                <p className="footer-section-title">{section.title}</p>
                <ul className="footer-links">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.route} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Shram. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
