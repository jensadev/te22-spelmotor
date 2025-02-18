import level1 from "./levels/Level1.js"

export default class LevelManager {
  constructor(game) {
    this.game = game
    this.levels = []
    this.currentLevel = null

    this.addLevel(level1)
  }

  addLevel(level) {
    this.levels.push(level)
  }

  loadLevel(level) {
    this.currentLevel = this.levels[level]
    this.currentLevel.currentRoom = this.currentLevel.rooms[0]
  }

  nextLevel() {
    const currentIndex = this.levels.indexOf(this.currentLevel)
    if (currentIndex < this.levels.length - 1) {
      this.currentLevel = this.levels[currentIndex + 1]
    }
  }

  restartGame() {
    this.loadLevel(this.currentLevel.name)
  }

  draw(ctx) {
    ctx.fillStyle = this.currentLevel.currentRoom.color
    ctx.fillRect(
      this.currentLevel.currentRoom.border,
      this.currentLevel.currentRoom.border,
      this.game.width - this.currentLevel.currentRoom.border * 2,
      this.game.height - this.currentLevel.currentRoom.border * 2,
    )
  }
}
