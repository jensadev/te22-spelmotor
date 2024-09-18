import GameObject from "./GameObject.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameObjects = [
      new GameObject(0, 100, 20, 20, '#f00', 100),
      new GameObject(0, 200, 20, 20, '#0f0', 200),
      new GameObject(0, 300, 20, 20, '#00f', 300)
    ]
  }

  update(deltaTime) {
    this.gameObjects.forEach(gameObject => {
      gameObject.x = gameObject.x + gameObject.speed / 1000 * deltaTime * gameObject.direction
      if (gameObject.x > this.width) gameObject.direction = -1
      if (gameObject.x < 0) gameObject.direction = 1
    })
  }

  draw(ctx) {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
    })
  }
}
