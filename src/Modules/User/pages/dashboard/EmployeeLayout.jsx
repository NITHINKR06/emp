import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "../../../../Css/EmployeeLayout.css";
import CalendarPage from "../../../../Components/Calender/CalendarPage";

// Container variants for the entire page with reduced vertical movement.
const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95, 
    rotate: 0 
  },
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

// Child variants for inner elements.
const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function SameLayout() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  // Track open details for each section.
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetails = (key) => {
    setOpenDetails(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message || rating === 0) return;
    const newReview = {
      name,
      message,
      rating,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setName('');
    setMessage('');
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
        <motion.div className="left-side" variants={childVariants}>
          <div className="photo-placeholder">Photo</div>
          <ul className="info-list">
            {['name', 'email', 'about', 'education', 'more'].map((key) => (
              <motion.li key={key} variants={childVariants}>
                <div className="list-header">
                  <span>
                    {key === 'name' && 'Name: John Doe'}
                    {key === 'email' && 'Email: john@example.com'}
                    {key === 'about' && 'About: Brief intro...'}
                    {key === 'education' && 'Education: B.Sc in Computer Science'}
                    {key === 'more' && 'More...'}
                  </span>
                  <button className="details-btn" onClick={() => toggleDetails(key)}>Details</button>
                </div>
                <AnimatePresence>
                  {openDetails[key] && (
                    <motion.div
                      className="details-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {key === 'name' && 'John Doe is a seasoned professional with over 10 years of experience in software development.'}
                      {key === 'email' && 'Contact via email for professional inquiries.'}
                      {key === 'about' && 'A quick overview about John, highlighting his interests and career achievements.'}
                      {key === 'education' && 'Graduated with honors from XYZ University with a major in Computer Science.'}
                      {key === 'more' && 'Additional information about projects, skills, and certifications.'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="right-side" variants={childVariants}>
          <motion.div className="input-section" variants={childVariants}>
            <div className="input-row">
              <div className="input-container">
                <input type="text" placeholder=" " id="mobile" />
                <label htmlFor="mobile">Mobile Number</label>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <input type="time" placeholder=" " id="time" />
                <label htmlFor="time">Time (12hr)</label>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <input type="text" placeholder=" " id="location" />
                <label htmlFor="location">Location</label>
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <input type="text" placeholder=" " id="current-location" />
                <label htmlFor="current-location">Your Current Location</label>
              </div>
            </div>
            <div className="button-row">
              <motion.button 
                className="btn2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={childVariants}
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
          <motion.div className="calendar-box" variants={childVariants}>
            <CalendarPage />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div className="reviews-section" variants={childVariants}>
        <motion.div className="reviews-form" variants={childVariants}>
          <h3>Leave Your Review</h3>
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rating-stars">
              {[...Array(5)].map((_, index) => {
                const starValue = 5 - index;
                return (
                  <React.Fragment key={starValue}>
                    <input
                      type="radio"
                      name="rating"
                      id={`rating-${starValue}`}
                      value={starValue}
                      checked={rating === starValue}
                      onChange={() => setRating(starValue)}
                    />
                    <label
                      htmlFor={`rating-${starValue}`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{
                        color: starValue <= (hover || rating) ? '#ff9800' : '#ddd'
                      }}
                    >
                      &#9733;
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="input-container">
              <input
                type="text"
                required
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
            </div>
            <div className="input-container">
              <textarea
                required
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <label>Message</label>
            </div>
            <motion.button 
              type="submit" 
              className="btn-submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Review
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div className="reviews-display" variants={childVariants}>
          <h3>Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet...</p>
          ) : (
            reviews.map((review, idx) => (
              <motion.div
                className="review-card"
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="review-header">
                  <span className="reviewer-name">{review.name}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <span
                        key={starValue}
                        style={{
                          color: starValue <= review.rating ? '#ff9800' : '#ddd'
                        }}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
                <p className="review-text">{review.message}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SameLayout;
