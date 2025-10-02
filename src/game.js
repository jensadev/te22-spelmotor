import Input from "./input.js"
import SceneManager from "./scene-manager.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.input = new Input()
        
        // Initialize scene manager
        this.sceneManager = new SceneManager(this)
    }

    update(deltaTime) {
        this.sceneManager.update(deltaTime)
    }

    draw(ctx) {
        this.sceneManager.draw(ctx)
    }
}
