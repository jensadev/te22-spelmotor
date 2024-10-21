# Spelmotor

## Bakgrundsbilder

De flesta spel använder någon form av bakgrundsbild. Det kan vara en enkel färg, en bild eller en animation. Hittills har vi använt en enkel färg som bakgrund. Nu ska vi lära oss att använda en bild som bakgrund.

Bilder som bakgrunder ger oss också möjlighet att skapa illusioner av rörelse och djup. Vi kan till exempel skapa en bild av en väg som rör sig från höger till vänster och använda den som bakgrund. Det ger oss en illusion av att bilen rör sig framåt. Vi kan också skapa bilder i flera lager som rör sig i olika hastigheter för att skapa en illusion av djup.

### Ladda en bakgrund

För att förbereda oss för att kunna skapa flera lager i bakgrunden så kommer vi att dela upp det i två klasser, bakgrund och lager.

Vi kommer att skapa `Background.js` klassen för att ladda in bilderna och från den skapa varje enskilt lager. Det är lagret som sedan används för att uppdatera och rita ut bilden.

`src/Background.js`
```javascript
export default class Background {
  constructor(game) {
    this.game = game
    this.width = 1708 // this.game.width * 2
    this.height = 480 // this.game.height

    this.backgroundLayers = [
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
```

Varje lager i `Background` klassen kommer att skapas med `Layer` klassen. `Layer` klassen kommer att innehålla information om bredd, höjd, hastighet och bild för varje lager.

`src/Layer.js`
```javascript
export default class Layer {
  constructor(game, width, height, speed, image) {
    this.game = game
    this.width = width
    this.height = height
    this.speed = speed
    this.image = image
    this.x = 0
    this.y = 0
  }

  update(deltaTime) {
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x -= this.game.speed * this.speed
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}
```

### Förklaring

- `Background` klassen innehåller en array `backgroundLayers` som innehåller alla lager.

- `Layer` klassen innehåller information om bredd, höjd, hastighet och bild för varje lager.

- `update` funktionen uppdaterar positionen för varje lager.

- `draw` funktionen ritar ut lagret. Vi ritar ut bilden två gånger med en offset på bredden för att skapa en illusion av en oändlig bakgrund.

### Använda bakgrundsbilder

För att använda bakgrundsbilderna vi skapat så behöver vi slutligen uppdatera `Game` klassen. Vi sätter `speed` parametern för att kunna styra hastigheten på bakgrundsbilderna.

`src/Game.js`
```javascript
import Background from './Background.js'

export default class Game {
  constructor() {
    ...
    this.background = new Background(this)
    this.speed = 1
    ...
  }

  update(deltaTime) {
    this.background.update(deltaTime)
    ...
  }

  draw(ctx) {
    this.background.draw(ctx)
    ...
  }
}
```

Testkör spelet och se att bakgrundsbilderna rör sig från höger till vänster.
Vi kan nu sätta spelarens position till marklagret, för att ge en illusion av att spelaren rör sig på marken.

I Player.js så sätt `super(game, 0, 300, 128, 128, "#fff", 5)` för att sätta spelarens position till marklagret.
När du nu kör spelet igen så kommer du se att spelaren ritas framför bakgrundsbilderna. Det är för att vi uppdaterar alla lager i bakgrunden innan vi ritar ut spelaren. Men vi kan inte rita ut spelaren innan vi ritar ut bakgrundsbilderna, för då kommer spelaren att ritas över bakgrundsbilderna.

Lösningen är att manuellt rita ut det lager som är framför spelaren, efter spelaren i `Game` klassens `draw` funktion.

`src/Game.js`
```javascript
  draw(ctx) {
    this.background.draw(ctx)
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx)
    })

    this.player.draw(ctx)
    this.background.backgroundLayers[3].draw(ctx)
  }
```

Nu kommer spelaren att ritas framför bakgrundsbilderna.

### Uppgift

Nu kan du skapa en klassisk sidescroller, testa att ändra spelarens position och bakgrundsbildernas hastighet för att skapa olika illusioner.