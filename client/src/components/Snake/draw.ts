import type { Coordinate } from "./SnakeBoard";

// Fonction pour dessiner tout le corps du serpent sur le canvas
export function drawSnake(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  gridSize: number,
  body: Coordinate[],
) {
  const cellSize = canvasSize / gridSize; // taille d'une case en pixels

  // Récupère la couleur CSS du serpent depuis la variable CSS
  const snakeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--snake-color")
    .trim();
  ctx.fillStyle = snakeColor;

  // Pour chaque segment du corps, on dessine un carré
  for (const segment of body) {
    ctx.fillRect(
      segment.col * cellSize,
      segment.row * cellSize,
      cellSize,
      cellSize,
    );
  }
}
