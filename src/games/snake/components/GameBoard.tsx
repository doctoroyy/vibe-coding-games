import React, { useRef, useEffect } from 'react';
import { GameState, GRID_SIZE, CANVAS_SIZE } from '../types';

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 绘制蛇
    ctx.fillStyle = '#0f0';
    gameState.snake.forEach(segment => {
      ctx.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // 绘制食物
    ctx.fillStyle = '#f00';
    ctx.fillRect(
      gameState.food.x * GRID_SIZE,
      gameState.food.y * GRID_SIZE,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );

    // 绘制网格线
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{
        border: '2px solid #fff',
        backgroundColor: '#000'
      }}
    />
  );
};

export default GameBoard;