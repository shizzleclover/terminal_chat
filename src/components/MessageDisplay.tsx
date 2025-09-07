import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '../types/terminal';

interface MessageDisplayProps {
  messages: Message[];
  currentPrompt: string;
  isAuthenticated: boolean;
  username: string;
}

const MessageDisplay = ({ messages, currentPrompt }: MessageDisplayProps) => {
  return (
    <AnimatePresence>
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="mb-2 relative"
        >
          {/* Message Number */}
          <span className="absolute -left-8 text-terminal-green-dim text-xs line-number">
            {String(index + 1).padStart(3, '0')}
          </span>

          {message.type === 'system' && (
            <div className="text-terminal-green-dim group">
              <span className="text-terminal-green">system@matrix:~$</span>
              <span className="ml-2">{message.content}</span>
              <motion.div
                className="absolute -right-2 top-0 w-1 h-full bg-terminal-green/20 opacity-0 group-hover:opacity-100"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
          {message.type === 'user' && (
            <div className="text-terminal-green group">
              <span className="text-terminal-green-dim">{currentPrompt.replace(' ', '')}</span>
              <span className="ml-2">{message.content}</span>
              <motion.div
                className="absolute -right-2 top-0 w-1 h-full bg-terminal-green-bright/30 opacity-0 group-hover:opacity-100"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
          {message.type === 'bot' && (
            <div className="text-terminal-green group">
              <span className="text-terminal-green-dim">bot@matrix:~$</span>
              <span className="ml-2">{message.content}</span>
              <motion.div
                className="absolute -right-2 top-0 w-1 h-full bg-matrix-green/40 opacity-0 group-hover:opacity-100"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default MessageDisplay;
