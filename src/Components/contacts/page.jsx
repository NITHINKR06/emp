import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../../Css/ContactForm.css'; // External CSS for layout and typography

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="contact-container"
    >
      <div className="contact-card">
        {/* Contact Details Section */}
        <motion.div variants={itemVariants} className="contact-details">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            We would love to hear from you. Please fill out the form and our team will reach out shortly.
          </p>
          <div className="contact-info-list">
            <motion.div variants={itemVariants} className="contact-info-item">
              <span className="info-label"><FaPhone className="contact-icon" /> Phone</span>
              <span className="info-text">+0123 4567 8910</span>
            </motion.div>
            <motion.div variants={itemVariants} className="contact-info-item">
              <span className="info-label"><FaEnvelope className="contact-icon" /> Email</span>
              <span className="info-text">hello@flowbase.com</span>
            </motion.div>
            <motion.div variants={itemVariants} className="contact-info-item">
              <span className="info-label"><FaMapMarkerAlt className="contact-icon" /> Address</span>
              <span className="info-text">102 Street 2714 Don</span>
            </motion.div>
          </div>
        </motion.div>
        {/* Contact Form Section */}
        <motion.div variants={itemVariants} className="contact-form">
          <div onSubmit={handleSubmit} className="contact-form-fields">
            <motion.div variants={itemVariants} className="form-field">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" required />
            </motion.div>

            <motion.div variants={itemVariants} className="form-field">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" required />
            </motion.div>

            <motion.div variants={itemVariants} className="form-field">
              <label className="form-label">Message</label>
              <textarea rows="4" className="form-input" required></textarea>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className="form-button"
              onClick={handleSubmit}
            >
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
