/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#000000',
          green: '#00ff00',
          'green-dim': '#00cc00',
          'green-bright': '#00ff41',
          'green-dark': '#004400',
        },
        matrix: {
          green: '#00ff00',
          'green-fade': '#00ff0044',
          'green-glow': '#00ff0088',
        }
      },
      fontFamily: {
        'mono': ['Courier New', 'Monaco', 'Menlo', 'monospace'],
        'matrix': ['Courier New', 'Monaco', 'Menlo', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrix-rain 2s linear infinite',
        'terminal-blink': 'terminal-blink 1s infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'type': 'type 2s steps(40) 1s 1 normal both',
        'decipher': 'decipher 3s ease-in-out infinite',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'terminal-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        'type': {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'decipher': {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
          '100%': { opacity: '0.3', transform: 'scale(0.8)' }
        }
      },
      boxShadow: {
        'terminal': '0 0 20px #00ff00',
        'matrix': '0 0 30px #00ff00, inset 0 0 30px #00ff0022',
      }
    },
  },
  plugins: [],
}