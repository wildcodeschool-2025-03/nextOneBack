import { useCallback, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import "./TicTacToe.css";

type Player = "X" | "O" | null;
type Board = Player[];

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellKeys = ["TL", "TC", "TR", "ML", "MC", "MR", "BL", "BC", "BR"];

function getBestMove(
  board: Board,
  iaPlayer: Player = "O",
  humanPlayer: Player = "X",
): number | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const lineVals = [board[a], board[b], board[c]];
    if (
      lineVals.filter((x) => x === iaPlayer).length === 2 &&
      lineVals.includes(null)
    ) {
      return line[lineVals.indexOf(null)];
    }
  }

  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const lineVals = [board[a], board[b], board[c]];
    if (
      lineVals.filter((x) => x === humanPlayer).length === 2 &&
      lineVals.includes(null)
    ) {
      return line[lineVals.indexOf(null)];
    }
  }

  const emptyIndexes = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((idx) => idx !== null) as number[];
  if (emptyIndexes.length === 0) return null;
  return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}

function calculateWinner(board: Board): Player {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const TicTacToe: FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState<number | null>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const restartBtnRef = useRef<HTMLButtonElement | null>(null);

  const winner = calculateWinner(board);
  const isDraw = board.every((cell) => cell !== null) && !winner;

  const handleClick = useCallback(
    (index: number) => {
      if (!isPlayerTurn || board[index] || winner) return;
      const newBoard = [...board];
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsPlayerTurn(false);
      setLastPlayedIndex(index);
    },
    [isPlayerTurn, board, winner],
  );

  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const move = getBestMove(board, "O", "X");
        if (move !== null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
        }
        setIsPlayerTurn(true);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isPlayerTurn, board, winner, isDraw]);

  useEffect(() => {
    if (lastPlayedIndex !== null) {
      const timeout = setTimeout(() => {
        const cell = cellRefs.current[lastPlayedIndex];
        if (cell) {
          cell.focus();
        }
      }, 0);
      setFocusedIndex(lastPlayedIndex);
      setLastPlayedIndex(null);
      return () => clearTimeout(timeout);
    }
  }, [lastPlayedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedIndex === null) return;

      const row = Math.floor(focusedIndex / 3);
      const col = focusedIndex % 3;
      let nextIndex = focusedIndex;

      if (["ArrowUp", "z", "Z"].includes(e.key) && row > 0) {
        nextIndex = (row - 1) * 3 + col;
      } else if (["ArrowDown", "s", "S"].includes(e.key) && row < 2) {
        nextIndex = (row + 1) * 3 + col;
      } else if (
        ["ArrowDown", "s", "S"].includes(e.key) &&
        row === 2 &&
        (winner || isDraw)
      ) {
        e.preventDefault();
        restartBtnRef.current?.focus();
        setFocusedIndex(null);
        return;
      } else if (["ArrowLeft", "q", "Q"].includes(e.key) && col > 0) {
        nextIndex = row * 3 + (col - 1);
      } else if (["ArrowRight", "d", "D"].includes(e.key) && col < 2) {
        nextIndex = row * 3 + (col + 1);
      } else if (["Enter", " "].includes(e.key)) {
        handleClick(focusedIndex);
        return;
      }

      if (nextIndex !== focusedIndex) {
        e.preventDefault();
        setFocusedIndex(nextIndex);
        cellRefs.current[nextIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, handleClick, winner, isDraw]);

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setFocusedIndex(null);
    setLastPlayedIndex(null);
  }

  return (
    <div className="ttt-arcade-bg">
      <h2 className="ttt-title">Tic-Tac-Toe</h2>
      <div className="ttt-status">
        {winner
          ? winner === "X"
            ? "✨ Bravo, tu as gagné !"
            : "💀 L'IA gagne !"
          : isDraw
            ? "Match nul !"
            : isPlayerTurn
              ? "À toi de jouer !"
              : "Je réfléchis..."}
      </div>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <button
            type="button"
            key={cellKeys[i]}
            ref={(element: HTMLButtonElement | null) => {
              cellRefs.current[i] = element;
            }}
            className={`ttt-cell ${cell ? "ttt-cell-filled" : ""}`}
            onClick={() => {
              if (isPlayerTurn && !cell && !winner) {
                handleClick(i);
              }
            }}
            onFocus={() => setFocusedIndex(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      {(winner || isDraw) && (
        <button
          type="button"
          ref={restartBtnRef}
          className="ttt-restart-btn"
          onClick={handleRestart}
        >
          Rejouer
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
