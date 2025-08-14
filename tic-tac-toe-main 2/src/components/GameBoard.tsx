import React from 'react';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';
import { useSound } from '../contexts/SoundContext';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 768px) {
    gap: 0.375rem;
    padding: 0.75rem;
  }
`;

const Cell = styled.button<{ isWinning: boolean }>`
  aspect-ratio: 1;
  background: ${({ theme, isWinning }) => 
    isWinning ? theme.gradients.primary : theme.colors.surface
  };
  border: 2px solid ${({ theme, isWinning }) => 
    isWinning ? theme.colors.primary : theme.colors.border
  };
  border-radius: 12px;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme, isWinning }) => 
    isWinning ? 'white' : theme.colors.text
  };
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const PlayerSymbol = styled.span<{ player: 'X' | 'O' }>`
  color: ${({ theme, player }) => 
    player === 'X' ? theme.colors.primary : theme.colors.secondary
  };
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: symbolAppear 0.3s ease-out;

  @keyframes symbolAppear {
    from {
      opacity: 0;
      transform: scale(0.5) rotate(180deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
`;

export const GameBoard: React.FC = () => {
  const { board, makeMove, status, winningLine } = useGame();
  const { playSound } = useSound();

  const handleCellClick = (row: number, col: number) => {
    const success = makeMove(row, col);
    if (success) {
      playSound('move');
    }
  };

  const isWinningCell = (row: number, col: number): boolean => {
    return winningLine?.some(([r, c]) => r === row && c === col) || false;
  };

  return (
    <BoardContainer>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            disabled={cell !== null || status !== 'playing'}
            isWinning={isWinningCell(rowIndex, colIndex)}
            aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}${cell ? `, ${cell}` : ', empty'}`}
          >
            {cell && <PlayerSymbol player={cell}>{cell}</PlayerSymbol>}
          </Cell>
        ))
      )}
    </BoardContainer>
  );
};