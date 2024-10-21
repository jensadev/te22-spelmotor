import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Background from "./Background.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.background = new Background(this)
    this.speed = 1

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false

    this.player = new Player(this)


    this.gameObjects = [
      new GameObject(this, 0, 100, 20, 20, '#f00', 100),
      new GameObject(this, 0, 200, 20, 20, '#0f0', 200),
      new GameObject(this, 0, 300, 20, 20, '#00f', 300)
    ]
  }

  update(deltaTime) {
    this.background.update(deltaTime)
    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime)
    })

    this.player.update(deltaTime)
  }

  draw(ctx) {
    this.background.draw(ctx)
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
    })

    this.player.draw(ctx)
    this.background.backgroundLayers[3].draw(ctx)
  }
}
