export default class InputHandler {
  constructor(game) {
    this.game = game
    this.keys = new Set()
    this.mouseX = 0
    this.mouseY = 0

    window.addEventListener("keydown", (event) => {
      console.log(event.key)
      this.keys.add(event.key)

      if (event.key === "o") {
        this.game.debug = !this.game.debug
      }
    })
    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key)
    })

    window.addEventListener("mousemove", (event) => {
      const canvasRect = this.game.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - canvasRect.left;
      this.mouseY = event.clientY - canvasRect.top;
    });

    window.addEventListener("mousedown", (event) => {
      this.keys.add("mouse" + event.button)
    })

    window.addEventListener("mouseup", (event) => {
      this.keys.delete("mouse" + event.button)
    })
  }
}
