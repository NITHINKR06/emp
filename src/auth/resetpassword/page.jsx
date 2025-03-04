import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { TbPasswordMobilePhone } from "react-icons/tb";
import "../../Css/ResetPassword.css"; // Import the external CSS

const cardAnimation = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 }, // Fast, nearly instant animation
  },
};

function ResetPassword () {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log(
      "Reset password for email:",
      email,
      "OTP:",
      otp,
      "New Password:",
      newPassword
    );
    // Implement your reset password functionality here
  };

  return (
    <div className="reset-container">
      {/* Reset Password Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="reset-card"
      >
        <h2 className="reset-title">Trouble logging in?</h2>
        <p className="reset-subtitle">
          Enter your email and the received OTP to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="reset-form">
          {/* Email Field */}
          <div className="input-group">
            <FiMail size={20} className="input-icon" />
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Send OTP Link */}
          <div className="send-otp">
            <button type="button" className="send-otp-button">
              Send OTP
            </button>
          </div>

          {/* OTP Field */}
          <div className="input-group">
            <label className="input-label">Enter OTP</label>
            <div className="otp-input-group">
              <TbPasswordMobilePhone size={20} className="input-icon" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field center-text"
                required
              />
            </div>
          </div>

          {/* New Password Field */}
          <div className="input-group">
            <FiLock size={20} className="input-icon" />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <FiLock size={20} className="input-icon" />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Reset Password Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={cardAnimation}
            className="reset-button"
          >
            Reset Password
          </motion.button>

          {/* Create New Account Link */}
          <div className="create-account">
            <a href="/auth/signup" className="create-account-link">
              Create new account
            </a>
          </div>
        </form>
      </motion.div>

      {/* Back to Login Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="back-login-card"
      >
        <a href="/auth/login" className="back-login-link">
          Back to Login
        </a>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
