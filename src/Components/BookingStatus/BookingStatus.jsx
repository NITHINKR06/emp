import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // or 'next/link' if using Next.js
import '../../Css/BookingStatus.css'; // Import the external CSS file

export default function BookingStatus() {
  const dummyBookings = [
    { _id: '1', name: 'John Doe', experience: 5, status: 'Confirmed', rating: 4 },
    { _id: '2', name: 'Jane Smith', experience: 8, status: 'Pending', rating: 5 },
    { _id: '3', name: 'Alice Johnson', experience: 3, status: 'Cancelled', rating: 3 },
    // ... more bookings
  ];

  const [bookings] = useState(dummyBookings);
  const [hoveredBookingId, setHoveredBookingId] = useState(null);

  // Animation variants for Framer Motion.
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9, rotate: -3 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 5, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 5, scale: 0.95, transition: { duration: 0.2 } },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`star-icon ${i <= rating ? 'filled' : 'empty'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 00-1.175 0l-3.356 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.075 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="booking-status-container">
      <motion.div
        className="booking-status-grid"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {bookings.length === 0 ? (
          <motion.p className="no-bookings-message" variants={cardVariants}>
            No bookings found. Try refreshing the page.
          </motion.p>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="booking-card"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.h5
                className="booking-title"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {booking.name}
              </motion.h5>
              <motion.p
                className="booking-experience"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Experience: <strong>{booking.experience} year{booking.experience > 1 ? 's' : ''}</strong>
              </motion.p>
              <motion.p
                className="booking-status"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Status: <strong>{booking.status}</strong>
              </motion.p>
              <motion.div
                className="booking-rating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {renderStars(booking.rating)}
              </motion.div>
              <div className="booking-actions">
                <motion.button
                  className="action-button cancel-button"
                  variants={buttonVariants}
                >
                  Cancel
                </motion.button>
                <div className="payment-container">
                  <motion.button
                    className="action-button payment-button"
                    variants={buttonVariants}
                    onHoverStart={() => setHoveredBookingId(booking._id)}
                    onHoverEnd={() => setHoveredBookingId(null)}
                  >
                    <Link to={`/user/booking/status/${booking._id}`}>
                      Payment
                    </Link>
                  </motion.button>
                  <AnimatePresence>
                    {hoveredBookingId === booking._id && (
                      <motion.div
                        className="tooltip"
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className={`tooltip-content ${booking.status === 'Pending' ? 'pending' : 'confirmed'}`}>
                          {booking.status === 'Pending'
                            ? 'Payment is pending'
                            : `Payment done with ID: ${booking._id}`}
                          <div className="tooltip-arrow" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
