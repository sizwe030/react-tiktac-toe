import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Play, HelpCircle, Trophy, Users } from 'lucide-react';
import { Container, Card, Button, Title, Subtitle } from '../styles/GlobalStyles';
import { ThemeToggle } from '../components/ThemeToggle';
import { SoundToggle } from '../components/SoundToggle';
import { Modal } from '../components/Modal';
import { useModal } from '../hooks/useModal';
import { useSound } from '../contexts/SoundContext';

const HomeContainer = styled(Container)`
  gap: 2rem;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

const FeatureIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const InstructionsContent = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const instructionsModal = useModal();

  const handleStartGame = () => {
    playSound('click');
    navigate('/game');
  };

  const handleShowInstructions = () => {
    playSound('click');
    instructionsModal.openModal();
  };

  return (
    <HomeContainer>
      <ControlsContainer>
        <SoundToggle />
        <ThemeToggle />
      </ControlsContainer>

      <Card>
        <Title>Tic Tac Toe</Title>
        <Subtitle>Challenge your friends to the classic game!</Subtitle>
        
        <ButtonGroup>
          <Button onClick={handleStartGame}>
            <Play size={20} style={{ marginRight: '0.5rem' }} />
            Start Game
          </Button>
          <Button variant="secondary" onClick={handleShowInstructions}>
            <HelpCircle size={20} style={{ marginRight: '0.5rem' }} />
            How to Play
          </Button>
        </ButtonGroup>
      </Card>

      <FeatureList>
        <FeatureCard>
          <FeatureIcon>
            <Users size={48} />
          </FeatureIcon>
          <FeatureTitle>Two Player</FeatureTitle>
          <FeatureDescription>
            Play with a friend on the same device. Take turns and see who can get three in a row first!
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Trophy size={48} />
          </FeatureIcon>
          <FeatureTitle>Score Tracking</FeatureTitle>
          <FeatureDescription>
            Keep track of wins and see who's the ultimate Tic Tac Toe champion between you and your friends.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Play size={48} />
          </FeatureIcon>
          <FeatureTitle>Interactive Design</FeatureTitle>
          <FeatureDescription>
            Enjoy smooth animations, sound effects, and multiple themes for an engaging gaming experience.
          </FeatureDescription>
        </FeatureCard>
      </FeatureList>

      <Modal
        isOpen={instructionsModal.isOpen}
        onClose={instructionsModal.closeModal}
        title="How to Play Tic Tac Toe"
      >
        <InstructionsContent>
          <h3>Game Rules</h3>
          <ol>
            <li>The game is played on a 3×3 grid</li>
            <li>Player 1 uses X and Player 2 uses O</li>
            <li>Players take turns placing their marks in empty squares</li>
            <li>The first player to get 3 marks in a row (up, down, across, or diagonally) wins</li>
            <li>If all 9 squares are filled and no player has 3 in a row, the game is a draw</li>
          </ol>

          <h3>Game Features</h3>
          <ol>
            <li>Click on any empty square to place your mark</li>
            <li>The current player is highlighted on the scoreboard</li>
            <li>Winning combinations are highlighted when the game ends</li>
            <li>Use the Reset button to play again with the same scores</li>
            <li>Use New Game to start fresh with scores reset to 0</li>
          </ol>

          <p>Enjoy playing and may the best player win!</p>
        </InstructionsContent>
      </Modal>
    </HomeContainer>
  );
};