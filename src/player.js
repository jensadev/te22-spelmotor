import GameObject from "./game-object.js";
import Projectile from "./projectile.js";

export default class Player extends GameObject {
    constructor(game, x, y, width, height) {
        super(x, y, width, height)
        this.game = game
        this.speedX = 0
        this.speedY = 0
        this.maxSpeedY = 0.4
        this.maxSpeedX = 0.4
        this.health = 100
        this.maxHealth = 120

        this.attackDelay = 1
        this.attackInterval = 100
        this.damage = 5
        
        // Damage visual effect properties
        this.damageFlashTime = 0
        this.damageFlashDuration = 200 // 200ms flash duration
    }

    update(deltaTime) {
        if (this.game.input.keys.has("ArrowLeft")) {
            this.speedX -= this.maxSpeedX
        } else if (this.game.input.keys.has("ArrowRight")) {
            this.speedX += this.maxSpeedX
        } else {
            this.speedX = 0
        }

        if (this.game.input.keys.has("ArrowUp")) {
            this.speedY -= this.maxSpeedY
        } else if (this.game.input.keys.has("ArrowDown")) {
            this.speedY += this.maxSpeedY
        } else {
            this.speedY = 0
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

        this.y += this.speedY
        if (this.y < 0) {
            this.y = 0
            this.speedY = 0
        }
        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height
            this.speedY = 0
        }


        if (this.attackDelay > 0) {
            this.attackDelay -= deltaTime
        }
        
        // Update damage flash effect
        if (this.damageFlashTime > 0) {
            this.damageFlashTime -= deltaTime
            if (this.damageFlashTime < 0) {
                this.damageFlashTime = 0
            }
        }
    }

    draw(ctx) {
        // Apply damage flash effect - simple color change
        if (this.damageFlashTime > 0) {
            ctx.fillStyle = "red"
        } else {
            ctx.fillStyle = this.color
        }
        
        // Draw the player rectangle
        ctx.fillRect(this.x, this.y, this.width, this.height)
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

    addHealth(amount) {
        this.health += amount
        // Cap health at maxHealth
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth
        }
        console.log(`Health restored: +${amount} (Total: ${this.health})`)
    }

    takeDamage(damage) {
        this.health -= damage
        
        // Trigger damage flash effect
        this.damageFlashTime = this.damageFlashDuration
        
        // Använd currentScene för att flasha skärmen
        // Detta visar hur vi kan styra visualla effekter från spelobjekt
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