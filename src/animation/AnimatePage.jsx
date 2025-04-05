import React from "react";
import { motion } from "framer-motion";

const AnimatePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    >

      <motion.footer
        className="text-center py-4 bg-gray-900 text-white shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      >
        <motion.p
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          © {new Date().getFullYear()} Wahab Rubel. All rights reserved.
        </motion.p>
      </motion.footer>
    </motion.div>
  );
};

export default AnimatePage;
