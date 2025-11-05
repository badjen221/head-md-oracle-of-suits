// sketch.js (prototype p5.js WEBGL — charge un OBJ + texture si présents)
// Placez vos fichiers exportés depuis C4D dans un dossier `assets/` à la racine.
// Recommandé: assets/robot.obj  et assets/robot_diffuse.png

let robotModel = null;
let robotTex = null;
let modelLoaded = false;

function preload() {
  // Tentative de chargement du modèle (nom en minuscule conseillé)
  // Utilise les callbacks pour éviter que l'absence d'asset casse le sketch
  loadModel('assets/Robot.obj', true, m => {
    robotModel = m;
    modelLoaded = true;
    console.log('Robot.obj chargé');
  }, err => {
    console.warn('robot.obj introuvable dans assets/ — utiliser un placeholder');
  });

  // Charger la texture si disponible (callback d'erreur non bloquant)
  loadImage('assets/Robot.mtl', img => {
    robotTex = img;
    console.log('robot_diffuse.png chargé');
  }, err => {
    console.warn('robot_diffuse.png introuvable dans assets/ — rendu sans texture');
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(30);

  // contrôle interactif pour tester la vue (cliquer-glisser)
  orbitControl();

  // éclairage simple
  ambientLight(60);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);

  // rotation pour démo
  push();
  rotateY(frameCount * 0.01);
  scale(1.2);

  if (modelLoaded && robotModel) {
    // appliquer texture si dispo, sinon utiliser material simple
    if (robotTex) {
      texture(robotTex);
    } else {
      normalMaterial(); // shading de base
    }
    model(robotModel);
  } else {
    // Fallback visuel si le modèle n'est pas chargé: un robot stylisé avec primitives
    push();
    // corps
    ambientMaterial(150, 150, 200);
    box(120, 180, 80);
    // tête
    push();
    translate(0, -140, 0);
    ambientMaterial(200, 180, 180);
    sphere(50);
    pop();
    // antenne
    push();
    translate(0, -190, 0);
    ambientMaterial(255, 200, 0);
    cone(8, 30);
    pop();
    pop();
  }

  pop();

  // petite UI informative
  push();
  resetMatrix();
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  let info = modelLoaded ? 'Modèle: chargé (assets/robot.obj)' : 'Modèle: absent — placer assets/robot.obj';
  text(info, 10 - width / 2, 10 - height / 2);
  text('Utilisez la souris pour orbiter', 10 - width / 2, 28 - height / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
