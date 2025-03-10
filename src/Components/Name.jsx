import React from 'react';
import { motion } from 'framer-motion';

export default function Name() {
  const text = "KaarmiQ";

  // Variants for staggering the letters
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Variants for each letter animation
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.8 }
    }
  };

  return (
    <div>
      {/* Outer motion.div for animated gradient background */}
      <motion.div
        style={{
          background: 'linear-gradient(270deg, orange, black, white)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      >
        {/* Animated h1 with staggered letter animation and hover effects */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
          style={{
            fontSize: '4rem',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          {text.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
}
