import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../../../Css/SettingsPage.css';

export default function SettingsPage() {
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobName: '',
    location: '',
    education: '',
    experience: '',
    about: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  const fileName = employee.profilePhotoUrl.split('\\').pop();

  // Animation variants for container and elements
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, yoyo: Infinity }
    }
  };

  // Fetch employee data on mount
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
    let employeeId;
    try {
      const decoded = jwtDecode(token);
      employeeId = decoded.user.id;
    } catch (err) {
      setError('Invalid token.');
      return;
    }

    axios
      .get(`${BASE_URL}/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        setEmployee(data);
        // Populate form fields with existing data
        setFormData({
          name: data.name || '',
          email: data.email || '',
          jobName: data.jobName || '',
          location: data.location || '',
          education: data.education || '',
          experience: data.experience || '',
          about: data.about || ''
        });
        // Optionally, set the current profile photo URL if available
        if (data.profilePhotoUrl) {
          setPreviewUrl(data.profilePhotoUrl);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError('Error fetching employee data');
      });
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change and preview the selected image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  // Submit the updated profile info (with profile photo if selected)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
    let employeeId;
    try {
      const decoded = jwtDecode(token);
      employeeId = decoded.user.id;
    } catch (err) {
      setError('Invalid token.');
      return;
    }

    // Create FormData and append all text fields and the file if selected
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("jobName", formData.jobName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("education", formData.education);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("about", formData.about);
    if (selectedFile) {
      formDataToSend.append("profilePhoto", selectedFile);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/employees/${employeeId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
            // Note: Do not set Content-Type manually. Axios will set it correctly for FormData.
          }
        }
      );
      setEmployee(response.data);
      setSuccess('Profile updated successfully!');
      setError(null);
      // Delay navigation so the user can see the success message
      navigate('/employee/profile');
      setTimeout(() => {
      }, 1000);
    } catch (err) {
      console.log(err.message);
      setError('Error updating profile.');
      setSuccess(null);
    }
  };

  // Delete rating and review by setting them to null
  const handleDeleteRatingReview = async () => {
    const token = Cookies.get('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
    let employeeId;
    try {
      const decoded = jwtDecode(token);
      employeeId = decoded.user.id;
    } catch (err) {
      setError('Invalid token.');
      return;
    }

    const updateData = { rating: null, review: null };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/employees/${employeeId}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEmployee(response.data);
      setSuccess('Rating and review deleted successfully!');
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError('Error deleting rating and review.');
      setSuccess(null);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  if (!employee) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <motion.div
      className="settings-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Settings Page</h1>
      {success && (
        <motion.div 
          className="success-message"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          {success}
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label>Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img src={`${BASE_URL}/uploads/Employee/${fileName}`} alt="Profile Preview" className="profile-preview" />
          )}
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input name="jobName" value={formData.jobName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Education:</label>
          <input name="education" value={formData.education} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Experience (years):</label>
          <input
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>About:</label>
          <textarea name="about" value={formData.about} onChange={handleChange} />
        </div>
        <motion.button 
          type="submit" 
          className="update-button"
          variants={buttonVariants}
          whileHover="hover"
        >
          Update Profile
        </motion.button>
      </form>
      <hr className="separator" />
      <div className="rating-review-section">
        <h2>Rating &amp; Review</h2>
        <p>
          <strong>Rating:</strong> {employee.rating ? employee.rating : 'No rating'}
        </p>
        <p>
          <strong>Review:</strong> {employee.review ? employee.review : 'No review'}
        </p>
        {(employee.rating || employee.review) && (
          <motion.button 
            onClick={handleDeleteRatingReview}
            className="delete-button"
            variants={buttonVariants}
            whileHover="hover"
          >
            Delete Rating &amp; Review
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
