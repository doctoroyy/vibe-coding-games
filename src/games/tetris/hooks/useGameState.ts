import { useState, useCallback } from 'react';
import { GameState, Tetromino, Position } from '../types';
import {
  createInitialGameState,
  getRandomTetromino,
  rotatePiece,
  isValidPosition,
  placePiece,
  clearLines,
  calculateScore
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  const movePiece = useCallback((direction: 'left' | 'right' | 'down') => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.gameOver || prevState.isPaused) {
        return prevState;
      }

      const offset: Position = {
        x: direction === 'left' ? -1 : direction === 'right' ? 1 : 0,
        y: direction === 'down' ? 1 : 0
      };

      if (isValidPosition(prevState.board, prevState.currentPiece, offset)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: {
              x: prevState.currentPiece.position.x + offset.x,
              y: prevState.currentPiece.position.y + offset.y
            }
          }
        };
      }

      // If moving down and can't move, place the piece
      if (direction === 'down') {
        const newBoard = placePiece(prevState.board, prevState.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const newScore = prevState.score + calculateScore(linesCleared, prevState.level);
        const newLines = prevState.lines + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;

        const nextPiece = prevState.nextPiece || getRandomTetromino();
        const newNextPiece = getRandomTetromino();

        // Check if game is over
        if (!isValidPosition(clearedBoard, nextPiece)) {
          return {
            ...prevState,
            board: clearedBoard,
            score: newScore,
            lines: newLines,
            level: newLevel,
            gameOver: true
          };
        }

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: nextPiece,
          nextPiece: newNextPiece,
          score: newScore,
          lines: newLines,
          level: newLevel
        };
      }

      return prevState;
    });
  }, []);

  const rotatePieceAction = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.gameOver || prevState.isPaused) {
        return prevState;
      }

      const rotatedPiece = rotatePiece(prevState.currentPiece);
      
      if (isValidPosition(prevState.board, rotatedPiece)) {
        return {
          ...prevState,
          currentPiece: rotatedPiece
        };
      }

      return prevState;
    });
  }, []);

  const dropPiece = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || prevState.gameOver || prevState.isPaused) {
        return prevState;
      }

      let newY = prevState.currentPiece.position.y;
      while (isValidPosition(prevState.board, prevState.currentPiece, { x: 0, y: newY - prevState.currentPiece.position.y + 1 })) {
        newY++;
      }

      const droppedPiece = {
        ...prevState.currentPiece,
        position: { ...prevState.currentPiece.position, y: newY }
      };

      const newBoard = placePiece(prevState.board, droppedPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const newScore = prevState.score + calculateScore(linesCleared, prevState.level);
      const newLines = prevState.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;

      const nextPiece = prevState.nextPiece || getRandomTetromino();
      const newNextPiece = getRandomTetromino();

      if (!isValidPosition(clearedBoard, nextPiece)) {
        return {
          ...prevState,
          board: clearedBoard,
          score: newScore,
          lines: newLines,
          level: newLevel,
          gameOver: true
        };
      }

      return {
        ...prevState,
        board: clearedBoard,
        currentPiece: nextPiece,
        nextPiece: newNextPiece,
        score: newScore,
        lines: newLines,
        level: newLevel
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  return {
    gameState,
    movePiece,
    rotatePieceAction,
    dropPiece,
    togglePause,
    resetGame
  };
};