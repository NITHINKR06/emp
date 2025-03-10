import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../Css/LoginPage.css";

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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Implement login logic here
  };

  const images = [
    "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg",
    "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    "https://images.pexels.com/photos/3767377/pexels-photo-3767377.jpeg",
    "https://images.pexels.com/photos/18105/pexels-photo.jpg"
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  

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
        <img src={randomImage} alt="Signup Image" className="card-image" />

        </div>

          {/* Right Content Section */}
          <div className="login-card-content">
            {/* Logo Section */}
            <div className="logo-section">
              <h1>Employment</h1>
            </div>
            <h2 className="login-title">Login</h2>

            <form onSubmit={handleLogin} className="login-form">
              {/* Email Field */}
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
