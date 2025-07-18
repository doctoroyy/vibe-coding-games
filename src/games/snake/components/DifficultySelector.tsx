import React from 'react';
import { useTranslation } from 'react-i18next';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onDifficultyChange,
  disabled
}) => {
  const { t } = useTranslation();

  const difficulties = [
    { value: Difficulty.EASY, label: t('difficulty.easy'), description: t('difficulty.slow') },
    { value: Difficulty.MEDIUM, label: t('difficulty.medium'), description: t('difficulty.normal') },
    { value: Difficulty.HARD, label: t('difficulty.hard'), description: t('difficulty.fast') }
  ];

  return (
    <div className="difficulty-selector">
      <h3>{t('difficulty.title')}</h3>
      <div className="difficulty-buttons">
        {difficulties.map(({ value, label, description }) => (
          <button
            key={value}
            className={`difficulty-btn ${currentDifficulty === value ? 'active' : ''}`}
            onClick={() => onDifficultyChange(value)}
            disabled={disabled}
          >
            <div className="difficulty-label">{label}</div>
            <div className="difficulty-description">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;