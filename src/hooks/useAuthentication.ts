import { useState, useCallback } from 'react';
import type { Message, InputType } from '../types/terminal';
import { createSystemMessage } from '../utils/commands';

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [, setPassword] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('login: ');
  const [inputType, setInputType] = useState<InputType>('username');

  const login = useCallback((user: string, pass: string, isDemo = false) => {
    setUsername(user);
    setPassword(pass);
    setIsAuthenticated(true);
    setCurrentPrompt(`${user}@matrix:~$ `);
    setInputType('command');
    
    const welcomeMessages: Message[] = [
      createSystemMessage(isDemo 
        ? 'Demo authentication successful. Welcome to the Matrix!'
        : 'Authentication successful. Welcome to the Matrix, Neo.'
      ),
      createSystemMessage('Type "help" for available commands or start chatting with the AI.')
    ];
    
    return welcomeMessages;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentPrompt('login: ');
    setInputType('username');
    setUsername('');
    setPassword('');
    
    return [createSystemMessage('Logged out successfully.')];
  }, []);

  const handleAuthInput = useCallback((input: string): { messages: Message[], shouldClear: boolean } => {
    if (inputType === 'username') {
      setUsername(input);
      setCurrentPrompt('password: ');
      setInputType('password');
      return { messages: [], shouldClear: false };
    } else if (inputType === 'password') {
      setPassword(input);
      if (username === 'neo' && input === 'matrix') {
        const messages = login('neo', 'matrix');
        return { messages, shouldClear: false };
      } else if (username === 'demo_user' && input === 'demo_pass') {
        const messages = login('demo_user', 'demo_pass', true);
        return { messages, shouldClear: false };
      } else {
        const errorMessage = createSystemMessage('Authentication failed. Please try again.');
        setCurrentPrompt('login: ');
        setInputType('username');
        setUsername('');
        setPassword('');
        return { messages: [errorMessage], shouldClear: false };
      }
    }
    return { messages: [], shouldClear: false };
  }, [inputType, username, login]);

  return {
    isAuthenticated,
    username,
    currentPrompt,
    inputType,
    login,
    logout,
    handleAuthInput
  };
};
