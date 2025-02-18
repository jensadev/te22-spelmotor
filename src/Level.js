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
}