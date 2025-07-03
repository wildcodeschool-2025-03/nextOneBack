import type { Coordinate } from "./Snake";

// Dessine la pomme dans le canvas
export default function drawFood(
  ctx: CanvasRenderingContext2D,
  cellSize: number,
  food: Coordinate,
) {
  ctx.fillStyle = "#DB29CC"; // Couleur de la pomme
  ctx.fillRect(food.col * cellSize, food.row * cellSize, cellSize, cellSize);
}
