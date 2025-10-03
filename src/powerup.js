import GameObject from "./game-object.js"

export default class Powerup extends GameObject {
    constructor(game, x, y, width, height) {
        super(x, y, width, height)
        this.game = game
        this.color = "green"
        this.speedY = 0.2 + Math.random() * 2
        this.markedForDeletion = false
        this.types = ["health", "ammo"]
        // this.setType()
    }

    update(deltaTime) {
        this.y += this.speedY
        if (this.y > this.game.height) {
            this.markedForDeletion = true
        }
    }

    setType() {
        const randomIndex = Math.floor(Math.random() * this.types.length)
        this.type = this.types[randomIndex]
        switch (this.type) {
            case "health":
                this.color = "green"
                break
            case "ammo":
                this.color = "yellow"
                break
            default:
                this.color = "green"
        }
    }
}