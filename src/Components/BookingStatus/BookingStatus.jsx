import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../Css/BookingStatus.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      type: 'spring',
      stiffness: 300,
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
    transition: { type: 'spring', stiffness: 200 },
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

const StarRating = ({ rating }) => (
  <div className="booking-rating">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        className={`star-icon ${i <= rating ? 'filled' : 'empty'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 00-1.175 0l-3.356 2.44c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.075 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
      </svg>
    ))}
  </div>
);

const BookingCard = ({ booking, isHovered, onHoverStart, onHoverEnd }) => (
  <motion.div
    className="booking-card"
    variants={cardVariants}
    whileHover="hover"
    onHoverStart={() => onHoverStart(booking._id)}
    onHoverEnd={onHoverEnd}
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
      Experience:{' '}
      <strong>
        {booking.experience} year{booking.experience > 1 ? 's' : ''}
      </strong>
    </motion.p>
    <motion.p
      className="booking-status"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      Status: <strong>{booking.status}</strong>
    </motion.p>
    {/* <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <StarRating rating={booking.rating} />
    </motion.div> */}
    <div className="booking-actions">
      <motion.button
        className="action-button cancel-button"
        variants={buttonVariants}
        aria-label="Cancel booking"
      >
        Cancel
      </motion.button>
      <div className="payment-container">
        <Link to={`/user/booking/status/${booking._id}`}>
          <motion.button
            className="action-button payment-button"
            variants={buttonVariants}
            aria-label="Proceed to payment"
          >
            Payment
          </motion.button>
        </Link>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="tooltip"
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className={`tooltip-content ${
                  booking.status === 'Pending' ? 'pending' : 'confirmed'
                }`}
              >
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
);

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [hoveredBookingId, setHoveredBookingId] = useState(null);
  const [error, setError] = useState(null);

  // Use your backend URL; it defaults to localhost if not set
  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.user.id;
    } catch (err) {
      setError('Invalid token.');
      return;
    }

    const fetchBookings = async () => {

      console.log(userId)
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data);
        console.log(data,'data')
      } catch (error) {
        console.log('Error fetching bookings:', error);
        setError('Error fetching bookings.');
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

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
            <BookingCard
              key={booking._id}
              booking={booking}
              isHovered={hoveredBookingId === booking._id}
              onHoverStart={(id) => setHoveredBookingId(id)}
              onHoverEnd={() => setHoveredBookingId(null)}
            />
          ))
        )}
      </motion.div>
    </div>
  );
}
