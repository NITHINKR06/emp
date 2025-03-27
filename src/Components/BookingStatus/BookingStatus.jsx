import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../Css/BookingStatus.css';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const BookingCard = ({ booking, onClick }) => (
  <motion.div 
    className={`booking-card status-${booking.status.toLowerCase()}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    onClick={() => onClick(booking)}
  >
    <div className="card-cotent">
      <div className="card-header">
        <div className="job-info">
          <h3 className="job-title">{booking.jobName}</h3>
          <span className="job-priority">{booking.priority} Priority</span>
        </div>
        <span className={`status-badge ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
      </div>
      <div className="card-detils">
        <div className="detail-items">
          <span className="detail-icon">📅</span>
          <span className="detail-text">
            {new Date(booking.bookingDate).toLocaleDateString('en-US', {
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="detail-itms">
          <span className="detail-icon">⏳</span>
          <span className="detail-text">{booking.duration} Hours</span>
        </div>
      </div>
      <div className="card-fooer">
        <div className="location-tag">
          <span className="location-icon">📍</span>
          {booking.location}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function BookingStatus({ filters }) {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Filter bookings based on provided filters
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.bookingDate);

    // Compare dates by converting both to locale date strings (ignoring time)
    const matchesDate = filters.date
      ? bookingDate.toLocaleDateString('en-US') === new Date(filters.date).toLocaleDateString('en-US')
      : true;

    // Compare times; ensure both values match the HH:MM format
    const matchesTime = filters.time
      ? bookingDate.toTimeString().slice(0, 5) === filters.time
      : true;

    // Case-insensitive matching for location
    const matchesLocation = filters.location
      ? booking.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    // Case-insensitive search on userName and location
    const matchesSearchTerm = filters.searchTerm
      ? booking.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
      : true;

    return matchesDate && matchesTime && matchesLocation && matchesSearchTerm;
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // Handle token absence (e.g., redirect to login)
      return;
    }
    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.user.id;
    } catch (err) {
      console.error('Invalid token.');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [BASE_URL]);

  const updateStatus = async (status) => {
    if (!selectedBooking) return;
  
    try {
      const token = Cookies.get('token');
      const data = status === 'cancelled'
        ? { status, cancellationReason: cancelReason }
        : { status };
  
      await axios.patch(
        `${BASE_URL}/api/bookings/${selectedBooking._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Update local state for bookings list
      setBookings(bookings.map(b => 
        b._id === selectedBooking._id ? { ...b, status } : b
      ));
  
      setSelectedBooking(null);
      setCancelReason('');
      setShowCancelModal(false);
    } catch (error) {
      console.error("Error updating booking:", error.response?.data || error);
    }
  };

  return (
    <div className="booking-container">
      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <h3>No Active Bookings</h3>
          <p>You currently have no assigned bookings</p>
        </div>
      ) : (
        <motion.div 
          className="booking-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredBookings.map(booking => (
              <BookingCard 
                key={booking._id} 
                booking={booking} 
                onClick={setSelectedBooking}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
  
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="details-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2>Booking Details</h2>
              <div className="modal-content">
                <div className="detail-row">
                  <span>Job Name:</span>
                  <strong>{selectedBooking.jobName}</strong>
                </div>
                <div className="detail-row">
                  <span>Client:</span>
                  <strong>{selectedBooking.userName}</strong>
                </div>
                <div className="detail-row">
                  <span>Date:</span>
                  <strong>
                    {new Date(selectedBooking.bookingDate).toLocaleDateString('en-US', {
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </strong>
                </div>
                <div className="detail-row">
                  <span>Duration:</span>
                  <strong>{selectedBooking.duration} hours</strong>
                </div>
                <div className="detail-row">
                  <span>Location:</span>
                  <strong>{selectedBooking.location}</strong>
                </div>
                <div className="detail-row">
                  <span>Current Status:</span>
                  <strong className={`status-text ${selectedBooking.status.toLowerCase()}`}>
                    {selectedBooking.status}
                  </strong>
                </div>
              </div>
              <div className="modal-actions">
                {selectedBooking.status !== 'cancelled' && (
                  <Link to={`/user/booking/status/${selectedBooking._id}`}>
                    <button className="btn confirm-btn">Payment</button>
                  </Link>
                )}
                {selectedBooking.status !== 'cancelled' && (
                  <button
                    className="btn cancel-btn"
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  className="btn close-btn"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cancel-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2>Cancel Booking</h2>
              <p className="cancel-warning">
                You're about to cancel this booking. Please provide a reason:
              </p>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter cancellation reason..."
                className="reason-input"
              />
              <div className="modal-actions">
                <button
                  className="btn confirm-cancel-btn"
                  onClick={() => updateStatus('cancelled')}
                >
                  Confirm Cancellation
                </button>
                <button
                  className="btn cancel-action-btn"
                  onClick={() => setShowCancelModal(false)}
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
