import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AuthNavbar from "./NavAuth";

export default function NavbarWrapper() {
  const location = useLocation(); // Get current route

  // Check if the current route is an authentication page
  const isAuthPage = /^\/auth(\/|$)/.test(location.pathname.toLowerCase());

  return isAuthPage ? <AuthNavbar /> : <Navbar />;
}
