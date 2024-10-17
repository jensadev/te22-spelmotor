# Spelmotor

## Setup

Vi kommer att använda vite för att starta och köra projektet. Vite är ett byggverktyg som är snabbt och enkelt att använda. För att skapa ett nytt projekt med vite kör följande kommandon:

```bash
npm create vite@latest
cd <project-name>
npm install
npm run dev
```

Du kan nu trycka `o` i terminalen för att öppna projektet i webbläsaren. 

Sidan som öppnas är vites standardmall. Vi kommer att utgå från mallen för struktur, men vi kommer att skapa vår egen kod.

### Struktur

Projektets ingång från vite är `main.js`. Vi kommer från `main.js` styra projektet till att ladda övriga filer från `src`-mappen.

Skapa`src`-mappen. 

```bash
mkdir src
```

Vi kan nu också ta bort filer vi inte kommer använda.

```bash
rm javascript.svg
rm counter.js
```
Öppna sedan `main.js` och ta bort all kod utom följande. Sidan du öppnade tidigare kommer automatiskt att uppdateras.

```javascript
import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Mitt spel</h1>
`
```

## Spel

Vi kommer att skapa ett spel med hjälp av canvas. Canvas är en HTML-element som vi kan rita på med JavaScript. 

Vi kommer att skapa ett antal klasser för att hantera spelet.

För att ta vara på HTML språkets robusthet så kommer vi att skapa canvas elementet i HTML och sedan referera till det i JavaScript.


Öppna `index.html` och lägg till följande kod.
```html
<canvas id="game">If you see this text your browser is old or javascript is disabled.</canvas>
```

Vi kommer sedan att referera till canvas elementet i `main.js` och skicka det till en setup-funktion för att starta spelet. Det blir alltså en liten kedja av funktioner som startar spelet.

Öppna `main.js` och lägg till följande kod.
```javascript
import './style.css'
import { setup } from './src/setup.js'

const canvas = document.querySelector('#game')
setup(canvas)
```

Skapa sedan `setup.js` i `src`-mappen och lägg till följande kod.
```javascript
export function setup(canvas) {
  const ctx = canvas.getContext('2d') // Skapar en 2d-kontext för att rita på canvas
  // 16:9 aspect ratio
  canvas.width = 854 // sätt bredden på canvas
  canvas.height = 480 // sätt höjden på canvas
}
```

För att göra det tydligt var kanten på vårt canvas är i dokumentet så kan vi använda css för att lägga till en `border`.

Öppna `style.css` och lägg till följande kod.
```css
canvas {
  border: 4px solid #646cff;
}
```

Om du nu öppnar sidan i webbläsaren så ska du se en canvas med en blå kant.

## Skapa och ladda en spelklass

Vi kommer att skriva spelet i en klass som vi kallar `Game`. Vi kommer att skapa en fil för klassen och sedan importera den i `setup.js`.

Skapa `Game.js` i `src`-mappen och lägg till följande kod.

```javascript
export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  update(deltaTime) {
    // Uppdatera spelet
  }

  draw(ctx) {
    // Rita spelet
  }
}
```

### Förklaring

När vi använder klassen `Game` så skapar vi en instans av spelet. Vi skickar in bredd och höjd på canvasen som vi sparar i instansen. Vi har två metoder `update` och `draw` som vi kommer att använda för att uppdatera och rita spelet.

- `constructor` är en metod som körs när en instans av klassen skapas. Vi skickar in bredd och höjd på canvasen och sparar dessa i instansen.
- `update` är en metod som körs varje gång spelet uppdateras. Vi skickar in `deltaTime` som är tiden sedan förra uppdateringen. Vi kommer att använda `deltaTime` för att räkna ut hur mycket vi ska flytta objekt i spelet.
- `draw` är en metod som körs varje gång spelet ska ritas. Vi skickar in en 2d-kontext för att kunna rita på canvasen.

### Importera Game i setup.js

Vi kan nu importera `Game` i `setup.js` och skapa en instans av spelet.

Öppna `setup.js` och lägg till följande kod.

```javascript
import Game from './Game.js'

