import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../../Css/ReviewsPage.css";

function ReviewsPage({ employeeId }) {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employees/${employeeId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.response?.data?.message || error.message);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || rating === 0) return;

    const newReview = {
      name,
      message,
      rating,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/employees/${employeeId}/reviews`, newReview);
      setReviews(response.data.reviews);
      setName("");
      setMessage("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error.response?.data?.message || error.message);
    }
  };

  return (
    <motion.div className="reviews-container" initial="hidden" animate="visible">
      {/* Review Form */}
      <motion.div className="reviews-form">
        <h3>Leave Your Review</h3>
        <motion.form onSubmit={handleSubmit}>
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
                    style={{ color: starValue <= (hover || rating) ? "#ff9800" : "#ddd" }}
                  >
                    &#9733;
                  </label>
                </React.Fragment>
              );
            })}
          </div>
          <div className="input-container">
            <input type="text" required placeholder=" " value={name} onChange={(e) => setName(e.target.value)} />
            <label>Name</label>
          </div>
          <div className="input-container">
            <textarea required placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <label>Message</label>
          </div>
          <motion.button type="submit" className="btn-submit">Send Review</motion.button>
        </motion.form>
      </motion.div>

      {/* Reviews Display */}
      <motion.div className="reviews-display">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet...</p>
        ) : (
          <>
            {reviews.slice(0, 2).map((review, idx) => (
              <motion.div className="review-card" key={idx}>
                <div className="review-header">
                  <span className="reviewer-name">{review.name}</span>
                  <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} style={{ color: index + 1 <= review.rating ? "#ff9800" : "#ddd" }}>
                      &#9733;
                    </span>
                  ))}
                </div>
                <p className="review-text">{review.message}</p>
              </motion.div>
            ))}
            {reviews.length > 2 && (
              <motion.button className="view-more-btn" onClick={() => setShowModal(true)}>
                View All Reviews
              </motion.button>
            )}
          </>
        )}
      </motion.div>

      {/* Modal for All Reviews */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="logout-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="logout-modal" initial={{ y: "-50%" }} animate={{ y: "0%" }} exit={{ y: "-50%" }} transition={{ duration: 0.3 }}>
              <h2>All Reviews</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
              <div className="modal-reviews">
                {reviews.map((review, idx) => (
                  <div className="review-card modal-review" key={idx}>
                    <div className="review-header">
                      <span className="reviewer-name">{review.name}</span>
                      <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} style={{ color: index + 1 <= review.rating ? "#ff9800" : "#ddd" }}>
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <h7 className="review-message">{review.message}</h7>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReviewsPage;
