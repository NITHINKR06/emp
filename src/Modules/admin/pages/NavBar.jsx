import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function NavBar({ children }) {
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem("adminToken");
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setShowModal(false);
    navigate('/admin'); // Redirect to admin login page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <h1 className="navbar-brand">
            Administrator
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isAdminLoggedIn ? (
              <>
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/analytics" className="nav-link">
                      User Analytics
                    </Link>
                  </li>
                </ul>
                <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                  Logout
                </button>
              </>
            ) : (
              <div className="ms-auto">
                <Link to="/admin/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="container mt-4">{children}</div>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
