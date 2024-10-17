import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(0, 0, 50, 50, "#fff", 10)
    this.game = game

    this.targetX = this.x;
    this.targetY = this.y;
  }

  update(deltaTime) {
    // Update target positions based on arrow keys
    if (this.game.keys.has("ArrowLeft")) {
      this.targetX -= this.speed;
    } else if (this.game.keys.has("ArrowRight")) {
      this.targetX += this.speed;
    }

    if (this.game.keys.has("ArrowUp")) {
      this.targetY -= this.speed;
    } else if (this.game.keys.has("ArrowDown")) {
      this.targetY += this.speed;
    }

    // Apply tweening
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;
  }
}
