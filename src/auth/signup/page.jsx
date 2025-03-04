import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import img from "../../Css/SignupPage.css"; // Adjust the path as needed
import "../../Css/SignupPage.css"; // Import the external CSS file

const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.1 } // Fast, nearly instant animation
  },
};

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Signing up with:", username, email, password);
    // Implement signup logic here
  };

  return (
    <div className="signup-container">
      {/* Signup Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="signup-card"
      >
        <div className="logo-section">
          <img src={img} alt="Logo" className="logo-image" />
        </div>
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="signup-form">
          {/* Username Field */}
          <div className="input-group">
            <FiUser size={20} className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

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

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <div className="input-group">
            <FiLock size={20} className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle"
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={cardAnimation}
            className="submit-button"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>

      {/* Bottom Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="bottom-card"
      >
        <p className="bottom-text">
          Have an account?{" "}
          <a href="/auth/login" className="bottom-link">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
}
