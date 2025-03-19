import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { 
  FaChartBar, 
  FaUsers, 
  FaUserCheck, 
  FaUserTimes 
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import AdminSetup from './AdminSetup';

const UserAnalytics = () => {
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [employeeAnalytics, setEmployeeAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  useEffect(() => {

    const token = localStorage.getItem('adminToken');
    setAdminExists(token)

    const fetchAnalytics = async () => {
      try {
        // Concurrent API calls for user and employee analytics
        const [userRes, employeeRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/analytics/users`),
          axios.get(`${BASE_URL}/api/admin/analytics/employees`)
        ]);
        setUserAnalytics(userRes.data);
        setEmployeeAnalytics(employeeRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    // Only fetch analytics if adminExists is determined (not null)
    if (adminExists !== null) {
      fetchAnalytics();
    }
  }, [BASE_URL, adminExists]);

  // Handle loading states
  if (adminExists === null || loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Analytics...</p>
        <p className="mt-2">Try to login again...!</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <header className="text-center mb-5">
        <h2 style={{ fontWeight: 'bold', color: '#333' }}>
          <FaChartBar className="me-2" /> Analytics Dashboard
        </h2>
        <p className="text-muted">Overview of User and Employee Analytics</p>
      </header>
      <section className="mb-5">
        <h3 className="mb-4">User Analytics</h3>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUsers className="me-2 text-primary" /> Total Users
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {userAnalytics.totalUsers}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUserCheck className="me-2 text-success" /> Active Users
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {userAnalytics.activeUsers}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUserTimes className="me-2 text-danger" /> Inactive Users
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {userAnalytics.inactiveUsers}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-4">
          <h5>Monthly Registrations</h5>
          <ListGroup variant="flush">
            {userAnalytics.monthlyRegistrations.map((count, index) => (
              <ListGroup.Item key={index}>
                Month {index + 1}: {count} registrations
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </section>
      <section>
        <h3 className="mb-4">Employee Analytics</h3>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUsers className="me-2 text-primary" /> Total Employees
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {employeeAnalytics.totalEmployees}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUserCheck className="me-2 text-success" /> Active Employees
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {employeeAnalytics.activeEmployees}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title>
                  <FaUserTimes className="me-2 text-danger" /> Inactive Employees
                </Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {employeeAnalytics.inactiveEmployees}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-4">
          <h5>Monthly Registrations</h5>
          <ListGroup variant="flush">
            {employeeAnalytics.monthlyRegistrations.map((count, index) => (
              <ListGroup.Item key={index}>
                Month {index + 1}: {count} registrations
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </section>
    </Container>
  );
};

export default UserAnalytics;
