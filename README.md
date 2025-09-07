# Matrix Terminal Chat Bot

A terminal-style chatbot with the classic green-on-black aesthetic, complete with Matrix-themed animations and Linux-style authentication.

## Features

- **Terminal Aesthetic**: Classic terminal interface with 4 customizable color themes
- **Linux-style Authentication**: Username/password login system with demo login buttons
- **Matrix Rain Animation**: Animated background with falling characters
- **Matrix-style Typing Indicator**: Deciphering animation that simulates password cracking
- **Comprehensive Command System**: Built-in commands with Unix-style manual pages
- **AI Chat**: Interactive chatbot responses with realistic typing delays
- **Color Themes**: Matrix (green), Cyber (cyan), Retro (amber), Neon (pink) + custom themes
- **User Preferences**: Persistent settings saved to localStorage
- **Dramatic Logout**: Epic crash and burn animation with system failure messages
- **Manual System**: Complete documentation with `man` command
- **Smooth Animations**: Framer Motion animations for all interactions
- **Monospace Fonts**: JetBrains Mono for authentic terminal feel

## Authentication

Default credentials:
- **Username**: `neo`
- **Password**: `matrix`

## Available Commands

Once authenticated, you can use these terminal commands:

### Basic Commands
- `help` - Show available commands
- `clear` - Clear the terminal
- `whoami` - Show current user information
- `date` - Show current date and time
- `exit` - Logout from the system (with dramatic crash animation!)

### Theme Commands
- `theme` - Cycle through color themes
- `theme list` - List all available themes
- `theme create [name]` - Create a custom theme
- `theme set [name]` - Apply a custom theme

### Display Commands
- `align` - Cycle through text alignment (left, center, right)

### Documentation
- `man [command]` - Show detailed manual for any command

Or simply type any message to chat with the AI!

## Color Themes

The terminal supports multiple color themes:

- **Matrix** (Default): Classic green-on-black Matrix theme
- **Cyber**: Futuristic cyan theme
- **Retro**: Vintage amber/orange theme
- **Neon**: Vibrant pink/purple theme
- **Custom**: Create your own themes with `theme create [name]`

## User Preferences

Your settings are automatically saved to localStorage:
- Selected color theme
- Text alignment preference
- Custom themes you create

## Demo Login

For quick testing, use the demo login buttons:
- **NEO LOGIN**: `neo` / `matrix`
- **DEMO LOGIN**: `demo_user` / `demo_pass`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL

4. Login with the credentials above and start chatting!

## Technologies Used

- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **JetBrains Mono** font for terminal aesthetics

## Customization

The terminal theme can be customized by modifying the colors in `tailwind.config.js`:

```javascript
colors: {
  terminal: {
    bg: '#000000',
    green: '#00ff00',
    'green-dim': '#00cc00',
    'green-bright': '#00ff41',
    'green-dark': '#004400',
  }
}
```

## Matrix Effects

The application includes several Matrix-themed effects:

- **Matrix Rain**: Animated falling characters in the background
- **Deciphering Animation**: Typing indicator that simulates password cracking
- **Glitch Effects**: Text animations for enhanced terminal feel
- **Terminal Cursor**: Blinking cursor animation
- **Glow Effects**: Green glow around interactive elements

Enjoy your Matrix terminal experience! 🚀