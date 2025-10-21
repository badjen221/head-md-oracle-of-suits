// create an empty array named 'things'
let things = [];

function setup() {
  // full window canvas
  createCanvas(windowWidth, windowHeight);

  // create a grid of Thing objects
  let spacing = 80;
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      let thing = new Thing(x, y);
      things.push(thing);
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  //draw all the things
  for (let i = 0; i < things.length; i++) {
    things[i].draw();
  }

}

function mousePressed() {
  // create a new Thing at mouse position and add it to the things array
  let newThing = new Thing(mouseX, mouseY);
  things.push(newThing);
  print(things.length);
}