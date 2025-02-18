import Room from './Room.js'

export default class Level {
  constructor(game) {
    this.game = game
    this.rooms = []
    this.currentRoom = null
  }

  generateLevel() {
    const room1 = new Room(this.game, 0, "purple")
    const room2 = new Room(this.game, 1, "blue")
    const room3 = new Room(this.game, 2, "green")
    const room4 = new Room(this.game, 3, "red")

    room1.addExit('north', room2)
    room2.addExit('south', room1)
    room2.addExit('east', room3)
    room3.addExit('west', room2)
    room3.addExit('north', room4)
    room4.addExit('south', room3)

    this.addRoom(room1)
    this.addRoom(room2)
    this.addRoom(room3)
    this.addRoom(room4)

    this.currentRoom = room1
  }

  addRoom(room) {
    this.rooms.push(room)
  }

  draw(ctx) {
    this.currentRoom.draw(ctx)
  }

  changeRoom(roomId) {
    const newRoom = this.rooms.find(room => room.id === roomId);
    if (newRoom) {
      this.currentRoom = newRoom;
    }
  }

  getRoom(roomId) {
    return this.rooms.find(room => room.id === roomId)
  }

  getCurrentRoom() {
    return this.currentRoom
  }
}