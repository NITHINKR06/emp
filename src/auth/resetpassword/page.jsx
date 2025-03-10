import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../Css/ResetPassword.css"; // Import the external CSS

const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [timerCount, setTimerCount] = useState(60);
  const [error, setError] = useState("");

  // Countdown timer for resend OTP (active during step 2)
  useEffect(() => {
    let interval = null;
    if (step === 2 && timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timerCount]);

  const handleSendOTP = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoadingOTP(true);
    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingOTP(false);
    setStep(2);
    setTimerCount(60);
    console.log("OTP sent to email:", email);
  };

  const handleResendOTP = async () => {
    setLoadingOTP(true);
    // Simulate API call to resend OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingOTP(false);
    setTimerCount(60);
    console.log("OTP re-sent to email:", email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Simulate password reset API call here
    console.log(
      "Reset password for email:",
      email,
      "OTP:",
      otp,
      "New Password:",
      newPassword
    );
    // Optionally, you can add a success state or redirect here
  };

  return (
    <div className="reset-container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardAnimation}
        className="reset-card"
      >
        {step === 1 && (
          <>
            <h2 className="reset-title">Reset Password</h2>
            <p className="reset-description">
              Enter your email to receive an OTP for password reset.
            </p>
            {error && <div className="error-message">{error}</div>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendOTP();
              }}
              className="reset-form"
            >
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="send-otp">
                <button
                  type="submit"
                  className="send-otp-button"
                  disabled={loadingOTP}
                >
                  {loadingOTP ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="reset-title">Enter OTP & New Password</h2>
            <p className="reset-description">
              An OTP has been sent to <strong>{email}</strong>
            </p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="reset-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                variants={cardAnimation}
                className="reset-button"
              >
                Reset Password
              </motion.button>
              <div className="resend-otp">
                <button
                  type="button"
                  className="resend-button"
                  onClick={handleResendOTP}
                  disabled={loadingOTP || timerCount > 0}
                >
                  {timerCount > 0
                    ? `Resend OTP in ${timerCount}s`
                    : loadingOTP
                    ? "Resending..."
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          </>
        )}
        <div className="extra-links">
          <a href="/auth/signup" className="link">
            Create Account
          </a>
          <a href="/auth/login" className="link">
            Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
