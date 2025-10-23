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

  // if the eye is open set background to blue, if closed set to red
  if (leftEyeBlink < 0.5) {
    background(0, 0, 255);
  } else {
    background(255, 0, 0);
  }

  if (isVideoReady()) {
    // show video frame
    image(videoElement, 0, 0);
  }

  // draw the leftEyeBlink value in text under the video
  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text('Left Eye Blink: ' + nf(leftEyeBlink, 1, 2), 10, height - 100);

  // if we blink rightEye, draw a circle
  rightEyeBlink = getBlendshapeScore('eyeBlinkRight');
  if (rightEyeBlink > 0.5) {
    let numBubbles = map(rightEyeBlink, 1.5, 1.0, 10, 20);
    for (let i = 0; i < numBubbles; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 60);
      noStroke();
      fill(200, 90, 0, 150);
      ellipse(x, y, size, size);
    }
  }

  // if we open jaw, draw many bubbles
  jawOpen = getBlendshapeScore('jawOpen');
  if (jawOpen > 0.5) {
    let numBubbles = map(jawOpen, 1.5, 1.0, 10, 80);
    for (let i = 0; i < numBubbles; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(10, 60);
      noStroke();
      fill(255, 255, 0, 150);
      ellipse(x, y, size, size);
    }
  }
}

