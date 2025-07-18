import React from 'react';
import { useTranslation } from 'react-i18next';

interface GameControlsProps {
  onMove: (direction: 'left' | 'right' | 'down') => void;
  onRotate: () => void;
  onDrop: () => void;
  disabled?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onMove,
  onRotate,
  onDrop,
  disabled
}) => {
  const { t } = useTranslation();

  return (
    <div className="tetris-controls">
      <div className="control-row">
        <button
          className="control-btn rotate"
          onClick={onRotate}
          disabled={disabled}
        >
          ↻
        </button>
      </div>
      <div className="control-row">
        <button
          className="control-btn left"
          onClick={() => onMove('left')}
          disabled={disabled}
        >
          ←
        </button>
        <button
          className="control-btn down"
          onClick={() => onMove('down')}
          disabled={disabled}
        >
          ↓
        </button>
        <button
          className="control-btn right"
          onClick={() => onMove('right')}
          disabled={disabled}
        >
          →
        </button>
      </div>
      <div className="control-row">
        <button
          className="control-btn drop"
          onClick={onDrop}
          disabled={disabled}
        >
          {t('tetris.drop')}
        </button>
      </div>
    </div>
  );
};

export default GameControls;