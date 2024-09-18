export default class GameObject {
  constructor(x, y, width, height, color, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.speed = speed
    this.direction = 1
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}