import { motion } from 'framer-motion';
import type { ColorTheme, Alignment } from '../types/terminal';

interface TerminalHeaderProps {
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  colorTheme: ColorTheme;
  alignment: Alignment;
  onDemoLogin: () => void;
  onLogout: () => void;
  onThemeChange: () => void;
  onAlignmentChange: () => void;
}

const TerminalHeader = ({
  isAuthenticated,
  isLoggingOut,
  colorTheme,
  alignment,
  onDemoLogin,
  onLogout,
  onThemeChange,
  onAlignmentChange
}: TerminalHeaderProps) => {
  return (
    <div className="relative z-10 bg-terminal-bg border-b border-terminal-green/20 p-2 ml-64">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-terminal-green-dim text-sm">user@matrix-terminal</span>
          <span className="text-terminal-green">:</span>
          <span className="text-terminal-green-bright">~</span>
          <span className="text-terminal-green">$</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Signup/Login Button */}
          {!isAuthenticated && (
            <motion.button
              onClick={onDemoLogin}
              className="px-3 py-1 text-xs border border-terminal-green/30 rounded hover:bg-terminal-green/10 transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-terminal-green-dim">DEMO:</span>
              <span className="text-terminal-green-bright font-mono">LOGIN</span>
            </motion.button>
          )}

          {/* Logout Button */}
          {isAuthenticated && (
            <motion.button
              onClick={onLogout}
              disabled={isLoggingOut}
              className="px-3 py-1 text-xs border border-red-500/30 rounded hover:bg-red-500/10 transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-red-400">
                {isLoggingOut ? 'CRASHING...' : 'LOGOUT'}
              </span>
              {isLoggingOut && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-red-400"
                >
                  💥
                </motion.div>
              )}
            </motion.button>
          )}
          
          {/* Color Theme Toggle Button */}
          <motion.button
            onClick={onThemeChange}
            className="px-3 py-1 text-xs border border-terminal-green/30 rounded hover:bg-terminal-green/10 transition-all duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-terminal-green-dim">THEME:</span>
            <span className="text-terminal-green-bright font-mono">
              {colorTheme.toUpperCase()}
            </span>
            <motion.div
              animate={{ 
                color: colorTheme === 'matrix' ? '#00ff00' : 
                       colorTheme === 'cyber' ? '#22d3ee' :
                       colorTheme === 'retro' ? '#fbbf24' : '#f472b6'
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: colorTheme === 'matrix' ? '#00ff00' : 
                                 colorTheme === 'cyber' ? '#22d3ee' :
                                 colorTheme === 'retro' ? '#fbbf24' : '#f472b6'
              }}
            />
          </motion.button>

          {/* Alignment Toggle Button */}
          <motion.button
            onClick={onAlignmentChange}
            className="px-3 py-1 text-xs border border-terminal-green/30 rounded hover:bg-terminal-green/10 transition-all duration-200 flex items-center space-x-2 alignment-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-terminal-green-dim">ALIGN:</span>
            <span className="text-terminal-green-bright font-mono">
              {alignment.toUpperCase()}
            </span>
            <motion.div
              animate={{ rotate: alignment === 'left' ? 0 : alignment === 'center' ? 90 : 180 }}
              transition={{ duration: 0.3 }}
              className="text-terminal-green"
            >
              {alignment === 'left' ? '←' : alignment === 'center' ? '↔' : '→'}
            </motion.div>
          </motion.button>
          <div className="text-terminal-green-dim text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
