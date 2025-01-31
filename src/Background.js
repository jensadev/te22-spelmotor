export default class Background {
  constructor(game) {
    this.game = game

    this.image = new Image()
    this.image.src = "assets/background.png"
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.game.width, this.game.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, this.game.width, this.game.height)
  }
}