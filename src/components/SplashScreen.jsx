import React from "react";
import { motion } from "framer-motion";
import { FiPackage, FiClock } from "react-icons/fi";

const DeliverySplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-500"
    >
      {/* Animated delivery package icon */}
      <motion.div
        initial={{ y: -50, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
        transition={{
          y: { type: "spring", stiffness: 300, damping: 15 },
          scale: { duration: 0.3 },
        }}
        className="mb-6"
      >
        <div className="relative">
          <FiPackage className="h-20 w-20 text-white" />
          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FiClock className="h-4 w-4 text-blue-600" />
          </motion.div>
        </div>
      </motion.div>

      {/* Logo with delivery-themed animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-white font-bold text-5xl lowercase tracking-tight mb-2">
          ridedelivery
        </h1>
        <motion.p
          className="text-blue-100 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your ride to faster deliveries
        </motion.p>
      </motion.div>

      {/* Animated progress indicator */}
      <motion.div
        className="mt-12 w-32 h-1 bg-blue-400 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Delivery tagline */}
      <motion.p
        className="absolute bottom-8 text-blue-100 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
      >
        Fast • Reliable • Secure
      </motion.p>
    </motion.div>
  );
};

export default DeliverySplashScreen;
