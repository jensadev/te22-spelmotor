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
    this.player = new Player(this, this.width / 2 - 32, this.height - 100, 32, 32)
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
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
    })
    if (Math.random() < 0.06) {
      console.log("Spawn enemy")
      this.enemies.push(
        new Enemy(
          this,
          Math.random() * (this.width - 32),
          0,
          32,
          32
        )
      )
    }

    this.projectiles.forEach((projectile) => {
      this.enemies.forEach((enemy) => {
        if (
          projectile.x < enemy.x + enemy.width &&
          projectile.x + projectile.width > enemy.x &&
          projectile.y < enemy.y + enemy.height &&
          projectile.y + projectile.height > enemy.y
        ) {
          this.score += 10
          this.projectiles = this.projectiles.filter(
            (p) => p !== projectile
          )
          this.enemies = this.enemies.filter(
            (e) => e !== enemy
          )
        }
      })
    })

    this.enemies.forEach((enemy) => {
      if (
        this.player.x < enemy.x + enemy.width &&
        this.player.x + this.player.width > enemy.x &&
        this.player.y < enemy.y + enemy.height &&
        this.player.y + this.player.height > enemy.y
      ) {
        this.player.takeDamage(10)
        this.enemies = this.enemies.filter(
          (e) => e !== enemy
        )
      }
    })
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
}
