import GameplayScene from "./gameplay-scene.js"

export default class LevelTwoScene extends GameplayScene {
    constructor(game) {
        super(game)
        
        // Level 2 specific configuration - harder level
        this.enemySpawnRate = 0.12  // Double the spawn rate
        this.backgroundColor = "#330000"  // Red background
        this.levelName = "Level 2"
        this.victoryScore = 3000  // Higher victory score (30 enemy kills)
        this.victoryKey = "ä"
    }

    onLevelComplete() {
        this.game.sceneManager.levelCompleted(this.levelName)
    }
}
