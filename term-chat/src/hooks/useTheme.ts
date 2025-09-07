import { useState, useEffect } from 'react';
import type { ColorTheme, ThemeClasses, CustomTheme } from '../types/terminal';

export const useTheme = () => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('matrix');
  const [customThemes, setCustomThemes] = useState<{[key: string]: CustomTheme}>({});

  // Load theme preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme');
    const savedCustomThemes = localStorage.getItem('terminal-custom-themes');
    
    if (savedTheme && ['matrix', 'cyber', 'retro', 'neon'].includes(savedTheme)) {
      setColorTheme(savedTheme as ColorTheme);
    }
    if (savedCustomThemes) {
      try {
        setCustomThemes(JSON.parse(savedCustomThemes));
      } catch (e) {
        console.error('Failed to parse custom themes:', e);
      }
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('terminal-theme', colorTheme);
  }, [colorTheme]);

  // Save custom themes to localStorage
  useEffect(() => {
    localStorage.setItem('terminal-custom-themes', JSON.stringify(customThemes));
  }, [customThemes]);

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

  const getThemeClasses = (): ThemeClasses => {
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

  const createCustomTheme = (name: string): CustomTheme => {
    const newTheme: CustomTheme = {
      name,
      primary: '#00ff00',
      secondary: '#008000',
      bright: '#39ff14',
      bg: '#000000',
      border: 'rgba(0, 255, 0, 0.2)',
      accent: '#00cc00'
    };
    setCustomThemes(prev => ({ ...prev, [name]: newTheme }));
    return newTheme;
  };

  const getAvailableThemes = (): string[] => {
    const customThemeNames = Object.keys(customThemes);
    return ['matrix', 'cyber', 'retro', 'neon', ...customThemeNames];
  };

  return {
    colorTheme,
    customThemes,
    cycleColorTheme,
    getThemeClasses,
    createCustomTheme,
    getAvailableThemes
  };
};
