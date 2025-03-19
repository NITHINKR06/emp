// src/components/AdminLogin/EmailEntry.js
import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailEntry = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/send-code`, { email });
      if (response.data.success) {
        navigate('/admin/verify-code', { state: { email } });
      }
    } catch (err) {
      setError('Invalid admin email or server error');
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Admin Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Sending Code...' : 'Send Verification Code'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EmailEntry;