import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Level from "./Level.js"
import Userinterface from "./Userinterface.js"

export default class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height

    this.ui = new Userinterface(this)

    this.input = new InputHandler(this)

    this.debug = false

    this.player = new Player(this)

    this.level = new Level(this)
    this.level.generateLevel()

    this.currentRoom = this.level.getCurrentRoom()
  }

  update(deltaTime) {
    this.player.update(deltaTime)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    this.level.draw(ctx)
    this.player.draw(ctx)
    this.ui.draw(ctx)
  }
}
