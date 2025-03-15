import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../../Css/Search.css'; // Import the separate CSS file

export default function Search({ query, setQuery }) {

  // Animation variants
  const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    blurred: { scale: 1 },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300 } },
  };

  const handleClear = () => setQuery('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <motion.input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search employees..."
          className="better-search-input"
          variants={inputVariants}
          aria-label="Search employees"
        />
        <div className="better-search-icon">
          <FaSearch />
        </div>
        {query && (
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
