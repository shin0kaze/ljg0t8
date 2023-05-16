import { useState } from "react";

const X = 'X', O = 'O'
// 
function Square({val, winnerCell, onClick}) {
  return (
    <button
      onClick={onClick}
      className={"square " + (winnerCell ? "bg-gold" : "")}
    >
      {val}
    </button>
  );
}

function Board({ nextPlayer, field, onPlay}) {

  //const [player, setPlayer] = useState('X');
  //const [field, setField] = useState(Array(9).fill(null));

  function handleSquareClick(id, winner) {
    console.log(field);
    console.log(winner);
    if (field[id] || winner.length) return;
    console.log("gone");
    const newField = field.slice();
    newField[id] = nextPlayer;
    onPlay(newField);
    console.log('gone');
    //setPlayer(player === 'X'?'O':'X');
    //setField(newField);
  }

  const winner = findWinner(field);
  const status = winner.length
    ? "Winner: " + field[winner[0]]
    : "Next player: " + nextPlayer;
  return (
    <>
      <div className="status">{status}</div>
      {Array.from(Array(3), (_stub, i) => (
        <div className="board-row" key={i}>
          {Array.from(Array(3), (_stub, j) => {
            const id = i * 3 + j;
            return (
              <Square
                key={id}
                val={field[id]}
                winnerCell={Boolean(winner.find(wid => wid === id))}
                onClick={() => handleSquareClick(id, winner)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const currentField = history[currentTurn];

  function jumpToTurn(turn) {
    setCurrentTurn(turn);
    setPlayer(turn % 2 === 0 ? "X" : "O");
  }

  function handlePlay(nextField) {
    const newHistory = [...history.slice(0, currentTurn + 1), nextField];
    setPlayer(player === 'X'?'O':'X');
    setHistory(newHistory);
    setCurrentTurn(newHistory.length - 1);
  }

  const moves = history.map((field, turn) => {
    const desc = "Go to turn #" + turn;
    return (
      <li key={turn}>
        <button onClick={() => jumpToTurn(turn)} className="turn-btn">{desc}</button>
      </li>
    );
  });

  return (
    <div className="game container mx-auto">
      <div className="game-board">
        <Board nextPlayer={player} field={currentField} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function findWinner(field) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const winner = lines.find((line) => {
    const [a, b, c] = line;
    return field[a] && field[a] === field[b] && field[a] === field[c];
  });
  return winner || [];
}