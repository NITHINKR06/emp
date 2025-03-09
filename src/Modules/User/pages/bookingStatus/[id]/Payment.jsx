import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentsModel from '../../../../../auth/payment/PaymentsModel';
import { data } from '../../../../../data/BookingStauts/data';
import '../../../../../Css/Payment.css';

export default function Payment() {
  const { id } = useParams(); // Extract the booking ID from the URL
  const booking = data.find((booking) => booking._id === id);
  const [showModal, setShowModal] = useState(false);

  // Animation variants for the page
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3, repeat: Infinity, repeatType: 'mirror' },
    },
  };

  if (!booking) {
    return (
      <motion.div className="not-found-container"
        initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="not-found-title" variants={itemVariants}>
          Payment Page
        </motion.h1>
        <motion.p className="not-found-message" variants={itemVariants}>
          No booking found for ID: {id}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="payment-page">
      <motion.div className="payment-card" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="payment-title" variants={itemVariants}>
          Payment Portal
        </motion.h1>

        <motion.div className="booking-details" variants={itemVariants}>
          <motion.h2 className="details-header" variants={itemVariants}>
            Booking Details
          </motion.h2>
          <div className="details-grid">
            <motion.div className="detail-item" variants={itemVariants}>
              <span>ID:</span> {booking._id}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Name:</span> {booking.name}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Experience:</span> {booking.experience} {booking.experience > 1 ? 'years' : 'year'}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Status:</span> {booking.status}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Rating:</span> {booking.rating} / 5
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="payment-button-container" variants={itemVariants}>
          <motion.button className="proceed-button" onClick={() => setShowModal(true)}
            variants={buttonVariants} whileHover="hover">
            Proceed to Payment
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-window"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="modal-header">
                <h2>Checkout</h2>
                <button onClick={() => setShowModal(false)} className="close-button">&times;</button>
              </div>
              <div className="model">
                <PaymentsModel />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
