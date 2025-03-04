import React from "react";
import { FiTrendingUp, FiSettings, FiMail } from "react-icons/fi";
import "../../../Css/Services.css"; // Make sure to import the CSS file

// You can replace the icon placeholders below with real icons (SVGs, Font Awesome, etc.)
function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        {/* Card 1 */}
        <div className="service-card">
          <div className="card-overlay">01</div>
          <div className="service-icon">
            <FiTrendingUp />
          </div>
          <h3 className="service-title">Trend Analysis</h3>
          <p className="service-description">
            Curabitur pulvinar vel odio sod sagittis. Nam maximus ex diam, nec
            consectetur diam.
          </p>
          <button className="service-button">Read More</button>
        </div>

        {/* Card 2 */}
        <div className="service-card">
          <div className="card-overlay">02</div>
          <div className="service-icon">
            <FiSettings />
          </div>
          <h3 className="service-title">Site Optimization</h3>
          <p className="service-description">
            Curabitur pulvinar vel odio sod sagittis. Nam maximus ex diam, nec
            consectetur diam.
          </p>
          <button className="service-button">Discover More</button>
        </div>

        {/* Card 3 */}
        <div className="service-card">
          <div className="card-overlay">03</div>
          <div className="service-icon">
            <FiMail />
          </div>
          <h3 className="service-title">Email Design</h3>
          <p className="service-description">
            Curabitur pulvinar vel odio sod sagittis. Nam maximus ex diam, nec
            consectetur diam.
          </p>
          <button className="service-button">More Detail</button>
        </div>
      </div>
    </section>
  );
}

export default Services;