export function setup(canvas) {
  const ctx = canvas.getContext('2d') // Skapar en 2d-kontext för att rita på canvas
  // 16:9 aspect ratio
  canvas.width = 854 // sätt bredden på canvas
  canvas.height = 480 // sätt höjden på canvas

  const game = new Game(canvas.width, canvas.height)
}
```

Om du nu öppnar sidan i webbläsaren så ska du inte se någon skillnad. Vi har dock skapat en instans av spelet som vi kan använda för att uppdatera och rita spelet.

För att testa om spelet faktiskt ritar något så kan vi rita en färg på canvasen.

Öppna `Game.js` och lägg till följande kod i `draw`-metoden.

```javascript
draw(ctx) {
  ctx.fillStyle = '#f00' // Sätt färgen till röd
  ctx.fillRect(0, 0, this.width, this.height) // Rita en rektangel som täcker hela canvasen
}
```

Vi behöver sedan kalla på `draw`-metoden i `setup.js` för att rita spelet.

Öppna `setup.js` och lägg till följande kod.

```javascript
game.draw(ctx)
```

Om du nu öppnar sidan i webbläsaren så ska du se en röd färg på canvasen.

Vi har nu statiskt ritat en färg på canvasen. Det är en test för att se att spelet ritar något. Vi kommer att bygga vidare och ersätta logiken för att rita ut och uppdatera spelet.

Det är viktigt att du kan förstå och se hur vi bygger upp delarna av spelet och hur de hör ihop.

## Uppdatera och rita spelet

För att uppdatera och rita spelet så behöver vi använda `requestAnimationFrame`. `requestAnimationFrame` är en funktion som anropar en funktion varje gång webbläsaren är redo att rita nästa bild. Vi kommer att använda `requestAnimationFrame` för att anropa `update` och `draw` i spelet.

Vi kommer nu skapa en funktion `animate` som anropar `update` och `draw` i setup och sedan anropar sig själv med `requestAnimationFrame`.

Öppna `setup.js` och lägg till följande kod i `setup`-funktionen.

```javascript
  // tidigare kod, lägg till detta i setup-funktionen
 const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  // skapa en funktion som anropar sig själv med requestAnimationFrame
  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate(0) // starta animationen
```

Vi har nu skapat en funktion `animate` som anropar sig själv med `requestAnimationFrame`. Vi skickar med `deltaTime` som är tiden sedan förra uppdateringen. Vi rensar canvasen med `clearRect` för att rita en ny bild, det är det sättet vi animerar på. Vi anropar `update` och `draw` i spelet och sedan anropar vi `requestAnimationFrame` för att anropa `animate` igen.

Med den koden på plats så kan vi nu rita och uppdatera spelet.

### Testa att rita och uppdatera spelet

Vi kan nu testa att rita och uppdatera spelet. Vi kommer att rita en färg som rör sig över canvasen.

Öppna `Game.js` och lägg till följande kod i `update`-metoden.

```javascript
update(deltaTime) {
  this.x = this.x + 100 / 1000 * deltaTime // Flytta färgen 100 pixlar per sekund
  if (this.x > this.width) this.x = 0 // Om färgen går utanför canvasen så sätt x till 0
}
```

Vi behöver också sätta `x` till 0 i konstruktorn.

```javascript
constructor(width, height) {
  this.width = width
  this.height = height
  this.x = 0
}
```

Vi behöver sedan rita färgen på `x`-positionen i `draw`-metoden.

```javascript
draw(ctx) {
  ctx.fillStyle = '#f00' // Sätt färgen till röd
  ctx.fillRect(this.x, 0, 20, 20) // Rita en rektangel som täcker hela canvasen
}
```

Om du nu öppnar sidan i webbläsaren så ska du se en röd färg som rör sig över canvasen.

Du kan styra över hur snabbt färgen rör sig genom att ändra `100` i `update`-metoden. `100` är antalet pixlar färgen rör sig per sekund.

## Spelobjekt

Vi kommer att skapa en klass för spelobjekt. Spelobjekt kommer att ha en position, en storlek och en färg. Vi kommer att använda spelobjekt för att rita färgen på canvasen.

Skapa `GameObject.js` i `src`-mappen och lägg till följande kod.

```javascript
export default class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
```

### Förklaring

- `constructor` är en metod som körs när en instans av klassen skapas. Vi skickar in `x`, `y`, `width`, `height` och `color` för att skapa ett spelobjekt. Vi sparar dessa i instansen.
- `draw` är en metod som ritar spelobjektet på canvasen. Vi sätter färgen till `color` och ritar en rektangel på `x`, `y`-positionen med storlek `width` och `height`.

### Använda GameObject i Game

Vi kommer att använda `GameObject` i `Game` för att rita färgen på canvasen.

Öppna `Game.js` och lägg till följande kod.

```javascript
import GameObject from './GameObject.js'

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameObject = new GameObject(0, 100, 20, 20, '#f00')
  }

  update(deltaTime) {
    this.gameObject.x = this.gameObject.x + 100 / 1000 * deltaTime
    if (this.gameObject.x > this.width) this.gameObject.x = 0
  }

  draw(ctx) {
    this.gameObject.draw(ctx)
  }
}
```

Vi har nu skapat ett spelobjekt i `Game` och använder det för att rita färgen på canvasen.

Om du nu öppnar sidan i webbläsaren så ska du se en röd färg som rör sig över canvasen.

#### Utmaning

Skapa en grön färg som rör sig över canvasen.

### Skapa flera spelobjekt

Vi kan nu skapa flera spelobjekt och rita dem på canvasen.

Öppna `Game.js` och lägg till följande kod i `constructor`.
Vi ändrar nu till att använda en array för att lagra spelobjekten.

```javascript
this.gameObjects = [
  new GameObject(0, 100, 20, 20, '#f00'),
  new GameObject(0, 200, 20, 20, '#0f0'),
  new GameObject(0, 300, 20, 20, '#00f')
]
```

Vi behöver också uppdatera `update` och `draw` för att rita flera spelobjekt.

```javascript
update(deltaTime) {
  this.gameObjects.forEach(gameObject => {
    gameObject.x = gameObject.x + 100 / 1000 * deltaTime
    if (gameObject.x > this.width) gameObject.x = 0
  })
}

