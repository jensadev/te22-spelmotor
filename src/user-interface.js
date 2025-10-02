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

    // Draw debug information
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