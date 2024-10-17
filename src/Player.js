import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(0, 0, 50, 50, "#fff", 10)
    this.game = game

    this.image = new Image()
    this.image.src = "./src/assets/AnimationSheet_Character.png"

    this.targetX = this.x;
    this.targetY = this.y;

    this.frameWidth = 32
    this.frameHeight = 32
    this.frameX = 0
    this.frameY = 0

    this.maxFrame = 2
    this.fps = 10
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(deltaTime) {
    // Update target positions based on arrow keys
    if (this.game.keys.has("ArrowLeft")) {
      this.targetX -= this.speed;
    } else if (this.game.keys.has("ArrowRight")) {
      this.targetX += this.speed;
    }

    if (this.game.keys.has("ArrowUp")) {
      this.targetY -= this.speed;
    } else if (this.game.keys.has("ArrowDown")) {
      this.targetY += this.speed;
    }


    // Apply tweening
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }

    if (Math.abs(this.targetX - this.x) > 0.5 || Math.abs(this.targetY - this.y) > 0.5) {
      this.frameY = 3;
    } else {
      this.frameY = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.frameX * this.frameWidth, this.frameY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)
  }
}
