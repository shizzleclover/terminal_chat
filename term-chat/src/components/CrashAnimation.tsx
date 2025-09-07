import { motion } from 'framer-motion';

interface CrashAnimationProps {
  show: boolean;
}

const CrashAnimation = ({ show }: CrashAnimationProps) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 crash-overlay flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [1, 0.8, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl text-white font-bold crash-text"
      >
        💥 SYSTEM CRASHED 💥
      </motion.div>
    </motion.div>
  );
};

export default CrashAnimation;
