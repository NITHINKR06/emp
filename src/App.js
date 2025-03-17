import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Atom } from "react-loading-indicators"; // Import the Atom loader
import "./App.css";
import PrivacyPolicy from "./Components/Footer/Legal/PrivacyPolicy";
import RefundPolicy from "./Components/Footer/Legal/RefundPolicy";
import Accessibility from "./Components/Footer/Legal/Accessibility";

// Lazy loaded components
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

// Layout component that wraps common elements like Navbar and Footer
const Layout = () => (
  <>
    <NavbarWrapper />
    <Outlet />
    <footer style={{ width: "100%", bottom: 0 }}>
      <Footer />
    </footer>
  </>
);

// Centered Fallback Loader
const Loader = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}>
    <Atom 
      color="#fd8600" 
      size="large" // Try "xlarge" or manually set width/height
      width="100px"  // Adjusted width
      height="100px" // Adjusted height
      text="KaarmiQ" 
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
            {/* Shared layout for all pages */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faqs" element={<FaqPage />} />
              <Route path="/contacts" element={<ContactForm />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/accessibility" element={<Accessibility />} />

              {/* Public Auth Routes with PreventAccess to block authenticated users */}
              <Route
                path="/auth/login"
                element={
                  <PreventAccess>
                    <LoginPage />
                  </PreventAccess>
                }
              />
              <Route
                path="/auth/resetpassword"
                element={
                  <PreventAccess>
                    <ResetPassword />
                  </PreventAccess>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <PreventAccess>
                    <SignupPage />
                  </PreventAccess>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/user/*"
                element={<URoute />}
              />
              <Route
                path="/employee/*"
                element={<ERoute />}
              />

              {/* Fallback for unmatched routes */}
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
