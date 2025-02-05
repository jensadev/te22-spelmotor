
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Camera from "./Camera.js"
import UserInterface from "./UserInterface.js"
import Level from "./Level.js"
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false
    
    this.level = new Level(this);
    this.player = new Player(this, this.level.start.x, this.level.start.y)

    this.camera = new Camera(
      this,
      0,
      0,
      this.width,
      this.height,
      this.level.worldWidth,
      this.level.worldHeight,
    )

    this.userInterface = new UserInterface(this)
  }

  update(deltaTime) {
    this.player.update(deltaTime)
    this.level.platforms.forEach((platform) => {
      if (this.checkCollisions(this.player, platform)) {
        // Check if the player is falling
        if (this.player.velocityY > 0) {
          // Collision from above
          this.player.y = platform.y - this.player.height
          this.player.velocityY = 0
          this.player.grounded = true
        } else if (this.player.velocityY < 0) {
          // Collision from below
          this.player.y = platform.y + platform.height
          this.player.velocityY = 0
        }
      }
    })
    this.camera.follow(this.player)
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.save()
    this.camera.apply(ctx)

    this.level.platforms.forEach((platform) => platform.draw(ctx))
    this.player.draw(ctx)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, this.level.groundLevel)
    ctx.lineTo(this.level.worldWidth, this.level.groundLevel)
    ctx.stroke()

    this.camera.draw(ctx)
    this.userInterface.draw(ctx)
    ctx.restore()
  }

  checkCollisions(objectA, objectB) {
    if (
      objectA.x < objectB.x + objectB.width &&
      objectA.x + objectA.width > objectB.x &&
      objectA.y < objectB.y + objectB.height &&
      objectA.y + objectA.height > objectB.y
    ) {
      return true
    } else {
      return false
    }
  }
}
