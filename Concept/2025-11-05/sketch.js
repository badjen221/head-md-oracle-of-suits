let robotModel;
let modelLoaded = false;
let currentColor;

function preload() {
  // Charger le modèle (OBJ)
  loadModel('assets/Environnement.obj', true, m => {
    robotModel = m;
    modelLoaded = true;
    console.log('✅ Modèle chargé');
  }, err => {
    console.warn('⚠️ Erreur de chargement du modèle');
  });
  
  backgroundImage = loadImage('assets/Robot_test.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  // couleur de départ
  currentColor = color(200, 100, 100);
  
}

function draw() {
  background(30);

 

  if (modelLoaded) {
    // rotation lente pour bien visualiser
    //rotateY(frameCount * 0.01);

    // appliquer couleur
    ambientLight(150);
    directionalLight(255, 255, 255, 0.5, 1, -1);
    ambientMaterial(currentColor);

    scale(15);
    model(robotModel);
  } else {
    fill(255, 50, 50);
    box(100);
  }

  // dessiner axes pour référence
  push();
  stroke(255, 0, 0);
  line(0, 0, 0, 100, 0, 0); // X
  stroke(0, 255, 0);
  line(0, 0, 0, 0, -100, 0); // Y
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100); // Z
  pop();

  // Turn on a red ambient light.
  ambientLight(255, 0, 0);

  // Get the mouse's coordinates.
  let mx = mouseX - 50;
  let my = mouseY - 50;

  // Turn on a white point light that follows the mouse.
  pointLight(255, 255, 255, mx, my, 50);

  // Style the sphere.
  noStroke();

  // Add a specular material with a grayscale value.
  specularMaterial(255);

  // Draw the left sphere with low shininess.
  translate(-25, 0, 0);
  shininess(10);

  // Draw the right sphere with high shininess.
  translate(50, 0, 0);
  shininess(100);
}

// changer la couleur à chaque clic
function mousePressed() {
  currentColor = color(random(255), random(255), random(255));
  console.log('🎨 Nouvelle couleur :', currentColor.toString());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
