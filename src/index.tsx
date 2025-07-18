import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initAudioOnUserInteraction } from './utils/audioManager';
import './i18n';

// 初始化音效系统
initAudioOnUserInteraction();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);