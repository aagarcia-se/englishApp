import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const attractions = [
  { name: "Roller Coaster", emoji: "🎢", description: "Fast and exciting" },
  { name: "Ferris Wheel", emoji: "🎡", description: "Beautiful views" },
  { name: "Carousel", emoji: "🎠", description: "Classic fun" },
  { name: "Bumper Cars", emoji: "🚗💥", description: "Crash and laugh" },
  { name: "Haunted House", emoji: "👻", description: "Spooky adventure" },
  { name: "Tea Cups", emoji: "🍵", description: "Spin around" },
];

export default function MemoryGame() {
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const navigate = useNavigate();
  const [cards, setCards] = useState(() => {
    const pairs = attractions.flatMap((attraction) => [
      { ...attraction, id: `${attraction.name}-1` },
      { ...attraction, id: `${attraction.name}-2` },
    ]);
    return shuffleArray(pairs);
  });

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const returnToMenu = () => navigate('/');

  const handleClick = (index) => {
    if (selected.length === 2 || matched.includes(index)) return;
    
    setSelected([...selected, index]);
    
    if (selected.length === 1) {
      const firstCard = cards[selected[0]];
      const secondCard = cards[index];

      if (firstCard.name === secondCard.name) {
        setMatched([...matched, selected[0], index]);
        if (matched.length + 2 === cards.length) setGameWon(true);
      }
      setTimeout(() => setSelected([]), 1000);
    }
  };

  const resetGame = () => {
    setSelected([]);
    setMatched([]);
    setGameWon(false);
    setCards(
      shuffleArray(
        attractions.flatMap((attraction) => [
          { ...attraction, id: `${attraction.name}-1` },
          { ...attraction, id: `${attraction.name}-2` },
        ])
      )
    );
  };

  return (
    <div className="memory-game">
      <button onClick={returnToMenu} className="return-button">
        Return to Menu
      </button>
      <h2 className="menu-title">Match the Amusement Park Rides!</h2>
      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${selected.includes(index) || matched.includes(index) ? "flipped" : ""}`}
            onClick={() => handleClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="back">?</div>
              </div>
              <div className="card-back">
                <div className="emoji">{card.emoji}</div>
                <div className="name">{card.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {gameWon && (
        <div className="win-message">
          <h3>You won a giant teddy bear! 🧸</h3>
          <p>Just like Sophie did at the amusement park!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}