// EmployeeProfile.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
} from 'react-icons/fa';
import "../../../../Css/EmployeeProfile.css";

function Profile({ user }) {

  // Extract only the file name from the full path
  const fileName = user?.profilePhotoUrl ? user.profilePhotoUrl.split('\\').pop() : '';
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
          src={`${BASE_URL}/uploads/User/${fileName}`}
          alt={user.name} 
          className="profile-avatar"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <motion.h2 className="profile-name" variants={itemVariants}>
          {user.name}
        </motion.h2>
      </motion.div>
      
      {/* Profile Details */}
      <motion.div className="profile-info" variants={itemVariants}>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">
              <FaEnvelope /> Email:
            </span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="label">
              <FaMapMarkerAlt /> Location:
            </span>
            <span className="value">{user.location || 'N/A'}</span>
          </div>
          <div className="info-item full">
            <span className="label">
              <FaInfoCircle /> About:
            </span>
            <span className="value">{user.about || 'N/A'}</span>
          </div>
        </div>
      </motion.div>

      {/* Settings Button */}
      <motion.div variants={itemVariants}>
        <Link to="/user/settings" style={{ textDecoration: 'none' }}>
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
