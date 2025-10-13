import Input from "./input.js"
import SceneManager from "./scene-manager.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.input = new Input()
        this.sceneManager = new SceneManager(this)
        
        // Add persistent game state
        this.totalScore = 0
        this.currentLevel = 1
    }

    update(deltaTime) {
        this.sceneManager.update(deltaTime)
    }

    draw(ctx) {
        this.sceneManager.draw(ctx)
    }

    addScore(points) {
        this.totalScore += points
    }

    nextLevel() {
        this.currentLevel++
    }

    resetGame() {
        this.totalScore = 0
        this.currentLevel = 1
    }
}
