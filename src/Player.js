import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 50, 50, "#fff", 10)

    this.image = new Image()
    this.image.src = "./src/assets/AnimationSheet_Character.png"

    this.speedX = 0
    this.speedY = 0
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.has("ArrowRight")) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    this.x += this.speedX
    this.y += this.speedY
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
