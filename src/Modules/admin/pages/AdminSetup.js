// src/components/AdminLogin/AdminSetup.js
import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSetup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/setup`, formData);
      if (response.data.success) {
        navigate('/admin/verify-code', { state: { email: formData.email } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Setup failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Initial Admin Setup</h2>
        <p className="text-center text-muted">Create your administrator account</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AdminSetup;