import Scene from "../scene.js"
import Player from "../player.js"
import Enemy from "../enemy.js"
import UserInterface from "../user-interface.js"
import Powerup from "../powerup.js"

export default class LevelTwoScene extends Scene {
    constructor(game) {
        super(game, true)
        this.player = new Player(
            this.game,
            this.game.width / 2 - 32,
            this.game.height - 100,
            32,
            32,
        )
        this.projectiles = []
        this.enemies = []
        this.powerups = []
        this.ui = new UserInterface(this.game)
        this.score = 0
        this.elapsedTime = 0
        this.enemiesKilled = 0
        this.nextPowerupThreshold = 10 + Math.floor(Math.random() * 11)
        this.gameOver = false
        this.gameOverTimer = 0
        this.gameOverDelay = 3000
        this.transitionActive = false
        this.transitionTimer = 0
        this.transitionDuration = 3000
    }

    reset() {
        this.player = new Player(
            this.game,
            this.game.width / 2 - 32,
            this.game.height - 100,
            32,
            32,
        )
        this.projectiles = []
        this.enemies = []
        this.powerups = []
        this.score = 0
        this.elapsedTime = 0
        this.enemiesKilled = 0
        this.nextPowerupThreshold = 10 + Math.floor(Math.random() * 11)
        this.gameOver = false
        this.gameOverTimer = 0
        this.paused = false
        this.keyPressed = false
        this.startTransition('Level 2', 3000);
    }

    update(deltaTime) {
        if (this.handlePauseInput()) return
        if (this.gameOver) {
            this.gameOverTimer += deltaTime
            if (this.gameOverTimer >= this.gameOverDelay) {
                this.game.sceneManager.changeScene("menu")
            }
            return
        }
        if (this.paused) return
        
        if (this.updateTransition(deltaTime)) {
            return // Block gameplay during transition
        }
        this.elapsedTime += deltaTime / 1000
        this.ui.update(deltaTime)
        this.player.update(deltaTime)
        this.projectiles.forEach((projectile) => { projectile.update(deltaTime) })
        this.powerups.forEach((powerup) => { powerup.update(deltaTime) })
        // More enemies, faster spawn rate for level two
        if (Math.random() < 0.12) {
            this.enemies.push(
                new Enemy(this.game, Math.random() * (this.game.width - 32), 0, 32, 32),
            )
        }
        // Powerup spawn logic
        if ((this.enemiesKilled >= this.nextPowerupThreshold) || Math.random() < 0.001) {
            this.powerups.push(
                new Powerup(this.game, Math.random() * (this.game.width - 20), 0, 20, 20)
            )
            if (this.enemiesKilled >= this.nextPowerupThreshold) {
                this.nextPowerupThreshold = this.enemiesKilled + 10 + Math.floor(Math.random() * 11)
            }
        }
        this.enemies.forEach((enemy) => {
            enemy.update(deltaTime)
            if (enemy.checkCollision(this.player)) {
                this.player.takeDamage(10)
                enemy.markedForDeletion = true
            }
        })
        this.projectiles.forEach((projectile) => {
            this.enemies.forEach((enemy) => {
                if (projectile.checkCollision(enemy)) {
                    this.score += 10
                    this.enemiesKilled += 1
                    projectile.markedForDeletion = true
                    enemy.markedForDeletion = true
                }
            })
        })
        this.powerups.forEach((powerup) => {
            if (powerup.checkCollision(this.player)) {
                this.player.addHealth(10)
                powerup.markedForDeletion = true
            }
        })
        this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
        this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
        this.powerups = this.powerups.filter((p) => !p.markedForDeletion)

        if (this.transitionActive) {
            this.transitionTimer += deltaTime
            if (this.transitionTimer >= this.transitionDuration) {
                this.transitionActive = false
            } else {
                return // Block gameplay during transition
            }
        }
    }

    draw(ctx) {
        // Different background for level two
        ctx.fillStyle = "#222a22"
        ctx.fillRect(0, 0, this.game.width, this.game.height)
        this.player.draw(ctx)
        this.projectiles.forEach((projectile) => { projectile.draw(ctx) })
        this.enemies.forEach((enemy) => { enemy.draw(ctx) })
        this.powerups.forEach((powerup) => { powerup.draw(ctx) })
        this.ui.draw(ctx)
        this.drawPauseOverlay(ctx)
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
        
        this.drawTransition(ctx)
    }
}
