import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Home, RotateCcw, Plus, Settings } from 'lucide-react';
import { Container, Card, Button } from '../styles/GlobalStyles';
import { GameBoard } from '../components/GameBoard';
import { ScoreBoard } from '../components/ScoreBoard';
import { GameStatus } from '../components/GameStatus';
import { ThemeToggle } from '../components/ThemeToggle';
import { SoundToggle } from '../components/SoundToggle';
import { Modal } from '../components/Modal';
import { useGame } from '../contexts/GameContext';
import { useSound } from '../contexts/SoundContext';
import { useModal } from '../hooks/useModal';

const GameContainer = styled(Container)`
  gap: 1.5rem;
  padding: 1rem;
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`;

const GameCard = styled(Card)`
  width: 100%;
  max-width: 500px;
  position: relative;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
`;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  .setting-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  .setting-label {
    font-weight: 600;
  }

  .setting-description {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
`;

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { resetGame, newGame } = useGame();
  const { playSound } = useSound();
  const settingsModal = useModal();

  const handleHome = () => {
    playSound('click');
    navigate('/');
  };

  const handleReset = () => {
    playSound('click');
    resetGame();
  };

  const handleNewGame = () => {
    playSound('click');
    newGame();
  };

  const handleSettings = () => {
    playSound('click');
    settingsModal.openModal();
  };

  return (
    <GameContainer>
      <ControlsContainer>
        <SoundToggle />
        <ThemeToggle />
      </ControlsContainer>

      <GameCard>
        <ScoreBoard />
        <GameBoard />
        <GameStatus />
        
        <ButtonGroup>
          <Button onClick={handleHome}>
            <Home size={20} style={{ marginRight: '0.5rem' }} />
            Home
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw size={20} style={{ marginRight: '0.5rem' }} />
            Reset
          </Button>
          <Button variant="secondary" onClick={handleNewGame}>
            <Plus size={20} style={{ marginRight: '0.5rem' }} />
            New Game
          </Button>
          <Button variant="secondary" onClick={handleSettings}>
            <Settings size={20} style={{ marginRight: '0.5rem' }} />
            Settings
          </Button>
        </ButtonGroup>
      </GameCard>

      <Modal
        isOpen={settingsModal.isOpen}
        onClose={settingsModal.closeModal}
        title="Game Settings"
      >
        <SettingsContent>
          <div>
            <h3>Audio Settings</h3>
            <div className="setting-group">
              <div>
                <div className="setting-label">Sound Effects</div>
                <div className="setting-description">
                  Play sound effects for moves, wins, and interactions
                </div>
              </div>
              <SoundToggle />
            </div>
          </div>

          <div>
            <h3>Visual Settings</h3>
            <div className="setting-group">
              <div>
                <div className="setting-label">Theme</div>
                <div className="setting-description">
                  Choose your preferred visual theme
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div>
            <h3>Game Actions</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button onClick={handleReset}>
                <RotateCcw size={16} style={{ marginRight: '0.5rem' }} />
                Reset Game
              </Button>
              <Button variant="danger" onClick={handleNewGame}>
                <Plus size={16} style={{ marginRight: '0.5rem' }} />
                New Game
              </Button>
            </div>
          </div>
        </SettingsContent>
      </Modal>
    </GameContainer>
  );
};