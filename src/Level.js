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
    const room5 = new Room(this.game, 4, "brown")
    const room6 = new Room(this.game, 5, "pink")
    const room7 = new Room(this.game, 6, "teal")

    room1.addExit('north', room2)
    room2.addExit('south', room1)
    room2.addExit('east', room3)
    room2.addExit('west', room6)
    room3.addExit('west', room2)
    room3.addExit('north', room4)
    room4.addExit('south', room3)
    room4.addExit('east', room5)
    room4.addExit('north', room7)
    room5.addExit('west', room4)
    room6.addExit('east', room2)
    room7.addExit('south', room4)

    this.addRoom(room1)
    this.addRoom(room2)
    this.addRoom(room3)
    this.addRoom(room4)
    this.addRoom(room5)
    this.addRoom(room6)
    this.addRoom(room7)

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