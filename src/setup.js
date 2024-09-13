export function setup(canvas) {
  const ctx = canvas.getContext('2d') // Skapar en 2d-kontext för att rita på canvas
  // 16:9 aspect ratio
  canvas.width = 854 // sätt bredden på canvas
  canvas.height = 480 // sätt höjden på canvas
}