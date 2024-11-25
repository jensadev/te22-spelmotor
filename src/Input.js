export default class Input {
  constructor(game) {
    this.game = game
    this.keys = new Set()
    this.playing = false

    window.addEventListener("keydown", (event) => {
      console.log(event.key)
      this.keys.add(event.key)
      if (event.key === "p") {
        this.game.debug = !this.game.debug
        console.log("Debug mode:", this.game.debug)
      }

      if (event && this.playing === false) {
        this.game.audio.playSound("race")
        this.playing = true
      }
    })

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key)
    })
  }
}