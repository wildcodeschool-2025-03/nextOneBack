import { useEffect, useRef, useState } from "react";
import drawFood from "./Food";
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

  const gridSize = 20;
  const direction = useDirection();

  //  Redimensionne automatiquement le canvas
  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      setCanvasSize(size);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Génère une première pomme quand le canvas est prêt
  useEffect(() => {
    if (!food && canvasSize > 0) {
      setFood(getRandomCoord(gridSize, snakeBody));
    }
  }, [food, canvasSize, snakeBody]);

  //  Boucle de déplacement + gestion de la pomme
  useEffect(() => {
    if (canvasSize === 0) return;

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
          newBody.shift(); // si pas mangé, on enlève la queue
        } else {
          setFood(getRandomCoord(gridSize, newBody)); // nouvelle pomme
        }

        return newBody;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [canvasSize, direction, food]);

  // Dessin du serpent + pomme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake(ctx, canvasSize, gridSize, snakeBody);
    if (food) drawFood(ctx, canvasSize, gridSize, food);
  }, [canvasSize, snakeBody, food]);

  return (
    <div className="snake-board-container">
      <canvas
        id="snake-canvas"
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
      />
    </div>
  );
}

// Génère une coordonnée libre aléatoire pour la pomme
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
