import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div className="menu-container">
      <h1 className='menu-title' >English Learning Games</h1>
      <div className="games-list">
        <Link to="/quiz-game" className="game-card">
          <h2>Dialogue Quiz Game</h2>
          <p>Test your understanding of the conversation with multiple-choice questions</p>
        </Link>
        <Link to="/shopping-drag-drop" className="game-card">
          <h2>Shopping Dialogue Builder</h2>
          <p>Reconstruct the shopping conversation by dragging sentences</p>
        </Link>
        <Link to="/memory-game" className="game-card">
          <h2>Memory</h2>
          <p>select the correct pairs from the dialogue,, Talks about an experience</p>
        </Link>
      </div>
    </div>
  );
}

export default Menu;