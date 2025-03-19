import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // import js-cookie
import "../../Css/LoginPage.css";

import randomImage from '../../img/login.png'

const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 },
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      // console.log("Login successful. Token:", res.data.token);
      
      // Store token in a cookie with an expiration of 7 days, secure flag, and sameSite policy
      // Cookies.set("token", res.data.token, { expires: 7, secure: true, sameSite: "Strict" });

      const cookieOptions = {
        expires: 7,
        sameSite: "Strict",
        ...(process.env.NODE_ENV === "production" && { secure: true }),
      };
      
      Cookies.set("token", res.data.token, cookieOptions);      

      navigate("/");
    } catch (err) {
      console.log(
        "Error logging in:",
        err.response ? err.response.data.msg : err.message
      );
      // Optionally, display an error message to the user here
    }
  };

  // const images = [
  //   // "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg",
  // ];
  // const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="login-container">
      {/* Login Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="login-card"
      >
        <div className="login-card-inner">
          {/* Left Image Section */}
          <div className="card-left">
            <img src={randomImage} alt="Signup Image" className="login-card-image" />
          </div>
          {/* Right Content Section */}
          <div className="login-card-content">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button type="submit" className="submit-button">
                Log in
              </button>
              <div className="forgot-password">
                <a href="/auth/resetpassword">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      {/* Sign up Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="back-login-card"
      >
        <span className="signup-text">Don't have an account?</span>
        <a href="/auth/signup" className="signup-link">
          Sign up
        </a>
      </motion.div>
    </div>
  );
}
