export type Coordinate = {
  row: number;
  col: number;
};

type Direction = "up" | "down" | "left" | "right";

export default class Snake {
  private body: Coordinate[]; // Corps du serpent (liste des coordonnées)
  private direction: Direction; // Direction actuelle du mouvement
  readonly defaultLength = 3; // Longueur de départ

  constructor() {
    // Initialise le corps avec 3 cases alignées horizontalement
    this.body = [
      { row: 5, col: 3 },
      { row: 5, col: 4 },
      { row: 5, col: 5 },
    ];
    this.direction = "right"; // Départ vers la droite
  }

  getBody(): Coordinate[] {
    return this.body;
  }

  getHead(): Coordinate {
    return this.body[this.body.length - 1]; // Dernier élément = tête
  }

  setDirection(newDirection: Direction) {
    const opposites: Record<Direction, Direction> = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    // Empêche les demi-tours
    if (opposites[newDirection] === this.direction) return;

    this.direction = newDirection;
  }

  // Déplacement standard : on ajoute une nouvelle tête et on retire la queue
  move(gridSize: number) {
    const newBody = [...this.body];
    const head = this.getHead();
    const newHead = { ...head };

    switch (this.direction) {
      case "up":
        newHead.row -= 1;
        break;
      case "down":
        newHead.row += 1;
        break;
      case "left":
        newHead.col -= 1;
        break;
      case "right":
        newHead.col += 1;
        break;
    }

    // Téléportation aux bords
    newHead.row = (newHead.row + gridSize) % gridSize;
    newHead.col = (newHead.col + gridSize) % gridSize;

    newBody.push(newHead); // Ajoute la nouvelle tête
    newBody.shift(); // Retire la queue

    this.body = newBody;
  }

  // Grandit : comme move, mais sans retirer la queue
  grow(gridSize: number) {
    const newBody = [...this.body];
    const head = this.getHead();
    const newHead = { ...head };

    switch (this.direction) {
      case "up":
        newHead.row -= 1;
        break;
      case "down":
        newHead.row += 1;
        break;
      case "left":
        newHead.col -= 1;
        break;
      case "right":
        newHead.col += 1;
        break;
    }

    newHead.row = (newHead.row + gridSize) % gridSize;
    newHead.col = (newHead.col + gridSize) % gridSize;

    newBody.push(newHead); // Pas de shift = le corps s'allonge
    this.body = newBody;
  }
  hasCollision(): boolean {
    const head = this.getHead();
    const body = this.body.slice(0, -1); // Ne compare pas la tête à elle-même
    return body.some((seg) => seg.row === head.row && seg.col === head.col);
  }
}
