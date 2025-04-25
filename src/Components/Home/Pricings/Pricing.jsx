import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../../Css/Pricing.css";
import { FaBriefcase, FaUsers, FaAward } from "react-icons/fa";

function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleToggle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  // Variants for the card container with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  // Variants for each pricing card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Variants for feature list items
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Animation for price text transition
  const priceVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Toggle indicator animation
  const toggleIndicatorAnimation = {
    x: billingCycle === "yearly" ? 40 : 0, // adjust value based on your CSS width
  };

  return (
    <section className="pricing-section">
      <p className="section-subtitle">EMPLOYMENT PLANS</p>
      <h2 className="section-title">Choose the Best Employment Plan</h2>

      {/* Toggle: Yearly vs Monthly */}
      <div className="billing-toggle" onClick={handleToggle}>
        <span>Monthly</span>
        <div className="toggle-switch">
          <motion.div
            className="toggle-indicator"
            animate={toggleIndicatorAnimation}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
        <span>Yearly</span>
      </div>

      {/* Pricing Cards Container with staggered animation */}
      <motion.div
        className="pricing-cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Basic Plan */}
        <motion.div
          className="pricing-card"
          variants={cardVariants}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaBriefcase />
            </div>
            <h3 className="plan-name">Basic</h3>
            <p className="plan-price">
              <motion.span
                key={billingCycle}
                variants={priceVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {billingCycle === "monthly" ? "Rs. 435" : "Rs. 4350"}
              </motion.span>
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              {[
                "Post up to 5 job listings",
                "Basic candidate screening",
                "Email support",
                "Access to candidate database",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>

        {/* Standard Plan */}
        <motion.div
          className="pricing-card highlighted"
          variants={cardVariants}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaUsers />
            </div>
            <h3 className="plan-name">Standard</h3>
            <p className="plan-price">
              <motion.span
                key={billingCycle}
                variants={priceVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {billingCycle === "monthly" ? "Rs. 1305" : "Rs. 13050"}
              </motion.span>
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              {[
                "Post up to 10 job listings",
                "Advanced candidate matching",
                "24/7 support",
                "Detailed analytics",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          className="pricing-card"
          variants={cardVariants}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaAward />
            </div>
            <h3 className="plan-name">Premium</h3>
            <p className="plan-price">
              <motion.span
                key={billingCycle}
                variants={priceVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                {billingCycle === "monthly" ? "Rs. 2175" : "Rs. 21750"}
              </motion.span>
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              {[
                "Unlimited job postings",
                "Premium candidate matching",
                "Dedicated account manager",
                "Advanced analytics & support",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Pricing;
