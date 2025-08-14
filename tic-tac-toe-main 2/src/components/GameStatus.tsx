import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Crown, Users, RotateCcw } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useSound } from '../contexts/SoundContext';

const StatusContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const StatusMessage = styled.div<{ status: string }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme, status }) => 
    status === 'won' ? theme.colors.success :
    status === 'draw' ? theme.colors.warning :
    theme.colors.text
  };

  ${({ status }) => status === 'won' && `
    animation: celebration 1s ease-in-out;
    
    @keyframes celebration {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1) rotate(-5deg); }
      75% { transform: scale(1.1) rotate(5deg); }
    }
  `}

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CurrentPlayerMessage = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const GameStatus: React.FC = () => {
  const { status, winner, currentPlayer } = useGame();
  const { playSound } = useSound();

  useEffect(() => {
    if (status === 'won') {
      playSound('win');
    } else if (status === 'draw') {
      playSound('draw');
    }
  }, [status, playSound]);

  if (status === 'won') {
    return (
      <StatusContainer>
        <StatusMessage status="won">
          <Crown size={24} />
          Player {winner === 'X' ? '1' : '2'} ({winner}) Wins!
        </StatusMessage>
      </StatusContainer>
    );
  }

  if (status === 'draw') {
    return (
      <StatusContainer>
        <StatusMessage status="draw">
          <Users size={24} />
          It's a Draw!
        </StatusMessage>
      </StatusContainer>
    );
  }

  return (
    <StatusContainer>
      <CurrentPlayerMessage>
        <RotateCcw size={20} />
        Player {currentPlayer === 'X' ? '1' : '2'}'s Turn ({currentPlayer})
      </CurrentPlayerMessage>
    </StatusContainer>
  );
};