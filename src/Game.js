import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import LevelManager from "./LevelManager.js"
import Userinterface from "./Userinterface.js"
import Camera from "./Camera.js"

export default class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height

    this.ui = new Userinterface(this)

    this.input = new InputHandler(this)

    this.debug = false

    this.player = new Player(this)

    this.camera = new Camera(this)

    this.levelManager = new LevelManager(this)
    this.levelManager.loadLevel(0)
    this.projectiles = []
  }

  update(deltaTime) {
    this.player.update(deltaTime)
    this.projectiles.forEach((projectile) => projectile.update(deltaTime))
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion,
    )
    this.camera.update(deltaTime)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    this.camera.applyTransformations(ctx)
    this.levelManager.draw(ctx)
    this.player.draw(ctx)
    this.projectiles.forEach((projectile) => projectile.draw(ctx))
    this.ui.draw(ctx)
    this.camera.draw(ctx) // Ensure the camera's draw method is called last
  }

  clearProjectiles() {
    this.projectiles = []
  }
}
