export default class GameObject {
  constructor(game, x, y, width, height, color) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)

    if (this.game.debug) {
        // Draw bounding box around the object
        ctx.strokeStyle = "red"
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}