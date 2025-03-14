// EmployeeProfile.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaBriefcase, 
  FaInfoCircle, 
  FaStar, 
  FaStarHalfAlt,
  FaRegStar, 
  FaCommentDots 
} from 'react-icons/fa';
import "../../../../Css/EmployeeProfile.css";

function Profile({ employee }) {

  // Extract only the file name from the full path
  const fileName = employee.profilePhotoUrl.split('\\').pop();
  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';
  
  // Container animation using spring physics and staggered children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 90, damping: 15, staggerChildren: 0.2 }
    },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } }
  };

  // Variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Helper function to render stars based on rating value
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#ffa500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#ffa500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#ffa500" />);
    }
    return stars;
  };

  return (
    <motion.div 
      className="advanced-profile-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Profile Header */}
      <motion.div className="profile-header" variants={itemVariants}>
        <motion.img 
          src={`${BASE_URL}/uploads/Employee/${fileName}`}
          alt={employee.name} 
          className="profile-avatar"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.h2 className="profile-name" variants={itemVariants}>
          {employee.name}
        </motion.h2>
        <motion.p className="profile-job" variants={itemVariants}>
          {employee.jobName || 'N/A'}
        </motion.p>
      </motion.div>
      
      {/* Profile Details */}
      <motion.div className="profile-info" variants={itemVariants}>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">
              <FaEnvelope /> Email:
            </span>
            <span className="value">{employee.email}</span>
          </div>
          <div className="info-item">
            <span className="label">
              <FaMapMarkerAlt /> Location:
            </span>
            <span className="value">{employee.location || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">
              <FaGraduationCap /> Education:
            </span>
            <span className="value">{employee.education || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">
              <FaBriefcase /> Experience:
            </span>
            <span className="value">{employee.experience} years</span>
          </div>
          <div className="info-item full">
            <span className="label">
              <FaInfoCircle /> About:
            </span>
            <span className="value">{employee.about || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="label">
              <FaStar /> Rating:
            </span>
            <span className="value stars">
              {renderStars(employee.rating)}
              <span className="rating-number"> {employee.rating} / 5</span>
            </span>
          </div>
          <div className="info-item full">
            <span className="label">
              <FaCommentDots /> Review:
            </span>
            <span className="value">{employee.review || 'N/A'}</span>
          </div>
        </div>
      </motion.div>

      {/* Settings Button */}
      <motion.div variants={itemVariants}>
        <Link to="/employee/settings" style={{ textDecoration: 'none' }}>
          <motion.button 
            className="settings-button"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Settings
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
