import React from 'react';
import { motion } from 'framer-motion';

const AnimatePage = () => (
  <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
    <h1>Welcome to the animated page!</h1>
  </motion.div>
);

export default AnimatePage;
