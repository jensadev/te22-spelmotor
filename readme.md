# Spelmotor

## Spelaren och grafik

Hittills har vi använt oss av färgade rektanglar för att rita spelaren och spelobjekt. Vi har använt `GameObject` klassens `draw` metod för att rita spelaren. Vi kan nu skapa en ny klass `Sprite` för att rita spelaren med en bild.

Jag kommer att skapa en ny branch för att hålla koden separerad. `player-sprite`.

## Förklaring

Vi kommer att använda assets från itch.io för spelaren. Jag kommer använda två olika assets, den ena där alla animationer är samlade i en bild och den andra där varje animation är separerad.

https://penzilla.itch.io/hooded-protagonist
https://free-game-assets.itch.io/free-tiny-hero-sprites-pixel-art

Sätter vi kommer att animera spelaren är att vi kommer att rita ut en del av bilden för varje frame. Vi kommer att använda `drawImage` för att rita bilden på canvasen. `drawImage` tar in en bild, en x-position, en y-position, en bredd och en höjd för att rita bilden.

Vi kommer att använda `requestAnimationFrame` för att anropa `update` och `draw` i spelet. Vi kommer att använda `deltaTime` för att räkna ut vilken frame vi ska rita.

## Ladda en bild

För att ladda en bild så kan vi använda `Image`. `Image` är ett inbyggt objekt i JavaScript som vi kan använda för att ladda en bild. Vi sparar bilden i assets mappen och laddar den i `Player`.

Skapa en mapp `assets` i `src` och lägg till bilden `player.png`.

`src/Player.js`
```javascript
export default class Player extends GameObject {
  constructor(game) {
    ...
    this.image = new Image()
    this.image.src = "./src/assets/AnimationSheet_Character.png"
  }
  ...
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
```

Vi laddar först in bilden i constructorn och sätter `src` till sökvägen till bilden. Vi använder sedan `drawImage` för att rita bilden på canvasen. Vi har nu slutat använda draw metoden från `GameObject` och använder istället `draw` från `Player`.

Ladda om spelet i webbläsaren och du ska nu se spelaren som en bild, en något mosad bild.

Nästa steg är att rita ut en del av bilden för att visa en frame. För det behöver vi använda `drawImage` med fler parametrar. `drawImage` är en metod som kan ta ett antal olika parametrar och metoden fungerar då olika beroende på vilka parametrar som skickas in. Det kallas för överlagring (overload på engelska).

## Rita en frame

För att rita en frame så behöver vi använda fler parametrar i `drawImage`. Vi behöver använda `sx`, `sy`, `sWidth` och `sHeight` för att rita en del av bilden, där `s` är en förkortning för source.

`sx` är x-positionen på bilden där vi ska börja rita, `sy` är y-positionen på bilden där vi ska börja rita, `sWidth` är bredden på bilden som vi ska rita och `sHeight` är höjden på bilden som vi ska rita.

Du behöver här undersöka den bild du har och se hur stor varje frame är och varje animation börjar och slutar. För bilden `AnimationSheet_Character.png` så är varje frame 32x32 pixlar, längden på animationerna är dock olika.

`src/Player.js`
```javascript
export default class Player extends GameObject {
  constructor(game) {
    ...
    this.frameWidth = 32
    this.frameHeight = 32
    this.frameX = 0
    this.frameY = 0
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)
  }
}
```

Vi har nu lagt till `frameWidth`, `frameHeight`, `frameX` och `frameY` för att rita en frame. Vi använder `drawImage` med fler parametrar för att rita en frame.

Om du nu öppnar sidan i webbläsaren så ska du se en frame av spelaren.

## Animering

För att animera spelaren så behöver vi ändra `frameX` för varje frame. FrameX styr vilket frame vi ska rita och vi kommer att uppdatera det utifrån en timer i `Player` klassens `update` metod. Du kan tänka på det som en array där vi byter index för att rita en annan frame.

`src/Player.js`
```javascript
export default class Player extends GameObject {
  constructor(game) {
    ...
    this.frameWidth = 32
    this.frameHeight = 32
    this.frameX = 0
    this.frameY = 0

    this.maxFrame = 2
    this.fps = 5
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(deltaTime) {
    ...
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.frameX * this.frameWidth, this.frameY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)
  }
}
```

Som du ser är ändringen ganska stor, vi behöver ett antal variabler för att hålla koll på vilken frame vi ska rita. Vi har `maxFrame` som är det högsta indexet vi kan rita, `fps` som är antalet frames per sekund, `timer` som är tiden sedan förra uppdateringen och `interval` som är tiden mellan varje frame.

Vi använder `timer` för att räkna ut när vi ska byta frame. Om `timer` är större än `interval` så ökar vi `frameX` och sätter `timer` till 0. Om `frameX` är större eller lika med `maxFrame` så sätter vi `frameX` till 0. 

Vi använder sedan `frameX` för att rita en frame i `drawImage`. Där vi multiplicerar `frameX` med `frameWidth`.

Om du nu öppnar sidan i webbläsaren så ska du se spelaren som animeras.

Testa att ändra `fps` för att ändra hastigheten på animationen. Du kan även ändra `maxFrame` för att ändra antalet frames i animationen.

## Animering med flera frames

Vi kan nu använda flera frames för att animera spelaren. Vi kan använda `frameY` för att rita en annan animation. Vi kan använda `frameY` för att rita en annan animation.

Testa först att ändra `frameY` för att rita en annan animation, du kan även ändra `maxFrame` för att ändra antalet frames i animationen. Eftersom vi lagt till `this.frameY * this.frameHeight` tidigare så förberedde vi för att kunna rita flera animationer.

### Ändra animation

Vi kan nu testa att ändra `frameY` för att rita en annan animation. Vi kommer att byta mellan två animationer beroende på om spelaren rör sig eller inte. För att göra detta så kan vi använda targetX och targetY för att kolla om spelaren rör sig.

`src/Player.js`
```javascript
update(deltaTime) {
    ...
    if (Math.abs(this.targetX - this.x) > 0.5 || Math.abs(this.targetY - this.y) > 0.5) {
      this.frameY = 3;
    } else {
      this.frameY = 0;
    }
}
```

Vi har nu lagt till en if-sats som kollar om `targetX` och `targetY` är större än 0.5. Om de är det så sätter vi `frameY` till 3, annars sätter vi `frameY` till 0.
