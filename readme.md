# Spelmotor

## Nästa steg

I nästa steg kommer vi att lägga till en spelare som kan styras med piltangenterna. Vi kommer att göra det genom att skapa en `Player`-klass som hanterar spelaren och en `Input`-klass som hanterar input från tangentbordet.

För att hålla dessa steg separata så kommer vi att skapa en ny branch för nästa steg. `player-input`.

## Spelare och input

För att skapa en spelare så kommer vi att bygga vidare på `GameObject` och ärva från den klassen. Vi kommer att skapa en ny fil `Player.js` i `src`-mappen och lägga till följande kod.

`src/Player.js`
```javascript
import GameObject from './GameObject.js'

export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 50, 50, '#fff', 5)
  }
  update(deltaTime) {

  }
}
```

I constructorn så använder vi `super` för att skicka med parametrar till `GameObject`. Vi skickar med `x`, `y`, `width`, `height`, `color` och `speed`. Vi sätter sedan `speed` till 5 och sparar en referens till `game`.

Vi skapar även en metod `update` som vi kommer att använda för att uppdatera spelaren.

Vi kan nu använda `Player` i `Game` för att skapa en spelare.

`src/Game.js`
```javascript
import Player from "./Player.js"
export default class Game {
  constructor(width, height) {
    ...
    this.player = new Player(this)
  }
  update(deltaTime) {
    ...
    this.player.update(deltaTime)
  }

  draw(ctx) {
    ...
    this.player.draw(ctx)
  }
```

Vi har nu skapat en spelar-klass som vi kan använda för att rita och uppdatera spelaren. Uppdateringsmetoden och draw metoden körs från `Game`-klassen. Här kan du även se hur vi använder `GameObject` som en superklass till `Player`, vi behöver inte skriva om draw metoden för att rita spelaren, utan vi använder den metoden som redan finns i `GameObject`.

Om du spara filerna så bör en vit fyrkant dyka upp på canvasen. Nästa steg är att flytta spelaren med piltangenterna.

## InputHandler

För att hantera input från tangentbordet så kommer vi att skapa en klass `InputHandler`. Vi kommer att använda `addEventListener` för att lyssna på `keydown` och `keyup` för att hantera input. Vi kommer att spara de tangenter som är nedtryckta i ett set och använda det i `Player` för att flytta spelaren.

Ett set är en samling av unika värden. För att lägga till ett värde i ett set så använder vi `add` och för att ta bort ett värde så använder vi `delete`.

Skapa `InputHandler.js` i `src`-mappen och lägg till följande kod.

`src/InputHandler.js`
```javascript
export default class InputHandler {
  constructor(game) {
    this.game = game
    window.addEventListener('keydown', (event) => {
      this.game.keys.add(event.key)
    })
    window.addEventListener('keyup', (event) => {
      this.game.keys.delete(event.key)
    })
  }
}
```

Vi har nu skapat en klass `InputHandler` som tar emot en referens till `game`. Vi använder `addEventListener` för att lyssna på `keydown` och `keyup`. Vi använder `game.keys` för att lagra de tangenter som är nedtryckta.

För att använda `InputHandler` i `Game` så behöver vi skapa en instans av `InputHandler` i `Game`.

`src/Game.js`
```javascript
import InputHandler from './InputHandler.js'

export default class Game {
  constructor(width, height) {
    ...
    this.keys = new Set()
    new InputHandler(this)
  }
}
```

### Flytta spelaren

Vi kan nu använda `keys` i `Player` för att flytta spelaren. Vi kommer att använda `keys` för att flytta spelaren upp, ner, vänster och höger.

`src/Player.js`
```javascript
constructor(game) {
  this.speedX = 0
}

update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.has("ArrowRight")) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    this.x += this.speedX
}
```

Vi har nu lagt till en if-sats som kollar om `ArrowLeft` eller `ArrowRight` är nedtryckta. Om `ArrowLeft` är nedtryckt så sätter vi `speedX` till `-this.maxSpeed`, om `ArrowRight` är nedtryckt så sätter vi `speedX` till `this.maxSpeed`. Om ingen av tangenterna är nedtryckta så sätter vi `speedX` till 0.

Om du nu öppnar sidan i webbläsaren så ska du kunna flytta spelaren med piltangenterna.

### Utmaning

Lägg till styrning för att flytta spelaren upp och ner.

**Fundera om du kan lägga till det genom att utöka if else satsen i update metoden. Eller om du behöver en annan if else och isåfall varför?**

### Sammanfattning

Vi har nu skapat en spelare som kan styras med piltangenterna. Vi har skapat en klass `InputHandler` för att hantera input från tangentbordet och en klass `Player` för att hantera spelaren. Vi har använt `keys` för att lagra de tangenter som är nedtryckta och flyttat spelaren med piltangenterna.

Studera koden du har fått och dess funktion. Försök förstå metoderna och hur de hänger ihop. Det går att göra mycket med enkla metoder och klasser.

### Utmaning

Skapa fler spelare som kan styras med olika tangenter. Du kan använda `InputHandler` för att skapa flera instanser av `Player` som kan styras med olika tangenter.

Couch co-op är en grej!

## Spelaren och grafik

Hittills har vi använt oss av färgade rektanglar för att rita spelaren och spelobjekt. Vi har använt `GameObject` klassens `draw` metod för att rita spelaren. Vi kan nu skapa en ny klass `Sprite` för att rita spelaren med en bild.

Jag kommer att skapa en ny branch för att hålla koden separerad. `player-sprite`.




