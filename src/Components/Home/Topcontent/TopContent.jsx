import React from 'react';
import { motion } from 'framer-motion';
import '../../../Css/TopContent.css';
import landing from "../../../img/image.png";

export default function TopContent() {
  return (
    <main className="main">
      {/* Left Section - Text Content */}
      <motion.div 
        className="content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="title">
          Elevate Your Learning Journey 🚀
        </h1>
        <p className="description">
          Discover courses crafted to enhance your skills and fuel your passion. 
          Start your journey today!
        </p>
        <div className="button-container">
          <motion.button 
            className="button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button 
            className="button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Courses
          </motion.button>
        </div>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div 
        className="image-wrapper"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={landing}
          alt="Learning illustration"
          className="landing-image"
        />
      </motion.div>
    </main>
  );
}
