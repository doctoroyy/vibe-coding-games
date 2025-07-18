import { GameState, Tetromino, TETROMINO_SHAPES, BOARD_WIDTH, BOARD_HEIGHT, Position } from '../types';

export const createEmptyBoard = (): (string | null)[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

export const getRandomTetromino = (): Tetromino => {
  const shapes = Object.keys(TETROMINO_SHAPES);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const tetrominoShape = TETROMINO_SHAPES[randomShape];
  
  return {
    shape: tetrominoShape.shape,
    color: tetrominoShape.color,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0
  };
};

export const createInitialGameState = (): GameState => ({
  board: createEmptyBoard(),
  currentPiece: getRandomTetromino(),
  nextPiece: getRandomTetromino(),
  score: 0,
  level: 1,
  lines: 0,
  gameOver: false,
  isPaused: false
});

export const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotated = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotated,
    rotation: (piece.rotation + 1) % 4
  };
};

export const isValidPosition = (
  board: (string | null)[][],
  piece: Tetromino,
  offset: Position = { x: 0, y: 0 }
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.position.x + x + offset.x;
        const newY = piece.position.y + y + offset.y;
        
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (
  board: (string | null)[][],
  piece: Tetromino
): (string | null)[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: (string | null)[][]): { 
  newBoard: (string | null)[][], 
  linesCleared: number 
} => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[linesCleared] * level;
};

export const getDropSpeed = (level: number): number => {
  return Math.max(50, 1000 - (level - 1) * 100);
};