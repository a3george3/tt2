// src/Components/TicTacToe.js

import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null);
  });
  const [isXNext, setIsXNext] = useState(() => {
    const savedIsXNext = localStorage.getItem("isXNext");
    return savedIsXNext ? JSON.parse(savedIsXNext) : true;
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("isXNext", JSON.stringify(isXNext));
  }, [board, isXNext]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isDraw(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isDraw = (squares) => {
    return (
      squares.every((square) => square !== null) && !calculateWinner(squares)
    );
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    localStorage.removeItem("board");
    localStorage.removeItem("isXNext");
  };

  const winner = calculateWinner(board);
  const draw = isDraw(board);
  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? "Draw"
    : `Next player: ${isXNext ? "X" : "O"}`;

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
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
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
