export default class UserInterface {
  constructor(game) {
    this.game = game
    this.flashTime = 0
    this.debugMode = false
    this.keyPressed = false
  }

  update(deltaTime) {
    // Handle debug mode toggle
    if (this.game.input.keys.has("å") && !this.keyPressed) {
      this.debugMode = !this.debugMode
      this.keyPressed = true
      console.log(`Debug mode: ${this.debugMode ? 'ON' : 'OFF'}`)
    } else if (!this.game.input.keys.has("å")) {
      this.keyPressed = false
    }

    if (this.flashTime > 0) {
      this.flashTime -= deltaTime
      if (this.flashTime < 0) {
        this.flashTime = 0
      }
    }
  }

  draw(ctx) {
    const currentScene = this.game.sceneManager.currentScene

    // Flash effect
    if (this.flashTime > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 1)"
      ctx.fillRect(0, 0, this.game.width, this.game.height)
    }

    // Game UI
    if (currentScene && currentScene.levelScore !== undefined) {
      ctx.fillStyle = "#ffffff"
      ctx.font = "18px Arial"
      ctx.fillText(`Level: ${currentScene.levelScore}`, 20, 30)
      ctx.fillText(`Total: ${this.game.totalScore}`, 20, 50)
      ctx.fillText(`Health: ${currentScene.player.health}`, 20, 70)
      ctx.fillText(`Time: ${currentScene.elapsedTime.toFixed(1)}s`, 20, 90)
    }

    // Debug mode
    if (this.debugMode) {
      this.drawDebugInfo(ctx, currentScene)
    }
  }

  drawDebugInfo(ctx, scene) {
    // Debug background
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(this.game.width - 250, 10, 240, 200)

    ctx.fillStyle = "#00ff00"
    ctx.font = "14px Arial"
    ctx.fillText("DEBUG MODE (F3 to toggle)", this.game.width - 240, 30)

    ctx.fillStyle = "#ffffff"
    ctx.font = "12px Arial"
    let y = 50

    // Game state info
    ctx.fillText(`Scene: ${scene.constructor.name}`, this.game.width - 240, y)
    y += 15
    ctx.fillText(`Paused: ${scene.paused || false}`, this.game.width - 240, y)
    y += 15
    ctx.fillText(`Game Over: ${scene.gameOver || false}`, this.game.width - 240, y)
    y += 20

    // Player info
    if (scene.player) {
      ctx.fillText(`Player X: ${scene.player.x.toFixed(1)}`, this.game.width - 240, y)
      y += 15
      ctx.fillText(`Player Y: ${scene.player.y.toFixed(1)}`, this.game.width - 240, y)
      y += 15
      ctx.fillText(`Player Speed: ${scene.player.speedX.toFixed(2)}`, this.game.width - 240, y)
      y += 20
    }

    // Game objects count
    if (scene.enemies) {
      ctx.fillText(`Enemies: ${scene.enemies.length}`, this.game.width - 240, y)
      y += 15
    }
    if (scene.projectiles) {
      ctx.fillText(`Projectiles: ${scene.projectiles.length}`, this.game.width - 240, y)
      y += 15
    }

    // Performance info
    ctx.fillText(`Canvas: ${this.game.width}x${this.game.height}`, this.game.width - 240, y)
    y += 15
    ctx.fillText(`FPS: ${(1000 / 16.67).toFixed(0)} (approx)`, this.game.width - 240, y)
  }

  triggerFlash(duration) {
    this.flashTime = duration || 0.1
  }
}