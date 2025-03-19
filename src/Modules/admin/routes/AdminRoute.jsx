import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../pages/AdminDashboard';
import CodeVerification from '../pages/CodeVerification';
import AdminSetup from '../pages/AdminSetup';
import EmailEntry from '../pages/EmailEntry';
import UserAnalytics from '../pages/UserAnalytics';
import NavBar from '../pages/NavBar';

const AdminRoute = () => {
  const [adminExists, setAdminExists] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/exists`);
        setAdminExists(response.data.exists);
      } catch (error) {
        console.error('Admin check error:', error);
      }
    };

    checkAdminExists();
  }, [BASE_URL]);

  // Show a loading message until the admin existence check completes.
  if (adminExists === null) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <NavBar>
      <Routes>
        {adminExists ? (
          // Admin exists: render routes for the logged-in admin workflow.
          <>
            <Route path="/verify-code" element={<CodeVerification />} />
            <Route
              path="/dashboard"
              element={
                localStorage.getItem('adminToken') ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route path="/analytics" element={<UserAnalytics />} />
            <Route path="/" element={<EmailEntry />} />
            {/* Catch-all: redirect any unknown route to the default */}
            <Route path="/*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          // Admin does NOT exist: force user to complete admin setup.
          <>
            <Route path="/setup" element={<AdminSetup />} />
            {/* Catch-all: redirect any unknown route to /setup */}
            <Route path="/*" element={<Navigate to="/admin" replace />} />
          </>
        )}
      </Routes>
    </NavBar>
  );
};

export default AdminRoute;
