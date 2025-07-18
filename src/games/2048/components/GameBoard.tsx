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
        {gameState.tiles.map(tile => (
          <div
            key={tile.id}
            className={`tile tile-${tile.value} ${tile.isNew ? 'tile-new' : ''} ${tile.isMerged ? 'tile-merged' : ''}`}
            style={{
              transform: `translate(${tile.position.x * 100}%, ${tile.position.y * 100}%)`,
              backgroundColor: getTileColor(tile.value),
              color: getTileTextColor(tile.value)
            }}
          >
            {tile.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;