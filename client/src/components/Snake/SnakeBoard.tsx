import { useEffect, useRef, useState } from "react";
import "./styles/snakeBoard.css";

export default function SnakeBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState(0);
  const gridSize = 20;

  // Redimensionnement automatique
  useEffect(() => {
    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      setCanvasSize(size);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Dessine la tête du serpent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvasSize / gridSize;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Couleur du serpent
    const computedSnakeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--snake-color")
      .trim();
    ctx.fillStyle = computedSnakeColor;

    const row = 5;
    const col = 5;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  }, [canvasSize]);

  return (
    <div className="snake-board-container">
      <canvas id="snake-canvas" ref={canvasRef} />
    </div>
  );
}
