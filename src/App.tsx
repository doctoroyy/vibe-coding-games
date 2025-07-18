import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameLayout from './components/GameLayout';
import SnakeGame from './games/snake/SnakeGame';
import TetrisGame from './games/tetris/TetrisGame';
import Game2048 from './games/2048/Game2048';
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
          <Route 
            path="/tetris" 
            element={
              <GameLayout>
                <TetrisGame />
              </GameLayout>
            } 
          />
          <Route 
            path="/2048" 
            element={
              <GameLayout>
                <Game2048 />
              </GameLayout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;