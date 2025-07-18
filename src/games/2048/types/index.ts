export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  id: number;
  value: number;
  position: Position;
  isNew?: boolean;
  isMerged?: boolean;
}

export interface GameState {
  board: (Tile | null)[][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  gameWon: boolean;
  tiles: Tile[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export const BOARD_SIZE = 4;
export const WINNING_VALUE = 2048;