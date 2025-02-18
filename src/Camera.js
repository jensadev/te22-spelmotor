export default class Camera {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
  }

  update(deltaTime) {
    if (this.shakeDuration > 0) {
      this.shakeDuration -= deltaTime;
      this.x = (Math.random() - 0.5) * this.shakeIntensity;
      this.y = (Math.random() - 0.5) * this.shakeIntensity;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }

  applyTransformations(ctx) {
    ctx.setTransform(1, 0, 0, 1, this.x, this.y);
  }

  shake(duration, intensity) {
    this.shakeDuration = duration;
    this.shakeIntensity = intensity;
  }

  flash(ctx, color, duration) {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, this.game.width, this.game.height);
    setTimeout(() => {
      ctx.globalAlpha = 1;
    }, duration);
  }
}