import React from 'react';
import '../css/Legal.css';

const Accessibility = () => {
  return (
    <div className="legal-container">
      <h1 className="legal-title">Accessibility Commitment</h1>

      <div className="legal-section">
        <h6 className="section-heading">Our Standards</h6>
        <p className="legal-content">
          We strive to meet WCAG 2.1 AA standards for digital accessibility.
        </p>
      </div>

      <div className="legal-section">
        <h6 className="section-heading">Accessibility Features</h6>
        <ul className="refund-condition-list">
          <li>Keyboard navigation support</li>
          <li>Alt text for all images</li>
          <li>ARIA labels for interactive elements</li>
          <li>Responsive design for various devices</li>
        </ul>
      </div>

      <div className="legal-section">
        <h6 className="section-heading">Ongoing Improvements</h6>
        <p className="legal-content">
          We conduct regular accessibility audits and welcome user feedback.
        </p>
      </div>

      <div className="legal-section">
        <h6 className="section-heading">Assistance</h6>
        <p className="legal-content">
          Contact our accessibility team at accessibility@yourcompany.com for:
        </p>
        <ul className="refund-condition-list">
          <li>Alternative format documents</li>
          <li>Accessibility-related feedback</li>
          <li>Special accommodation requests</li>
        </ul>
      </div>
    </div>
  );
};

export default Accessibility;