import GameObject from "./GameObject"
import Projectile from "./Projectile"

export default class Player extends GameObject {
  constructor(game) {
    super(game, game.width / 2, game.height / 2, 32, 32, "white")

    this.game = game
    this.speedX = 0
    this.speedY = 0
    this.speed = 5

    this.attackTimer = 0
    this.attackCooldown = 200
  }

  update(deltaTime) {
    if (
      this.game.input.keys.has("ArrowLeft") ||
      this.game.input.keys.has("a")
    ) {
      this.speedX = -this.speed
    } else if (
      this.game.input.keys.has("ArrowRight") ||
      this.game.input.keys.has("d")
    ) {
      this.speedX = this.speed
    } else {
      this.speedX = 0
    }

    if (this.game.input.keys.has("ArrowUp") || this.game.input.keys.has("w")) {
      this.speedY = -this.speed
    } else if (
      this.game.input.keys.has("ArrowDown") ||
      this.game.input.keys.has("s")
    ) {
      this.speedY = this.speed
    } else {
      this.speedY = 0
    }

    this.x += this.speedX
    this.y += this.speedY

    // Prevent the player from moving outside the game boundaries
    // and check for room transitions
    if (this.x < 0) {
      this.x = 0
      this.game.levelManager.currentLevel.checkRoomTransition(this)
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width
      this.game.levelManager.currentLevel.checkRoomTransition(this)
    }
    if (this.y < 0) {
      this.y = 0
      console.log(this.game.levelManager.currentLevel)
      this.game.levelManager.currentLevel.checkRoomTransition(this)
    }
    if (this.y + this.height > this.game.height) {
      this.y = this.game.height - this.height
      this.game.levelManager.currentLevel.checkRoomTransition(this)
    }

    // Decrement the attack timer
    if (this.attackTimer > 0) {
      this.attackTimer -= deltaTime
    }

    if (this.game.input.keys.has("mouse0") && this.attackTimer <= 0) {
      this.attack()
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
      ctx.beginPath()
      ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      ctx.lineTo(this.game.input.mouseX, this.game.input.mouseY)
      ctx.strokeStyle = "white"
      ctx.stroke()
    }
  }

  attack() {
    const angle = Math.atan2(
      this.game.input.mouseY - (this.y + this.height / 2),
      this.game.input.mouseX - (this.x + this.width / 2),
    )

    this.game.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        500,
      ),
    )

    // Trigger camera effects
    this.game.camera.shake(50, 2) // Shake duration in ms, intensity
    this.game.camera.flash("red", 50, 0.1) // Flash color and duration in ms

    this.attackTimer = this.attackCooldown
  }
}
