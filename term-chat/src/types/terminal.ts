// Terminal-specific types
export type ColorTheme = 'matrix' | 'cyber' | 'retro' | 'neon';
export type Alignment = 'left' | 'center' | 'right';
export type InputType = 'username' | 'password' | 'command';

export interface Message {
  id: string;
  type: 'system' | 'user' | 'bot' | 'typing';
  content: string;
  timestamp: Date;
}

export interface TerminalProps {
  onAuthenticated: () => void;
}

export interface ThemeClasses {
  primary: string;
  secondary: string;
  bright: string;
  bg: string;
  border: string;
  accent: string;
}

export interface CustomTheme {
  name: string;
  primary: string;
  secondary: string;
  bright: string;
  bg: string;
  border: string;
  accent: string;
}

export interface UserPreferences {
  theme: ColorTheme;
  alignment: Alignment;
  customThemes: { [key: string]: CustomTheme };
}
