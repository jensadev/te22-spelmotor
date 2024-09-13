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