import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentsModel from '../../../../../auth/payment/PaymentsModel';
import { data } from '../../../../../data/BookingStauts/data';
import '../../../../../Css/Payment.css';

export default function Payment() {
  const { id } = useParams(); // Extract the booking ID from the URL
  const booking = data.find((booking) => booking._id === id);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  const [bookingDetails, setBookingDetails] = useState([])

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';
  
  useEffect(() => { 
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/status/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data, 'booking data');
        setBookingDetails(data);
      } catch (error) {
        console.log('Error fetching booking:', error);
        setError('Error fetching booking.');
      }
    };
  
    fetchBooking();
  }, [id]);
  

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
      <motion.div
        className="not-found-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
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
      <motion.div
        className="payment-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="payment-title" variants={itemVariants}>
          Payment Portal
        </motion.h1>

        <motion.div className="booking-details" variants={itemVariants}>
          <motion.h2 className="details-header" variants={itemVariants}>
            Booking Details
          </motion.h2>
          <div className="details-grid">
            <motion.div className="detail-item" variants={itemVariants}>
              <span>ID:</span> {bookingDetails._id}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Name:</span> {bookingDetails.name}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Experience:</span> {bookingDetails.experience}{' '}
              {bookingDetails.experience > 1 ? 'years' : 'year'}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Status:</span> {bookingDetails.status}
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="payment-button-container" variants={itemVariants}>
          <motion.button
            className="proceed-button"
            onClick={() => setShowModal(true)}
            variants={buttonVariants}
            whileHover="hover"
          >
            Proceed to Payment
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-window"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h2>Checkout</h2>
                <button onClick={() => setShowModal(false)} className="close-button">
                  &times;
                </button>
              </div>
              <div className="model">
                <PaymentsModel />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Section: Displaying Booking Statuses */}
      <motion.div
        className="booking-status-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ marginTop: '2rem' }}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Booking Statuses
        </motion.h2>
        <motion.div className="booking-status-list" variants={itemVariants}>
          {data.map((item) => (
            <motion.div
              key={item._id}
              className="booking-status-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="booking-name">{item.name}:</span>{' '}
              <span className="booking-status">{item.status}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
