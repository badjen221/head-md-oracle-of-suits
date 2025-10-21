let x;
let y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width * 0.5;
  y = height * 0.5;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(x, y, 50);
  fill(56, 100, 150);
  noStroke();
  //print();

  // pluisieurs cercles qui bougent sur tout le canvas en changeant de couleurs et de tailles
  for (let i = 0; i < 3; i++) {
    let cx = random(width);
    let cy = random(height);
    let size = random(10, 100);
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b, 150);
    circle(cx, cy, size);
  }

}

function mousePressed() {
  x = mouseX;
  y = mouseY;

}