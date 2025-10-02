import Scene from "../scene.js"

export default class Menu extends Scene {
    constructor(game) {
        super(game)
        this.selectedOption = 0
        this.menuOptions = ["Start Game", "Instructions", "Quit"]
        this.keyPressed = false
    }

    update(deltaTime) {
        // Handle menu navigation
        if (this.game.input.keys.has("ArrowUp") && !this.keyPressed) {
            this.selectedOption = Math.max(0, this.selectedOption - 1)
            this.keyPressed = true
        } else if (this.game.input.keys.has("ArrowDown") && !this.keyPressed) {
            this.selectedOption = Math.min(this.menuOptions.length - 1, this.selectedOption + 1)
            this.keyPressed = true
        } else if (this.game.input.keys.has("Enter") && !this.keyPressed) {
            this.selectOption()
            this.keyPressed = true
        } else if (!this.game.input.keys.has("ArrowUp") && 
                   !this.game.input.keys.has("ArrowDown") && 
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
        ctx.font = "48px Arial"
        ctx.textAlign = "center"
        ctx.fillText("SPACE SHOOTER", this.game.width / 2, this.game.height / 4)

        // Draw menu options
        ctx.font = "24px Arial"
        this.menuOptions.forEach((option, index) => {
            const y = this.game.height / 2 + index * 50
            
            // Highlight selected option
            if (index === this.selectedOption) {
                ctx.fillStyle = "#646cff"
                ctx.fillRect(this.game.width / 2 - 120, y - 30, 240, 40)
                ctx.fillStyle = "#ffffff"
            } else {
                ctx.fillStyle = "#cccccc"
            }
            
            ctx.fillText(option, this.game.width / 2, y)
        })

        // Draw instructions
        ctx.fillStyle = "#888888"
        ctx.font = "16px Arial"
        ctx.fillText("Use Arrow Keys to navigate, Enter to select", this.game.width / 2, this.game.height - 50)
        
        // Reset text alignment
        ctx.textAlign = "left"
    }

    selectOption() {
        switch (this.selectedOption) {
            case 0: // Start Game
                this.game.sceneManager.changeScene("levelOne")
                break
            case 1: // Instructions
                // TODO: Add instructions scene
                console.log("Instructions not implemented yet")
                break
            case 2: // Quit
                console.log("Quit game")
                // In a real game, this might close the window or return to a main screen
                break
        }
    }
}