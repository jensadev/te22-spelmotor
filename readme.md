# Spelmotor

## Spelaren och grafik

Hittills har vi använt oss av färgade rektanglar för att rita spelaren och spelobjekt. Vi har använt `GameObject` klassens `draw` metod för att rita spelaren. Vi kan nu skapa en ny klass `Sprite` för att rita spelaren med en bild.

Jag kommer att skapa en ny branch för att hålla koden separerad. `player-sprite`.

## Förklaring

Vi kommer att använda en asset från ett tutorial skapat av [Franks Labratory](https://www.youtube.com/@Frankslaboratory). Du hittar videon med asseten [där](https://www.youtube.com/watch?v=c-1dBd1_G8A). 

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
    this.image.src = "./src/assets/franks_doge.png"
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
    this.frameWidth = 100
    this.frameHeight = 92
    this.frameX = 0
    this.frameY = 0

    this.maxFrames = 7
    this.fps = 20
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

    if (this.frameX >= this.maxFrames) {
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

Vi kan nu testa att ändra `frameY` för att rita en annan animation. Vi kommer att byta mellan två animationer beroende på om spelaren rör sig eller inte.

`src/Player.js`
```javascript
update(deltaTime) {
    ...
    if (this.speedX !== 0 || this.speedY !== 0) {
      this.frameY = 3
    } else {
      this.frameY = 0
    }
}
```

Vi kollar om spelaren rör sig genom att kolla om `speedX` eller `speedY` är olika från 0. Om du nu laddar spelet och rör på spelaren så ska du se att spelaren byter animation, men du kommer märka att det inte är helt rätt. Det beror på att vi inte har rätt antal frames för varje animation.

### Ändra antal frames

För att ändra antal frames för varje animation så behöver vi ändra `maxFrames` för varje animation. Vi kan använda `frameY` för att bestämma vilken animation vi ska rita.

`src/Player.js`
```javascript
constructor(game) {
    ...
    this.maxFrames = 7
}

update(deltaTime) {
    ...
    if (this.speedX !== 0 || this.speedY !== 0) {
      this.frameY = 3
      this.maxFrames = 9
    } else {
      this.frameY = 0
      this.maxFrames = 7
    }
}
```

Vi ändrar `maxFrames` beroende på vilken animation vi ska rita. Om spelaren rör sig så ändrar vi `frameY` till 3 och `maxFrames` till 9. Om spelaren inte rör sig så ändrar vi `frameY` till 0 och `maxFrames` till 7.

Om du nu laddar spelet och rör på spelaren så ska du se att spelaren byter animation beroende på om spelaren rör sig eller inte.

## Sammanfattning

Vi har nu skapat en ny klass `Player` för att rita spelaren med en bild. Vi har använt `drawImage` för att rita en del av bilden för att visa en frame. Vi har använt `requestAnimationFrame` för att anropa `update` och `draw` i spelet. Vi har använt `deltaTime` för att räkna ut vilken frame vi ska rita. Vi har använt fler parametrar i `drawImage` för att rita en del av bilden. Vi har använt en timer för att rita en frame och vi har använt flera frames för att animera spelaren.

## Nästa steg

I nästa steg så kommer vi att ändra så att spelarens sprite byter riktning beroende på vilket håll spelaren rör sig.

## Riktning

Vi kan använda `scale` för att spegelvända spelaren beroende på vilket håll spelaren rör sig. För att göra det så behöver vi dock först spara en kopia av canvasen och sedan spegelvända den. Vi kan använda `save` och `restore` för att spara och återställa canvasen.

Vi kommer att spara en variabel för att hålla koll på vilket håll spelaren rör sig, `this.flip`.

`src/Player.js`
```javascript
  constructor(game) {
    ...
    this.flip = false
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
      this.flip = true
    } else if (this.game.keys.has("ArrowRight")) {
      this.flip = false
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }
    ...
  }

  draw(ctx) {
    if (this.flip) {
      ctx.save()
      ctx.scale(-1, 1)
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.frameWidth,
      this.frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height,
    )
    if (this.flip) {
      ctx.restore()
    }
  }
}
```

Vi sparar `this.flip` beroende på vilket håll spelaren rör sig. Om spelaren rör sig åt vänster så sätter vi `this.flip` till `true` och om spelaren rör sig åt höger så sätter vi `this.flip` till `false`. Sedan använder vi `this.flip` för att spegelvända spelaren i `draw`.

Och med de ändringarna så ska spelaren nu spegelvändas beroende på vilket håll spelaren rör sig.

