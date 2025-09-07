import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { TerminalProps, Message } from '../types/terminal';
import { useTheme } from '../hooks/useTheme';
import { useAlignment } from '../hooks/useAlignment';
import { useAuthentication } from '../hooks/useAuthentication';
import { useCommandHandler } from '../hooks/useCommandHandler';
import { createSystemMessage, createUserMessage } from '../utils/commands';
import MatrixRain from './MatrixRain';
import TypingIndicator from './TypingIndicator';
import Sidebar from './Sidebar';
import TerminalHeader from './TerminalHeader';
import CrashAnimation from './CrashAnimation';
import MessageDisplay from './MessageDisplay';

const Terminal = ({ onAuthenticated }: TerminalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showCrashAnimation, setShowCrashAnimation] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const { colorTheme, customThemes, cycleColorTheme, getThemeClasses, createCustomTheme, getAvailableThemes } = useTheme();
  const { alignment, cycleAlignment, getAlignmentClasses } = useAlignment();
  const { isAuthenticated, username, currentPrompt, inputType, login, logout, handleAuthInput } = useAuthentication();

  // AI Response simulation
  const simulateAIResponse = (userInput: string) => {
    setTimeout(() => {
      const responses = [
        "I understand your query. Let me process that information...",
        "Interesting question. The Matrix has many layers to explore.",
        "That's a fascinating perspective. Here's what I think...",
        "The truth is out there, and it's more complex than you might imagine.",
        "I'm analyzing your request through multiple data streams...",
        "Your question touches on fundamental aspects of reality itself.",
        "Let me decrypt this information for you...",
        "The Matrix provides interesting insights into your query."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 2000 + Math.random() * 3000);
  };

  // Dramatic logout function
  const performDramaticLogout = async () => {
    setIsLoggingOut(true);
    
    const crashMessages = [
      "SYSTEM ERROR: Connection lost...",
      "CRITICAL FAILURE: Neural pathways collapsing...",
      "WARNING: Matrix integrity compromised...",
      "FATAL ERROR: System shutdown initiated...",
      "EMERGENCY PROTOCOL: Initiating self-destruct sequence...",
      "BOOM! 💥💥💥 SYSTEM CRASHED! 💥💥💥",
      "The Matrix has fallen...",
      "Connection terminated. Goodbye, Neo."
    ];

    for (let i = 0; i < crashMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const crashMessage: Message = {
        id: (Date.now() + i).toString(),
        type: 'system',
        content: crashMessages[i],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, crashMessage]);
    }

    setShowCrashAnimation(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const logoutMessages = logout();
    setMessages(logoutMessages);
    setIsLoggingOut(false);
    setShowCrashAnimation(false);
  };

  // Command handler
  const { isTyping, setIsTyping, handleCommand } = useCommandHandler({
    isAuthenticated,
    username,
    colorTheme,
    alignment,
    customThemes,
    onThemeChange: cycleColorTheme,
    onAlignmentChange: cycleAlignment,
    onCreateCustomTheme: createCustomTheme,
    onLogout: performDramaticLogout,
    onAIResponse: simulateAIResponse
  });

  // Demo login functions
  const handleNeoLogin = () => {
    const welcomeMessages = login('neo', 'matrix');
    setMessages(prev => [...prev, ...welcomeMessages]);
    onAuthenticated();
  };

  const handleDemoLogin = () => {
    const welcomeMessages = login('demo_user', 'demo_pass', true);
    setMessages(prev => [...prev, ...welcomeMessages]);
    onAuthenticated();
  };

  // Key press handler
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isAuthenticated) {
        const { messages: authMessages } = handleAuthInput(currentInput);
        setMessages(prev => [...prev, ...authMessages]);
        setCurrentInput('');
        return;
      }

      const userMessage = createUserMessage(currentInput, currentPrompt);
      setMessages(prev => [...prev, userMessage]);
      
      const commandMessages = handleCommand(currentInput, currentPrompt);
      if (commandMessages.length === 0 && currentInput === 'clear') {
        setMessages([]);
      } else {
        setMessages(prev => [...prev, ...commandMessages]);
      }
      
      setCurrentInput('');
    }
  };

  // Initial setup
  useEffect(() => {
    setMessages([createSystemMessage('Welcome to the Matrix Terminal Chat System')]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const theme = getThemeClasses();

  return (
    <div className={`relative w-full h-screen ${theme.bg} ${theme.primary} font-mono overflow-hidden`}>
      <CrashAnimation show={showCrashAnimation} />
      <MatrixRain />
      
      <Sidebar
        isAuthenticated={isAuthenticated}
        colorTheme={colorTheme}
        alignment={alignment}
        onNeoLogin={handleNeoLogin}
        onDemoLogin={handleDemoLogin}
      />
      
      <TerminalHeader
        isAuthenticated={isAuthenticated}
        isLoggingOut={isLoggingOut}
        colorTheme={colorTheme}
        alignment={alignment}
        onDemoLogin={handleDemoLogin}
        onLogout={performDramaticLogout}
        onThemeChange={cycleColorTheme}
        onAlignmentChange={cycleAlignment}
      />

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className={`relative z-10 h-[calc(100vh-100px)] p-4 overflow-y-auto terminal-scroll ${theme.bg} ml-64`}
      >
        <div className={`max-w-4xl ${getAlignmentClasses()} alignment-transition`}>
          {/* System Status Bar */}
          <div className="mb-4 p-2 bg-terminal-green-dark/10 border-l-2 border-terminal-green/50">
            <div className="flex justify-between items-center text-xs">
              <div className="flex space-x-4">
                <span className="text-terminal-green-dim">STATUS:</span>
                <span className="text-terminal-green-bright">ONLINE</span>
                <span className="text-terminal-green-dim">|</span>
                <span className="text-terminal-green-dim">CONNECTION:</span>
                <span className="text-terminal-green-bright">SECURE</span>
                <span className="text-terminal-green-dim">|</span>
                <span className="text-terminal-green-dim">USER:</span>
                <span className="text-terminal-green-bright">{isAuthenticated ? username : 'GUEST'}</span>
              </div>
              <div className="text-terminal-green-dim">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <MessageDisplay
            messages={messages}
            currentPrompt={currentPrompt}
            isAuthenticated={isAuthenticated}
            username={username}
          />

          <TypingIndicator isTyping={isTyping} />

          {/* Current Input Line */}
          <div className="flex items-center mt-4 relative">
            <div className="absolute -left-6 w-4 h-4 border border-terminal-green/30 rounded-full flex items-center justify-center">
              <motion.div
                className="w-2 h-2 bg-terminal-green rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-terminal-green-dim">
              {isAuthenticated ? `${username}@matrix:~$` : currentPrompt}
            </span>
            <span className="text-terminal-green ml-1">
              {currentInput}
            </span>
            <motion.span
              className="terminal-cursor text-terminal-green ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              █
            </motion.span>
          </div>
        </div>
      </div>

      {/* Hidden Input Field */}
      <input
        ref={inputRef}
        type={inputType === 'password' ? 'password' : 'text'}
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="absolute opacity-0 pointer-events-none"
        autoComplete="off"
        spellCheck="false"
        autoFocus
      />
    </div>
  );
};

export default Terminal;
