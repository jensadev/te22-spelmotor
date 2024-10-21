# Spelmotor

För det här projektet kommer vi att utgå från denna spelmotor. Koden grundar sig på material från [Franks laboratory](https://www.youtube.com/@Frankslaboratory). Han har skapat mycket material där JS används för att skapa spel. I hans grund får vi en bra start och ide om hur vi kan jobba med klasser och objekt i JS.

I det här som är ditt startrepo (du kan jobba i det eller göra ett nytt, där du följer installationsinstruktionerna nedan) så ska vi gå igenom hur det fungerar.
Strukturen på repot är ett antal branches och readme filer där koden förklaras.

## Branches
- [main](https://github.com/jensadev/te22-spelmotor/) Grunderna och strukturen
- [player input](https://github.com/jensadev/te22-spelmotor/tree/player-input) Styr spelaren, lyssna på tangentbordet
- [player sprite](https://github.com/jensadev/te22-spelmotor/tree/player-sprite) Använda en sprite för spelaren och animera den
- [background image](https://github.com/jensadev/te22-spelmotor/tree/background-image) Lägga till en bakgrundsbild skapad av flera lager

## Mål

Målet med projektet är att skapa ett spel och förstå Javascript tillräckligt för att kunna göra det. Vi kommer att använda oss av klasser och objekt för att skapa spelet. Vi kommer att använda canvas för att rita spelet.

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

## Refaktorisera spelobjeket och Game

Vi kan nu refaktorisera `GameObject` och `Game` för att göra koden mer läsbar och enklare att förstå. Vi har nuläget all logik för att uppdatera gameobjekt i `Game`. Vi kan flytta logiken till `GameObject` för att göra koden mer läsbar.

### Uppdatera GameObject

Öppna `GameObject.js` och lägg till följande kod.

```javascript
  constructor(game, x, y, width, height, color, maxSpeed) {
    this.game = game
    ...
    this.currentSpeed = 0
    this.maxSpeed = maxSpeed
    this.direction = 1
  }

  update(deltaTime) {
    this.x = this.x + this.maxSpeed / 1000 * deltaTime * this.direction
    if (this.x > this.game.width - this.width) this.direction = -1
    if (this.x < 0) this.direction = 1
  }
```

Vi har nu flyttat logiken för att uppdatera spelobjekt till `GameObject`. Vi skickar med `game` för att kunna använda `width` i `update`. Vi har också lagt till `currentSpeed` för att kunna använda `speed` i `update`.

### Uppdatera Game

Öppna `Game.js` och lägg till följande kod.

```javascript
this.gameObjects = [
  new GameObject(this, 0, 100, 20, 20, '#f00', 100),
  new GameObject(this, 0, 200, 20, 20, '#0f0', 200),
  new GameObject(this, 0, 300, 20, 20, '#00f', 300)
]

update(deltaTime) {
  this.gameObjects.forEach(gameObject => {
    gameObject.update(deltaTime)
  })
}
```

Vi har nu flyttat logiken för att uppdatera spelobjekt till `GameObject`. Vi skickar med `this` för att kunna använda `width` i `update`.

Om du nu öppnar sidan i webbläsaren så ska du se tre färger som rör sig över canvasen och studsar när de når kanten.

En signifikant förbättring från tidigare kod och mycket tydligare och renare att läsa. `update` metoden liknar nu också mer `draw` metoden.


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
