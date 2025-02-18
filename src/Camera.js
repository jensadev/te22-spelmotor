export default class Camera {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.flashDuration = 0;
    this.flashColor = '';
    this.flashIntensity = 0;
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

    if (this.flashDuration > 0) {
      this.flashDuration -= deltaTime;
    }
  }

  applyTransformations(ctx) {
    ctx.setTransform(1, 0, 0, 1, this.x, this.y);
  }

  shake(duration, intensity) {
    this.shakeDuration = duration;
    this.shakeIntensity = intensity;
  }

  flash(color, duration, intensity = 0.5) {
    this.flashColor = color;
    this.flashDuration = duration;
    this.flashIntensity = intensity;
  }

  draw(ctx) {
    if (this.flashDuration > 0) {
      ctx.fillStyle = this.flashColor;
      ctx.globalAlpha = this.flashIntensity;
      ctx.fillRect(0, 0, this.game.width, this.game.height);
      ctx.globalAlpha = 1; // Reset alpha to default
    }
  }
}