import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../pages/AdminDashboard';
import CodeVerification from '../pages/CodeVerification';
import AdminSetup from '../pages/AdminSetup';
import EmailEntry from '../pages/EmailEntry';
import UserAnalytics from '../pages/UserAnalytics';
import NavBar from '../pages/NavBar';

const AdminRoute = () => {
  const [adminExists, setAdminExists] = useState(null);
  const BASE_URL = 'http://localhost:5000';

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

  // Display a loading message until the admin existence check completes.
  if (adminExists === null) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Check if admin is logged in by verifying localStorage for an admin token.
  const adminLoggedIn = Boolean(localStorage.getItem('adminToken'));

  return (
    <NavBar>
      <Routes>
        {adminExists ? (
          <>
            {/* If admin is logged in, redirect verify-code to dashboard */}
            <Route
              path="/verify-code"
              element={
                adminLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <CodeVerification />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                adminLoggedIn ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/verify-code" replace />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                adminLoggedIn ? (
                  <UserAnalytics />
                ) : (
                  <Navigate to="/verify-code" replace />
                )
              }
            />
            <Route path="/register" element={<EmailEntry />} />
            {/* Catch-all: redirect any unknown route to verify-code */}
            <Route path="/*" element={<Navigate to="/verify-code" replace />} />
          </>
        ) : (
          <>
            {/* If no admin exists, force setup */}
            <Route path="/setup" element={<AdminSetup />} />
            {/* Catch-all: redirect unknown routes to /setup */}
            <Route path="/*" element={<Navigate to="/admin/setup" replace />} />
          </>
        )}
      </Routes>
    </NavBar>
  );
};

export default AdminRoute;
