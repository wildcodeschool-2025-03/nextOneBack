import { useEffect, useRef, useState } from "react";
import drawSnakeHead from "./DrawSnakeHead";
import "./styles/snakeBoard.css";

export default function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(0);
  const [tick, setTick] = useState(0); // nombre de déplacements
  const gridSize = 20;

  // Redimensionnement du canvas à la taille de la fenêtre
  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      setCanvasSize(size);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Boucle de jeu : augmente le tick toutes les 300 ms
  useEffect(() => {
    if (canvasSize === 0) return;

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 300);

    return () => clearInterval(interval);
  }, [canvasSize]);

  // Dessin à chaque tick
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawSnakeHead(ctx, canvasSize, gridSize, tick);
  }, [canvasSize, tick]);

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
