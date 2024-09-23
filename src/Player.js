import GameObject from './GameObject'

export default class Player extends GameObject {
  constructor(game) {
    super(0, 0, 50, 50, '#fff', 10)
    this.game = game
    this.speed = 5
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.x -= this.speed
    } else if (this.game.keys.has("ArrowRight")) {
      this.x += this.speed
    }

    console.log(this.x)
  }
}