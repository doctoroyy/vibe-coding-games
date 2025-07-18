import React from 'react';
import { GameState, BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from '../types';

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  const renderBoard = () => {
    const board = [...gameState.board];
    
    // Draw current piece on the board
    if (gameState.currentPiece) {
      const { shape, color, position } = gameState.currentPiece;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              board[boardY] = [...board[boardY]];
              board[boardY][boardX] = color;
            }
          }
        }
      }
    }

    return board.map((row, y) => (
      <div key={y} className="tetris-row">
        {row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className="tetris-cell"
            style={{
              backgroundColor: cell || '#1a1a1a',
              border: cell ? '1px solid #333' : '1px solid #333',
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="tetris-board">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;