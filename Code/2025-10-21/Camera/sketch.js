// ...existing code...
let video;
let handposeModel;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  // demande la webcam
  video = createCapture(VIDEO, () => {
    console.log('Camera started');
  });
  video.size(width, height);
  video.hide(); // on dessine la vidéo sur le canvas

   // initialisation du modèle handpose (ml5)
  // nécessite d'avoir <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script> dans index.html
  handposeModel = ml5.handpose(video, () => {
    console.log('Handpose model loaded');
  });
  handposeModel.on('predict', (results) => {
    predictions = results;
  });
}

function draw() {
  background(0);

  // vérifie si la stream est prête (approximatif)
  const ready = video && video.elt && video.elt.readyState >= 2;

  if (ready) {
    // miroir pour interaction naturelle
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    pop();
  } else {
    // message si la caméra n'est pas autorisée ou pas prête
    fill(255);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Autorise la caméra dans le navigateur\nou recharge la page", width / 2, height / 2);
  }
  
}
// ...existing code...