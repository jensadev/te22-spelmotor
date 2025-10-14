import GameObject from "./game-object.js"

export default class Enemy extends GameObject {
  constructor(game, x, y, width, height) {
    super(x, y, width, height)
    this.game = game
    this.color = "red"
    this.speedY = 0.5 + Math.random() * 2
    this.markedForDeletion = false
    this.score = 10
    this.damage = 10
    this.health = 10
  }

  update(deltaTime) {
    this.y += this.speedY
    if (this.y > this.game.height) {
      // Get player from current scene
      const currentScene = this.game.sceneManager.currentScene
      if (currentScene && currentScene.player) {
        currentScene.player.takeDamage(this.damage)
      }
      this.markedForDeletion = true
    }
  }
}