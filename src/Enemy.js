import GameObject from './GameObject'

export default class Enemy extends GameObject {
  constructor(game, x, y, width, height, color, speed) {
    super(game, x, y, width, height, color)
    this.speed = speed
  }

  update(deltaTime) {
    this.x -= this.speed
  }
}