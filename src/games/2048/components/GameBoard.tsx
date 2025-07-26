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
          // 计算精确位置：考虑网格间隙
          // 每个格子宽度 = (总宽度 - 3个间隙) / 4
          // 位置 = 格子索引 * (格子宽度 + 间隙)
          const cellWidth = (320 - 45) / 4; // 320是board宽度，45是3个15px间隙
          const left = tile.position.x * (cellWidth + 15);
          const top = tile.position.y * (cellWidth + 15);
          
          return (
            <div
              key={tile.id}
              className={`tile tile-${tile.value} ${tile.isNew ? 'tile-new' : ''} ${tile.isMerged ? 'tile-merged' : ''}`}
              style={{
                left: `${left}px`,
                top: `${top}px`,
                width: `${cellWidth}px`,
                height: `${cellWidth}px`,
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