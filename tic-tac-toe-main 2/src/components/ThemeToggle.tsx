import React from 'react';
import styled from 'styled-components';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../contexts/SoundContext';

const ThemeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ThemeButton = styled.button<{ active: boolean }>`
  background: ${({ theme, active }) => 
    active ? theme.gradients.primary : theme.colors.surface
  };
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.75rem;
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ThemeToggle: React.FC = () => {
  const { themeName, setTheme } = useTheme();
  const { playSound } = useSound();

  const handleThemeChange = (newTheme: typeof themeName) => {
    playSound('click');
    setTheme(newTheme);
  };

  return (
    <ThemeContainer>
      <ThemeButton
        active={themeName === 'light'}
        onClick={() => handleThemeChange('light')}
        aria-label="Light theme"
      >
        <Sun size={20} />
      </ThemeButton>
      <ThemeButton
        active={themeName === 'dark'}
        onClick={() => handleThemeChange('dark')}
        aria-label="Dark theme"
      >
        <Moon size={20} />
      </ThemeButton>
      <ThemeButton
        active={themeName === 'neon'}
        onClick={() => handleThemeChange('neon')}
        aria-label="Neon theme"
      >
        <Zap size={20} />
      </ThemeButton>
    </ThemeContainer>
  );
};