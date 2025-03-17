import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentsModel from '../../../../../auth/payment/PaymentsModel';
import '../../../../../Css/Payment.css';

export default function Payment() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Define state variables for each field
  const [jobName, setJobName] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [status, setStatus] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  
  const navigate = useNavigate();
  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/status/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const bookingData = await response.json();
        console.log(bookingData, 'booking data');

        // Set each field separately
        setJobName(bookingData.jobName || '');
        setUserName(bookingData.userName || '');
        setUserEmail(bookingData.userEmail || '');
        setMobileNumber(bookingData.mobileNumber || '');
        setBookingTime(bookingData.bookingTime || '');
        setBookingDate(bookingData.bookingDate || '');
        setLocation(bookingData.location || '');
        setCurrentLocation(bookingData.currentLocation || '');
        setStatus(bookingData.status || '');
        setCancellationReason(bookingData.cancellationReason || '');
      } catch (error) {
        console.error('Error fetching booking:', error);
        setError('Error fetching booking.');
      }
    };

    fetchBooking();
  }, [id, BASE_URL]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (error) return <div>{error}</div>;

  return (
    <div className="payment-page">
      <motion.div className="payment-card" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className="payment-title" variants={itemVariants}>Payment Portal</motion.h1>

        <motion.div className="booking-details" variants={itemVariants}>
          <motion.h2 className="details-header" variants={itemVariants}>Booking Details</motion.h2>
          <div className="details-grid">
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Job Name:</span> {jobName}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>User Name:</span> {userName}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>User Email:</span> {userEmail}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Mobile Number:</span> {mobileNumber}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Booking Time:</span> {bookingTime}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Booking Date:</span> {new Date(bookingDate).toLocaleDateString()}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Location:</span> {location}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Current Location:</span> {currentLocation}
            </motion.div>
            <motion.div className="detail-item" variants={itemVariants}>
              <span>Status:</span> {status}
            </motion.div>
            {cancellationReason && (
              <motion.div className="detail-item" variants={itemVariants}>
                <span>Cancellation Reason:</span> {cancellationReason}
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div className="payment-button-container" variants={itemVariants}>
          <motion.button className="proceed-button" onClick={() => setShowModal(true)} whileHover={{ scale: 1.05 }}>
            Proceed to Payment
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-window" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
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
