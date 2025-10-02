export default class Scene {
    constructor(game, pausable = false) {
        this.game = game
        this.pausable = pausable
        this.paused = false
        this.keyPressed = false
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

    update(deltaTime) {}

    draw(ctx) {}
}