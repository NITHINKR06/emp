import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../../Css/Search.css'; // Import the separate CSS file

export default function Search() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  // Animation variants for the form, input, and button
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
    console.log('Searching for:', query);
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
          placeholder="Search branch name..."
          className="better-search-input"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          variants={inputVariants}
          animate={focused ? 'focused' : 'blurred'}
          aria-label="Search branch name"
        />
        {/* Search icon on the left */}
        <div className="better-search-icon">
          <FaSearch />
        </div>
        {/* Clear button appears when there is text */}
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

export function SBox() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <motion.div
      className="better-sbox-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <motion.input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="better-sbox-input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{ scale: focused ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <FaSearch className="better-sbox-icon" />
    </motion.div>
  );
}
