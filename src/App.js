import React, { useEffect, useState } from "react";
import Board from "./Components/Board";
import "./Components/Style.css";

function App() {
  const [score, setScore] = useState(-1);
  const [bestScore, setBestScore] = useState(0);

  const resetScores = () => {
    if(score > bestScore) {
      setBestScore(score);
    }
    setScore(-1);
  }
  
  useEffect(() => {
    
  }, [score]);

  const scoreFunctions = {
    score: score, setScore: setScore, resetScores: resetScores
  }

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <div>Memory Card Game</div>
          <div>Click a card</div>
        </div>
        <div>
          <div>Score: {score}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </div>
      <div className="board">
        <Board scoreFunctions={scoreFunctions} />
      </div>
    </div>
  );
}

export default App;
