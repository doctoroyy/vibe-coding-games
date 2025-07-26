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
  tileIdCounter = 0;
  
  let board = createEmptyBoard();
  
  // 添加第一个瓦片
  const firstPos = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };
  const firstTile = createTile(firstPos);
  board[firstPos.y][firstPos.x] = firstTile;
  
  // 添加第二个瓦片
  let secondPos;
  do {
    secondPos = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };
  } while (board[secondPos.y][secondPos.x] !== null);
  
  const secondTile = createTile(secondPos);
  board[secondPos.y][secondPos.x] = secondTile;
  
  return {
    board,
    score: 0,
    bestScore: parseInt(localStorage.getItem('2048-best-score') || '0'),
    gameOver: false,
    gameWon: false,
    tiles: [firstTile, secondTile]
  };
};

// 移动一行的逻辑
const moveRowLeft = (row: (Tile | null)[]): { row: (Tile | null)[], score: number, moved: boolean } => {
  // 过滤出非空瓦片
  const tiles = row.filter(tile => tile !== null) as Tile[];
  const newRow: (Tile | null)[] = Array(BOARD_SIZE).fill(null);
  let score = 0;
  let index = 0;
  let moved = false;

  // 如果没有瓦片，直接返回
  if (tiles.length === 0) {
    return { row: newRow, score: 0, moved: false };
  }

  for (let i = 0; i < tiles.length; i++) {
    const currentTile = { ...tiles[i] };
    currentTile.isNew = false;
    currentTile.isMerged = false;
    
    // 检查是否可以与下一个瓦片合并
    if (i < tiles.length - 1 && currentTile.value === tiles[i + 1].value) {
      // 合并瓦片
      currentTile.value *= 2;
      currentTile.isMerged = true;
      score += currentTile.value;
      moved = true; // 合并算作移动
      i++; // 跳过下一个瓦片
    }
    
    newRow[index] = currentTile;
    index++;
  }

  // 检查位置是否有变化
  for (let i = 0; i < BOARD_SIZE; i++) {
    const original = row[i];
    const newTile = newRow[i];
    
    if ((original === null) !== (newTile === null)) {
      moved = true;
      break;
    }
    if (original && newTile && original.value !== newTile.value) {
      moved = true;
      break;
    }
  }

  return { row: newRow, score, moved };
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
        const { row: newRow, score, moved: rowMoved } = moveRowLeft(row);
        totalScore += score;
        if (rowMoved) moved = true;
        
        // 更新位置
        newRow.forEach((tile, x) => {
          if (tile) {
            tile.position = { x, y };
          }
        });
        
        return newRow;
      });
      break;

    case 'right':
      newBoard = board.map((row, y) => {
        const reversedRow = [...row].reverse();
        const { row: movedRow, score, moved: rowMoved } = moveRowLeft(reversedRow);
        const finalRow = movedRow.reverse();
        totalScore += score;
        if (rowMoved) moved = true;
        
        // 更新位置
        finalRow.forEach((tile, x) => {
          if (tile) {
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
        const { row: newColumn, score, moved: colMoved } = moveRowLeft(column);
        totalScore += score;
        if (colMoved) moved = true;
        
        newColumn.forEach((tile, y) => {
          if (tile) {
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
        const { row: movedColumn, score, moved: colMoved } = moveRowLeft(column);
        const finalColumn = movedColumn.reverse();
        totalScore += score;
        if (colMoved) moved = true;
        
        finalColumn.forEach((tile, y) => {
          if (tile) {
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
  // 检查是否有空格
  if (getEmptyPositions(board).length > 0) return false;

  // 检查是否可以合并
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const currentTile = board[y][x];
      if (!currentTile) continue;

      // 检查右边
      if (x < BOARD_SIZE - 1 && board[y][x + 1]?.value === currentTile.value) {
        return false;
      }

      // 检查下面
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