import React, { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

const AudioControl: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(audioManager.isEnabled());

  useEffect(() => {
    audioManager.setEnabled(isEnabled);
  }, [isEnabled]);

  const toggleAudio = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <button
      className="audio-control"
      onClick={toggleAudio}
      title={isEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {isEnabled ? '🔊' : '🔇'}
    </button>
  );
};

export default AudioControl;