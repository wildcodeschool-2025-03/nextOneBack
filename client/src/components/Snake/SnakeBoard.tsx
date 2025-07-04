import { useEffect, useRef, useState } from "react";
import drawFood from "./Food";
import GameOver from "./GameOver";
import Paused from "./Paused";
import ScoreBoard from "./ScoreBoard";
import Snake from "./Snake";
import "./styles/snakeBoard.css";
import { toast } from "react-toastify";
import { postScore } from "../../services/postScore";

export default function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [food, setFood] = useState<{ row: number; col: number } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0,
  );
  const [speed, setSpeed] = useState(150);
  const [appleCount, setAppleCount] = useState(0);

  const gridSize = 20;
  const snakeRef = useRef<Snake>(new Snake());

  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      setCanvasSize(size);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const snake = snakeRef.current;
      if (isGameOver) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          setIsPaused((prev) => !prev);
          break;
        case "ArrowUp":
        case "z":
          e.preventDefault();
          snake.setDirection("up");
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          snake.setDirection("down");
          break;
        case "ArrowLeft":
        case "q":
          e.preventDefault();
          snake.setDirection("left");
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          snake.setDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    if (!food && canvasSize > 0) {
      const newFood = getRandomCoord(gridSize, snakeRef.current.getBody());
      setFood(newFood);
    }
  }, [food, canvasSize]);

  useEffect(() => {
    if (canvasSize === 0 || isPaused || isGameOver) return;

    const interval = setInterval(() => {
      const snake = snakeRef.current;
      const head = snake.getHead();

      const hasEaten = food && head.row === food.row && head.col === food.col;

      if (hasEaten) {
        snake.grow(gridSize);
        const updatedScore = score + 10;
        setScore(updatedScore);
        setAppleCount((count) => count + 1);

        if (updatedScore > highScore) {
          setHighScore(updatedScore);
          localStorage.setItem("highScore", String(updatedScore));
        }

        const nextFood = getRandomCoord(gridSize, snake.getBody());
        setFood(nextFood);
      } else {
        snake.move(gridSize);
      }

      if (snake.hasCollision()) {
        setIsGameOver(true);
      }

      draw(food);
    }, speed);

    return () => clearInterval(interval);
  }, [canvasSize, isPaused, food, isGameOver, score, highScore, speed]);

  useEffect(() => {
    // Going to the back
    if (isGameOver && score > 0) {
      const partyData = {
        id_game: 1,
        score: score,
        date_game: new Date().toISOString().split("T")[0],
      };

      postScore(partyData)
        .then(() => toast.success("Score envoyé 🛸"))
        .catch(() => toast.error("Erreur lors de l'envoi du score 🚫"));
    }
  }, [isGameOver, score]);

  useEffect(() => {
    if (appleCount > 0 && appleCount % 5 === 0) {
      setSpeed((prev) => Math.max(60, prev - 10));
    }
  }, [appleCount]);

  const draw = (currentFood = food) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvasSize / gridSize;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const snakeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--snake-color")
      .trim();
    ctx.fillStyle = snakeColor;

    const snake = snakeRef.current;
    for (const { row, col } of snake.getBody()) {
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }

    if (currentFood) {
      drawFood(ctx, cellSize, currentFood);
    }
  };

  const handleRestart = () => {
    const newSnake = new Snake();
    snakeRef.current = newSnake;
    setFood(getRandomCoord(gridSize, newSnake.getBody()));
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setAppleCount(0);
    setSpeed(150);
  };

  return (
    <div className="snake-board-container">
      <ScoreBoard score={score} highScore={highScore} />
      <canvas id="snake-canvas" ref={canvasRef} />
      {isPaused && !isGameOver && <Paused />}
      {isGameOver && <GameOver onRestart={handleRestart} />}
    </div>
  );
}

function getRandomCoord(
  gridSize: number,
  snakeCoords: { row: number; col: number }[],
): { row: number; col: number } {
  const allCoords = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      allCoords.push({ row, col });
    }
  }

  const available = allCoords.filter(
    (c) => !snakeCoords.some((s) => s.row === c.row && s.col === c.col),
  );

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}
