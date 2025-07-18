import { GameState, Tile, Direction, BOARD_SIZE, WINNING_VALUE, Position } from '../types';

let tileIdCounter = 0;

export const createEmptyBoard = (): (Tile | null)[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
};

export const getEmptyPositions = (board: (Tile | null)[][]): Position[] => {
  const positions: Position[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (!board[y][x]) {
        positions.push({ x, y });
      }
    }
  }
  return positions;
};

export const createTile = (position: Position, value: number = Math.random() < 0.9 ? 2 : 4): Tile => ({
  id: ++tileIdCounter,
  value,
  position,
  isNew: true
});

export const addRandomTile = (board: (Tile | null)[][]): (Tile | null)[][] => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;

  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const newTile = createTile(randomPosition);
  
  const newBoard = board.map(row => [...row]);
  newBoard[randomPosition.y][randomPosition.x] = newTile;
  
  return newBoard;
};

export const createInitialGameState = (): GameState => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  
  const tiles = board.flat().filter(tile => tile !== null) as Tile[];
  
  return {
    board,
    score: 0,
    bestScore: parseInt(localStorage.getItem('2048-best-score') || '0'),
    gameOver: false,
    gameWon: false,
    tiles
  };
};

const moveRow = (row: (Tile | null)[]): { row: (Tile | null)[], score: number } => {
  const filteredRow = row.filter(tile => tile !== null) as Tile[];
  const newRow: (Tile | null)[] = Array(BOARD_SIZE).fill(null);
  let score = 0;
  let index = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    const currentTile = filteredRow[i];
    
    if (i < filteredRow.length - 1 && currentTile.value === filteredRow[i + 1].value) {
      // Merge tiles
      const mergedTile: Tile = {
        ...currentTile,
        value: currentTile.value * 2,
        isMerged: true
      };
      newRow[index] = mergedTile;
      score += mergedTile.value;
      i++; // Skip next tile as it's merged
    } else {
      newRow[index] = currentTile;
    }
    index++;
  }

  return { row: newRow, score };
};

export const move = (board: (Tile | null)[][], direction: Direction): { 
  newBoard: (Tile | null)[][], 
  score: number,
  moved: boolean 
} => {
  let newBoard: (Tile | null)[][];
  let totalScore = 0;
  let moved = false;

  switch (direction) {
    case 'left':
      newBoard = board.map((row, y) => {
        const { row: newRow, score } = moveRow(row);
        totalScore += score;
        
        // Update positions and check if moved
        newRow.forEach((tile, x) => {
          if (tile) {
            if (tile.position.x !== x || tile.position.y !== y) {
              moved = true;
            }
            tile.position = { x, y };
          }
        });
        
        return newRow;
      });
      break;

    case 'right':
      newBoard = board.map((row, y) => {
        const reversedRow = [...row].reverse();
        const { row: newRow, score } = moveRow(reversedRow);
        totalScore += score;
        
        const finalRow = newRow.reverse();
        
        // Update positions and check if moved
        finalRow.forEach((tile, x) => {
          if (tile) {
            if (tile.position.x !== x || tile.position.y !== y) {
              moved = true;
            }
            tile.position = { x, y };
          }
        });
        
        return finalRow;
      });
      break;

    case 'up':
      newBoard = createEmptyBoard();
      for (let x = 0; x < BOARD_SIZE; x++) {
        const column = board.map(row => row[x]);
        const { row: newColumn, score } = moveRow(column);
        totalScore += score;
        
        newColumn.forEach((tile, y) => {
          if (tile) {
            if (tile.position.x !== x || tile.position.y !== y) {
              moved = true;
            }
            tile.position = { x, y };
          }
          newBoard[y][x] = tile;
        });
      }
      break;

    case 'down':
      newBoard = createEmptyBoard();
      for (let x = 0; x < BOARD_SIZE; x++) {
        const column = board.map(row => row[x]).reverse();
        const { row: newColumn, score } = moveRow(column);
        totalScore += score;
        
        const finalColumn = newColumn.reverse();
        finalColumn.forEach((tile, y) => {
          if (tile) {
            if (tile.position.x !== x || tile.position.y !== y) {
              moved = true;
            }
            tile.position = { x, y };
          }
          newBoard[y][x] = tile;
        });
      }
      break;
  }

  return { newBoard, score: totalScore, moved };
};

export const isGameOver = (board: (Tile | null)[][]): boolean => {
  // Check for empty cells
  if (getEmptyPositions(board).length > 0) return false;

  // Check for possible merges
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const currentTile = board[y][x];
      if (!currentTile) continue;

      // Check right neighbor
      if (x < BOARD_SIZE - 1 && board[y][x + 1]?.value === currentTile.value) {
        return false;
      }

      // Check bottom neighbor
      if (y < BOARD_SIZE - 1 && board[y + 1][x]?.value === currentTile.value) {
        return false;
      }
    }
  }

  return true;
};

export const hasWon = (board: (Tile | null)[][]): boolean => {
  return board.flat().some(tile => tile?.value === WINNING_VALUE);
};

export const getTileColor = (value: number): string => {
  const colors: { [key: number]: string } = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
  };
  
  return colors[value] || '#3c3a32';
};

export const getTileTextColor = (value: number): string => {
  return value <= 4 ? '#776e65' : '#f9f6f2';
};