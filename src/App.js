import React, { useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const newSquares = [...squares];
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      // Show popup to announce winner
      setTimeout(() => {
        const popup = document.querySelector(".popup");
        popup.classList.add("active");
      }, 100);
    } else if (newSquares.every((square) => square !== null)) {
      // Draw scenario
      setWinner("Draw");
      // Show popup for draw
      setTimeout(() => {
        const popup = document.querySelector(".popup");
        popup.classList.add("active");
      }, 100);
    }
  };

  const currentPlayer = xIsNext ? "Player X" : "Player O";
  let status =
    winner === "Draw"
      ? "It's a Draw!"
      : winner
      ? `Winner: ${winner}`
      : `Next player: ${xIsNext ? "X" : "O"}`;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const resetGame = () => {
    window.location.reload(); // Reload the entire page to reset the game
  };

  return (
    <div className={darkMode ? "App dark-mode" : "App light-mode"}>
      <div
        className="player-name"
        style={{
          color:
            winner === "X"
              ? "red"
              : winner === "O"
              ? "blue"
              : xIsNext
              ? "red"
              : "blue",
        }}
      >
        {status}
      </div>
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={handleClick} />
        </div>
        <div className="game-info">
          <button className="toggle-button" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Popup for Winner/Draw */}
      <div className="popup">
        <div className="popup-content">
          <div className="popup-message">
            {winner === "Draw"
              ? "Oh, Sorry try again !!"
              : winner
              ? `Congratulations ${winner}! 🎉`
              : null}
          </div>
          <div className="popup-emoji">🥳🏆🎊</div>
          <button onClick={resetGame}>Play Again</button>
        </div>
      </div>
    </div>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
