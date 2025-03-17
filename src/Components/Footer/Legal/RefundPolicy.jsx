import React from 'react';
import '../css/Legal.css';

function RefundPolicy () {
  return (
    <div className="legal-container">
        <h1 className="legal-title">Refund Policy</h1>

      {/* Refund Scenarios Expansion */}
      <div className="legal-section">
        <h2 className="section-heading">Comprehensive Refund Scenarios</h2>
        <div className="legal-content">
          <h5 className="subsection-heading">Technical Failures</h5>
          <ul className="refund-condition-list">
            <li>Double-charging due to payment gateway errors</li>
            <li>Service unavailability - 99.9% SLA</li>
            <li>Data loss from platform outages</li>
          </ul>

          <h5 className="subsection-heading">Service Quality Issues</h5>
          <div className="quality-matrix">
            <table className="data-retention-table">
              <thead>
                <tr>
                  <th>Issue Severity</th>
                  <th>Refund Percentage</th>
                  <th>Resolution Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Minor Inconvenience</td>
                  <td>10% Credit</td>
                  <td>48 hours</td>
                </tr>
                <tr>
                  <td>Service Disruption</td>
                  <td>50% Refund</td>
                  <td>5 days</td>
                </tr>
                <tr>
                  <td>Complete Failure</td>
                  <td>100% Refund</td>
                  <td>Immediate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dispute Resolution Expansion */}
      {/*  */}

      {/* International Refunds */}
      <div className="legal-section">
        <h2 className="section-heading">Global Refund Considerations</h2>
        <div className="legal-content">
          <h5 className="subsection-heading">Currency Conversion</h5>
          <ul className="refund-condition-list">
            <li>Refunds issued in original currency</li>
            <li>FX rates locked at transaction time</li>
            <li>No fee for currency conversion</li>
          </ul>

          <h5 className="subsection-heading">Regional Regulations</h5>
          <div className="compliance-badges">
            <span className="compliance-badge">EU Distance Selling</span>
            <span className="compliance-badge">AU Consumer Law</span>
            <span className="compliance-badge">UK CCR 2013</span>
          </div>
        </div>
      </div>

      {/* Service Credits Expansion */}
      <div className="legal-section">
        <h2 className="section-heading">Advanced Credit System</h2>
        <div className="legal-content">
          <h5 className="subsection-heading">Credit Valuation</h5>
          <ul className="refund-condition-list">
            <li>1 Credit = 1 USD equivalent</li>
            <li>Stackable with promotions</li>
            <li>No expiration date</li>
          </ul>

          <h5 className="subsection-heading">Credit Usage Rules</h5>
          <div className="data-table">
            <table className="data-retention-table">
              <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Credit Coverage</th>
                  <th>Blackout Dates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Appointments</td>
                  <td>100%</td>
                  <td>None</td>
                </tr>
                <tr>
                  <td>Premium Services</td>
                  <td>50%</td>
                  <td>Holidays</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;