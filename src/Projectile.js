import GameObject from "./GameObject"

export default class Projectile extends GameObject {
  constructor(game, x, y, angle, distance) {
    super(game, x, y, 5, 5, "red")
    this.speed = 10
    this.angle = angle
    this.distance = distance
    this.traveledDistance = 0

    this.markedForDeletion = false
  }

  update(deltaTime) {
    const deltaX = Math.cos(this.angle) * this.speed
    const deltaY = Math.sin(this.angle) * this.speed

    this.x += deltaX
    this.y += deltaY
    this.traveledDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (
      this.x < 0 ||
      this.x > this.game.width ||
      this.y < 0 ||
      this.y > this.game.height ||
      this.traveledDistance >= this.distance
    ) {
      this.markedForDeletion = true
    }
  }
}
