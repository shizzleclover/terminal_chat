import { useState, useEffect } from 'react';
import type { Alignment } from '../types/terminal';

export const useAlignment = () => {
  const [alignment, setAlignment] = useState<Alignment>('right');

  // Load alignment preference from localStorage
  useEffect(() => {
    const savedAlignment = localStorage.getItem('terminal-alignment');
    if (savedAlignment && ['left', 'center', 'right'].includes(savedAlignment)) {
      setAlignment(savedAlignment as Alignment);
    }
  }, []);

  // Save alignment to localStorage
  useEffect(() => {
    localStorage.setItem('terminal-alignment', alignment);
  }, [alignment]);

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

  return {
    alignment,
    cycleAlignment,
    getAlignmentClasses
  };
};
