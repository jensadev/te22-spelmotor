export default class Room {
  constructor(id, color) {
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
}
