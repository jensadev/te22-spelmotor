import Platform from "./Platform.js";

export default class Level {
  constructor(game) {
    this.game = game;
    this.worldWidth = 2000;
    this.worldHeight = 1000;
    this.start = { x: 100, y: 0 };
    this.end = { x: 1900, y: 0 };
    this.gravity = 0.5
    this.groundLevel = this.game.height - 50

    this.platforms = this.generatePlatforms();
  }

  generatePlatforms() {
    const platforms = []
    const platformDensity = 0.005 // Number of platforms per unit width
    const platformCount = Math.floor(this.worldWidth * platformDensity) // Adjust number of platforms based on world width

    for (let i = 0; i < platformCount; i++) {
      const x = Math.random() * (this.worldWidth - 100)
      const y = Math.random() * (this.groundLevel - 100) // Ensure platforms are above groundLevel
      const width = Math.random() * 100 + 100
      const height = 4
      const color = "#fff"
      platforms.push(new Platform(this.game, x, y, width, height, color))
    }

    // Sort platforms by y-coordinate in descending order
    platforms.sort((a, b) => a.y - b.y)

    return platforms
  }

}