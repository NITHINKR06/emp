import React from "react";
import { motion } from "framer-motion";
import "../../../Css/FeatureSection.css";

// Example icon from react-icons
import { FiCheckCircle } from "react-icons/fi";

// Replace the image below with your actual phone image path
import phoneImage from "../../../img/Feature.png";

function FeatureSection() {
  // Variants for the container to stagger child animations
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  // Variants for each feature item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Variants for the phone image animation
  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="feature-section">
      {/* Left Side (Phone + Gradient) */}
      <motion.div 
        className="feature-section-left"
        initial="hidden"
        animate="show"
        variants={phoneVariants}
        whileHover="hover"
      >
        {/* <div className="circle-overlay"></div> */}
        <div className="phone-container">
          <motion.img 
            src={phoneImage} 
            alt="Phone" 
            className="phone-image"
            variants={phoneVariants}
          />
        </div>
      </motion.div>

      {/* Right Side (Employment Features) */}
      <motion.div 
        className="feature-section-right"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Employment Services & Features
        </motion.h2>

        {/* Feature #1 */}
        <motion.div className="feature-item" variants={itemVariants}>
          <div className="feature-icon">
            <FiCheckCircle />
          </div>
          <div className="feature-content">
            <h3>Personalized Job Matching</h3>
            <p>
              Our advanced platform tailors job opportunities to your unique skills and preferences, ensuring a perfect match.
            </p>
          </div>
        </motion.div>

        {/* Feature #2 */}
        <motion.div className="feature-item" variants={itemVariants}>
          <div className="feature-icon">
            <FiCheckCircle />
          </div>
          <div className="feature-content">
            <h3>Professional Resume Guidance</h3>
            <p>
              Receive expert tips to craft a compelling resume that highlights your strengths and stands out to employers.
            </p>
          </div>
        </motion.div>

        {/* Feature #3 */}
        <motion.div className="feature-item" variants={itemVariants}>
          <div className="feature-icon">
            <FiCheckCircle />
          </div>
          <div className="feature-content">
            <h3>Career Development Resources</h3>
            <p>
              Access a range of resources including training modules, industry insights, and networking opportunities to boost your career.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FeatureSection;
