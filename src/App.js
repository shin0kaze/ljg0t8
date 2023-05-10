import { useState } from "react";

function Square() {

  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }
  return (
    <button onClick={handleClick} className="square">
      {value}
    </button>
  );
}

export default function Board() {
  let char = "X";
  return (
    <>
      {Array.from(Array(3), (_stub, i) => (
        <div className="board-row" key={i}>
          {Array.from(Array(3), (_stub, j) => (
            // <button key={i * 3 + j} className="square">
            //   {char}
            // </button>s
            <Square key={i * 3 + j} />
          ))}
        </div>
      ))}
    </>
  );
}
