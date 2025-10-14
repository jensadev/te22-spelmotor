import Scene from "../scene.js"
import Player from "../player.js"
import UserInterface from "../user-interface.js"
import Enemy from "../enemy.js"
import Powerup from "../powerup.js"

export default class GameplayScene extends Scene {
    constructor(game) {
        super(game, true) // Enable pause functionality
        
        // Common gameplay objects
        this.player = new Player(
            this.game,
            this.game.width / 2 - 16,
            this.game.height - 100,
            32,
            32
        )
        this.projectiles = []
        this.enemies = []
        this.powerups = []
        this.ui = new UserInterface(this.game)
        
        // Common game state
        this.levelScore = 0
        this.elapsedTime = 0
        
        // Enemy and powerup tracking
        this.enemiesKilled = 0
        this.nextPowerupThreshold = 10 + Math.floor(Math.random() * 11)
        
        // Level-specific configuration (to be overridden by subclasses)
        this.enemySpawnRate = 0.05
        this.powerupRandomChance = 0.001
        this.backgroundColor = "#000000"
        this.victoryScore = 1000
        this.victoryKey = null
        this.levelName = "Level"
    }

    reset() {
        // Reset transition
        this.startTransition(this.levelName, 3000)
        
        // Reset player
        this.player.x = this.game.width / 2 - 16
        this.player.y = this.game.height - 100
        this.player.health = 100
        
        // Clear arrays
        this.projectiles = []
        this.enemies = []
        this.powerups = []
        
        // Reset game state
        this.levelScore = 0
        this.elapsedTime = 0
        this.enemiesKilled = 0
        this.nextPowerupThreshold = 10 + Math.floor(Math.random() * 11)
        
        // Reset UI
        this.ui.flashTime = 0
    }

    update(deltaTime) {
        // Handle transition countdown
        if (this.updateTransition(deltaTime)) return
        
        // Handle pause input
        this.handlePauseInput()
        if (this.paused) return
        
        // Update elapsed time
        this.elapsedTime += deltaTime / 1000
        
        // Update game objects
        this.player.update(deltaTime)
        this.ui.update(deltaTime)
        
        // Check if player died
        if (this.player.health <= 0) {
            this.triggerGameOver()
            return
        }
        
        // Update projectiles
        this.projectiles.forEach(projectile => projectile.update(deltaTime))
        
        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime))
        
        // Update powerups
        this.powerups.forEach(powerup => powerup.update(deltaTime))
        
        // Spawn enemies and powerups
        this.spawnEnemies()
        this.spawnPowerups()
        
        // Collision detection
        this.handleCollisions()
        
        // Clean up marked objects
        this.cleanup()
        
        // Check victory conditions
        this.checkVictoryConditions()
    }

    spawnEnemies() {
        if (Math.random() < this.enemySpawnRate) {
            this.enemies.push(
                new Enemy(this.game, Math.random() * (this.game.width - 32), 0, 32, 32)
            )
        }
    }

    spawnPowerups() {
        // Spawn based on enemy kills threshold
        if (this.enemiesKilled >= this.nextPowerupThreshold) {
            this.powerups.push(
                new Powerup(this.game, Math.random() * (this.game.width - 20), 0, 20, 20)
            )
            this.nextPowerupThreshold = this.enemiesKilled + 10 + Math.floor(Math.random() * 11)
            console.log(`Powerup spawned! Next powerup at ${this.nextPowerupThreshold} kills`)
        }
        
        // Random spawn chance
        if (Math.random() < this.powerupRandomChance) {
            this.powerups.push(
                new Powerup(this.game, Math.random() * (this.game.width - 20), 0, 20, 20)
            )
            console.log("Random powerup spawned!")
        }
    }

    handleCollisions() {
        // Enemy vs Player collisions
        this.enemies.forEach(enemy => {
            if (enemy.checkCollision(this.player)) {
                this.player.takeDamage(20)
                enemy.markedForDeletion = true
                if (this.player.health <= 0) {
                    this.triggerGameOver()
                }
            }
        })

        // Projectile vs Enemy collisions
        this.projectiles.forEach(projectile => {
            this.enemies.forEach(enemy => {
                if (projectile.checkCollision(enemy)) {
                    enemy.health -= this.player.damage
                    if (enemy.health > 0) {
                        projectile.markedForDeletion = true
                        return
                    }
                    projectile.markedForDeletion = true
                    enemy.markedForDeletion = true
                    this.addScore(enemy.score)
                    this.enemiesKilled++
                }
            })
        })

        // Powerup vs Player collisions
        this.powerups.forEach(powerup => {
            if (powerup.checkCollision(this.player)) {
                this.player.addHealth(10)
                powerup.markedForDeletion = true
                console.log("Powerup collected! Health restored.")
            }
        })
    }

    addScore(points) {
        this.levelScore += points
        this.game.addScore(points) // Add to total game score
    }

    cleanup() {
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        this.powerups = this.powerups.filter(powerup => !powerup.markedForDeletion)
    }

    checkVictoryConditions() {
        // Check score-based victory
        if (this.levelScore >= this.victoryScore) {
            this.onLevelComplete()
        }
        
        // Check key-based victory (debug)
        if (this.victoryKey && this.game.input.keys.has(this.victoryKey)) {
            this.onLevelComplete()
        }
    }

    onLevelComplete() {
        // Override in subclasses
        console.log(`${this.levelName} completed!`)
        this.game.sceneManager.changeScene("menu")
    }

    triggerGameOver() {
        this.game.sceneManager.gameOver(
            this.levelScore,
            this.game.totalScore,
            this.elapsedTime,
            this.levelName
        )
    }

    draw(ctx) {
        // Draw background
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(0, 0, this.game.width, this.game.height)
        
        // Draw game objects
        this.player.draw(ctx)
        this.projectiles.forEach(projectile => projectile.draw(ctx))
        this.enemies.forEach(enemy => enemy.draw(ctx))
        this.powerups.forEach(powerup => powerup.draw(ctx))
        
        // Draw UI
        this.ui.draw(ctx)
        
        // Draw transition overlay
        this.drawTransition(ctx)
        
        // Draw pause overlay
        this.drawPauseOverlay(ctx)
    }
}