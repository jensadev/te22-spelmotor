import GameObject from "./game-object.js";
import Projectile from "./projectile.js";

export default class Player extends GameObject {
    constructor(game, x, y, width, height) {
        super(x, y, width, height)
        this.game = game
        this.speedX = 0
        this.maxSpeedX = 0.4
        this.health = 100

        this.attackDelay = 0
        this.attackInterval = 100
    }

    update(deltaTime) {
        if (this.game.input.keys.has("ArrowLeft")) {
            this.speedX -= this.maxSpeedX
        } else if (this.game.input.keys.has("ArrowRight")) {
            this.speedX += this.maxSpeedX
        } else {
            this.speedX = 0
        }

        if (this.game.input.keys.has(" ")) {
            this.attack()
        }

        this.x += this.speedX
        if (this.x < 0) {
            this.x = 0
            this.speedX = 0
        }
        if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width
            this.speedX = 0
        }

        if (this.attackDelay > 0) {
            this.attackDelay -= deltaTime
        }
    }

    attack() {
        if (this.attackDelay > 0) return

        this.attackDelay = this.attackInterval

        // Get the current scene and add projectile to it
        const currentScene = this.game.sceneManager.currentScene
        if (currentScene && currentScene.projectiles) {
            currentScene.projectiles.push(
                new Projectile(
                    this.game,
                    this.x + this.width / 2 - 2,
                    this.y,
                    4,
                    4
                )
            )
        }
    }

    takeDamage(damage) {
        this.health -= damage
        
        // Get the current scene and trigger flash on its UI
        const currentScene = this.game.sceneManager.currentScene
        if (currentScene && currentScene.ui) {
            currentScene.ui.triggerFlash()
        }
        
        if (this.health <= 0) {
            // Set game over on the current scene
            if (currentScene) {
                currentScene.gameOver = true
            }
        }
    }
}