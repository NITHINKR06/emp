import React from "react";
import { FiBriefcase, FiFileText, FiBookOpen } from "react-icons/fi";
import "../../../Css/Services.css"; // Make sure to import the CSS file

function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        {/* Card 1 */}
        <div className="service-card">
          <div className="card-overlay">01</div>
          <div className="service-icon">
            <FiBriefcase />
          </div>
          <h3 className="service-title">Job Opportunities</h3>
          <p className="service-description">
            Explore diverse job openings tailored to your skills. Connect with top employers and kickstart your career.
          </p>
        </div>

        {/* Card 2 */}
        <div className="service-card">
          <div className="card-overlay">02</div>
          <div className="service-icon">
            <FiFileText />
          </div>
          <h3 className="service-title">Resume Optimization</h3>
          <p className="service-description">
            Enhance your professional profile with expert advice on refining your resume, ensuring you stand out in a competitive market.
          </p>
        </div>

        {/* Card 3 */}
        <div className="service-card">
          <div className="card-overlay">03</div>
          <div className="service-icon">
            <FiBookOpen />
          </div>
          <h3 className="service-title">Skill Development</h3>
          <p className="service-description">
            Upgrade your skills through targeted training programs and resources designed to boost your career growth.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
