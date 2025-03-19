// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, Alert, Spinner, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaUser, FaUserTie } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
  const API = {
    users: `${BASE_URL}/api/admin/users`,
    employees: `${BASE_URL}/api/admin/employees`
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, employeesRes] = await Promise.all([
          axios.get(API.users),
          axios.get(API.employees)
        ]);
        setUsers(usersRes.data);
        setEmployees(employeesRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4" style={{ minHeight: '100vh' }}>
      <h1 className="mb-4">
        <FaUserTie className="me-2" />
        Admin Dashboard
      </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Summary Cards */}
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="text-white bg-primary">
            <Card.Body>
              <FaUser className="fs-1 mb-2" />
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{users.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-info">
            <Card.Body>
              <FaUserTie className="fs-1 mb-2" />
              <Card.Title>Employees</Card.Title>
              <Card.Text className="display-4">{employees.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Data Tabs */}
      <Tabs defaultActiveKey="users" className="mb-3">
        <Tab eventKey="users" title="Users">
          <Table striped bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="employees" title="Employees">
          <Table striped bordered hover responsive>
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.company?.bs || ''}</td>
                  <td>{emp.company?.name || ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
