import MenuScene from "./scenes/menu-scene.js"
import InstructionsScene from "./scenes/instructions-scene.js"
import LevelOneScene from "./scenes/level-one-scene.js"
import LevelTwoScene from "./scenes/level-two-scene.js"
import GameOverScene from "./scenes/game-over-scene.js"

export default class SceneManager {
    constructor(game) {
        this.game = game
        this.scenes = {
            menu: new MenuScene(game),
            instructions: new InstructionsScene(game),
            levelOne: new LevelOneScene(game),
            levelTwo: new LevelTwoScene(game),
            gameOver: new GameOverScene(game),
        }
        this.currentSceneName = "menu"
        this.currentScene = this.scenes.menu
    }

    changeScene(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentSceneName = sceneName
            this.currentScene = this.scenes[sceneName]
            
            // Only call reset if the scene has this method
            if (typeof this.currentScene.reset === 'function') {
                this.currentScene.reset()
            }
        }
    }

    // Level progression mapping - easy to modify or extend
    getLevelProgression() {
        return {
            "Level 1": "levelTwo",
            "Level 2": "menu",  // Could be "levelThree" in the future
            // Easy to add: "Level 3": "levelFour", etc.
        }
    }

    // Centralized level completion handler
    levelCompleted(levelName) {
        console.log(`${levelName} completed!`)
        
        // Update game state
        this.game.nextLevel()
        
        // Determine next scene from progression mapping
        const progression = this.getLevelProgression()
        const nextScene = progression[levelName]
        
        if (nextScene) {
            this.changeScene(nextScene)
        } else {
            console.warn(`No progression defined for ${levelName}, returning to menu`)
            this.changeScene("menu")
        }
    }

    // Method for transitioning to game over with data
    gameOver(levelScore, totalScore, survivalTime, levelName) {
        this.scenes.gameOver.setGameOverData(levelScore, totalScore, survivalTime, levelName)
        this.changeScene("gameOver")
    }

    update(deltaTime) {
        this.currentScene.update(deltaTime)
    }

    draw(ctx) {
        this.currentScene.draw(ctx)
    }
}