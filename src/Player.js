import GameObject from "./GameObject"
import Projectile from "./Projectile"

export default class Player extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.speedX = 0
    this.maxSpeedX = 0.4
    this.health = 100000000

    this.attackDelay = 0
    this.attackInterval = 100

    this.idle = new Image()
    this.idle.src = "./src/assets/sprites/Ship-Nebula - Sprite Sheet.png"
    this.image = this.idle
    this.fps = 20
    this.frameX = 0
    this.frameY = 0
    this.frameWidth = 32
    this.frameHeight = 32
    this.frameCount = 4
    this.animationInterval = 1000 / this.fps
    this.animationTimer = 0

    this.shotLevel = 0
    this.shotDecay = 5000
    this.shotDecayTimer = 0
  }

  update(deltaTime) {
    if (this.game.input.keys.has("ArrowLeft")) {
      this.speedX -= this.maxSpeedX
      this.frameY = 2
      this.frameCount = 3
    }
    if (this.game.input.keys.has("ArrowRight")) {
      this.speedX += this.maxSpeedX
      this.frameY = 1
      this.frameCount = 3
    }
    if (
      this.game.input.keys.has("ArrowRight") &&
      this.game.input.keys.has("ArrowLeft")
    ) {
      this.speedX = 0
      this.frameY = 0
      this.frameCount = 4
    }

    if (this.game.input.keys.has(" ")) {
      this.attack()
    }

    this.x += this.speedX
    if (this.x < 0) {
      this.x = 0
      this.speedX = 0
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width
      this.speedX = 0
    }

    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    if (this.frameX >= this.frameCount) {
      this.frameX = 0
    }

    if (this.attackDelay > 0) {
      this.attackDelay -= deltaTime
    }

    if (this.shotLevel > 0) {
      if (this.shotDecayTimer > this.shotDecay) {
        this.shotLevel--
        this.shotDecayTimer = 0
      } else {
        this.shotDecayTimer += deltaTime
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }

  attack() {
    if (this.attackDelay > 0) return

    this.attackDelay = this.attackInterval

    this.game.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y,
        4,
        4,
        this.shotLevel,
      ),
    )
  }

  takeDamage(damage) {
    this.health -= damage
    this.game.ui.triggerFlash()
    if (this.health <= 0) {
      this.game.gameOver = true
    }
  }
}
