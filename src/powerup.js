import GameObject from "./game-object.js"

export default class Powerup extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.color = "green"
    this.speedY = 0.2 + Math.random() * 2
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y > this.game.height) {
      this.markedForDeletion = true
    }
  }
}