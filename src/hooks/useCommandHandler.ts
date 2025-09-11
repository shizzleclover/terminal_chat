import { useState, useCallback } from 'react';
import type { Message, ColorTheme, Alignment } from '../types/terminal';
import { getManPage, createSystemMessage, getHelpMessage } from '../utils/commands';

interface UseCommandHandlerProps {
  isAuthenticated: boolean;
  username: string;
  colorTheme: ColorTheme;
  alignment: Alignment;
  customThemes: { [key: string]: any };
  onThemeChange: () => void;
  onAlignmentChange: () => void;
  onCreateCustomTheme: (name: string) => void;
  onLogout: () => void;
  onAIResponse: (input: string) => void;
}

export const useCommandHandler = ({
  isAuthenticated,
  username,
  colorTheme,
  alignment,
  customThemes,
  onThemeChange,
  onAlignmentChange,
  onCreateCustomTheme,
  onLogout,
  onAIResponse
  
}: UseCommandHandlerProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleCommand = useCallback((command: string, _currentPrompt: string): Message[] => {
    const messages: Message[] = [];

    // Handle system commands
    if (command === 'help') {
      messages.push(createSystemMessage(getHelpMessage()));
    } else if (command.startsWith('man ')) {
      const commandName = command.split(' ')[1];
      messages.push(createSystemMessage(getManPage(commandName)));
    } else if (command === 'theme') {
      onThemeChange();
      messages.push(createSystemMessage(`Theme changed to: ${colorTheme.toUpperCase()}`));
    } else if (command === 'align') {
      onAlignmentChange();
      messages.push(createSystemMessage(`Alignment changed to: ${alignment.toUpperCase()}`));
    } else if (command.startsWith('theme create ')) {
      const themeName = command.split(' ').slice(2).join(' ');
      if (themeName) {
        onCreateCustomTheme(themeName);
        messages.push(createSystemMessage(`Custom theme "${themeName}" created! Use "theme set ${themeName}" to apply it.`));
      }
    } else if (command.startsWith('theme set ')) {
      const themeName = command.split(' ').slice(2).join(' ');
      if (customThemes[themeName]) {
        messages.push(createSystemMessage(`Custom theme "${themeName}" applied! (Note: Full custom theme support coming soon)`));
      } else {
        messages.push(createSystemMessage(`Custom theme "${themeName}" not found. Use "theme list" to see available themes.`));
      }
    } else if (command === 'theme list') {
      const customThemeNames = Object.keys(customThemes);
      const allThemes = ['matrix', 'cyber', 'retro', 'neon', ...customThemeNames];
      messages.push(createSystemMessage(`Available themes: ${allThemes.join(', ')}`));
    } else if (command === 'clear') {
      // Clear command handled by parent component
      return [];
    } else if (command === 'whoami') {
      messages.push(createSystemMessage(`User: ${username}\nSystem: Matrix Terminal Chat\nAccess Level: ${isAuthenticated ? 'AUTHENTICATED' : 'GUEST'}\nSession: Active`));
    } else if (command === 'date') {
      messages.push(createSystemMessage(new Date().toLocaleString()));
    } else if (command === 'exit') {
      onLogout();
      return [];
    } else {
      // AI chat
      setIsTyping(true);
      onAIResponse(command);
    }

    return messages;
  }, [
    isAuthenticated,
    username,
    colorTheme,
    alignment,
    customThemes,
    onThemeChange,
    onAlignmentChange,
    onCreateCustomTheme,
    onLogout,
    onAIResponse
  ]);

  return {
    isTyping,
    setIsTyping,
    handleCommand
  };
};
