import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import GameBoard from './components/GameBoard';
import { useGameState } from './hooks/useGameState';
import { useSwipeControls } from './hooks/useSwipeControls';
import { Direction } from './types';
import './Game2048.css';

const Game2048: React.FC = () => {
  const { t } = useTranslation();
  const { gameState, makeMove, resetGame, continueGame } = useGameState();

  // 添加滑动控制
  useSwipeControls({ 
    onMove: makeMove, 
    disabled: gameState.gameOver 
  });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        makeMove('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        makeMove('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        makeMove('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        makeMove('right');
        break;
    }
  }, [makeMove, gameState.gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="game-2048">
      <div className="game-container">
        <div className="header">
          <h1>{t('2048.title')}</h1>
          <button className="restart-btn" onClick={resetGame}>
            {t('2048.restart')}
          </button>
        </div>

        <div className="score-container">
          <div className="score-box">
            <div className="score-label">{t('2048.score')}</div>
            <div className="score-value">{gameState.score}</div>
          </div>
          <div className="score-box">
            <div className="score-label">{t('2048.best')}</div>
            <div className="score-value">{gameState.bestScore}</div>
          </div>
        </div>

        <GameBoard gameState={gameState} />

        {gameState.gameWon && (
          <div className="game-won">
            <h2>{t('2048.gameWon')}</h2>
            <p>{t('2048.finalScore')}: {gameState.score}</p>
            <div className="game-won-buttons">
              <button onClick={continueGame}>{t('2048.continue')}</button>
              <button onClick={resetGame}>{t('2048.restart')}</button>
            </div>
          </div>
        )}

        {gameState.gameOver && (
          <div className="game-over">
            <h2>{t('2048.gameOver')}</h2>
            <p>{t('2048.finalScore')}: {gameState.score}</p>
            <button onClick={resetGame}>{t('2048.restart')}</button>
          </div>
        )}

        <div className="controls-info">
          <p>🎮 {t('2048.controls.title')}:</p>
          <p>• {t('2048.controls.move')}</p>
          <p>• {t('2048.controls.goal')}</p>
        </div>
      </div>
    </div>
  );
};

export default Game2048;