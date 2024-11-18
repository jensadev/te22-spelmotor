import GameObject from "./GameObject";

export default class Projectile extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.speedY = -4
    this.color = "yellow"
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y < 0) {
      this.game.projectiles = this.game.projectiles.filter(
        (projectile) => projectile !== this
      )
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}