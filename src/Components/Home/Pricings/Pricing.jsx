import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../../Css/Pricing.css";
import { FaChartLine, FaRocket, FaGem } from "react-icons/fa";

function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleToggle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  // Variants for the card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pricing-section">
      <p className="section-subtitle">PRICING PLAN</p>
      <h2 className="section-title">Choose Your Best Pricing Plan</h2>

      {/* Toggle: Yearly vs Monthly */}
      <div className="billing-toggle">
        <span>Monthly</span>
        <div
          className={`toggle-switch ${billingCycle === "yearly" ? "active" : ""}`}
          onClick={handleToggle}
        >
          <div className="toggle-indicator"></div>
        </div>
        <span>Yearly</span>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards">
        {/* Basic Plan */}
        <motion.div
          className="pricing-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaChartLine />
            </div>
            <h3 className="plan-name">Basic</h3>
            <p className="plan-price">
              {billingCycle === "monthly" ? "$5" : "$50"}
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              <li>Increase traffic 50%</li>
              <li>Social Media Marketing</li>
              <li>10 Free Optimization</li>
              <li>24/7 Support</li>
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>

        {/* Standard (Highlighted) */}
        <motion.div
          className="pricing-card highlighted"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaRocket />
            </div>
            <h3 className="plan-name">Standard</h3>
            <p className="plan-price">
              {billingCycle === "monthly" ? "$15" : "$150"}
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              <li>Increase traffic 60%</li>
              <li>Social Media Marketing</li>
              <li>15 Free Optimization</li>
              <li>24/7 Support</li>
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          className="pricing-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="pricing-card-content">
            <div className="pricing-icon">
              <FaGem />
            </div>
            <h3 className="plan-name">Premium</h3>
            <p className="plan-price">
              {billingCycle === "monthly" ? "$25" : "$250"}
              <span>/ {billingCycle}</span>
            </p>
            <ul className="plan-features">
              <li>Increase traffic 80%</li>
              <li>Social Media Marketing</li>
              <li>20 Free Optimization</li>
              <li>24/7 Support</li>
            </ul>
            <button className="plan-button">Get Started</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
