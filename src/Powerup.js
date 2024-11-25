import GameObject from "./GameObject";

export default class Powerup extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height);
    this.game = game;
    this.speedY = 1;
    this.color = "yellow"
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.y += this.speedY;
    if (this.y > this.game.height) {
      this.markedForDeletion = true;
    }
  }

}