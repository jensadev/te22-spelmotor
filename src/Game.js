import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import Background from "./Background.js"
import Obstacle from "./Obstacle.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.background = new Background(this)
    this.speed = 8

    this.keys = new Set()
    new InputHandler(this)

    this.debug = false

    this.player = new Player(this)

    this.groundHeight = 80
    this.gravity = 0.5

    this.gameObjects = [
    ]

    this.gameOver = false
    this.gameTimer = 0
    this.enemyTimer = 0
    this.enemyInterval = Math.random() * 3000
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }
    this.gameTimer += deltaTime
    this.background.update(deltaTime)
    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime)
    })

    this.player.update(deltaTime)

    if (this.enemyTimer > this.enemyInterval) {
      this.gameObjects.push(new Obstacle(this, this.width, this.height - this.groundHeight - 60, 60, 40))
      this.enemyTimer = 0
      this.enemyInterval = Math.random() * (5000 - this.gameTimer / 100)
    } else {
      this.enemyTimer += deltaTime
    }

    this.gameObjects = this.gameObjects.filter(gameObject => !gameObject.markForDeletion)
  }

  draw(ctx) {
    this.background.draw(ctx)
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
      this.gameOver = this.checkCollision(this.player, gameObject) 
    })

    this.player.draw(ctx)
    this.background.backgroundLayers[3].draw(ctx)
  }

    checkCollision(player, obstacle) {
    let topOfObstacle = obstacle.y
    let bottomOfObstacle = obstacle.y + obstacle.height
    let leftSideOfObstacle = obstacle.x
    let rightSideOfObstacle = obstacle.x + obstacle.width

    let topOfPlayer = player.y
    let bottomOfPlayer = player.y + player.height
    let leftSideOfPlayer = player.x
    let rightSideOfPlayer = player.x + player.width

    if (
      bottomOfPlayer >= topOfObstacle &&
      topOfPlayer <= bottomOfObstacle &&
      rightSideOfPlayer >= leftSideOfObstacle &&
      leftSideOfPlayer <= rightSideOfObstacle
    ) {
      return true
    }
  }
}
