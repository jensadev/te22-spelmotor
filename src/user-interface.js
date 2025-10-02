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

    // Get current scene for data
    const currentScene = this.game.sceneManager.currentScene
    if (!currentScene) return

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Score: ${currentScene.score || 0}`, 20, 40)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Time: ${(currentScene.elapsedTime || 0).toFixed(1)}s`, 20, 70)

    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText(`Health: ${currentScene.player ? currentScene.player.health : 0}`, 20, 100)
  }

  triggerFlash(duration) {
    this.flashTime = duration || 0.1
  }
}