import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import img from "../../img/image.png"; // Adjust path as needed
import "../../Css/LoginPage.css"; // Import the external CSS file

const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.1 } // Fast, nearly instant animation
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Implement login logic here
  };

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
          {/* Logo Section */}
          <div className="logo-section">
            <img src={img} alt="Logo" className="logo-image" />
          </div>
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            {/* Email Field */}
            <div className="input-group">
              <FiMail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            {/* Password Field with Toggle */}
            <div className="input-group">
              <FiLock size={20} className="input-icon" />
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
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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
      </motion.div>

      {/* Sign up Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="back-login-card"
      >
        <span className="signup-text">
          Don't have an account?
        </span>
        <a href="/auth/signup" className="signup-link">
          Sign up
        </a>
      </motion.div>
    </div>
  );
}
