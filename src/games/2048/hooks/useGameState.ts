import { useState, useCallback } from 'react';
import { GameState, Direction } from '../types';
import {
  createInitialGameState,
  move,
  addRandomTile,
  isGameOver,
  hasWon
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);

  const makeMove = useCallback((direction: Direction) => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      const { newBoard, score: moveScore, moved } = move(prevState.board, direction);
      
      if (!moved) return prevState;

      const boardWithNewTile = addRandomTile(newBoard);
      const newScore = prevState.score + moveScore;
      const newBestScore = Math.max(prevState.bestScore, newScore);
      
      // Save best score to localStorage
      if (newBestScore > prevState.bestScore) {
        localStorage.setItem('2048-best-score', newBestScore.toString());
      }

      const tiles = boardWithNewTile.flat().filter(tile => tile !== null);
      const gameWon = !prevState.gameWon && hasWon(boardWithNewTile);
      const gameOver = isGameOver(boardWithNewTile);

      return {
        ...prevState,
        board: boardWithNewTile,
        score: newScore,
        bestScore: newBestScore,
        gameOver,
        gameWon,
        tiles
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  const continueGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      gameWon: false
    }));
  }, []);

  return {
    gameState,
    makeMove,
    resetGame,
    continueGame
  };
};