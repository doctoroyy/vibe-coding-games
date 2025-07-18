import { Position, Direction, GameState, GRID_SIZE, CANVAS_SIZE, Difficulty } from '../types';

export const createInitialGameState = (difficulty: Difficulty = Difficulty.MEDIUM): GameState => ({
  snake: [{ x: 10, y: 10 }],
  food: generateFood([{ x: 10, y: 10 }]),
  direction: Direction.RIGHT,
  gameOver: false,
  score: 0,
  difficulty
});

export const generateFood = (snake: Position[]): Position => {
  const maxPos = CANVAS_SIZE / GRID_SIZE;
  let food: Position;
  
  do {
    food = {
      x: Math.floor(Math.random() * maxPos),
      y: Math.floor(Math.random() * maxPos)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkCollision = (head: Position, snake: Position[]): boolean => {
  const maxPos = CANVAS_SIZE / GRID_SIZE;
  
  // 检查墙壁碰撞
  if (head.x < 0 || head.x >= maxPos || head.y < 0 || head.y >= maxPos) {
    return true;
  }
  
  // 检查自身碰撞 - 检查新头部是否与现有蛇身碰撞
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};