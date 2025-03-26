import { useState, useEffect } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'

const allQuestions = [
  { id: 1, question: "What did Emma ask Jake?", 
    options: [
      "What did you do yesterday?",
      "How are you?",
      "Where are you going?",
      "What time is it?"
    ],
    correct: "What did you do yesterday?" 
  },
  { id: 2, question: "What did Jake do yesterday?", 
    options: [
      "He went to school",
      "He went to the park with his cousins",
      "He stayed home",
      "He went shopping"
    ],
    correct: "He went to the park with his cousins"
  },
  { id: 3, question: "What did they do at the park?", 
    options: [
      "They played basketball",
      "They played soccer and had a picnic",
      "They went swimming",
      "They read books"
    ],
    correct: "They played soccer and had a picnic"
  },
  { id: 4, question: "What did they eat?", 
    options: [
      "Pizza and soda",
      "Burgers and fries",
      "Sandwiches, chips, and orange juice",
      "Hot dogs and lemonade"
    ],
    correct: "Sandwiches, chips, and orange juice"
  },
  { id: 5, question: "What did Emma do yesterday?", 
    options: [
      "She went to the park",
      "She stayed home and watched a movie",
      "She went shopping",
      "She played soccer"
    ],
    correct: "She stayed home and watched a movie"
  },
  { id: 6, question: "What movie did Emma watch?", 
    options: [
      "Frozen",
      "Toy Story",
      "The Lion King",
      "Finding Nemo"
    ],
    correct: "Toy Story"
  },
  { id: 7, question: "How was the weather at the park?", 
    options: [
      "It was raining",
      "It was great",
      "It was cold",
      "It was windy"
    ],
    correct: "It was great"
  },
  { id: 8, question: "Who did Emma watch the movie with?", 
    options: [
      "Her brother",
      "Her sister",
      "Her cousins",
      "Her friends"
    ],
    correct: "Her sister"
  },
  { id: 9, question: "Who did Jake go to the park with?", 
    options: [
      "His friends",
      "His parents",
      "His cousins",
      "His siblings"
    ],
    correct: "His cousins"
  },
  { id: 10, question: "What drink did they have at the picnic?", 
    options: [
      "Lemonade",
      "Orange juice",
      "Soda",
      "Water"
    ],
    correct: "Orange juice"
  }
]

function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [gameQuestions, setGameQuestions] = useState([])
  const [roundNumber, setRoundNumber] = useState(1)
  const [roundHistory, setRoundHistory] = useState([])
  const [showFinalResults, setShowFinalResults] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const navigate = useNavigate();

  const getRandomQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5) // Get 5 random questions for each round
  }

  const returnToMenu = () => {
    navigate('/'); // Esto te llevará a la ruta principal (el menú)
  };

  useEffect(() => {
    setGameQuestions(getRandomQuestions())
  }, [roundNumber])

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === gameQuestions[currentQuestion].correct
    setIsCorrect(correct)
    
    setTimeout(() => {
      if (correct) {
        setScore(score + 1)
      }
      
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < gameQuestions.length) {
        setCurrentQuestion(nextQuestion)
      } else {
        setShowScore(true)
      }
      
      setSelectedAnswer(null)
      setIsCorrect(null)
    }, 1000)
  }

  const startNewRound = () => {
    setRoundHistory([...roundHistory, { round: roundNumber, score, total: gameQuestions.length }])
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setRoundNumber(prev => prev + 1)
    setShowFinalResults(false)
    setGameStarted(false) // Show dialogue again for new round
  }

  const viewFinalResults = () => {
    setRoundHistory([...roundHistory, { round: roundNumber, score, total: gameQuestions.length }])
    setShowFinalResults(true)
  }

  const startNewGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setRoundNumber(1)
    setRoundHistory([])
    setShowFinalResults(false)
    setGameStarted(false)
  }

  const startGame = () => {
    setGameStarted(true)
  }

  const calculateTotalScore = () => {
    return roundHistory.reduce((total, round) => total + round.score, 0)
  }

  const calculateTotalQuestions = () => {
    return roundHistory.reduce((total, round) => total + round.total, 0)
  }

  return (
    <div className="game-container">

      <button 
        onClick={returnToMenu} 
        className="return-button"
      >
        Return to Menu
      </button>

      <h1>English Conversation Practice</h1>
      <div className="round-info">
        <p>Round {roundNumber}</p>
      </div>

      {!gameStarted && !showScore && !showFinalResults && (
        <div className="dialogue-section">
          <div className="conversation-box">
            <h2>Read the conversation carefully:</h2>
            <p><span className="emma">Emma:</span> Hi, Jake! What did you do yesterday?</p>
            <p><span className="jake">Jake:</span> Hey, Emma! Yesterday, I went to the park with my cousins.</p>
            <p><span className="emma">Emma:</span> That sounds fun! What did you do at the park?</p>
            <p><span className="jake">Jake:</span> We played soccer and had a picnic. The weather was great!</p>
            <p><span className="emma">Emma:</span> Nice! What did you eat?</p>
            <p><span className="jake">Jake:</span> We had sandwiches, chips, and orange juice. What about you?</p>
            <p><span className="emma">Emma:</span> I stayed home and watched a movie with my sister.</p>
            <p><span className="jake">Jake:</span> Cool! What movie did you watch?</p>
            <p><span className="emma">Emma:</span> We watched Toy Story. It was really funny!</p>
            <p><span className="jake">Jake:</span> Awesome! I love that movie.</p>
          </div>
          <button className="play-button" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      )}

      {showFinalResults ? (
        <div className="final-results-section">
          <h2>Game Results 🏆</h2>
          <div className="rounds-summary">
            {roundHistory.map((round) => (
              <div key={round.round} className="round-result">
                <h3>Round {round.round}</h3>
                <p>Score: {round.score} out of {round.total}</p>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${(round.score / round.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="final-score">
            <h3>Total Score</h3>
            <p>{calculateTotalScore()} out of {calculateTotalQuestions()} questions</p>
            <p className="percentage">
              ({Math.round((calculateTotalScore() / calculateTotalQuestions()) * 100)}%)
            </p>
          </div>
          <button className="play-button" onClick={startNewGame}>Start New Game</button>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Round {roundNumber} Complete! 🎉</h2>
          <p>You scored {score} out of {gameQuestions.length}</p>
          <div className="score-buttons">
            <button onClick={startNewRound}>Play Next Round</button>
            <button onClick={viewFinalResults} className="results-button">
              View Results
            </button>
          </div>
        </div>
      ) : gameStarted ? (
        <div className="question-section">
          <h2>Question {currentQuestion + 1} of {gameQuestions.length}</h2>
          <p className="question">{gameQuestions[currentQuestion]?.question}</p>
          <div className="answer-options">
            {gameQuestions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`answer-button 
                  ${selectedAnswer === option && isCorrect ? 'correct' : ''}
                  ${selectedAnswer === option && !isCorrect ? 'incorrect' : ''}
                `}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default QuizGame;