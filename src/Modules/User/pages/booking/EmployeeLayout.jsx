import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import "../../../../Css/EmployeeLayout.css";
import CalendarPage from "../../../../Components/Calender/CalendarPage";
import { useParams } from 'react-router-dom';
import ReviewsPage from '../../../../Components/Review/ReviewsPage';
import {jwtDecode} from "jwt-decode"; // Updated to default import
import Cookies from 'js-cookie';

const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    rotate: 0,
    transition: { duration: 0.3 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function SameLayout() {
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // New state variables for extra fields
  const [clientName, setBookingName] = useState('');
  const [clientEmail, setBookingEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingLocation, setBookingLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [bookingDateInput, setBookingDateInput] = useState('');

  const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

  // Get token and decode it.
  const token = Cookies.get('token');
  let isTokenValid = true;
  let userId = null;
  try {
    if (!token) {
      isTokenValid = false;
    } else {
      const decoded = jwtDecode(token);
      userId = decoded.user.id; // Ensure your JWT payload includes the "id" field
    }
  } catch (err) {
    isTokenValid = false;
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employees/${id}`);
        setSelectedEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  if (!isTokenValid) {
    return <div>No token found or invalid token. Please log in.</div>;
  }

  if (!selectedEmployee) {
    return <h2>Loading employee data...</h2>;
  }

  const fileName = selectedEmployee?.profilePhotoUrl
    ? selectedEmployee.profilePhotoUrl.split('\\').pop()
    : '';

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    // Check that all fields are filled
    if (!clientName || !clientEmail || !mobile || !bookingTime || !bookingLocation || !currentLocation) {
      alert("Please fill out all booking fields.");
      return;
    }

    const bookingData = {
      userId: userId,
      employeeId: id,
      userName: clientName,         // Renamed field to match backend
      userEmail: clientEmail,       // Renamed field to match backend
      mobileNumber: mobile,
      bookingTime: bookingTime,     // Key now matches backend
      // Convert bookingDateInput to a Date object; if not provided, fallback to current date/time
      bookingDate: bookingDateInput ? new Date(bookingDateInput) : new Date(),
      location: bookingLocation,
      currentLocation: currentLocation,
      jobName: selectedEmployee.jobName,
    };

    try {
      await axios.post(`${BASE_URL}/api/bookings`, bookingData);
      alert("Booking successful");
      // Reset booking form fields
      setBookingName('');
      setBookingEmail('');
      setMobile('');
      setBookingTime('');
      setBookingDateInput('');
      setBookingLocation('');
      setCurrentLocation('');
    } catch (error) {
      console.error("Error booking employee:", error.message);
      const errMsg = error.response && error.response.data 
        ? error.response.data.message 
        : error.message;
      alert("Booking failed: " + errMsg);
    }
  };

  return (
    <motion.div 
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top Section */}
      <motion.div className="top-section" variants={childVariants}>
        <motion.div className="left-side">
          <div className="photo-placeholder">
            <motion.img 
              src={`${BASE_URL}/uploads/Employee/${fileName}`}
              alt={selectedEmployee.name} 
              className="profile-avatar"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </div>
          <ul className="info-list">
            <li><strong>Name:</strong> {selectedEmployee.name}</li>
            <li><strong>Email:</strong> {selectedEmployee.email}</li>
            <li><strong>Job:</strong> {selectedEmployee.jobName}</li>
            <li><strong>Location:</strong> {selectedEmployee.location}</li>
            <li><strong>About:</strong> {selectedEmployee.about}</li>
            <li><strong>Education:</strong> {selectedEmployee.education}</li>
            <li>
              <strong>Experience:</strong> {selectedEmployee.experience}{" "}
              {selectedEmployee.experience > 1 ? "years" : "year"}
            </li>
          </ul>
        </motion.div>
        <motion.div className="right-side" variants={childVariants}>
          <motion.div className="input-section" variants={childVariants}>
            <form onSubmit={handleBookingSubmit}>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder=" " 
                    id="name" 
                    value={clientName}
                    onChange={(e) => setBookingName(e.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="email" 
                    placeholder=" " 
                    id="email" 
                    value={clientEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder=" " 
                    id="mobile" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <label htmlFor="mobile">Mobile Number</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="time" 
                    placeholder=" " 
                    id="time" 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  />
                  <label htmlFor="time">Time (12hr)</label>
                </div>
              </div>
              {/* Optional Date Field */}
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="date" 
                    placeholder=" " 
                    id="date" 
                    value={bookingDateInput}
                    onChange={(e) => setBookingDateInput(e.target.value)}
                  />
                  <label htmlFor="date">Date</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder=" " 
                    id="location" 
                    value={bookingLocation}
                    onChange={(e) => setBookingLocation(e.target.value)}
                  />
                  <label htmlFor="location">Location</label>
                </div>
              </div>
              <div className="input-row">
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder=" " 
                    id="current-location" 
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                  />
                  <label htmlFor="current-location">Your Current Location</label>
                </div>
              </div>
              <div className="button-row">
                <motion.button 
                  className="btn2"
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={childVariants}
                >
                  Book Now
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.div className="calendar-box" variants={childVariants}>
            <CalendarPage userId={userId} employeeId={id} />
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-icon booking-confirmed"></span>
                <span className="legend-text">Not Available</span>
              </div>
              <div className="legend-item">
                <span className="legend-icon booking-pending"></span>
                <span className="legend-text">Requesting Pending</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div variants={childVariants}>
        <ReviewsPage employeeId={id} />
      </motion.div>
    </motion.div>
  );
}

export default SameLayout;
