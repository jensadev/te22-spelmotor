import Scene from "../scene.js"

export default class InstructionsScene extends Scene {
    constructor(game) {
        super(game)
        this.keyPressed = false
    }

    update(deltaTime) {
        // Handle going back to menu
        if (this.game.input.keys.has("Escape") && !this.keyPressed) {
            this.game.sceneManager.changeScene("menu")
            this.keyPressed = true
        } else if (this.game.input.keys.has("Enter") && !this.keyPressed) {
            this.game.sceneManager.changeScene("menu")
            this.keyPressed = true
        } else if (!this.game.input.keys.has("Escape") && 
                   !this.game.input.keys.has("Enter")) {
            this.keyPressed = false
        }
    }

    draw(ctx) {
        // Clear with dark background
        ctx.fillStyle = "#1a1a1a"
        ctx.fillRect(0, 0, this.game.width, this.game.height)

        // Draw title
        ctx.fillStyle = "#ffffff"
        ctx.font = "36px Arial"
        ctx.textAlign = "center"
        ctx.fillText("INSTRUCTIONS", this.game.width / 2, this.game.height / 6)

        // Draw instructions
        ctx.fillStyle = "#cccccc"
        ctx.font = "20px Arial"
        
        const instructions = [
            "CONTROLS:",
            "",
            "← → Arrow Keys - Move left/right",
            "SPACEBAR - Shoot projectiles",
            "ESC - Pause/Resume game",
            "M - Return to menu (when paused)",
            "",
            "OBJECTIVE:",
            "",
            "• Destroy incoming enemies",
            "• Avoid enemy collisions",
            "• Survive as long as possible",
            "• Achieve the highest score!",
            "",
            "SCORING:",
            "",
            "• +10 points per enemy destroyed",
            "• -10 health per enemy collision",
            "• Game over when health reaches 0"
        ]

        instructions.forEach((line, index) => {
            const y = this.game.height / 4 + index * 25
            if (line === "CONTROLS:" || line === "OBJECTIVE:" || line === "SCORING:") {
                ctx.fillStyle = "#646cff"
                ctx.font = "22px Arial"
            } else if (line.startsWith("•")) {
                ctx.fillStyle = "#ffffff"
                ctx.font = "18px Arial"
            } else {
                ctx.fillStyle = "#cccccc"
                ctx.font = "20px Arial"
            }
            ctx.fillText(line, this.game.width / 2, y)
        })

        // Draw back instruction
        ctx.fillStyle = "#888888"
        ctx.font = "16px Arial"
        ctx.fillText("Press ENTER or ESC to return to menu", this.game.width / 2, this.game.height - 30)
        
        // Reset text alignment
        ctx.textAlign = "left"
    }
}