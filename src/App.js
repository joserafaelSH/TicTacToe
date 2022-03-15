import { useEffect, useState } from "react";
import "./App.css";
import { calculateWinner } from "./utils";

function App() {
  const xPlayer = "X";
  const oPlayer = "O";
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(xPlayer);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(0);
  const [xPoints, setXPoints] = useState(0);
  const [oPoints, setOPoints] = useState(0);

  const handleClick = (box) => {
    if (winner) return null;
    if (board[box] !== null) return null;
    if (player === xPlayer) {
      setBoard(board.map((item, idx) => (idx === box ? "X" : item)));
      setPlayer(oPlayer);
    } else {
      setBoard(board.map((item, idx) => (idx === box ? "O" : item)));
      setPlayer(xPlayer);
    }

    const aux = count + 1;
    setCount(aux);
  };

  const checkWinner = () => {
    if (count === 9 && winner == null) {
      setWinner("Empate");
    } else {
      const result = calculateWinner(board);
      if (result) {
        setWinner(result);
      }
    }
    console.log(winner);
  };

  const resetGame = () => {
    if (!winner) return null;
    const aux1 = xPoints + 1;
    const aux2 = oPoints + 1;
    if (winner === "X") setXPoints(aux1);
    if (winner === "O") setOPoints(aux2);
    setPlayer(xPlayer);
    setWinner(null);
    setBoard(Array(9).fill(null));
    setCount(0);
  };

  useEffect(checkWinner);

  return (
    <div className="App">
      <div className="title">Tic Tac Toe</div>
      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`box ${item} b${idx}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="placar">
        <div className="result">Resultado: {winner}</div>
        <div className="result">X: {xPoints}</div>
        <div className="result">O: {oPoints}</div>
        <button className="btn" onClick={() => resetGame()}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
