import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  isTyping: boolean;
}

const TypingIndicator = ({ isTyping }: TypingIndicatorProps) => {
  if (!isTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-2 p-3 bg-terminal-green-dark/20 border border-terminal-green/30 rounded"
    >
      <div className="flex items-center space-x-2">
        <span className="text-terminal-green-dim text-sm">bot@matrix:~$</span>
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-terminal-green rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-terminal-green rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-terminal-green rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="text-terminal-green-dim text-sm ml-2">Deciphering response...</span>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
