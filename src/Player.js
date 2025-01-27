import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, 60, 80, 128, 128)

    this.image = new Image()
    this.image.src = "./src/assets/franks_doge.png"

    this.speedX = 0
    this.speedY = 0

    this.frameWidth = 100
    this.frameHeight = 92
    this.frameX = 0
    this.frameY = 3
    this.flip = false
    this.maxFrames = 7
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    this.jumpSpeed = 10
    this.grounded = true
  }

  update(deltaTime) {

    if (this.game.keys.has("ArrowUp") && this.grounded) {
      this.speedY -= this.jumpSpeed
      this.grounded = false
    }

    if (this.y > this.game.height - this.game.groundHeight - this.height) {
      this.y = this.game.height - this.game.groundHeight - this.height
      this.grounded = true
    }

    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

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
