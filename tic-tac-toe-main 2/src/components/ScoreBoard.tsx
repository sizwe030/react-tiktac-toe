import React from 'react';
import styled from 'styled-components';
import { Trophy, User } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const PlayerScore = styled.div<{ isActive: boolean }>`
  background: ${({ theme, isActive }) => 
    isActive ? theme.gradients.primary : theme.colors.surface
  };
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.border
  };
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  flex: 1;
  transition: all 0.3s ease;
  color: ${({ theme, isActive }) => isActive ? 'white' : theme.colors.text};
  position: relative;
  overflow: hidden;

  ${({ isActive }) => isActive && `
    animation: activePlayer 2s ease-in-out infinite;
    
    @keyframes activePlayer {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
  `}

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

const PlayerSymbol = styled.div<{ player: 'X' | 'O' }>`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme, player }) => 
    player === 'X' ? theme.colors.primary : theme.colors.secondary
  };

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PlayerName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Score = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const ScoreBoard: React.FC = () => {
  const { scores, currentPlayer, status } = useGame();

  return (
    <ScoreContainer>
      <PlayerScore isActive={currentPlayer === 'X' && status === 'playing'}>
        <PlayerSymbol player="X">X</PlayerSymbol>
        <PlayerName>
          <User size={16} />
          Player 1
        </PlayerName>
        <Score>
          <Trophy size={20} />
          {scores.X}
        </Score>
      </PlayerScore>
      
      <PlayerScore isActive={currentPlayer === 'O' && status === 'playing'}>
        <PlayerSymbol player="O">O</PlayerSymbol>
        <PlayerName>
          <User size={16} />
          Player 2
        </PlayerName>
        <Score>
          <Trophy size={20} />
          {scores.O}
        </Score>
      </PlayerScore>
    </ScoreContainer>
  );
};