draw(ctx) {
  this.gameObjects.forEach(gameObject => {
    gameObject.draw(ctx)
  })
}
```

#### Förklaring

- Vi har nu skapat en array `gameObjects` som innehåller flera spelobjekt. Vi använder `forEach` för att uppdatera och rita varje spelobjekt i arrayen.

Om du nu öppnar sidan i webbläsaren så ska du se tre färger som rör sig över canvasen.

### Få spelobjekten att röra sig olika snabbt

Vi kan nu få spelobjekten att röra sig olika snabbt genom att skapa en `speed`-variabel i `GameObject`. Vi kan sedan tilldela olika hastigheter till varje spelobjekt.

Öppna `GameObject.js` och lägg till följande kod i `constructor`.

```javascript
  constructor(..., speed) {
    ...
    this.speed = speed
  }
```

Vi behöver sedan uppdatera `update` i `Game` för att använda `speed`.

```javascript
update(deltaTime) {
  this.gameObjects.forEach(gameObject => {
    gameObject.x = gameObject.x + gameObject.speed / 1000 * deltaTime
    if (gameObject.x > this.width) gameObject.x = 0
  })
}
```

Vi behöver också uppdatera `constructor` i `Game` för att skicka med `speed`.

```javascript
this.gameObjects = [
  new GameObject(0, 100, 20, 20, '#f00', 100),
  new GameObject(0, 200, 20, 20, '#0f0', 200),
  new GameObject(0, 300, 20, 20, '#00f', 300)
]
```

Om du nu öppnar sidan i webbläsaren så ska du se tre färger som rör sig över canvasen med olika hastigheter.

### Studsande spelobjekt

Vi kan nu få spelobjekten att studsa när de når kanten på canvasen. Vi kan använda en `direction`-variabel i `GameObject` för att hålla koll på vilket håll spelobjektet rör sig.

Öppna `GameObject.js` och lägg till följande kod i `constructor`.

```javascript
this.direction = 1
```

Vi behöver sedan uppdatera `update` i `Game` för att använda `direction`.

```javascript
update(deltaTime) {
  this.gameObjects.forEach(gameObject => {
    gameObject.x = gameObject.x + gameObject.speed / 1000 * deltaTime * gameObject.direction
    if (gameObject.x > this.width) gameObject.direction = -1
    if (gameObject.x < 0) gameObject.direction = 1
  })
}
```

Om du nu öppnar sidan i webbläsaren så ska du se tre färger som rör sig över canvasen och studsar när de når kanten.

#### Utmaning

Skapa och studsa spelobjekt på y-axeln.

## Sammanfattning

Vi har nu skapat grunden för ett spel med canvas. Vi har skapat en klass `Game` som hanterar spelet och en klass för att hantera spelobjekt. Vi har använt `requestAnimationFrame` för att uppdatera och rita spelet. Vi har också använt en klass för att kunna skapa flera spelobjekt som rör sig över canvasen.

### Fundera

- Hur skulle du kunna använda `GameObject` för att skapa olika typer av spelobjekt?
- Vad är de viktiga parametrarna för att skapa ett spelobjekt? Vad krävs?

### Utmaning

Skapa en klass för att hantera spelobjekt som rör sig slumpmässigt över canvasen. Du kan använda dig av `Math.random()` för att skapa slumpmässiga värden för `x` och `y`.

### Nästa steg

I nästa steg kommer vi att lägga till en spelare som kan styras med piltangenterna. Vi kommer att göra det genom att skapa en `Player`-klass som hanterar spelaren och en `Input`-klass som hanterar input från tangentbordet.

För att hålla dessa steg separata så kommer vi att skapa en ny branch för nästa steg. `player-input`.

## Spelare och input

För att skapa en spelare så kommer vi att bygga vidare på `GameObject` och ärva från den klassen. Vi kommer att skapa en ny fil `Player.js` i `src`-mappen och lägga till följande kod.

`src/Player.js`
```javascript
import GameObject from './GameObject.js'

