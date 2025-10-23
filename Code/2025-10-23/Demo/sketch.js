// the blendshapes we are going to track
let leftEyeBlink = 0.0;
let rightEyeBlink = 0.0;
let jawOpen = 0.0;

function setup() {
  // full window canvas
  createCanvas(windowWidth, windowHeight);
  // initialize MediaPipe
  setupFace();
  setupVideo();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // get detected faces
  let faces = getFaceLandmarks();

  // see blendshapes.txt for full list of possible blendshapes
  leftEyeBlink = getBlendshapeScore('eyeBlinkLeft');

    background(0, 0, 0);

  if (isVideoReady()) {
    // show video frame
    image(videoElement, 0, 0);
  }

  // draw the leftEyeBlink value in text under the video
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text('Left Eye Blink: ' + nf(leftEyeBlink, 1, 2), 10, height - 100);

  // if we open jaw, draw a rectangle
  jawOpen = getBlendshapeScore('jawOpen');
  if (jawOpen > 0.4) {
    let rectWidth = map(jawOpen, 0.5, 1.0, 50, 200);
    let rectHeight = map(jawOpen, 0.5, 1.0, 20, 100);
    stroke(1);
    fill(0, 200, 100, 140);
    rectMode(CENTER);
    rect(width / 2, 1 * height / 3, rectWidth, rectHeight);
  }

  // if we blink rightEye, draw a circle
  rightEyeBlink = getBlendshapeScore('eyeBlinkRight');
   if (rightEyeBlink < 0.3) {
    let circleWidth = map(rightEyeBlink, 0.5, 1.0, 50, 200);
    let circleHeight = map(rightEyeBlink, 0.5, 1.0, 20, 100);
    stroke(1);
    fill(0, 170, 200, 140);
    rectMode(CENTER);
    circle(1.3* width / 3, height / 4, circleWidth, circleHeight);
  }

  // if we blink leftEye, draw a circle
  leftEyeBlink = getBlendshapeScore('eyeBlinkLeft');
   if (leftEyeBlink < 0.3) {
    let circleWidth = map(leftEyeBlink, 0.5, 1.0, 50, 200);
    let circleHeight = map(leftEyeBlink, 0.5, 1.0, 20, 100);
    stroke(1);
    fill(200, 0, 150, 140);
    rectMode(CENTER);
    circle(1.8 * width / 3, height / 4, circleWidth, circleHeight);
  }
}

