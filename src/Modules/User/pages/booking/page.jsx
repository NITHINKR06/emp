import React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import "../../../../Css/Booking.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";

const bookings = [
  {
    id: "1",
    name: "ABC",
    job: "Programmer",
    location: "New York, USA",
    experience: "5 years",
  },
  {
    id: "2",
    name: "No Name",
    job: "No Job mentioned",
    location: "Not mentioned",
    experience: "Updating...",
  },
  {
    id: "3",
    name: "XYZ",
    job: "No Job mentioned",
    location: "Not mentioned",
    experience: "Updating...",
  },
];

export default function Booking() {
  const navigate = useNavigate();
  return (
    <div className="booking-container">
      <main className="booking-main">
        <div className="booking-grid">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="booking-card"
            >
              <div className="booking-info">
                <div className="avatar">
                  <FiUser size={28} />
                </div>
                <h3 className="booking-name">{booking.name}</h3>
                <p className="booking-job">{booking.job}</p>
                <p className="booking-location">{booking.location}</p>
                <p className="booking-experience">
                  Experience: {booking.experience}
                </p>
              </div>
              <button onClick={() => navigate(`/user/booking/${booking.id}`)} className="booking-button">
                Check Booking
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