export default class Player extends GameObject {
  constructor(game) {
    super(0, 0, 50, 50, '#fff', 5)
    this.game = game
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
update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.x -= this.speed
    } else if (this.game.keys.has("ArrowRight")) {
      this.x += this.speed
    }
}
```

Vi har nu lagt till en if-sats som kollar om `ArrowLeft` är nedtryckt. Om den är det så flyttar vi spelaren till vänster genom att minska `x` med `speed`. Om `ArrowRight` är nedtryckt så flyttar vi spelaren till höger genom att öka `x` med `speed`.

Om du nu öppnar sidan i webbläsaren så ska du kunna flytta spelaren med piltangenterna.

### Utmaning

Lägg till styrning för att flytta spelaren upp och ner.

**Fundera om du kan lägga till det genom att utöka if else satsen i update metoden. Eller om du behöver en annan if else och isåfall varför?**

#### Juicy

Vi kan nu inte glömma bort att göra spelet lite mer "juicy". Ett klockrent exempel här är att använda easing för att få spelaren att röra sig mjukare. Easing är en metod för att få en rörelse att starta och sluta mjukt. Vi kan använda `Math.abs` för att få en positiv hastighet och sedan multiplicera med `speed` för att få en mjukare rörelse.

`src/Player.js`
```javascript
constructor(game) {
  ...
  this.targetX = this.x;
  this.targetY = this.y;
}
update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.targetX -= this.speed;
    } else if (this.game.keys.has("ArrowRight")) {
      this.targetX += this.speed;
    }

    if (this.game.keys.has("ArrowUp")) {
      this.targetY -= this.speed;
    } else if (this.game.keys.has("ArrowDown")) {
      this.targetY += this.speed;
    }

    // Tweening
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;
}
```

Testa detta och se om du tycker att rörelsen känns mjukare. En del kommer garanterat uppleva det som att vi åker skridsko, men ibland är det önskat.

### Sammanfattning

Vi har nu skapat en spelare som kan styras med piltangenterna. Vi har skapat en klass `InputHandler` för att hantera input från tangentbordet och en klass `Player` för att hantera spelaren. Vi har använt `keys` för att lagra de tangenter som är nedtryckta och flyttat spelaren med piltangenterna.

Studera koden du har fått och dess funktion. Försök förstå metoderna och hur de hänger ihop. Det går att göra mycket med enkla metoder och klasser.

### Utmaning

Skapa fler spelare som kan styras med olika tangenter. Du kan använda `InputHandler` för att skapa flera instanser av `Player` som kan styras med olika tangenter.

Couch co-op är en grej!

## Spelaren och grafik

Hittills har vi använt oss av färgade rektanglar för att rita spelaren och spelobjekt. Vi har använt `GameObject` klassens `draw` metod för att rita spelaren. Vi kan nu skapa en ny klass `Sprite` för att rita spelaren med en bild.

Jag kommer att skapa en ny branch för att hålla koden separerad. `player-sprite`.




