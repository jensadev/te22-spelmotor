import GameplayScene from "./gameplay-scene.js"

export default class LevelOneScene extends GameplayScene {
    constructor(game) {
        super(game)
        
        // Level 1 specific configuration
        this.enemySpawnRate = 0.06
        this.backgroundColor = "#000033"
        this.levelName = "Level 1"
        this.victoryScore = 2000  // Increased from 1000 (20 enemy kills)
        this.victoryKey = "ä"
    }

    onLevelComplete() {
        this.game.sceneManager.levelCompleted(this.levelName)
    }
}
