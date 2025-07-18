import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const games = [
    {
      id: 'snake',
      name: t('games.snake.name'),
      description: t('games.snake.description'),
      path: '/snake',
      icon: '🐍',
      color: '#4CAF50'
    }
  ];

  const features = [
    {
      icon: '📱',
      title: t('home.features.responsive'),
      description: t('home.features.responsiveDesc')
    },
    {
      icon: '🌍',
      title: t('home.features.multilingual'),
      description: t('home.features.multilingualDesc')
    },
    {
      icon: '⚡',
      title: t('home.features.modern'),
      description: t('home.features.modernDesc')
    },
    {
      icon: '🔓',
      title: t('home.features.opensource'),
      description: t('home.features.opensourceDesc')
    }
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">{t('home.title')}</h1>
          <p className="home-subtitle">{t('home.subtitle')}</p>
          <LanguageSelector />
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">🎮</h2>
            <p className="hero-description">{t('home.description')}</p>
          </div>
        </section>

        <section className="games-section">
          <h2 className="section-title">🎯 Games</h2>
          <div className="games-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card" style={{ borderColor: game.color }}>
                <div className="game-icon" style={{ color: game.color }}>
                  {game.icon}
                </div>
                <h3 className="game-name">{game.name}</h3>
                <p className="game-description">{game.description}</p>
                <div className="game-actions">
                  <Link to={game.path} className="play-btn" style={{ backgroundColor: game.color }}>
                    {t('home.playNow')}
                  </Link>
                  <a 
                    href="https://github.com/yourusername/vibe-coding-games" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="code-btn"
                  >
                    {t('home.viewCode')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">{t('home.features.title')}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>Made with ❤️ using React + TypeScript</p>
        <p>
          <a href="https://github.com/yourusername/vibe-coding-games" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;