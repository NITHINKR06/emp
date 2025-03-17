import React from 'react';
import '../css/Legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
    <h1 className="legal-title">Privacy Policy</h1>

    {/* Data Collection Expansion */}
    <div className="legal-section">
      <h2 className="section-heading">Comprehensive Data Collection</h2>
      <div className="legal-content">
        <h5 className="subsection-heading">User Registration Data</h5>
        <ul className="refund-condition-list">
          <li>Biographical information (name, contact details, birth date)</li>
          <li>Professional credentials (licenses, certifications)</li>
          <li>Business entity details (EIN, corporate structure)</li>
        </ul>

        <h5 className="subsection-heading">Service Interaction Data</h5>
        <ul className="refund-condition-list">
          <li>Appointment metadata (duration, reschedules, cancellations)</li>
          <li>Service-specific preferences (language, accessibility needs)</li>
          <li>Device fingerprints (browser configuration, OS version)</li>
        </ul>

        <h5 className="subsection-heading">Financial Data</h5>
        <div className="data-table">
          <table className="data-retention-table">
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Storage Duration</th>
                <th>Encryption Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Credit Card Tokens</td>
                <td>Until account deletion</td>
                <td>AES-256</td>
              </tr>
              <tr>
                <td>Transaction Records</td>
                <td>7 years</td>
                <td>PCI-DSS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Data Usage Expansion */}
    <div className="legal-section">
      <h2 className="section-heading">Detailed Data Utilization</h2>
      <div className="legal-content">
        <h5 className="subsection-heading">Service Optimization</h5>
        <ul className="refund-condition-list">
          <li>Machine learning models for employee-client matching</li>
          <li>Predictive analytics for service demand forecasting</li>
          <li>Quality assurance through session recordings</li>
        </ul>

        <h5 className="subsection-heading">Security Measures</h5>
        <div className="compliance-badges">
          <span className="compliance-badge">GDPR Compliant</span>
          <span className="compliance-badge">CCPA Ready</span>
          <span className="compliance-badge">HIPAA Certified</span>
        </div>

        <h5 className="subsection-heading">Third-Party Integrations</h5>
        <ul className="refund-condition-list">
          <li>Background check providers (Checkr, GoodHire)</li>
          <li>Calendar sync services (Google Calendar, Outlook)</li>
          <li>Analytics platforms (Mixpanel, Google Analytics)</li>
        </ul>
      </div>
    </div>

    {/* User Rights Expansion */}
    <div className="legal-section">
      <h2 className="section-heading">Extended User Rights</h2>
      <div className="legal-content">
        <h5 className="subsection-heading">EU Residents (GDPR)</h5>
        <ul className="refund-condition-list">
          <li>Right to data portability in machine-readable format</li>
          <li>Right to restrict processing during disputes</li>
          <li>Right to object to automated decision-making</li>
        </ul>

        <h5 className="subsection-heading">California Residents (CCPA)</h5>
        <ul className="refund-condition-list">
          <li>Right to know data collection categories</li>
          <li>Right to opt-out of data sales</li>
          <li>Right to non-discrimination for privacy choices</li>
        </ul>

        <div className="contact-info">
          <h5>Exercise Your Rights</h5>
          <p>Email: privacy@yourcompany.com<br/>
          Phone: 1-800-PRIVACY<br/>
          Postal: [Your Physical Address]</p>
        </div>
      </div>
    </div>

  </div>
  );
};

export default PrivacyPolicy;