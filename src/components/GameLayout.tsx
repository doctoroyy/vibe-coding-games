import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import AudioControl from './AudioControl';
import './GameLayout.css';

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children, title }) => {
  const { t } = useTranslation();

  return (
    <div className="game-layout">
      <nav className="game-nav">
        <Link to="/" className="back-btn">
          ← {t('common.back')}
        </Link>
        {title && <h1 className="game-title">{title}</h1>}
        <div className="nav-controls">
          <AudioControl />
          <LanguageSelector />
        </div>
      </nav>
      <main className="game-content">
        {children}
      </main>
    </div>
  );
};

export default GameLayout;