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
      west: false,
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
      this.height - this.border * 2,
    )
  }

  checkRoomTransition(player) {
    if (player.x <= 0 && this.exits.west) {
      this.game.level.changeRoom(this.exits.west.id)
      player.x = this.game.width - player.width
    } else if (player.x + player.width >= this.game.width && this.exits.east) {
      this.game.level.changeRoom(this.exits.east.id)
      player.x = 0
    } else if (player.y <= 0 && this.exits.north) {
      this.game.level.changeRoom(this.exits.north.id)
      player.y = this.game.height - player.height
    } else if (
      player.y + player.height >= this.game.height &&
      this.exits.south
    ) {
      this.game.level.changeRoom(this.exits.south.id)
      player.y = 0
    }
  }
}
