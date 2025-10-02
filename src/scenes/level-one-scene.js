import Scene from "../scene.js"
import Player from "../player.js"
import Enemy from "../enemy.js"
import UserInterface from "../user-interface.js"

export default class LevelOneScene extends Scene {
    constructor(game) {
        super(game, true) // Enable pause functionality
        
        this.player = new Player(
            this.game,
            this.game.width / 2 - 32,
            this.game.height - 100,
            32,
            32,
        )
        this.projectiles = []
        this.enemies = []

        this.ui = new UserInterface(this.game)
        this.score = 0
        this.elapsedTime = 0

        this.gameOver = false
        this.gameOverTimer = 0
        this.gameOverDelay = 3000 // 3 seconds delay before returning to menu
    }

    reset() {
        // Reset player
        this.player = new Player(
            this.game,
            this.game.width / 2 - 32,
            this.game.height - 100,
            32,
            32,
        )
        
        // Clear arrays
        this.projectiles = []
        this.enemies = []

        // Reset game state
        this.score = 0
        this.elapsedTime = 0
        this.gameOver = false
        this.gameOverTimer = 0
        this.paused = false
        this.keyPressed = false
    }

    update(deltaTime) {
        // Handle pause input using base Scene functionality
        if (this.handlePauseInput()) {
            return // Pause input was handled, don't continue with game logic
        }

        if (this.gameOver) {
            this.gameOverTimer += deltaTime
            if (this.gameOverTimer >= this.gameOverDelay) {
                this.game.sceneManager.changeScene("menu")
            }
            return
        }

        // Don't update game logic if paused
        if (this.paused) {
            return
        }

        this.elapsedTime += deltaTime / 1000
        this.ui.update(deltaTime)

        this.player.update(deltaTime)
        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
        })
        
        // Spawn enemies randomly
        if (Math.random() < 0.06) {
            console.log("Spawn enemy")
            this.enemies.push(
                new Enemy(this.game, Math.random() * (this.game.width - 32), 0, 32, 32),
            )
        }

        // Update enemies and check collision with player
        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            if (enemy.checkCollision(this.player)) {
                this.player.takeDamage(10)
                enemy.markedForDeletion = true
            }
        })

        // Check projectile-enemy collisions
        this.projectiles.forEach((projectile) => {
            this.enemies.forEach((enemy) => {
                if (projectile.checkCollision(enemy)) {
                    this.score += 10
                    projectile.markedForDeletion = true
                    enemy.markedForDeletion = true
                }
            })
        })
        
        // Clean up marked objects
        this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
        this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
    }

    draw(ctx) {
        this.player.draw(ctx)
        this.projectiles.forEach((projectile) => {
            projectile.draw(ctx)
        })
        this.enemies.forEach((enemy) => {
            enemy.draw(ctx)
        })
        this.ui.draw(ctx)

        // Draw pause overlay using base Scene functionality
        this.drawPauseOverlay(ctx)

        // Draw game over screen
        if (this.gameOver) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
            ctx.fillRect(0, 0, this.game.width, this.game.height)

            ctx.fillStyle = "#ff0000"
            ctx.font = "48px Arial"
            ctx.textAlign = "center"
            ctx.fillText("GAME OVER", this.game.width / 2, this.game.height / 2 - 50)

            ctx.fillStyle = "#ffffff"
            ctx.font = "24px Arial"
            ctx.fillText(`Final Score: ${this.score}`, this.game.width / 2, this.game.height / 2)
            ctx.fillText(`Survival Time: ${this.elapsedTime.toFixed(1)}s`, this.game.width / 2, this.game.height / 2 + 30)

            ctx.fillStyle = "#cccccc"
            ctx.font = "16px Arial"
            const timeLeft = Math.ceil((this.gameOverDelay - this.gameOverTimer) / 1000)
            ctx.fillText(`Returning to menu in ${timeLeft}...`, this.game.width / 2, this.game.height / 2 + 80)

            ctx.textAlign = "left"
        }
    }
}