export default function drawSnakeHead(
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  gridSize: number,
  tick: number,
) {
  const cellSize = canvasSize / gridSize;

  // Calculer la position : déplace la tête vers la droite à chaque tick
  const row = 5;
  const col = (5 + tick) % gridSize;

  // Couleur du Serpent
  const snakeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--snake-color")
    .trim();
  ctx.fillStyle = snakeColor;

  // Effacer l’ancien dessin
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Dessiner la nouvelle tête
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
}
