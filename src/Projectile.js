import GameObject from "./GameObject"

export default class Projectile extends GameObject {
  constructor(game, x, y, width, height, shotLevel) {
    super(x, y, width, height)
    this.game = game
    this.speedY = -4
    this.markedForDeletion = false
    this.shotLevel = shotLevel

    this.image = new Image()
    this.image.src =
      "./src/assets/sprites/Nebula Shot Levels - Sprite Sheet 32x32.png"
    this.frameX = 0
    this.frameY = shotLevel
    this.frameWidth = 32
    this.frameHeight = 32
    this.frameCount = 4
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y < 0) {
      this.markedForDeletion = true
    }

    // console.log(this.game.player.y, this.y)
    if (this.game.player.y - this.y > 200) {
      this.frameX = 3
    } else if (this.game.player.y - this.y > 150) {
      this.frameX = 2
    } else if (this.game.player.y - this.y > 100) {
      this.frameX = 1
    } else {
      this.frameX = 0
    }
  }

  draw(ctx) {
    if (this.game.debug) {
      ctx.strokeStyle = "red"
      ctx.strokeRect(
        this.x + this.width / 2 - this.frameWidth / 2,
        this.y + this.height / 2 - this.frameHeight / 2,
        this.frameWidth,
        this.frameHeight,
      )
      this.fillStyle = "white"
      ctx.font = "10px Arial"
      ctx.fillText(
        `frame: ${this.frameX}, Y: ${this.y.toFixed(2)})`,
        this.x,
        this.y,
      )
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x + this.width / 2 - this.frameWidth / 2,
      this.y + this.height / 2 - this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
    )
  }
}
