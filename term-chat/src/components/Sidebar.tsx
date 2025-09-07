import { motion } from 'framer-motion';
import type { ColorTheme, Alignment } from '../types/terminal';

interface SidebarProps {
  isAuthenticated: boolean;
  colorTheme: ColorTheme;
  alignment: Alignment;
  onNeoLogin: () => void;
  onDemoLogin: () => void;
}

const Sidebar = ({ isAuthenticated, colorTheme, alignment, onNeoLogin, onDemoLogin }: SidebarProps) => {
  return (
    <div className="absolute left-0 top-0 w-64 h-full bg-terminal-bg/95 border-r border-terminal-green/20 z-5 p-4 sidebar-glow">
      <div className="space-y-4">
        {/* System Info */}
        <div className="border border-terminal-green/30 p-3 status-indicator">
          <h3 className="text-terminal-green-bright text-sm mb-2">SYSTEM STATUS</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">CPU:</span>
              <span className="text-terminal-green">23%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">RAM:</span>
              <span className="text-terminal-green">4.2GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">NET:</span>
              <span className="text-terminal-green">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Connection Info */}
        <div className="border border-terminal-green/30 p-3">
          <h3 className="text-terminal-green-bright text-sm mb-2">CONNECTION</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Protocol:</span>
              <span className="text-terminal-green">SSH-2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Encryption:</span>
              <span className="text-terminal-green">AES-256</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Latency:</span>
              <span className="text-terminal-green">12ms</span>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="border border-terminal-green/30 p-3">
          <h3 className="text-terminal-green-bright text-sm mb-2">ACTIVE SESSIONS</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
              <span className="text-terminal-green-dim">Terminal-001</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-terminal-green-dim rounded-full"></div>
              <span className="text-terminal-green-dim">Terminal-002</span>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        {!isAuthenticated && (
          <div className="border border-terminal-green/30 p-3">
            <h3 className="text-terminal-green-bright text-sm mb-2">QUICK ACCESS</h3>
            <div className="space-y-2 text-xs">
              <motion.button
                onClick={onNeoLogin}
                className="w-full p-2 text-left border border-terminal-green/20 rounded hover:bg-terminal-green/10 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-terminal-green-bright">NEO LOGIN</div>
                <div className="text-terminal-green-dim">neo / matrix</div>
              </motion.button>
              <motion.button
                onClick={onDemoLogin}
                className="w-full p-2 text-left border border-terminal-green/20 rounded hover:bg-terminal-green/10 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-terminal-green-bright">DEMO LOGIN</div>
                <div className="text-terminal-green-dim">Quick access</div>
              </motion.button>
            </div>
          </div>
        )}

        {/* Display Settings */}
        <div className="border border-terminal-green/30 p-3">
          <h3 className="text-terminal-green-bright text-sm mb-2">DISPLAY</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Theme:</span>
              <span className="text-terminal-green-bright">{colorTheme.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Alignment:</span>
              <span className="text-terminal-green-bright">{alignment.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green-dim">Position:</span>
              <span className="text-terminal-green">
                {alignment === 'left' ? '← LEFT' : alignment === 'center' ? '↔ CENTER' : '→ RIGHT'}
              </span>
            </div>
          </div>
        </div>

        {/* Matrix Code */}
        <div className="border border-terminal-green/30 p-3">
          <h3 className="text-terminal-green-bright text-sm mb-2">MATRIX CODE</h3>
          <div className="text-xs text-terminal-green-dim font-mono leading-tight binary-flicker">
            <div>01001000 01100101</div>
            <div>01101100 01101100</div>
            <div>01101111 00100000</div>
            <div>01010111 01101111</div>
            <div>01110010 01101100</div>
            <div>01100100 00100001</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
