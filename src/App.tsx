import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameLayout from './components/GameLayout';
import SnakeGame from './games/snake/SnakeGame';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/snake" 
            element={
              <GameLayout>
                <SnakeGame />
              </GameLayout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;