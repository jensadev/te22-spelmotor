export default class Scene {
    constructor(game, pausable = false) {
        this.game = game
        this.pausable = pausable
        this.paused = false
        this.keyPressed = false
        this.transitionActive = false
        this.transitionTimer = 0
        this.transitionDuration = 3000
        this.transitionLabel = ''
    }

    handlePauseInput() {
        if (!this.pausable) return false

        // Handle pause toggle
        if (this.game.input.keys.has("Escape") && !this.keyPressed) {
            // Don't allow pausing if game is over (check if scene has gameOver property)
            if (!this.gameOver) {
                this.paused = !this.paused
            }
            this.keyPressed = true
            return true // Indicate that pause was handled
        } else if (this.game.input.keys.has("m") && !this.keyPressed) {
            // 'M' key to return to menu
            if (this.paused) {
                this.game.sceneManager.changeScene("menu")
                this.keyPressed = true
                return true
            }
        } else if (!this.game.input.keys.has("Escape") && 
                   !this.game.input.keys.has("m")) {
            this.keyPressed = false
        }
        return false
    }

    drawPauseOverlay(ctx) {
        if (!this.pausable || !this.paused) return

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(0, 0, this.game.width, this.game.height)

        ctx.fillStyle = "#ffffff"
        ctx.font = "48px Arial"
        ctx.textAlign = "center"
        ctx.fillText("PAUSED", this.game.width / 2, this.game.height / 2 - 50)

        ctx.fillStyle = "#cccccc"
        ctx.font = "20px Arial"
        ctx.fillText("ESC - Resume Game", this.game.width / 2, this.game.height / 2 + 20)
        ctx.fillText("M - Return to Menu", this.game.width / 2, this.game.height / 2 + 50)

        ctx.textAlign = "left"
    }

    startTransition(label = '', duration = 3000) {
        this.transitionActive = true
        this.transitionTimer = 0
        this.transitionDuration = duration
        this.transitionLabel = label
    }

    updateTransition(deltaTime) {
        if (this.transitionActive) {
            this.transitionTimer += deltaTime
            if (this.transitionTimer >= this.transitionDuration) {
                this.transitionActive = false
            }
            return true // Transition is active
        }
        return false // Transition is not active
    }

    drawTransition(ctx) {
        if (this.transitionActive) {
            ctx.fillStyle = "rgba(0,0,0,0.7)"
            ctx.fillRect(0, 0, this.game.width, this.game.height)
            ctx.fillStyle = "#fff"
            ctx.font = "48px Arial"
            ctx.textAlign = "center"
            ctx.fillText(this.transitionLabel, this.game.width / 2, this.game.height / 2 - 40)
            ctx.font = "36px Arial"
            const secondsLeft = Math.ceil((this.transitionDuration - this.transitionTimer) / 1000)
            ctx.fillText(secondsLeft > 0 ? secondsLeft : "Go!", this.game.width / 2, this.game.height / 2 + 40)
            ctx.textAlign = "left"
        }
    }

    update(deltaTime) {}

    draw(ctx) {}
}