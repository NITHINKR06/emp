import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../../Css/AboutUs.css'; // Import the external CSS file

import img from '../../img/image.png';

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
          <h1 className="hero-title">Our Journey</h1>
          <p className="hero-subtitle">
            From humble beginnings to a global impact, our story is built on passion, innovation, and a commitment to excellence.
          </p>
        </motion.div>
        <motion.div className="hero-image-container" variants={shouldReduceMotion ? {} : itemVariants}>
          <div className="image-wrapper">
            {/* Background layer */}
            <motion.div
              className="image-bg"
              whileHover={{ scale: 1.05 }}
            />
            {/* Foreground layer with slight offset */}
            <motion.div
              className="image-foreground"
              whileHover={{ scale: 1.05, rotate: 3 }}
            />
            <img
              src={img}
              alt="Our Journey"
              layout="fill"
              objectFit="cover"
              className="image"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Mission and Vision Section */}
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
              src={img}
              alt="Mission"
              layout="fill"
              objectFit="contain"
              className="image"
            />
          </div>
          <h2 className="card-title">Our Mission</h2>
          <p className="card-text">
            To innovate and inspire, creating solutions that empower communities and drive meaningful change.
          </p>
        </motion.div>
        <motion.div
          className="card"
          variants={shouldReduceMotion ? {} : itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="icon-wrapper">
            <img
              src={img}
              alt="Vision"
              layout="fill"
              objectFit="contain"
              className="image"
            />
          </div>
          <h2 className="card-title">Our Vision</h2>
          <p className="card-text">
            To lead with creativity and integrity, setting new standards for excellence in our industry.
          </p>
        </motion.div>
      </motion.section>

      {/* Footer Section */}
      <motion.section
        className="footer-section"
        variants={shouldReduceMotion ? {} : itemVariants}
      >
        <p>
          Join us as we explore new horizons and redefine the future.
        </p>
      </motion.section>
    </motion.div>
  );
}
