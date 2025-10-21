// create empty array
let values = [];
function setup() {
  // fit canvas to window size
  createCanvas(windowWidth, windowHeight);
  // add 100 random values to the array
  for (let i = 0; i < 100; i++) {
    values.push(random(height));
  }
  strokeWeight(2);
  
}

function draw() {
  background(60, 110, 80);
  // draw the values as vertical lines moved across the screen randomly
  for (let i = 0; i < values.length; i++) {
    stroke(255);
    line(i * (width / values.length), height, i * (width / values.length), height - values[i]);
    // move the value randomly up or down
    values[i] += random(-5, 5);
    // constrain the value to be within the canvas height
    values[i] = constrain(values[i], 0, height);
   
  }
  //add a circle that follows the mouse
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);
  // circle moves on top of the values
  for (let i = 0; i < values.length; i++) {
    if (mouseX > i * (width / values.length) && mouseX < (i + 1) * (width / values.length)) {
      values[i] = height - mouseY;
    }
  }
  
}

// all values at the same height when mouse is pressed
function mousePressed() {
  for (let i = 0; i < values.length; i++) {
    values[i] = height / 2;
  }
}