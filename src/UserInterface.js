export default class UserInterface {
  constructor(game) {
    this.game = game

    this.flashTime = 0
  }

  update(deltaTime) {
    if (this.flashTime > 0) {
      this.flashTime -= deltaTime
      if (this.flashTime < 0) {
        this.flashTime = 0
      }
    }
  }

  draw(ctx) {
    if (this.flashTime > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 1)"
      ctx.fillRect(0, 0, this.game.width, this.game.height)
    }

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Score: ${this.game.score}`, 20, 40)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Time: ${this.game.elapsedTime.toFixed(1)}s`, 20, 70)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Health: ${this.game.player.health}`, 20, 100)
  }

  triggerFlash(duration) {
    if (this.game.debug) return
    this.flashTime = duration || 0.1
  }
}