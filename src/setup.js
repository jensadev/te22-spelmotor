import Game from './game.js'

export function setup(canvas) {
  const ctx = canvas.getContext('2d') // Skapar en 2d-kontext för att rita på canvas
  // 16:9 aspect ratio
  canvas.width = 854 / 2 // sätt bredden på canvas
  canvas.height = 480 // sätt höjden på canvas

  const gameInstance = new Game(canvas.width, canvas.height)
  let lastTime = 0

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gameInstance.update(deltaTime)
    gameInstance.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate(0)
}