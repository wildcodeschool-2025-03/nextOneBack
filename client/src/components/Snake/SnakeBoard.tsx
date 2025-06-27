import { useEffect, useRef, useState } from "react";
import drawFood from "./Food";
import GameOver from "./GameOver";
import PausedModal from "./Paused";
import ScoreBoard from "./ScoreBoard";
import { drawSnake } from "./draw";
import useDirection from "./useDirection";
import "./styles/snakeBoard.css";

export type Coordinate = {
  row: number;
  col: number;
};

export default function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(0);

  const [snakeBody, setSnakeBody] = useState<Coordinate[]>([
    { row: 5, col: 3 },
    { row: 5, col: 4 },
    { row: 5, col: 5 },
  ]);

  const [food, setFood] = useState<Coordinate | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0,
  );

  const gridSize = 20;
  const direction = useDirection();

  // Redimensionne automatiquement le canvas
  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight, 600) * 0.9;
      setCanvasSize(size);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Génère une pomme si besoin
  useEffect(() => {
    if (!food && canvasSize > 0) {
      setFood(getRandomCoord(gridSize, snakeBody));
    }
  }, [food, canvasSize, snakeBody]);

  // déplacement du serpent
  useEffect(() => {
    if (canvasSize === 0 || isPaused || isGameOver) return;

    const interval = setInterval(() => {
      setSnakeBody((prevBody) => {
        const head = prevBody[prevBody.length - 1];
        const newHead: Coordinate = { ...head };

        switch (direction) {
          case "up":
            newHead.row = (head.row - 1 + gridSize) % gridSize;
            break;
          case "down":
            newHead.row = (head.row + 1) % gridSize;
            break;
          case "left":
            newHead.col = (head.col - 1 + gridSize) % gridSize;
            break;
          case "right":
            newHead.col = (head.col + 1) % gridSize;
            break;
        }

        const hasEaten =
          food && newHead.row === food.row && newHead.col === food.col;

        const newBody = [...prevBody, newHead];
        if (!hasEaten) {
          newBody.shift(); // retirer la queue si pas mangé
        } else {
          setFood(getRandomCoord(gridSize, newBody));
          setScore((prev) => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("highScore", String(newScore));
            }
            return newScore;
          });
        }

        const hasCollision = newBody
          .slice(0, -1)
          .some((s) => s.row === newHead.row && s.col === newHead.col);

        if (hasCollision) {
          setIsGameOver(true);
          return prevBody;
        }

        return newBody;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [canvasSize, direction, food, isPaused, isGameOver, highScore]);

  // Redessine le jeu à chaque changement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake(ctx, canvasSize, gridSize, snakeBody);
    if (food) drawFood(ctx, canvasSize, gridSize, food);
  }, [canvasSize, snakeBody, food]);

  // Touche espace pour pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isGameOver) {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  // Redémarrage du jeu
  const handleRestart = () => {
    const initialSnake: Coordinate[] = [
      { row: 5, col: 3 },
      { row: 5, col: 4 },
      { row: 5, col: 5 },
    ];
    setSnakeBody(initialSnake);
    setFood(getRandomCoord(gridSize, initialSnake));
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
  };

  return (
    <div className="snake-board-container">
      <ScoreBoard score={score} highScore={highScore} />
      <canvas
        id="snake-canvas"
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
      />
      {isPaused && !isGameOver && (
        <PausedModal onResume={() => setIsPaused(false)} />
      )}
      {isGameOver && <GameOver onRestart={handleRestart} />}
    </div>
  );
}

// Génére une coordonnée aléatoire
function getRandomCoord(gridSize: number, occupied: Coordinate[]): Coordinate {
  const allCoords = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      allCoords.push({ row, col });
    }
  }

  const available = allCoords.filter(
    (c) => !occupied.some((s) => s.row === c.row && s.col === c.col),
  );

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}
