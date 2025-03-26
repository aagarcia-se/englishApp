import React, { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const fullDialogue = [
  "Emma: Hi, Jake! What are you doing?",
  "Jake: Hi, Emma! I'm going shopping with my mom.",
  "Emma: Nice! What are you buying?",
  "Jake: A new pair of shoes and a jacket.",
  "Emma: Cool! Where are you going?",
  "Jake: To the mall. There are good sales today!",
  "Emma: That's great! I bought a dress yesterday.",
  "Jake: Awesome! Where did you get it?",
  "Emma: At a store downtown. It was 50% off!",
  "Jake: Lucky you! I hope I find a good deal too.",
  "Emma: I'm sure you will! See you later!",
  "Jake: See you!"
];

// Function to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Questions with multiple possible correct answers
const baseQuestions = [
  {
    id: 1,
    sentence: "Emma: Hi, Jake! What are you ___?",
    answers: ["doing", "up to"],
    options: ["doing", "eating", "reading", "up to"]
  },
  {
    id: 2,
    sentence: "Jake: Hi, Emma! I'm going shopping with my ___.",
    answers: ["mom", "mother"],
    options: ["mom", "mother", "sister", "friend"]
  },
  {
    id: 3,
    sentence: "Emma: Nice! What are you ___?",
    answers: ["buying", "getting"],
    options: ["buying", "getting", "purchasing", "looking for"]
  },
  {
    id: 4,
    sentence: "Jake: A new pair of ___ and a jacket.",
    answers: ["shoes", "sneakers"],
    options: ["shoes", "sneakers", "boots", "sandals"]
  },
  {
    id: 5,
    sentence: "Emma: Cool! Where are you ___?",
    answers: ["going", "heading"],
    options: ["going", "heading", "traveling", "shopping"]
  },
  {
    id: 6,
    sentence: "Jake: To the mall. There are good ___ today!",
    answers: ["sales", "deals"],
    options: ["sales", "deals", "discounts", "offers"]
  },
  {
    id: 7,
    sentence: "Emma: That's great! I bought a ___ yesterday.",
    answers: ["dress", "skirt"],
    options: ["dress", "skirt", "top", "outfit"]
  },
  {
    id: 8,
    sentence: "Jake: Awesome! Where did you ___ it?",
    answers: ["get", "buy"],
    options: ["get", "buy", "find", "purchase"]
  },
  {
    id: 9,
    sentence: "Emma: At a store downtown. It was ___ off!",
    answers: ["50%", "half"],
    options: ["50%", "half", "30%", "20%"]
  },
  {
    id: 10,
    sentence: "Jake: Lucky you! I hope I find a good ___ too.",
    answers: ["deal", "bargain"],
    options: ["deal", "bargain", "price", "offer"]
  }
];

// Create shuffled questions with randomized answer positions
const createShuffledQuestions = () => {
  return baseQuestions.map(question => {
    // Create a new array with the answers included
    const optionsWithAnswers = [...question.options];
    
    // Shuffle the options
    const shuffledOptions = shuffleArray(optionsWithAnswers);
    
    return {
      ...question,
      options: shuffledOptions
    };
  });
};

const ShoppingDialogueGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Initialize questions with shuffled options
  useEffect(() => {
    setQuestions(createShuffledQuestions());
  }, []);

  const returnToMenu = () => {
    navigate('/');
  };

  useEffect(() => {
    let timer;
    if (showInstructions && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (showInstructions && timeLeft === 0) {
      setShowInstructions(false);
    }
    return () => clearTimeout(timer);
  }, [showInstructions, timeLeft]);

  const startGame = () => {
    // Reshuffle questions when starting a new game
    setQuestions(createShuffledQuestions());
    setGameStarted(true);
    setShowInstructions(true);
    setTimeLeft(10);
    setCurrentQuestion(0);
    setScore(0);
    setGameCompleted(false);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    if (questions[currentQuestion]?.answers.includes(option)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setGameCompleted(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    // Reshuffle questions when resetting
    setQuestions(createShuffledQuestions());
    setGameStarted(false);
    setShowInstructions(true);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setGameCompleted(false);
    setTimeLeft(10);
  };

  return (
    <div className="game-container">
      <button onClick={returnToMenu} className="return-button">
        Return to Menu
      </button>

      {!gameStarted ? (
        <div className="start-screen">
          <h1>Shopping Dialogue Completion</h1>
          <div className="full-dialogue">
            <h2>Complete the missing words in this conversation:</h2>
            {fullDialogue.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : showInstructions ? (
        <div className="instructions">
          <h2>Instructions</h2>
          <p>Read the full dialogue carefully. You have {timeLeft} seconds.</p>
          <div className="dialogue-preview">
            {fullDialogue.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="timer">
            <div className="timer-bar" style={{ width: `${(timeLeft / 10) * 100}%` }}></div>
          </div>
        </div>
      ) : gameCompleted ? (
        <div className="results">
          <h2>Game Completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
          <div className="score-bar">
            <div className="score-progress" style={{ width: `${(score / questions.length) * 100}%` }}></div>
          </div>
          <div className="results-buttons">
            <button className="play-again" onClick={resetGame}>
              Play Again
            </button>
            <button className="play-button" onClick={returnToMenu}>
              End Game
            </button>
          </div>
        </div>
      ) : (
        <div className="question-screen">
          <div className="progress">
            Question {currentQuestion + 1} of {questions.length}
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="score">Score: {score}</div>
          
          <div className="question">
            <p>{questions[currentQuestion]?.sentence.replace('___', '______')}</p>
          </div>
          
          <div className="options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
                className={`option-button ${
                  selectedOption === option
                    ? questions[currentQuestion]?.answers.includes(option)
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingDialogueGame;