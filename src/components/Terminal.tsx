import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'system' | 'user' | 'bot' | 'typing';
  content: string;
  timestamp: Date;
}

interface TerminalProps {
  onAuthenticated: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onAuthenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('login: ');
  const [inputType, setInputType] = useState<'username' | 'password' | 'command'>('username');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('right');
  const [colorTheme, setColorTheme] = useState<'matrix' | 'cyber' | 'retro' | 'neon'>('matrix');
  const [customThemes, setCustomThemes] = useState<{[key: string]: any}>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showCrashAnimation, setShowCrashAnimation] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

  const cycleAlignment = () => {
    setAlignment(prev => {
      switch (prev) {
        case 'left': return 'center';
        case 'center': return 'right';
        case 'right': return 'left';
        default: return 'right';
      }
    });
  };

  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left': return 'ml-0 mr-auto';
      case 'center': return 'mx-auto';
      case 'right': return 'ml-auto mr-8';
      default: return 'ml-auto mr-8';
    }
  };

  const cycleColorTheme = () => {
    setColorTheme(prev => {
      switch (prev) {
        case 'matrix': return 'cyber';
        case 'cyber': return 'retro';
        case 'retro': return 'neon';
        case 'neon': return 'matrix';
        default: return 'matrix';
      }
    });
  };

  const getThemeClasses = () => {
    switch (colorTheme) {
      case 'matrix':
        return {
          primary: 'text-terminal-green',
          secondary: 'text-terminal-green-dim',
          bright: 'text-terminal-green-bright',
          bg: 'bg-terminal-bg',
          border: 'border-terminal-green/20',
          accent: 'text-matrix-green'
        };
      case 'cyber':
        return {
          primary: 'text-cyan-400',
          secondary: 'text-cyan-600',
          bright: 'text-cyan-300',
          bg: 'bg-gray-900',
          border: 'border-cyan-400/20',
          accent: 'text-cyan-500'
        };
      case 'retro':
        return {
          primary: 'text-amber-400',
          secondary: 'text-amber-600',
          bright: 'text-amber-300',
          bg: 'bg-gray-800',
          border: 'border-amber-400/20',
          accent: 'text-amber-500'
        };
      case 'neon':
        return {
          primary: 'text-pink-400',
          secondary: 'text-pink-600',
          bright: 'text-pink-300',
          bg: 'bg-purple-900',
          border: 'border-pink-400/20',
          accent: 'text-pink-500'
        };
      default:
        return {
          primary: 'text-terminal-green',
          secondary: 'text-terminal-green-dim',
          bright: 'text-terminal-green-bright',
          bg: 'bg-terminal-bg',
          border: 'border-terminal-green/20',
          accent: 'text-matrix-green'
        };
    }
  };

  const getManPage = (command: string) => {
    const manPages: { [key: string]: string } = {
      'help': `HELP(1)                    Matrix Terminal Manual                    HELP(1)

NAME
       help - Display available commands and their descriptions

SYNOPSIS
       help

DESCRIPTION
       The help command displays a list of all available commands in the Matrix
       Terminal Chat System along with brief descriptions of their functionality.

EXAMPLES
       help
              Display the command list

SEE ALSO
       man(1), clear(1), whoami(1)`,

      'man': `MAN(1)                     Matrix Terminal Manual                     MAN(1)

NAME
       man - Display manual pages for commands

SYNOPSIS
       man [command]

DESCRIPTION
       The man command displays detailed manual pages for system commands.
       Each manual page provides comprehensive information about command usage,
       options, examples, and related commands.

EXAMPLES
       man help
              Display manual page for the help command
       man clear
              Display manual page for the clear command

SEE ALSO
       help(1)`,

      'clear': `CLEAR(1)                   Matrix Terminal Manual                   CLEAR(1)

NAME
       clear - Clear the terminal screen

SYNOPSIS
       clear

DESCRIPTION
       The clear command removes all messages from the terminal display,
       providing a clean slate for new interactions.

EXAMPLES
       clear
              Clear all terminal content

SEE ALSO
       help(1), man(1)`,

      'whoami': `WHOAMI(1)                  Matrix Terminal Manual                  WHOAMI(1)

NAME
       whoami - Display current user information

SYNOPSIS
       whoami

DESCRIPTION
       The whoami command displays information about the currently authenticated
       user, including username, system details, and access level.

EXAMPLES
       whoami
              Display current user information

SEE ALSO
       help(1), man(1)`,

      'date': `DATE(1)                    Matrix Terminal Manual                    DATE(1)

NAME
       date - Display current date and time

SYNOPSIS
       date

DESCRIPTION
       The date command displays the current system date and time in a
       human-readable format.

EXAMPLES
       date
              Display current date and time

SEE ALSO
       help(1), man(1)`,

      'theme': `THEME(1)                   Matrix Terminal Manual                   THEME(1)

NAME
       theme - Change terminal color theme

SYNOPSIS
       theme

DESCRIPTION
       The theme command cycles through available color themes for the terminal
       interface. Available themes include Matrix (green), Cyber (cyan),
       Retro (amber), and Neon (pink).

EXAMPLES
       theme
              Cycle to the next color theme

SEE ALSO
       help(1), man(1), align(1)`,

      'align': `ALIGN(1)                   Matrix Terminal Manual                   ALIGN(1)

NAME
       align - Change text alignment

SYNOPSIS
       align

DESCRIPTION
       The align command cycles through text alignment options for the terminal
       content. Available alignments are left, center, and right.

EXAMPLES
       align
              Cycle to the next alignment option

SEE ALSO
       help(1), man(1), theme(1)`,

      'exit': `EXIT(1)                    Matrix Terminal Manual                    EXIT(1)

NAME
       exit - Logout from the system

SYNOPSIS
       exit

DESCRIPTION
       The exit command logs out the current user and returns to the login
       prompt. All session data is cleared.

EXAMPLES
       exit
              Logout and return to login screen

SEE ALSO
       help(1), man(1)`,

      'theme list': `THEME-LIST(1)              Matrix Terminal Manual              THEME-LIST(1)

NAME
       theme list - List all available color themes

SYNOPSIS
       theme list

DESCRIPTION
       The theme list command displays all available color themes including
       built-in themes (matrix, cyber, retro, neon) and any custom themes
       created by the user.

EXAMPLES
       theme list
              Display all available themes

SEE ALSO
       theme(1), theme create(1), theme set(1)`,

      'theme create': `THEME-CREATE(1)            Matrix Terminal Manual            THEME-CREATE(1)

NAME
       theme create - Create a custom color theme

SYNOPSIS
       theme create [name]

DESCRIPTION
       The theme create command creates a new custom color theme with the
       specified name. The theme will be saved to local storage and can be
       applied using the theme set command.

EXAMPLES
       theme create mytheme
              Create a custom theme named "mytheme"

SEE ALSO
       theme(1), theme list(1), theme set(1)`,

      'theme set': `THEME-SET(1)                Matrix Terminal Manual                THEME-SET(1)

NAME
       theme set - Apply a custom color theme

SYNOPSIS
       theme set [name]

DESCRIPTION
       The theme set command applies a previously created custom theme.
       The theme must exist in the user's custom themes list.

EXAMPLES
       theme set mytheme
              Apply the custom theme named "mytheme"

SEE ALSO
       theme(1), theme list(1), theme create(1)`
    };

    if (!command || !manPages[command]) {
      return `No manual entry for "${command || 'undefined'}"
Available manual pages: ${Object.keys(manPages).join(', ')}`;
    }

    return manPages[command];
  };

  // Load user preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme');
    const savedAlignment = localStorage.getItem('terminal-alignment');
    const savedCustomThemes = localStorage.getItem('terminal-custom-themes');
    
    if (savedTheme && ['matrix', 'cyber', 'retro', 'neon'].includes(savedTheme)) {
      setColorTheme(savedTheme as any);
    }
    if (savedAlignment && ['left', 'center', 'right'].includes(savedAlignment)) {
      setAlignment(savedAlignment as any);
    }
    if (savedCustomThemes) {
      try {
        setCustomThemes(JSON.parse(savedCustomThemes));
      } catch (e) {
        console.error('Failed to parse custom themes:', e);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('terminal-theme', colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem('terminal-alignment', alignment);
  }, [alignment]);

  useEffect(() => {
    localStorage.setItem('terminal-custom-themes', JSON.stringify(customThemes));
  }, [customThemes]);

  useEffect(() => {
    // Initial system message
    setMessages([{
      id: '1',
      type: 'system',
      content: 'Welcome to the Matrix Terminal Chat System',
      timestamp: new Date()
    }]);
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
  }, [currentPrompt]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isAuthenticated) {
        handleAuthentication();
      } else {
        handleCommand();
      }
    }
  };

  const handleAuthentication = () => {
    if (inputType === 'username') {
      if (currentInput.trim()) {
        setUsername(currentInput.trim());
        setCurrentInput('');
        setCurrentPrompt('Password: ');
        setInputType('password');
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'user',
          content: currentInput.trim(),
          timestamp: new Date()
        }]);
      }
    } else if (inputType === 'password') {
      if (currentInput.trim()) {
        setPassword(currentInput.trim());
        setCurrentInput('');
        
        // Simulate authentication
        setTimeout(() => {
          if (username === 'neo' && password === 'matrix') {
            setIsAuthenticated(true);
            setCurrentPrompt('neo@matrix:~$ ');
            setInputType('command');
            setMessages(prev => [...prev, 
              {
                id: Date.now().toString(),
                type: 'user',
                content: '••••••••',
                timestamp: new Date()
              },
              {
                id: (Date.now() + 1).toString(),
                type: 'system',
                content: 'Authentication successful. Welcome to the Matrix, Neo.',
                timestamp: new Date()
              },
              {
                id: (Date.now() + 2).toString(),
                type: 'system',
                content: 'Type "help" for available commands or start chatting with the AI.',
                timestamp: new Date()
              }
            ]);
            onAuthenticated();
          } else {
            setMessages(prev => [...prev, 
              {
                id: Date.now().toString(),
                type: 'user',
                content: '••••••••',
                timestamp: new Date()
              },
              {
                id: (Date.now() + 1).toString(),
                type: 'system',
                content: 'Access denied. Invalid credentials.',
                timestamp: new Date()
              }
            ]);
            setCurrentInput('');
            setCurrentPrompt('login: ');
            setInputType('username');
            setUsername('');
            setPassword('');
          }
        }, 1000);
      }
    }
  };

  const handleCommand = () => {
    const command = currentInput.trim();
    if (!command) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: command,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Handle system commands
    if (command === 'help') {
      const helpMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Available commands:
• help - Show this help message
• man [command] - Show detailed manual for a command
• clear - Clear terminal
• whoami - Show current user
• date - Show current date/time
• theme - Change color theme
• theme list - List all available themes
• theme create [name] - Create a custom theme
• theme set [name] - Apply a custom theme
• align - Change text alignment
• exit - Logout from system

Or simply type any message to chat with the AI.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, helpMessage]);
    } else if (command.startsWith('man ')) {
      const commandName = command.split(' ')[1];
      const manMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: getManPage(commandName),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, manMessage]);
    } else if (command === 'theme') {
      cycleColorTheme();
      const themeMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Theme changed to: ${colorTheme.toUpperCase()}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, themeMessage]);
    } else if (command === 'align') {
      cycleAlignment();
      const alignMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Alignment changed to: ${alignment.toUpperCase()}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, alignMessage]);
    } else if (command.startsWith('theme create ')) {
      const themeName = command.split(' ').slice(2).join(' ');
      if (themeName) {
        const newTheme = {
          name: themeName,
          primary: '#00ff00',
          secondary: '#008000',
          bright: '#39ff14',
          bg: '#000000',
          border: 'rgba(0, 255, 0, 0.2)',
          accent: '#00cc00'
        };
        setCustomThemes(prev => ({ ...prev, [themeName]: newTheme }));
        const createMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: `Custom theme "${themeName}" created! Use "theme set ${themeName}" to apply it.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, createMessage]);
      }
    } else if (command.startsWith('theme set ')) {
      const themeName = command.split(' ').slice(2).join(' ');
      if (customThemes[themeName]) {
        // Apply custom theme (placeholder for future implementation)
        const setMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: `Custom theme "${themeName}" applied! (Note: Full custom theme support coming soon)`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, setMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: `Custom theme "${themeName}" not found. Use "theme list" to see available themes.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } else if (command === 'theme list') {
      const customThemeNames = Object.keys(customThemes);
      const allThemes = ['matrix', 'cyber', 'retro', 'neon', ...customThemeNames];
      const listMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `Available themes: ${allThemes.join(', ')}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, listMessage]);
    } else if (command === 'clear') {
      setMessages([]);
    } else if (command === 'whoami') {
      const whoamiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `User: ${username}
System: Matrix Terminal Chat
Access Level: Admin`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, whoamiMessage]);
    } else if (command === 'date') {
      const dateMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: new Date().toLocaleString(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, dateMessage]);
    } else if (command === 'exit') {
      setIsAuthenticated(false);
      setCurrentPrompt('login: ');
      setInputType('username');
      setUsername('');
      setPassword('');
      setMessages([{
        id: Date.now().toString(),
        type: 'system',
        content: 'Logged out successfully.',
        timestamp: new Date()
      }]);
    } else {
      // AI chat
      setIsTyping(true);
      simulateAIResponse(command);
    }
  };

  const simulateAIResponse = (_userInput: string) => {
    // Simulate AI processing time
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
      setIsTyping(false);
    }, 2000 + Math.random() * 3000);
  };

  const performDramaticLogout = async () => {
    setIsLoggingOut(true);
    
    // Add crash messages
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

    // Show crash animation
    setShowCrashAnimation(true);
    
    // Wait for animation, then reset
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Reset everything
    setIsAuthenticated(false);
    setCurrentPrompt('login: ');
    setInputType('username');
    setUsername('');
    setPassword('');
    setMessages([{
      id: Date.now().toString(),
      type: 'system',
      content: 'System rebooted. Welcome back to the Matrix Terminal Chat System.',
      timestamp: new Date()
    }]);
    setIsLoggingOut(false);
    setShowCrashAnimation(false);
  };

  const MatrixRain = () => {
    const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number, speed: number, size: number}>>([]);

    useEffect(() => {
      const newDrops = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        speed: 2 + Math.random() * 3,
        size: 12 + Math.random() * 8
      }));
      setDrops(newDrops);
    }, []);

    return (
      <div className="matrix-rain">
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            className="matrix-char absolute pointer-events-none"
            style={{ 
              left: `${drop.x}%`,
              fontSize: `${drop.size}px`,
              color: `hsl(120, 100%, ${60 + Math.random() * 40}%)`
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: window.innerHeight + 100, 
              opacity: [0, 0.8, 0.3, 0] 
            }}
            transition={{
              duration: drop.speed,
              delay: drop.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
          </motion.div>
        ))}
      </div>
    );
  };

  const TypingIndicator = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeciphering, setIsDeciphering] = useState(true);

    useEffect(() => {
      if (!isTyping) return;

      const decipherText = "DECIPHERING RESPONSE...";
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < decipherText.length) {
          setDisplayText(prev => prev + decipherText[currentIndex]);
          currentIndex++;
        } else {
          // Start random character generation
          setIsDeciphering(false);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, [isTyping]);

    useEffect(() => {
      if (!isDeciphering) {
        const interval = setInterval(() => {
          setDisplayText(prev => {
            const newText = prev.split('').map(() => 
              matrixChars[Math.floor(Math.random() * matrixChars.length)]
            ).join('');
            return newText;
          });
        }, 50);

        return () => clearInterval(interval);
      }
    }, [isDeciphering]);

    if (!isTyping) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-terminal-green-dim mb-1"
      >
        <span className="text-terminal-green">bot@matrix:~$</span>
        <motion.span
          className="text-terminal-green-bright ml-1"
          animate={{ 
            textShadow: [
              '0 0 5px #00ff00',
              '0 0 10px #00ff00',
              '0 0 5px #00ff00'
            ]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {displayText}
        </motion.span>
        <motion.span
          className="terminal-cursor text-terminal-green ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          █
        </motion.span>
      </motion.div>
    );
  };

  const theme = getThemeClasses();

  return (
    <div className={`relative w-full h-screen ${theme.bg} ${theme.primary} font-mono overflow-hidden`}>
      {/* Crash Animation Overlay */}
      {showCrashAnimation && (
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
      )}

      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Sidebar with System Info */}
      <div className={`absolute left-0 top-0 w-64 h-full ${theme.bg}/95 border-r ${theme.border} z-5 p-4 sidebar-glow`}>
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
                  onClick={() => {
                    setUsername('neo');
                    setPassword('matrix');
                    setIsAuthenticated(true);
                    setCurrentPrompt('neo@matrix:~$ ');
                    setInputType('command');
                    setMessages(prev => [...prev, 
                      {
                        id: Date.now().toString(),
                        type: 'system',
                        content: 'Authentication successful. Welcome to the Matrix, Neo.',
                        timestamp: new Date()
                      },
                      {
                        id: (Date.now() + 1).toString(),
                        type: 'system',
                        content: 'Type "help" for available commands or start chatting with the AI.',
                        timestamp: new Date()
                      }
                    ]);
                    onAuthenticated();
                  }}
                  className="w-full p-2 text-left border border-terminal-green/20 rounded hover:bg-terminal-green/10 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-terminal-green-bright">NEO LOGIN</div>
                  <div className="text-terminal-green-dim">neo / matrix</div>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setUsername('demo_user');
                    setPassword('demo_pass');
                    setIsAuthenticated(true);
                    setCurrentPrompt('demo_user@matrix:~$ ');
                    setInputType('command');
                    setMessages(prev => [...prev, 
                      {
                        id: Date.now().toString(),
                        type: 'system',
                        content: 'Demo authentication successful. Welcome to the Matrix!',
                        timestamp: new Date()
                      },
                      {
                        id: (Date.now() + 1).toString(),
                        type: 'system',
                        content: 'Type "help" for available commands or start chatting with the AI.',
                        timestamp: new Date()
                      }
                    ]);
                    onAuthenticated();
                  }}
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
      
      {/* Terminal Header - Minimal Linux style */}
      <div className={`relative z-10 ${theme.bg} border-b ${theme.border} p-2 ml-64`}>
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
                onClick={() => {
                  setUsername('demo_user');
                  setPassword('demo_pass');
                  setIsAuthenticated(true);
                  setCurrentPrompt('demo_user@matrix:~$ ');
                  setInputType('command');
                  setMessages(prev => [...prev, 
                    {
                      id: Date.now().toString(),
                      type: 'system',
                      content: 'Demo authentication successful. Welcome to the Matrix!',
                      timestamp: new Date()
                    },
                    {
                      id: (Date.now() + 1).toString(),
                      type: 'system',
                      content: 'Type "help" for available commands or start chatting with the AI.',
                      timestamp: new Date()
                    }
                  ]);
                  onAuthenticated();
                }}
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
                onClick={performDramaticLogout}
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
              onClick={cycleColorTheme}
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
              onClick={cycleAlignment}
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
          
          <TypingIndicator />
          
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
