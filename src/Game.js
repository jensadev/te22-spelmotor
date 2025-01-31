import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Camera from "./Camera.js"
import UserInterface from "./UserInterface.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.worldWidth = 2000
    this.worldHeight = 1000

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false
    this.gravity = 0.5
    this.groundLevel = this.height - 50

    this.player = new Player(this, 100, 0)

    this.camera = new Camera(
      this,
      0,
      0,
      this.width,
      this.height,
      this.worldWidth,
      this.worldHeight,
    )

    this.userInterface = new UserInterface(this)
  }

  update(deltaTime) {
    this.player.update(deltaTime)
    this.camera.follow(this.player)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save()
    this.camera.apply(ctx)

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, this.groundLevel);
    ctx.lineTo(this.worldWidth, this.groundLevel);
    ctx.stroke();

    this.player.draw(ctx)
    this.camera.draw(ctx)
    this.userInterface.draw(ctx)
    ctx.restore()
  }
}
