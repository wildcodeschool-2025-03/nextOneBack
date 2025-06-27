import { useEffect, useRef, useState } from "react";
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
  const gridSize = 20;

  // Direction actuelle
  const direction = useDirection();

  //  Redimensionne automatiquement le canvas en fonction de l'écran
  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      setCanvasSize(size);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // avance le serpent dans la bonne direction
  useEffect(() => {
    if (canvasSize === 0) return;

    const interval = setInterval(() => {
      setSnakeBody((prevBody) => {
        const head = prevBody[prevBody.length - 1];
        const newHead: Coordinate = { ...head };

        // Appliquer la direction du moment
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

        const newBody = [...prevBody, newHead];
        newBody.shift(); // on enlève la queue

        return newBody;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [canvasSize, direction]);

  //  Dessin du serpent sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake(ctx, canvasSize, gridSize, snakeBody);
  }, [canvasSize, snakeBody]);

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
