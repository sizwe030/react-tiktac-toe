import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, themes } from '../styles/theme';

interface ThemeContextType {
  theme: Theme;
  themeName: keyof typeof themes;
  setTheme: (themeName: keyof typeof themes) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<keyof typeof themes>('light');
  const theme = themes[themeName];

  const setTheme = (newThemeName: keyof typeof themes) => {
    setThemeName(newThemeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};