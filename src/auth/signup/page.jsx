import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for API calls
import "../../Css/SignupPage.css"; // Import your CSS file

export default function SignupPage() {
  const navigate = useNavigate(); // Initialize navigate
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("user"); // Default to "user"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [jobName, setJaoName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!username || !email) {
      setError("Please complete all fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    const userData = {
      name: username,
      email,
      password,
      role: userType,
      ...(userType === "employee" && { location, jobName })
    };     

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, userData);
      // After a successful signup, navigate to the login page.
      navigate("/auth/login");
    } catch (err) {
      setError("Error signing up. Try again.");
    }
  };

  const images = [
    "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg",
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="card-left">
          <img src={randomImage} alt="Signup" className="card-image" />
        </div>
        <div className="card-right">
          <h2 className="signup-title">Sign Up</h2>

          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <form className="signup-form" onSubmit={handleNextStep}>
              {/* Role Selection */}
              <div className="input-box role-selector">
                <div className="role-options">
                  <button
                    type="button"
                    className={`role-option ${userType === 'user' ? 'active' : ''}`}
                    onClick={() => setUserType('user')}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    className={`role-option ${userType === 'employee' ? 'active' : ''}`}
                    onClick={() => setUserType('employee')}
                  >
                    Employee
                  </button>
                  <span
                    className="role-indicator"
                    style={{ transform: userType === 'user' ? 'translateX(0%)' : 'translateX(100%)' }}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="input-group">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" required />
              </div>

              {/* Email */}
              <div className="input-group">
                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
              </div>

              <button type="submit" className="next-button">Next</button>
            </form>
          )}

          {step === 2 && (
            <form className="signup-form" onSubmit={handleSignup}>
              {/* Password Fields */}
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="input-group">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle">
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Employee Specific Fields */}
              {userType === "employee" && (
                <>
                  <div className="input-group">
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" required />
                  </div>
                  <div className="input-group">
                    <input type="text" placeholder="JobName" value={jobName} onChange={(e) => setJaoName(e.target.value)} className="input-field" required />
                  </div>
                </>
              )}

              <div className="button-group">
                <button type="button" className="submit-button" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="submit-button">Sign Up</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="back-login-card">
        <span className="signup-text">Already have an account?</span>
        <a href="/auth/login" className="signup-link">Login</a>
      </div>
    </div>
  );
}
