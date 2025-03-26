import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css"


import Menu from './Components/Menu';
import ShoppingDragDrop from './Components/ShopingDragDrop';
import QuizGame from './Components/QuizGames';
import MemoryGame from './Components/MemoryGame/MemoryGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/quiz-game" element={<QuizGame />} />
        <Route path="/shopping-drag-drop" element={<ShoppingDragDrop />} />
        <Route path="/memory-game" element={<MemoryGame />} />
      </Routes>
    </Router>
  );
}

export default App;