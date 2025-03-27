import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // import js-cookie
import "../../Css/LoginPage.css";

import randomImage from '../../img/login.png';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      
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
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-inner">
          <div className="card-left">
            <img src={randomImage} alt="Signup" className="login-card-image" />
          </div>
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
      </div>
      <div className="back-login-card">
        <span className="signup-text">Don't have an account?</span>
        <a href="/auth/signup" className="signup-link">
          Sign up
        </a>
      </div>
    </div>
  );
}
