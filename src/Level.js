export default class Level {
  constructor(name) {
    this.name = name
    this.rooms = []
    this.currentRoom = null
  }

  addRoom(room) {
    this.rooms.push(room)
  }

  changeRoom(roomId) {
    console.log(roomId)
    const newRoom = this.rooms.find(room => room.id === roomId);
    if (newRoom) {
      this.currentRoom = newRoom
    }
  }

  getRoom(roomId) {
    return this.rooms.find(room => room.id === roomId)
  }

  getCurrentRoom() {
    return this.currentRoom
  }

  checkRoomTransition(player) {
    if (player.x <= 0 && this.currentRoom.exits.west) {
      this.changeRoom(this.currentRoom.exits.west.id)
    } else if (player.x + player.width >= this.width && this.currentRoom.exits.east) {
      this.changeRoom(this.currentRoom.exits.east.id)
    } else if (player.y <= 0 && this.currentRoom.exits.north) {
      this.changeRoom(this.currentRoom.exits.north.id)
    } else if (this.currentRoom.exits.south) {
      this.changeRoom(this.currentRoom.exits.south.id)
    }
    player.x = this.width / 2 - player.width / 2
    player.y = this.height / 2 - player.height / 2
  }
}