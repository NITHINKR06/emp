import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");

  console.log(token,'in the page of privatePoute')

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Verify token validity by checking its expiration
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return <Navigate to="/auth/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/auth/login" replace />;
  }

  // Optional: ensure navigation came from a valid source
  if (!location.state?.fromNavigation) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default PrivateRoute;
