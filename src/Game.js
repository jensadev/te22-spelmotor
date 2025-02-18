import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Level from "./Level.js"
import Userinterface from "./Userinterface.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.ui = new Userinterface(this)

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false

    this.player = new Player(this)

    this.level = new Level(this)
    this.level.generateLevel()

    this.currentRoom = this.level.getCurrentRoom()
  }

  update(deltaTime) {
    this.player.update(deltaTime)

    // Check for room transitions
    const currentRoom = this.level.getCurrentRoom()
    if (this.player.x < 0 && currentRoom.exits.west) {
      console.log("Changing room to the west")
      this.level.changeRoom(currentRoom.exits.west.id)
      this.player.x = this.width - this.player.width
    } else if (
      this.player.x + this.player.width > this.width &&
      currentRoom.exits.east
    ) {
      console.log("Changing room to the east")
      this.level.changeRoom(currentRoom.exits.east.id)
      this.player.x = 0
    } else if (this.player.y < 0 && currentRoom.exits.north) {
      console.log("Changing room to the north")
      this.level.changeRoom(currentRoom.exits.north.id)
      this.player.y = this.height - this.player.height
    } else if (
      this.player.y + this.player.height > this.height &&
      currentRoom.exits.south
    ) {
      console.log("Changing room to the south")
      this.level.changeRoom(currentRoom.exits.south.id)
      this.player.y = 0
    }

    // Prevent the player from moving outside the game boundaries
    if (this.player.x < 0) {
      this.player.x = 0
    }
    if (this.player.x + this.player.width > this.width) {
      this.player.x = this.width - this.player.width
    }
    if (this.player.y < 0) {
      this.player.y = 0
    }
    if (this.player.y + this.player.height > this.height) {
      this.player.y = this.height - this.player.height
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    this.level.draw(ctx)
    this.player.draw(ctx)
    this.ui.draw(ctx)
  }
}
