// src/components/AdminLogin/CodeVerification.js
import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CodeVerification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/admin/verify-code`, {
        email,
        code
      });
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid verification code');
      console.log(err.message)
    }
    setLoading(false);
  };

  if (!email) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Verify Code</h2>
        <p className="text-center">Code sent to {email}</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleVerify}>
          <Form.Group className="mb-3">
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CodeVerification;