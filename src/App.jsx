import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { Atom } from "react-loading-indicators";
import "./App.css";
import AdminDashboard from "./Modules/admin/pages//AdminDashboard";
import CodeVerification from "./Modules/admin/pages//CodeVerification";
import AdminSetup from './Modules/admin/pages/AdminSetup'
import EmailEntry from "./Modules/admin/pages//EmailEntry";
import UserAnalytics from "./Modules/admin/pages//UserAnalytics";
import NavBar from "./Modules/admin/pages//NavBar";

// Public pages (lazy-loaded)
const Home = lazy(() => import("./Modules/Home"));
const AboutUs = lazy(() => import("./Components/about/page"));
const FaqPage = lazy(() => import("./Components/FAQ/FAQPage"));
const ContactForm = lazy(() => import("./Components/contacts/page"));
const LoginPage = lazy(() => import("./auth/login/LoginPage"));
const ResetPassword = lazy(() => import("./auth/resetpassword/page"));
const SignupPage = lazy(() => import("./auth/signup/page"));
const URoute = lazy(() => import("./Modules/User/router/uroute"));
const ERoute = lazy(() => import("./Modules/Employee/router/eroute"));
const Error = lazy(() => import("./Modules/Error"));
const NavbarWrapper = lazy(() => import("./Components/Navbar/WrappedNav"));
const Footer = lazy(() => import("./Components/Footer/Footer"));
const PreventAccess = lazy(() => import("./auth/PreventAuth"));

// Admin pages (imported directly)


// Inline AdminRoutes component to render all admin routes
const AdminRoutes = () => {
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

  // Display a loading message until the check is complete
  if (adminExists === null) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <NavBar>
      <Routes>
        {/* The paths here are relative to "/admin" */}
        <Route path="verify-code" element={<CodeVerification />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<UserAnalytics />} />
        <Route path="register" element={<EmailEntry />} />
        <Route path="setup" element={<AdminSetup />} />
        {/* Fallback admin route */}
        <Route path="*" element={<Navigate to="verify-code" replace />} />
      </Routes>
    </NavBar>
  );
};

// Layout for public routes (with Navbar and Footer)
const Layout = () => (
  <>
    <NavbarWrapper />
    <Outlet />
    <footer style={{ width: "100%", bottom: 0 }}>
      <Footer />
    </footer>
  </>
);

// Centered fallback loader
const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Atom
      color="#fd8600"
      size="large"
      width="100px"
      height="100px"
      text="Shram"
      textColor="#f1853a"
    />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Render Admin routes directly within App */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Public routes wrapped with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contacts" element={<ContactForm />} />
              {/* Additional public pages */}
              <Route path="/auth/login" element={
                <PreventAccess>
                  <LoginPage />
                </PreventAccess>
              } />
              <Route path="/auth/resetpassword" element={
                <PreventAccess>
                  <ResetPassword />
                </PreventAccess>
              } />
              <Route path="/auth/signup" element={
                <PreventAccess>
                  <SignupPage />
                </PreventAccess>
              } />
              <Route path="/user/*" element={<URoute />} />
              <Route path="/employee/*" element={<ERoute />} />
            </Route>
            {/* Fallback for any unmatched routes */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
