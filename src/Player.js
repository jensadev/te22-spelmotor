import GameObject from './GameObject'

export default class Player extends GameObject {
  constructor(game) {
    super(0, 0, 50, 50, '#fff', 10)
    this.game = game
    this.speedX = 0
    this.maxSpeed = 5
  }

  update(deltaTime) {
    let newX = this.x
 
    if (this.game.keys.has("ArrowLeft")) {
      newX = newX - this.speed
    }
    if (this.game.keys.has("ArrowRight")) {
      newX = newX + this.speed
    }

    this.x += newX

    console.log(this.x)
  }


}