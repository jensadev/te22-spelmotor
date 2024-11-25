import GameObject from "./GameObject.js"
import Input from "./Input.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import UserInterface from "./UserInterface.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new Input()
    this.player = new Player(
      this,
      this.width / 2 - 32,
      this.height - 100,
      32,
      32,
    )
    this.projectiles = []
    this.enemies = []

    this.ui = new UserInterface(this)
    this.score = 0
    this.elapsedTime = 0

    this.gameOver = false
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }

    this.elapsedTime += deltaTime / 1000
    this.ui.update(deltaTime)

    this.player.update(deltaTime)
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    if (Math.random() < 0.06) {
      console.log("Spawn enemy")
      this.enemies.push(
        new Enemy(this, Math.random() * (this.width - 32), 0, 32, 32),
      )
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(enemy, this.player)) {
        this.player.takeDamage(10)
        enemy.markedForDeletion = true
      }
    })

    this.projectiles.forEach((projectile) => {
      this.enemies.forEach((enemy) => {
        if (this.checkCollision(projectile, enemy)) {
          this.score += 10
          projectile.markedForDeletion = true
          enemy.markedForDeletion = true
        }
      })
    })
    this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
    this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
  }

  draw(ctx) {
    this.player.draw(ctx)
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx)
    })
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx)
    })
    this.ui.draw(ctx)
  }

  // takes object a and b, checks for overlaps, returns true if collision
  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
  }
}
