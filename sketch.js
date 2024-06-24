let progress = 0; // Początkowy poziom postępu
let angle = 0; // Początkowy kąt dla animacji kropek
let delayCounter = 0; // Licznik do opóźnień
let showMessageCounter = 0; // Licznik do wyświetlenia wiadomości
let showMessage = false; // Flaga do kontrolowania wyświetlania wiadomości
let headImage;

function preload() {
  headImage = loadImage('PASEK5.png'); // Adjust the path if necessary
}

function setup() {
  createCanvas(1920, 1080);
  frameRate(30); // Ustawienie szybkości klatek
  angleMode(DEGREES); // Ustawienie trybu kąta na stopnie
  background(255); // Białe tło
}

function draw() {
  background(255);
  image(headImage, 0, 0, 1920, 220);
  
  // Aktualizacja postępu z opóźnieniami na 45%, 62% i 87%
  if (progress < 99) {
    if (progress === 45 || progress === 62 || progress === 87) {
      delayCounter++;
      if (delayCounter > 60) { // Opóźnienie na 2 sekundy (60 klatek)
        progress++;
        delayCounter = 0;
      }
    } else {
      progress += 0.5; // Zwiększenie postępu co 0.5 aby animacja trwała dłużej
    }
  } else {
    showMessageCounter++;
    if (showMessageCounter > 450) { // 450 klatek to 15 sekund przy 30 fps
      showMessage = true;
    }
  }

  // Rysowanie paska postępu
  drawProgressBar(progress);

  // Rysowanie animacji ładowania
  drawLoadingBars();
  
  // Rysowanie wiadomości jeśli minęło 15 sekund od osiągnięcia 99%
  if (showMessage) {
    drawErrorMessage();
  }
}

function drawProgressBar(progress) {
  let barWidth = width * 0.4; // Pasek postępu o długości 40% szerokości canvasu
  let barHeight = 30;
  let x = (width - barWidth) / 2;
  let y = height / 2 + 70;

  // Rysowanie tła paska
  fill(200);
  rect(x, y, barWidth, barHeight);
  
  // Rysowanie załadowanej części paska
  fill(50); // Ciemnoszary kolor
  rect(x, y, barWidth * (progress / 100), barHeight);

  // Ramka wokół paska
  noFill();
  stroke(0);
  rect(x, y, barWidth, barHeight);
  
  // Napis "% załadowany"
  fill(0);
  noStroke();
  textSize(20); // Rozmiar tekstu
  textStyle(NORMAL); // Styl tekstu
  textAlign(CENTER, CENTER);
  text(int(progress) + "% załadowany", width / 2, y + barHeight + 30);
}

function drawLoadingBars() {
  let barsCount = 12;
  let barLength = 20;
  let barThickness = 5;
  let x = width / 2;
  let y = height / 2 - 50;
  let radius = 40; // Promień okręgu dla kresek

  // Rysowanie kresek ładowania
  for (let i = 0; i < barsCount; i++) {
    let barAngle = angle + (360 / barsCount) * i;
    let barX = x + radius * cos(barAngle);
    let barY = y + radius * sin(barAngle);
    let alpha = map(i, 0, barsCount, 50, 255); // Gradient przezroczystości
    push();
    translate(barX, barY);
    rotate(barAngle);
    fill(0, alpha);
    noStroke();
    rect(-barThickness / 2, -barLength / 2, barThickness, barLength);
    pop();
  }

  angle += 5; // Obrót kresek
}

function drawErrorMessage() {
  fill(255, 0, 0); // Czerwony kolor tekstu
  textSize(20); // Rozmiar tekstu
  textStyle(NORMAL); // Styl tekstu
  textAlign(CENTER, CENTER);
  text("Nie udało nam się zapisać twojego wniosku.", width / 2, height / 2 + 200); // Umieszczenie tekstu niżej
}
