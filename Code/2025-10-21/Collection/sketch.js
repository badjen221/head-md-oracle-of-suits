// create a class called planet
class Planet {
  // create an x,y position
  constructor(x, y) {
    this.x = x;
    this.y = y;
  // create a random color for the planet
  this.color = color(random(255), random(255), random(255));
  }
  // draw the planet as a circle
  draw() {
    // wiggle the planet position slightly
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    // set the fill color to the planet's color
    fill(this.color);
    // no outline
    noStroke();
    // draw the circle
    ellipse(this.x, this.y, 40, 40);
  }
}
// create an array to hold all the planets
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  
  // draw all the planets 
  for (let planet of planets) {
    planet.draw();
  }
}

function mousePressed() {
  // create a new planet at the mouse position and add it to the planets array
  let newPlanet = new Planet(mouseX, mouseY);
  planets.push(newPlanet);
}