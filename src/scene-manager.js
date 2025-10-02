import MenuScene from "./scenes/menu-scene.js"
import LevelOneScene from "./scenes/level-one-scene.js"
import InstructionsScene from "./scenes/instructions-scene.js"

export default class SceneManager {
    constructor(game) {
        this.game = game
        this.scenes = {}
        this.currentScene = null
        
        // Initialize scenes
        this.scenes.menu = new MenuScene(this.game)
        this.scenes.levelOne = new LevelOneScene(this.game)
        this.scenes.instructions = new InstructionsScene(this.game)
        
        // Start with menu
        this.changeScene("menu")
    }
    
    changeScene(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName]
            
            // Reset the scene if it has a reset method (useful for game scenes)
            if (sceneName === "levelOne" && this.currentScene.reset) {
                this.currentScene.reset()
            }
            
            console.log(`Changed to scene: ${sceneName}`)
        } else {
            console.warn(`Scene ${sceneName} not found`)
        }
    }
    
    update(deltaTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime)
        }
    }
    
    draw(ctx) {
        if (this.currentScene) {
            this.currentScene.draw(ctx)
        }
    }
}