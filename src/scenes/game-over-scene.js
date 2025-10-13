import Scene from "../scene.js"

export default class GameOverScene extends Scene {
    constructor(game) {
        super(game)
        
        this.finalScore = 0
        this.levelScore = 0
        this.survivalTime = 0
        this.levelName = ""
        this.returnTimer = 0
        this.returnDelay = 3000 // 3 seconds
        this.selectedOption = 0
        this.options = ["Try Again", "Main Menu"]
        this.keyPressed = false
    }

    setGameOverData(levelScore, totalScore, survivalTime, levelName) {
        this.levelScore = levelScore
        this.finalScore = totalScore
        this.survivalTime = survivalTime
        this.levelName = levelName
        this.returnTimer = 0
        this.selectedOption = 0
    }

    reset() {
        this.returnTimer = 0
        this.selectedOption = 0
        this.keyPressed = false
    }

    update(deltaTime) {
        this.returnTimer += deltaTime

        // Handle input after a short delay to prevent accidental selection
        if (this.returnTimer > 1000) {
            this.handleInput()
        }
    }

    handleInput() {
        const keys = this.game.input.keys

        // Navigation
        if ((keys.has("ArrowUp") || keys.has("ArrowDown")) && !this.keyPressed) {
            this.selectedOption = this.selectedOption === 0 ? 1 : 0
            this.keyPressed = true
        }

        // Selection
        if (keys.has("Enter") && !this.keyPressed && this.returnTimer > 1500) {
            this.selectOption()
            this.keyPressed = true
        }

        // Reset key pressed state
        if (!keys.has("ArrowUp") && !keys.has("ArrowDown") && !keys.has("Enter")) {
            this.keyPressed = false
        }

        // Auto return to menu after delay (optional - can be removed if you prefer manual selection)
        if (this.returnTimer >= this.returnDelay + 5000) { // 8 seconds total
            this.game.sceneManager.changeScene("menu")
        }
    }

    selectOption() {
        switch (this.selectedOption) {
            case 0: // Try Again
                // Restart the current level
                if (this.levelName === "Level 1") {
                    this.game.sceneManager.changeScene("levelOne")
                } else if (this.levelName === "Level 2") {
                    this.game.sceneManager.changeScene("levelTwo")
                }
                break
            case 1: // Main Menu
                this.game.resetGame()
                this.game.sceneManager.changeScene("menu")
                break
        }
    }

    draw(ctx) {
        // Dark overlay background
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
        ctx.fillRect(0, 0, this.game.width, this.game.height)

        // Game Over title
        ctx.fillStyle = "#ff4444"
        ctx.font = "48px Arial"
        ctx.textAlign = "center"
        ctx.fillText("GAME OVER", this.game.width / 2, this.game.height / 2 - 120)

        // Level info
        ctx.fillStyle = "#ffffff"
        ctx.font = "24px Arial"
        ctx.fillText(`${this.levelName} Failed`, this.game.width / 2, this.game.height / 2 - 80)

        // Stats
        ctx.font = "20px Arial"
        ctx.fillText(`Level Score: ${this.levelScore}`, this.game.width / 2, this.game.height / 2 - 40)
        ctx.fillText(`Total Score: ${this.finalScore}`, this.game.width / 2, this.game.height / 2 - 10)
        ctx.fillText(`Survival Time: ${this.survivalTime.toFixed(1)}s`, this.game.width / 2, this.game.height / 2 + 20)

        // Options (only show after initial delay)
        if (this.returnTimer > 1000) {
            ctx.font = "18px Arial"
            
            this.options.forEach((option, index) => {
                if (index === this.selectedOption) {
                    ctx.fillStyle = "#ffff00" // Yellow for selected
                    ctx.fillText(`> ${option} <`, this.game.width / 2, this.game.height / 2 + 80 + (index * 30))
                } else {
                    ctx.fillStyle = "#cccccc" // Gray for unselected
                    ctx.fillText(option, this.game.width / 2, this.game.height / 2 + 80 + (index * 30))
                }
            })

            // Instructions
            ctx.fillStyle = "#888888"
            ctx.font = "14px Arial"
            ctx.fillText("Use ↑↓ to navigate, Enter to select", this.game.width / 2, this.game.height / 2 + 160)
        } else {
            // Show countdown while waiting
            const countdown = Math.ceil((1000 - this.returnTimer) / 1000)
            ctx.fillStyle = "#888888"
            ctx.font = "16px Arial"
            ctx.fillText(`Options available in ${countdown}...`, this.game.width / 2, this.game.height / 2 + 80)
        }

        ctx.textAlign = "left"
    }
}