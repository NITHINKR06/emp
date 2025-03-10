import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../../Css/AboutUs.css';

import img1 from '../../img/vision.png';
import img2 from '../../img/about.png';
import img3 from '../../img/mission.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function AboutUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="about-us-container"
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? {} : containerVariants}
    >
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        variants={shouldReduceMotion ? {} : itemVariants}
      >
        <motion.div className="hero-text" variants={shouldReduceMotion ? {} : itemVariants}>
          <h1 className="hero-title">Join Our Team</h1>
          <p className="hero-subtitle">
            Discover exciting career opportunities and grow with a company committed to innovation, collaboration, and professional development.
          </p>
        </motion.div>
        <motion.div className="hero-image-container" variants={shouldReduceMotion ? {} : itemVariants}>
          <div className="image-wrapper">
            {/* Background layer */}
            <motion.div className="image-bg" whileHover={{ scale: 1.05 }} />
            {/* Foreground layer with slight offset */}
            {/* <motion.div className="image-foreground" whileHover={{ scale: 1.05, rotate: 3 }} /> */}
            <img
              src={img2}
              alt="Career Opportunities"
              className="image-ab"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Culture and Career Growth Section */}
      <motion.section
        className="mission-section"
        variants={shouldReduceMotion ? {} : containerVariants}
      >
        <motion.div
          className="card"
          variants={shouldReduceMotion ? {} : itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="icon-wrapper">
            <img
              src={img1}
              alt="Our Culture"
              className="image-v"
            />
          </div>
          <h2 className="card-title">Our Culture</h2>
          <p className="card-text">
            We foster a dynamic, inclusive work environment that values creativity, collaboration, and continuous learning. Your growth is our priority.
          </p>
        </motion.div>
        <motion.div
          className="card"
          variants={shouldReduceMotion ? {} : itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="icon-wrapper">
            <img
              src={img3}
              alt="Career Growth"
              className="image-m"
            />
          </div>
          <h2 className="card-title">Career Growth</h2>
          <p className="card-text">
            Join us to advance your career with opportunities for professional development, mentorship, and impactful projects that shape the future.
          </p>
        </motion.div>
      </motion.section>

      {/* Footer Section */}
      <motion.section
        className="footer-section"
        variants={shouldReduceMotion ? {} : itemVariants}
      >
        <p>
          Embark on a rewarding career journey with us and shape your future.
        </p>
      </motion.section>
    </motion.div>
  );
}
