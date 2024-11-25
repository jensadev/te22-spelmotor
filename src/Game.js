import GameObject from "./GameObject.js"
import Input from "./Input.js"
import Player from "./Player.js"
import Enemy from "./Enemy.js"
import UserInterface from "./UserInterface.js"
import Powerup from "./Powerup.js"
import Audio from "./Audio.js"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new Input(this)
    this.player = new Player(
      this,
      this.width / 2 - 32,
      this.height - 100,
      32,
      32,
    )
    this.projectiles = []
    this.enemies = []
    this.powerups = []
    this.audio = new Audio()
    this.audio.loadSound("race", "./src/assets/sounds/Race to Mars.mp3")

    this.ui = new UserInterface(this)
    this.score = 0
    this.elapsedTime = 0

    this.gameOver = false
    this.debug = false
  }

  update(deltaTime) {
    if (this.gameOver) {
      return
    }

    this.elapsedTime += deltaTime / 1000
    this.ui.update(deltaTime)

    this.powerups.forEach((powerup) => {
      powerup.update(deltaTime)
      if (this.checkCollision(powerup, this.player)) {
        if (this.player.shotLevel < 4) {
          this.player.shotLevel++
        }
        this.player.shotDecayTimer -= 2000
        powerup.markedForDeletion = true
      }
    })

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
          if (Math.random() < 0.1) {
            this.powerups.push(new Powerup(this, enemy.x, enemy.y, 32, 32))
          }
        }
      })
    })
    this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
    this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
    this.powerups = this.powerups.filter((p) => !p.markedForDeletion)
  }

  draw(ctx) {
    this.player.draw(ctx)
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx)
    })
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx)
    })
    this.powerups.forEach((powerup) => {
      powerup.draw(ctx)
    })
    this.ui.draw(ctx)
  }

  // takes object a and b, checks for overlaps, returns true if collision
  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    )
  }
}
