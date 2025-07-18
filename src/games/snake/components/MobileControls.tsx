import React from 'react';
import { Direction } from '../types';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
  disabled?: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange, disabled }) => {
  const handleButtonClick = (direction: Direction) => {
    if (!disabled) {
      onDirectionChange(direction);
    }
  };

  return (
    <div className="mobile-controls">
      <div className="control-row">
        <button
          className="control-btn up"
          onClick={() => handleButtonClick(Direction.UP)}
          disabled={disabled}
        >
          ↑
        </button>
      </div>
      <div className="control-row">
        <button
          className="control-btn left"
          onClick={() => handleButtonClick(Direction.LEFT)}
          disabled={disabled}
        >
          ←
        </button>
        <button
          className="control-btn right"
          onClick={() => handleButtonClick(Direction.RIGHT)}
          disabled={disabled}
        >
          →
        </button>
      </div>
      <div className="control-row">
        <button
          className="control-btn down"
          onClick={() => handleButtonClick(Direction.DOWN)}
          disabled={disabled}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default MobileControls;