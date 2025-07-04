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

function getBestMove(board: Board): number | null {
  // 1. l'ia essaie de gagner
  for (const [a, b, c] of WIN_LINES) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((x) => x === "O").length === 2 && line.includes(null)) {
      return [a, b, c][line.indexOf(null)];
    }
  }

  // 2. l'ia bloque le joueur
  for (const [a, b, c] of WIN_LINES) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((x) => x === "X").length === 2 && line.includes(null)) {
      return [a, b, c][line.indexOf(null)];
    }
  }

  // 3. l'ia joue aléatoirement
  const empty = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(Boolean) as number[];
  return empty.length > 0
    ? empty[Math.floor(Math.random() * empty.length)]
    : null;
}

function calculateWinner(board: Board): Player {
  for (const [a, b, c] of WIN_LINES) {
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

      // Focus sur la case jouée
      setTimeout(() => {
        cellRefs.current[index]?.focus();
        setFocusedIndex(index);
      }, 0);
    },
    [isPlayerTurn, board, winner],
  );

  // IA joue après le joueur
  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timeout = setTimeout(() => {
        const move = getBestMove(board);
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

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedIndex === null) return;

      const row = Math.floor(focusedIndex / 3);
      const col = focusedIndex % 3;
      let nextIndex = focusedIndex;

      // Touches de navigation
      const keyMap: Record<string, () => void> = {
        ArrowUp: () => {
          if (row > 0) nextIndex = (row - 1) * 3 + col;
        },
        ArrowDown: () => {
          if (row < 2) {
            nextIndex = (row + 1) * 3 + col;
          } else if (winner || isDraw) {
            restartBtnRef.current?.focus();
            setFocusedIndex(null);
            return;
          }
        },
        ArrowLeft: () => {
          if (col > 0) nextIndex = row * 3 + (col - 1);
        },
        ArrowRight: () => {
          if (col < 2) nextIndex = row * 3 + (col + 1);
        },
        z: () => keyMap.ArrowUp(),
        s: () => keyMap.ArrowDown(),
        q: () => keyMap.ArrowLeft(),
        d: () => keyMap.ArrowRight(),
        Z: () => keyMap.ArrowUp(),
        S: () => keyMap.ArrowDown(),
        Q: () => keyMap.ArrowLeft(),
        D: () => keyMap.ArrowRight(),
        Enter: () => handleClick(focusedIndex),
        " ": () => handleClick(focusedIndex),
      };

      const action = keyMap[e.key];
      if (action) {
        e.preventDefault();
        action();
        if (nextIndex !== focusedIndex) {
          setFocusedIndex(nextIndex);
          cellRefs.current[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, handleClick, winner, isDraw]);

  const restart = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setFocusedIndex(null);
  };

  const getStatus = () => {
    if (winner)
      return winner === "X" ? "✨ Bravo, tu as gagné !" : "💀 L'IA gagne !";
    if (isDraw) return "Match nul !";
    return isPlayerTurn ? "À toi de jouer !" : "Je réfléchis...";
  };

  return (
    <div className="ttt-arcade-bg">
      <h2 className="ttt-title">Tic-Tac-Toe</h2>
      <div className="ttt-status">{getStatus()}</div>
      <div className="ttt-board">
        {board.map((cell, i) => (
          <button
            type="button"
            key={cellKeys[i]}
            ref={(element) => {
              cellRefs.current[i] = element;
            }}
            className={`ttt-cell ${cell ? "ttt-cell-filled" : ""}`}
            onClick={() => isPlayerTurn && !cell && !winner && handleClick(i)}
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
          onClick={restart}
        >
          Rejouer
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
