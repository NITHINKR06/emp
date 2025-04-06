// import React, { useState, useEffect } from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import AdminDashboard from '../pages/AdminDashboard';
// import CodeVerification from '../pages/CodeVerification';
// import AdminSetup from '../pages/AdminSetup';
// import EmailEntry from '../pages/EmailEntry';
// import UserAnalytics from '../pages/UserAnalytics';
// import NavBar from '../pages/NavBar';

// const AdminRoute = () => {
//   const [adminExists, setAdminExists] = useState(null);
//   const navigate = useNavigate();
//   const BASE_URL = 'http://localhost:5000';

//   useEffect(() => {
//     const checkAdminExists = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/admin/exists`);
//         setAdminExists(response.data.exists);
//       } catch (error) {
//         console.error('Admin check error:', error);
//       }
//     };

//     checkAdminExists();
//   }, [BASE_URL]);

//   // Show a loading message until the admin existence check completes.
//   if (adminExists === null) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   return (
//     <NavBar>
//       <Routes>
//         <Route path="/verify-code" element={<CodeVerification />} />
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         <Route path="/analytics" element={<UserAnalytics />} />
//         <Route path="/admin/register" element={<EmailEntry />} />
//         <Route path="/setup" element={<AdminSetup />} />
//         {/* Default fallback route */}
//         <Route path="/*" element={<Navigate to="/admin/verify-code" replace />} />
//       </Routes>
//     </NavBar>
//   );
// };

// export default AdminRoute;

