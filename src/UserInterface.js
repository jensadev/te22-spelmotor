export default class UserInterface {
  constructor(game) {
    this.game = game
  }

  draw(ctx) {
    if (this.game.debug) {
      // Draw player position and velocity
      ctx.fillStyle = "white"
      ctx.fillText(
        `Player Position: (${Math.round(this.game.player.x)}, ${Math.round(
          this.game.player.y,
        )})`,
        this.game.camera.x + 10,
        this.game.camera.y + 20,
      )
      ctx.fillText(
        `Player Velocity: (${Math.round(this.game.player.velocityY)})`,
        this.game.camera.x + 10,
        this.game.camera.y + 40,
      )
    }
  }
}
