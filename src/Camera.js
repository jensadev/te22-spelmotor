export default class Camera {
  constructor(game, x, y, width, height) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.shakeDuration = 0
    this.shakeIntensity = 0

    this.smoothing = 0.1
  }

  follow(gameObject) {
    // center on the gameObject
    const targetX = gameObject.x - this.width / 2
    const targetY = gameObject.y - this.height / 2

    // Interpolate towards the target position
    this.x += (targetX - this.x) * this.smoothing
    this.y += (targetY - this.y) * this.smoothing

    // Clamp the camera position to the game world boundaries
    if (this.x < 0) this.x = 0
    if (this.y < 0) this.y = 0
    if (this.x + this.width > this.game.worldWidth) this.x = this.game.worldWidth - this.width
    if (this.y + this.height > this.game.worldHeight) this.y = this.game.worldHeight - this.height

    /*
    Math.max(0, this.x): Ensures the camera's x position doesn't go below 0, which is the left boundary of the game world.
    Math.min(this.x, this.worldWidth - this.width): Ensures the camera's x position doesn't go beyond the right boundary of the game world.
    Math.max(0, this.y): Ensures the camera's y position doesn't go below 0, which is the top boundary of the game world.
    Math.min(this.y, this.worldHeight - this.height): Ensures the camera's y position doesn't go beyond the bottom boundary of the game world.
    */

    if (this.shakeDuration > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity
      this.x += shakeX
      this.y += shakeY
      this.shakeDuration--
    }
  }

  shake(duration, intensity) {
    this.shakeDuration = duration
    this.shakeIntensity = intensity
  }

  apply(ctx) {
    // ctx.setTransform(1, 0, 0, 1, -this.x, -this.y)
    // Reset the transformation matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    // Apply the camera transformation
    ctx.translate(-this.x, -this.y)
  }

  draw(ctx) {
    if (!this.game.debug) {
      return
    }
    // Draw camera viewport
    // ctx.strokeStyle = "green"
    // ctx.strokeRect(
    //   this.camera.x,
    //   this.camera.y,
    //   this.camera.width,
    //   this.camera.height,
    // )

    // Draw grid overlay
    ctx.strokeStyle = "lightgray"
    for (let x = 0; x < this.game.worldWidth; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, this.game.worldHeight)
      ctx.stroke()
    }
    for (let y = 0; y < this.game.worldHeight; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.game.worldWidth, y)
      ctx.stroke()
    }
  }
}
