import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game, x, y) {
    super(game, x, y, 50, 50, "#fff", 10)

    this.speedX = 5
    this.speedY = 15

    this.velocityY = 0
    this.grounded = false
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      if (this.x > 0) {
        this.x -= this.speedX
      }
    } else if (this.game.keys.has("ArrowRight")) {
      if (this.x + this.width < this.game.worldWidth) {
        this.x += this.speedX
      }
    }

    if (
      (this.game.keys.has("ArrowUp") || this.game.keys.has(" ")) &&
      this.grounded
    ) {
      this.velocityY = -this.speedY
      this.grounded = false
    }

    // Apply gravity
    this.velocityY += this.game.gravity
    this.y += this.velocityY

    if (this.y + this.height >= this.game.groundLevel) {
      this.y = this.game.groundLevel - this.height
      this.velocityY = 0
      this.grounded = true
    } else {
      this.grounded = false
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
