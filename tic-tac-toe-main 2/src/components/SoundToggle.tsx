import React from 'react';
import styled from 'styled-components';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const SoundButton = styled.button<{ active: boolean }>`
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

export const SoundToggle: React.FC = () => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <SoundButton
      active={soundEnabled}
      onClick={toggleSound}
      aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
    >
      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </SoundButton>
  );
};