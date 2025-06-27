import type { Coordinate } from "./SnakeBoard";

// Fonction pour dessiner la pomme dans le canvas
export default function drawFood(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  gridSize: number,
  food: Coordinate,
) {
  const cellSize = canvasSize / gridSize;

  ctx.fillStyle = "#DB29CC"; // Couleur violette pour la pomme
  ctx.fillRect(food.col * cellSize, food.row * cellSize, cellSize, cellSize);
}
