import React from 'react';
import { motion } from 'framer-motion';
import '../../../Css/TopContent.css';
import landing from "../../../img/company.png";

export default function TopContent() {
  // Container variant for staggering child animations
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  // Variant for individual items
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

  // Accent bar variant for the title underline effect
  const accentVariants = {
    hidden: { width: 0 },
    show: {
      width: "100%",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="main">
      {/* Left Section - Text Content */}
      <motion.div 
        className="content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="title" variants={itemVariants}>
          Elevate Your Learning Journey 🚀
        </motion.h1>
        {/* Animated accent underline */}
        <motion.div 
          className="accent-bar"
          variants={accentVariants}
          initial="hidden"
          animate="show"
        />
        <motion.p className="description" variants={itemVariants}>
          Discover courses crafted to enhance your skills and fuel your passion. 
          Start your journey today!
        </motion.p>
        {/*  
        <motion.div className="button-container" variants={itemVariants}>
          <motion.button 
            className="button primary"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button 
            className="button secondary"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Courses
          </motion.button>
        </motion.div>
        */}
      </motion.div>

      {/* Right Section - Image */}
      <motion.div 
        className="image-wrapper"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src={landing}
          alt="Learning illustration"
          className="landing-image"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        />
      </motion.div>
    </main>
  );
}
