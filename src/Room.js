export default class Room {
  constructor(game, id, color) {
    this.game = game
    this.width = game.width
    this.height = game.height
    this.color = color
    this.border = 32

    this.id = id

    this.exits = {
      north: false,
      south: false,
      east: false,
      west: false
    }
  }

  addExit(direction, room) {
    this.exits[direction] = room
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(
      this.border,
      this.border,
      this.width - this.border * 2,
      this.height - this.border * 2)
  }
}
