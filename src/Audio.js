export default class Audio {
  constructor() {
    this.sounds = {}
  }

  loadSound(name, src) {
    const sound = new Audio()
    sound.src = src
    this.sounds[name] = sound
  }

  playSound(name) {
    const sound = this.sounds[name]
    sound.currentTime = 0
    sound.play()
  }
}