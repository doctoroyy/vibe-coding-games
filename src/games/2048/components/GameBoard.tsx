import React from 'react';
import { GameState, BOARD_SIZE } from '../types';
import { getTileColor, getTileTextColor } from '../utils/gameLogic';

interface GameBoardProps {
  gameState: GameState;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
  return (
    <div className="game-2048-board">
      <div className="board-grid">
        {Array(BOARD_SIZE).fill(null).map((_, y) =>
          Array(BOARD_SIZE).fill(null).map((_, x) => (
            <div key={`${y}-${x}`} className="grid-cell" />
          ))
        )}
      </div>

      <div className="tiles-container">
        {gameState.board.flat().filter(tile => tile !== null).map(tile => {
          // 使用响应式计算：基于容器大小动态计算
          const containerSize = Math.min(400, window.innerWidth * 0.9) - 40; // 减去padding
          const cellSize = (containerSize - 48) / 4; // 减去3个16px间隙
          const left = tile.position.x * (cellSize + 16);
          const top = tile.position.y * (cellSize + 16);
          
          return (
            <div
              key={tile.id}
              className={`tile tile-${tile.value} ${tile.isNew ? 'tile-new' : ''} ${tile.isMerged ? 'tile-merged' : ''}`}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                backgroundColor: getTileColor(tile.value),
                color: getTileTextColor(tile.value)
              }}
            >
              {tile.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;