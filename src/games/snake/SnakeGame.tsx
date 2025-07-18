import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GameBoard from './components/GameBoard';
import MobileControls from './components/MobileControls';
import DifficultySelector from './components/DifficultySelector';
import { useGameState } from './hooks/useGameState';
import { useSwipeControls } from './hooks/useSwipeControls';
import { Direction, DIFFICULTY_SPEEDS } from './types';
import './SnakeGame.css';

const SnakeGame: React.FC = () => {
  const { t } = useTranslation();
  const { gameState, updateGame, changeDirection, resetGame, changeDifficulty } = useGameState();
  const [showSettings, setShowSettings] = useState(false);
  
  // 添加滑动控制
  useSwipeControls({ 
    onDirectionChange: changeDirection, 
    disabled: gameState.gameOver 
  });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        changeDirection(Direction.UP);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        changeDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        changeDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        changeDirection(Direction.RIGHT);
        break;
      case ' ':
        event.preventDefault();
        if (gameState.gameOver) {
          resetGame(gameState.difficulty);
        }
        break;
    }
  }, [changeDirection, resetGame, gameState.gameOver, gameState.difficulty]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const speed = DIFFICULTY_SPEEDS[gameState.difficulty];
    const gameInterval = setInterval(updateGame, speed);
    return () => clearInterval(gameInterval);
  }, [updateGame, gameState.gameOver, gameState.difficulty]);

  return (
    <div className="snake-game">
      <div className="game-container">
        <div className="header">
          <h1>{t('snake.title')}</h1>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </div>
        
        <div className="score">{t('snake.score')}: {gameState.score}</div>
        
        {showSettings && (
          <div className="settings-panel">
            <DifficultySelector
              currentDifficulty={gameState.difficulty}
              onDifficultyChange={changeDifficulty}
              disabled={!gameState.gameOver}
            />
          </div>
        )}
        
        <GameBoard gameState={gameState} />
        
        {gameState.gameOver && (
          <div className="game-over">
            <h2>{t('snake.gameOver')}</h2>
            <p>{t('snake.finalScore')}: {gameState.score}</p>
            <button onClick={() => resetGame(gameState.difficulty)}>
              {t('snake.restart')}
            </button>
          </div>
        )}
        
        <MobileControls 
          onDirectionChange={changeDirection}
          disabled={gameState.gameOver}
        />
        
        <div className="controls">
          <p>🎮 {t('snake.controls.title')}:</p>
          <p>• {t('snake.controls.keyboard')}</p>
          <p>• {t('snake.controls.mobile')}</p>
          <p>• {t('snake.controls.restart')}</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;