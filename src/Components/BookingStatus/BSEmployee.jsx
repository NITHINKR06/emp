import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import '../../Css/BSEmployee.css'; // Adjust the CSS path as necessary

// BookingCard component displays a single booking card.
const BookingCard = ({ booking, onClick }) => (
  <motion.div 
    className={`booking-card status-${booking.status.toLowerCase()}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    onClick={() => onClick(booking)}
  >
    <div className="card-content">
      <div className="card-header">
        <div className="job-info">
          <h3 className="job-title">Client: {booking.userName}</h3>
          <span className="job-priority">{booking.priority} Priority</span>
        </div>
        <span className={`status-badge ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-icon">👤</span>
          <span className="detail-text">Client: {booking.userName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📅</span>
          <span className="detail-text">
            Work date - {new Date(booking.bookingDate).toLocaleDateString('en-US', {
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">⏳</span>
          <span className="detail-text">Work hour - {booking.bookingTime}</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="location-tag">
          <span className="location-icon">📍</span>
          Work address - {booking.location}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function BookingStatus({ filters }) {
  const [bookings, setBookings] = useState([]);
  // const [filters, setFilters] = useState({
  //   searchTerm: '',
  //   date: '',
  //   time: '',
  //   location: '',
  // });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Fetch bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      const token = Cookies.get('token');
      if (!token) return;
      
      try {
        const { user } = jwtDecode(token);
        const response = await axios.get(`${BASE_URL}/api/bookings/employee/${user.id}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [BASE_URL]);

  // Filter bookings based on search term, date, time, and location
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.bookingDate);
    const matchesDate = filters.date
      ? bookingDate.toISOString().slice(0, 10) === filters.date
      : true;

    const matchesTime = filters.time
      ? bookingDate.toTimeString().slice(0, 5) === filters.time
      : true;

    const matchesLocation = filters.location
      ? booking.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesSearchTerm = filters.searchTerm
      ? booking.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
      : true;

    return matchesDate && matchesTime && matchesLocation && matchesSearchTerm;
  });

  // Update booking status (confirm or cancel)
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
            {filteredBookings.map((booking) => (
              <BookingCard 
                key={booking._id} 
                booking={booking} 
                onClick={setSelectedBooking}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Booking Details Modal */}
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
              <div className="modal-contents">
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
                {selectedBooking.status !== 'confirmed' && selectedBooking.status !== 'cancelled' && (
                  <button 
                    className="btn confirm-btn"
                    onClick={() => updateStatus('confirmed')}
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status !== 'cancelled' && (
                  <button
                    className="btn cancel-btn"
                    onClick={() => setShowCancelModal(true)}
                  >
                    Cancel Booking
                  </button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    className="btn payment-status-btn"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Payment Status
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

      {/* Cancel Booking Modal */}
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

      {/* Payment Status Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="payment-status-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2>Payment Status</h2>
              <div className="payment-details">
                <p>Payment functionality is still under development.</p>
                <p>Please check back later for updates.</p>
              </div>
              <div className="modal-actions">
                <button
                  className="btn close-payment-btn"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
