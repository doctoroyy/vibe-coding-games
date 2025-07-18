export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  score: number;
  difficulty: Difficulty;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export const GRID_SIZE = 20;
export const CANVAS_SIZE = 400;

export const DIFFICULTY_SPEEDS = {
  [Difficulty.EASY]: 200,
  [Difficulty.MEDIUM]: 150,
  [Difficulty.HARD]: 100
};