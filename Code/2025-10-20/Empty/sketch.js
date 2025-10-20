// ...existing code...
// The setup function runs once when the program starts
let seed = 0;
let palette;
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noSmooth();
  seed = floor(random(99999));
  palette = ['#0b0b0b','#efefef','#1f2f4f','#d9c59a']; // noir / blanc / indigo / ocre (modifie si tu veux)
}

// The draw function is called in a loop
function draw() {
  // pulsing background like breathing white light
  /*let pulse = map(sin(frameCount * 0.05), -1, 1, 100, 255);
  background(pulse);*/

  // subtle tone layer
  noStroke();
  fill(0, 12);
  rect(0,0,width,height);

  // responsive tile size
  let minSide = min(width, height);
  let tile = floor(map(minSide, 400, 2000, 64, 160));
  let cols = ceil(width / tile);
  let rows = ceil(height / tile);

  randomSeed(seed);
  noiseSeed(seed);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * tile + tile/2, y * tile + tile/2);

      // small hand-made imperfection
      rotate(map(noise(x*0.2, y*0.2, frameCount*0.001),0,1,-0.05,0.05));

      // choose two main colours per cell for contrast
      let t = noise(x*0.3, y*0.3);
      let bgCol = color( lerpColor(color(palette[1]), color(palette[0]), t*0.6) );
      fill(bgCol);
      noStroke();
      rectMode(CENTER);
      rect(0,0, tile*0.96, tile*0.96);

      // draw the woven motif: concentric diamonds + diagonal hatches
      drawManjakTile(tile*0.7, x+y, t);

      pop();
    }
  }

  // textile grain
  drawGrain();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  // new random weave
  seed = floor(random(99999));
  palette = shuffle(palette);
}

function keyPressed(){
  if (key === 's' || key === 'S') saveCanvas('manjak_weave', 'png');
}

// ---- motif tile ----
function drawManjakTile(size, id, t) {
  let half = size / 2;
  let steps = 8;
  // concentric diamond lines (retícula)
  for (let i = 0; i < steps; i++) {
    let r = map(i, 0, steps-1, half*0.08, half);
    let w = map(i, 0, steps-1, 2.2, 0.8);
    strokeWeight(w);
    let idx = (i + id) % 4;
    stroke( palette[ idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : 3 ] );
    noFill();
    push();
    rotate((i % 2 === 0) ? 0 : HALF_PI/2); // slight alternation
    beginShape();
    vertex(-r, 0);
    vertex(0, -r);
    vertex(r, 0);
    vertex(0, r);
    endShape(CLOSE);
    pop();
  }

  // fine chevrons/hatch to suggest thread directions
  let lines = 12;
  for (let i = -lines; i <= lines; i++) {
    let pos = map(i, -lines, lines, -half, half);
    let jitter = map(noise(i*0.15, id*0.12, frameCount*0.002), 0,1, -1.4, 1.4);
    strokeWeight(0.9);
    stroke( lerpColor(color(palette[0]), color(palette[1]), map(i, -lines, lines, 0.1, 0.9)) );
    line(-half, pos + jitter, half, pos - jitter);           // /
    line(pos + jitter, -half, pos - jitter, half);           // \
  }

  // small central diamond accent
  noStroke();
  fill(color(palette[2]));
  beginShape();
  vertex(0, -half*0.18);
  vertex(half*0.18, 0);
  vertex(0, half*0.18);
  vertex(-half*0.18, 0);
  endShape(CLOSE);
}

// subtle grain overlay
function drawGrain(){
  push();
  blendMode(MULTIPLY);
  noStroke();
  fill(0, 14);
  for (let i=0; i < width * 0.002; i++){
    let x = random(width), y = random(height), s = random(0.6,1.6);
    ellipse(x,y, s, s*0.45);
  }
  pop();
}
// ...existing code...