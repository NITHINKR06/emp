import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

// Lazy loaded components for improved performance
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
const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Shared layout for all pages */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contacts" element={<ContactForm />} />

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
                element={
                  // <PrivateRoute>
                    <URoute />
                  // </PrivateRoute>
                }
              />
              <Route
                path="/employee/*"
                element={
                  // <PrivateRoute>
                    <ERoute />
                  // </PrivateRoute>
                }
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
