import GameObject from "./GameObject.js";

export default class Platform extends GameObject {
  constructor(game, x, y, width, height, color) {
    super(game, x, y, width, height, color);
    this.game = game
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height)
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1, '#333') // Change 'white' to any other color if needed
    ctx.fillStyle = gradient
    ctx.fillRect(this.x, this.y, this.width, this.game.level.worldHeight - this.y)
  }
}