import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../Css/SignupPage.css"; // Import your CSS file

const cardAnimation = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.3 } 
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } }
};

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

  // Simple evaluator: returns a score between 0 and 5
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthLabel = (score) => {
    if (score <= 1) return "Very Weak";
    if (score === 2) return "Weak";
    if (score === 3) return "Medium";
    if (score === 4) return "Strong";
    if (score === 5) return "Very Strong";
    return "";
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!username || !email) {
      setError("Please complete all fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Replace with your signup logic
    console.log("Signing up with:", username, email, password);
  };

  const images = [
    "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg",
    "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    "https://images.pexels.com/photos/3767377/pexels-photo-3767377.jpeg",
    "https://images.pexels.com/photos/18105/pexels-photo.jpg"
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="signup-container">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardAnimation}
        className="signup-card"
      >
        <div className="card-left">
        <img src={randomImage} alt="Signup Image" className="card-image" />

        </div>
        <div className="card-right">
          <div className="logo-section">
            {/* Replace with your actual logo image source */}
            <h1>KaarmiQ</h1>
          </div>
          <h2 className="signup-title">Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <motion.form
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardAnimation}
                className="signup-form"
                onSubmit={handleNextStep}
              >
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
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
                <button type="submit" className="next-button">
                  Next
                </button>
              </motion.form>
            )}
            {step === 2 && (
              <motion.form
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardAnimation}
                className="signup-form"
                onSubmit={handleSignup}
              >
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
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
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
                {/* Password Strength Meter */}
                <div className="strength-meter">
                  <div
                    className="strength-bar"
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="strength-label">
                  {password && strengthLabel(passwordStrength)}
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="submit-button">
                    Sign Up
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardAnimation}
        className="back-login-card"
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
