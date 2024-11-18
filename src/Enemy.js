import GameObject from "./GameObject"

export default class Enemy extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.color = "green"
    this.speedY = 0.5 + Math.random() * 2
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y > this.game.height) {
      this.game.player.takeDamage(10)
      this.game.enemies = this.game.enemies.filter(
        (enemy) => enemy !== this
      )
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}