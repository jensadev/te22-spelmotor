import Layer from './Layer'

export default class Background {
  constructor(game) {
    this.game = game
    this.width = 256
    this.height = 224

    this.bg1 = new Image()
    this.bg1.src = "./src/assets/backgrounds/Enjl-Starry Space Background/background_1.png"
    this.bg2 = new Image()
    this.bg2.src = "./src/assets/backgrounds/Enjl-Starry Space Background/background_2.png"
    this.bg3 = new Image()
    this.bg3.src = "./src/assets/backgrounds/Enjl-Starry Space Background/background_3.png"
    this.bg4 = new Image()
    this.bg4.src = "./src/assets/backgrounds/Enjl-Starry Space Background/background_4.png"

    this.backgroundLayers = [
      new Layer(this.game, this.width, this.height, 0.1, this.bg1),
      new Layer(this.game, this.width, this.height, 0.2, this.bg2),
      new Layer(this.game, this.width, this.height, 0.5, this.bg3),
      new Layer(this.game, this.width, this.height, 1, this.bg4)
    ]
  }

  update(deltaTime) {
    this.backgroundLayers.forEach(layer => {
      layer.update(deltaTime)
    })
  }

  draw(ctx) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(ctx)
    })
  }
}