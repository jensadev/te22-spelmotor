import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 128, 128, "#fff", 5)

    this.image = new Image()
    this.image.src = "./src/assets/franks_doge.png"

    this.speedX = 0
    this.speedY = 0

    this.frameWidth = 100
    this.frameHeight = 92
    this.frameX = 0
    this.frameY = 0
    this.flip = false
    this.maxFrames = 7
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
      this.flip = true
    } else if (this.game.keys.has("ArrowRight")) {
      this.flip = false
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

    if (this.speedX !== 0 || this.speedY !== 0) {
      this.frameY = 3
      this.maxFrames = 9
    } else {
      this.frameY = 0
      this.maxFrames = 7
    }

    this.x += this.speedX
    this.y += this.speedY

    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrames) {
      this.frameX = 0
    }
  }

  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height,
    )
    if (this.flip) {
      ctx.restore()
    }
  }
}
