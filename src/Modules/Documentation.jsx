import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const DocumentationModal = ({ show, onHide }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="docs-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>System Documentation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="doc-container">
        <div className="doc-route-group">
          <button 
            className="doc-group-title doc-user-path"
            onClick={() => toggleSection('user')}
          >
            User Routes
          </button>
          {expandedSection === 'user' && (
            <div className="doc-route-list">
              <ul className="doc-route-items">
                <li>/user/booking - Create new bookings</li>
                <li>/user/booking/status - Check booking status</li>
                <li>/user/profile - User profile management</li>
              </ul>
            </div>
          )}
        </div>

        <div className="doc-route-group">
          <button 
            className="doc-group-title doc-employee-path"
            onClick={() => toggleSection('employee')}
          >
            Employee Routes
          </button>
          {expandedSection === 'employee' && (
            <div className="doc-route-list">
              <ul className="doc-route-items">
                <li>/employee/booking - Manage bookings</li>
                <li>/employee/profile - Employee dashboard</li>
              </ul>
            </div>
          )}
        </div>

        <div className="doc-route-group">
          <button 
            className="doc-group-title doc-admin-path"
            onClick={() => toggleSection('general')}
          >
            General Routes
          </button>
          {expandedSection === 'general' && (
            <div className="doc-route-list">
              <ul className="doc-route-items">
                <li>/about - About our company</li>
                <li>/contacts - Contact information</li>
                <li>/faq - Frequently Asked Questions</li>
              </ul>
            </div>
          )}
        </div>

        <div className="doc-architecture">
          <h3 className="doc-subtitle">Architecture Notes</h3>
          <ul className="doc-notes-list">
            <li>Role-based access control system</li>
            <li>JWT authentication for API requests</li>
            <li>Responsive mobile-first design</li>
            <li>State management with React hooks</li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentationModal;

// Add this CSS to your stylesheet
const styles = `
.docs-modal .doc-container {
  max-width: 100%;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

.docs-modal .doc-route-group {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.docs-modal .doc-group-title {
  width: 100%;
  padding: 1rem;
  margin: 0;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.docs-modal .doc-user-path { 
  background-color: #e8f4f8;
  color: #2d6187;
}

.docs-modal .doc-employee-path { 
  background-color: #f8f5e4;
  color: #8a7d4a;
}

.docs-modal .doc-admin-path { 
  background-color: #fae6e6;
  color: #9b4444;
}

.docs-modal .doc-route-list {
  padding: 1rem;
  background-color: #fafafa;
  border-top: 1px solid #eee;
}

.docs-modal .doc-route-items {
  list-style: none;
  padding-left: 1rem;
  margin: 0;
}

.docs-modal .doc-route-items li {
  padding: 0.5rem 0;
  line-height: 1.6;
  color: #4a5568;
}

.docs-modal .doc-architecture {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.docs-modal .doc-subtitle {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.docs-modal .doc-notes-list {
  padding-left: 1.5rem;
  line-height: 1.7;
  color: #4a5568;
}

.docs-modal .doc-notes-list li {
  margin-bottom: 0.5rem;
}
`;

// Inject styles (add this in your main CSS file)
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);