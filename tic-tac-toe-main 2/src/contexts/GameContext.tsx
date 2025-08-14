import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Player = 'X' | 'O';
export type GameBoard = (Player | null)[][];
export type GameStatus = 'playing' | 'won' | 'draw';

interface GameState {
  board: GameBoard;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[][] | null;
  scores: { X: number; O: number };
}

interface GameContextType extends GameState {
  makeMove: (row: number, col: number) => boolean;
  resetGame: () => void;
  newGame: () => void;
}

const initialBoard: GameBoard = Array(3).fill(null).map(() => Array(3).fill(null));

const initialState: GameState = {
  board: initialBoard,
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winningLine: null,
  scores: { X: 0, O: 0 },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const checkWinner = (board: GameBoard): { winner: Player | null; winningLine: number[][] | null } => {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return { winner: board[a[0]][a[1]], winningLine: line };
      }
    }

    return { winner: null, winningLine: null };
  };

  const isBoardFull = (board: GameBoard): boolean => {
    return board.every(row => row.every(cell => cell !== null));
  };

  const makeMove = (row: number, col: number): boolean => {
    if (gameState.board[row][col] !== null || gameState.status !== 'playing') {
      return false;
    }

    const newBoard = gameState.board.map(r => [...r]);
    newBoard[row][col] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard);
    let newStatus: GameStatus = 'playing';
    let newScores = { ...gameState.scores };

    if (winner) {
      newStatus = 'won';
      newScores[winner]++;
    } else if (isBoardFull(newBoard)) {
      newStatus = 'draw';
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      status: newStatus,
      winner,
      winningLine,
      scores: newScores,
    });

    return true;
  };

  const resetGame = () => {
    setGameState({
      ...initialState,
      scores: gameState.scores,
    });
  };

  const newGame = () => {
    setGameState(initialState);
  };

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        makeMove,
        resetGame,
        newGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};