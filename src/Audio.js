export default class Audio {
  constructor() {
    this.sounds = {}
  }

  loadSound(name, src) {
    const sound = new window.Audio()
    sound.src = src
    this.sounds[name] = sound

    console.log(this.sounds)
  }

  playSound(name) {
    console.log(this.sounds)
    const sound = this.sounds[name]
    sound.currentTime = 0
    sound.play()
  }
}