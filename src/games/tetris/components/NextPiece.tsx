import React from 'react';
import { Tetromino, CELL_SIZE } from '../types';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) return null;

  return (
    <div className="next-piece">
      <h3>Next</h3>
      <div className="next-piece-preview">
        {nextPiece.shape.map((row, y) => (
          <div key={y} className="next-piece-row">
            {row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="next-piece-cell"
                style={{
                  backgroundColor: cell ? nextPiece.color : 'transparent',
                  border: cell ? '1px solid #333' : 'none',
                  width: CELL_SIZE * 0.7,
                  height: CELL_SIZE * 0.7
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;