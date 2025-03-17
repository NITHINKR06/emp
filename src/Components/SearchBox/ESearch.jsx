import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../../Css/Search.css'; // Adjust the CSS path as necessary

export default function ESearch({ filters, setFilters }) {
  // Animation variants for form and button
  const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300 } },
  };

  // Handle input changes for all fields
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Clear all filters
  const handleClear = () => {
    setFilters({ searchTerm: '', date: '', time: '', location: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add additional submit behavior if needed
  };

  return (
    <div className="better-search-container">
      <motion.form
        className="better-search-form"
        initial="initial"
        animate="animate"
        variants={formVariants}
        onSubmit={handleSubmit}
      >
        {/* General search term
        <motion.input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleChange}
          placeholder="Search bookings..."
          className="better-search-input"
          aria-label="Search bookings"
        /> */}

        {/* Date input */}
        <motion.input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="better-search-input"
          aria-label="Select date"
        />

        {/* Location input */}
        <motion.input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location..."
          className="better-search-input"
          aria-label="Search by location"
        />

        <div className="better-search-icon">
          <FaSearch />
        </div>

        {(filters.searchTerm || filters.date || filters.time || filters.location) && (
          <button
            type="button"
            onClick={handleClear}
            className="better-clear-btn"
            aria-label="Clear search input"
          >
            <FaTimes />
          </button>
        )}

        <motion.button
          type="submit"
          className="better-submit-btn"
          variants={buttonVariants}
          whileHover="hover"
          aria-label="Submit search"
        >
          <FaSearch />
        </motion.button>
      </motion.form>
    </div>
  );
}
