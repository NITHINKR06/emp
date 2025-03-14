import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PreventAccess = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("token");

  // Define auth pages that should not be accessed if the token exists
  const authPages = ["/auth/login", "/auth/signup", "/auth/resetpassword"];
  if (token && authPages.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PreventAccess;
