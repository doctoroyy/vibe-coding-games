import { useState, useCallback } from 'react';
import { GameState, Direction, Difficulty } from '../types';
import { 
  createInitialGameState, 
  moveSnake, 
  checkCollision, 
  checkFoodCollision, 
  generateFood 
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver) return prevState;

      const newSnake = moveSnake(prevState.snake, prevState.direction);
      const head = newSnake[0];

      if (checkCollision(head, prevState.snake)) {
        return { ...prevState, gameOver: true };
      }

      if (checkFoodCollision(head, prevState.food)) {
        const grownSnake = [...newSnake, prevState.snake[prevState.snake.length - 1]];
        return {
          ...prevState,
          snake: grownSnake,
          food: generateFood(grownSnake),
          score: prevState.score + 10
        };
      }

      return { ...prevState, snake: newSnake };
    });
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prevState => {
      // 防止反向移动
      const opposites = {
        [Direction.UP]: Direction.DOWN,
        [Direction.DOWN]: Direction.UP,
        [Direction.LEFT]: Direction.RIGHT,
        [Direction.RIGHT]: Direction.LEFT
      };

      if (opposites[newDirection] === prevState.direction) {
        return prevState;
      }

      return { ...prevState, direction: newDirection };
    });
  }, []);

  const resetGame = useCallback((difficulty?: Difficulty) => {
    setGameState(createInitialGameState(difficulty));
  }, []);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prevState => ({ ...prevState, difficulty }));
  }, []);

  return { gameState, updateGame, changeDirection, resetGame, changeDifficulty };
};