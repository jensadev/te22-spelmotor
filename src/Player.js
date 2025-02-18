import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, game.width / 2, game.height / 2, 32, 32, "white")

    this.speedX = 0
    this.speedY = 0
    this.speed = 5
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.speed
    } else if (this.game.keys.has("ArrowRight")) {
      this.speedX = this.speed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.speed
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.speed
    } else {
      this.speedY = 0
    }

    this.x += this.speedX
    this.y += this.speedY
  }
}
