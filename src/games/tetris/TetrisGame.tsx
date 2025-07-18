import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import GameBoard from './components/GameBoard';
import NextPiece from './components/NextPiece';
import GameControls from './components/GameControls';
import { useGameState } from './hooks/useGameState';
import { getDropSpeed } from './utils/gameLogic';
import './TetrisGame.css';

const TetrisGame: React.FC = () => {
  const { t } = useTranslation();
  const {
    gameState,
    movePiece,
    rotatePieceAction,
    dropPiece,
    togglePause,
    resetGame
  } = useGameState();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        movePiece('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        movePiece('right');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        movePiece('down');
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        rotatePieceAction();
        break;
      case ' ':
        event.preventDefault();
        dropPiece();
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        togglePause();
        break;
    }
  }, [movePiece, rotatePieceAction, dropPiece, togglePause, gameState.gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return;

    const dropSpeed = getDropSpeed(gameState.level);
    const gameInterval = setInterval(() => {
      movePiece('down');
    }, dropSpeed);

    return () => clearInterval(gameInterval);
  }, [movePiece, gameState.level, gameState.gameOver, gameState.isPaused]);

  return (
    <div className="tetris-game">
      <div className="game-container">
        <div className="header">
          <h1>{t('tetris.title')}</h1>
          <button 
            className="pause-btn"
            onClick={togglePause}
            disabled={gameState.gameOver}
          >
            {gameState.isPaused ? '▶️' : '⏸️'}
          </button>
        </div>

        <div className="game-content">
          <div className="game-left">
            <GameBoard gameState={gameState} />
          </div>

          <div className="game-right">
            <div className="game-stats">
              <div className="stat">
                <span className="stat-label">{t('tetris.score')}:</span>
                <span className="stat-value">{gameState.score}</span>
              </div>
              <div className="stat">
                <span className="stat-label">{t('tetris.level')}:</span>
                <span className="stat-value">{gameState.level}</span>
              </div>
              <div className="stat">
                <span className="stat-label">{t('tetris.lines')}:</span>
                <span className="stat-value">{gameState.lines}</span>
              </div>
            </div>

            <NextPiece nextPiece={gameState.nextPiece} />

            <GameControls
              onMove={movePiece}
              onRotate={rotatePieceAction}
              onDrop={dropPiece}
              disabled={gameState.gameOver || gameState.isPaused}
            />
          </div>
        </div>

        {gameState.gameOver && (
          <div className="game-over">
            <h2>{t('tetris.gameOver')}</h2>
            <p>{t('tetris.finalScore')}: {gameState.score}</p>
            <button onClick={resetGame}>
              {t('tetris.restart')}
            </button>
          </div>
        )}

        {gameState.isPaused && !gameState.gameOver && (
          <div className="game-paused">
            <h2>{t('tetris.paused')}</h2>
            <p>{t('tetris.pressP')}</p>
          </div>
        )}

        <div className="controls-info">
          <p>🎮 {t('tetris.controls.title')}:</p>
          <p>• {t('tetris.controls.move')}</p>
          <p>• {t('tetris.controls.rotate')}</p>
          <p>• {t('tetris.controls.drop')}</p>
          <p>• {t('tetris.controls.pause')}</p>
        </div>
      </div>
    </div>
  );
};

export default TetrisGame;