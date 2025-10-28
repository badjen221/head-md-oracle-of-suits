// Ajouter au début du fichier
let colorBars = [];

function setup() {

  // full window canvas
  createCanvas(windowWidth, windowHeight);

  // initialize MediaPipe settings
  setupHands();
  // start camera using MediaPipeHands.js helper
  setupVideo();

  // Créer 5 barres de couleur
  for (let i = 0; i < 5; i++) {
    colorBars.push({
      x: (i + 1) * width / 6,
      y: height / 2,
      width: 40,
      height: 1600,
      color: color(random(255), random(255), random(255))
    });
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  // clear the canvas
  background(0);

  // if the video connection is ready
  if (isVideoReady()) {
    // draw the capture image
    image(videoElement, 0, 0);
  }

  // use thicker lines for drawing hand connections
  strokeWeight(2);

  // make sure we have detections to draw
  if (detections) {

    // for each detected hand
    for (let hand of detections.multiHandLandmarks) {
      // draw the index finger
      drawIndex(hand);
      // draw the thumb finger
      drawThumb(hand);
      // draw fingertip points
      drawTips(hand);
      // draw connections
      drawConnections(hand);
      // draw all landmarks
      drawLandmarks(hand);
    } // end of hands loop

  } // end of if detections

  // check for pinching gesture to grab bars and move them
  /* if (detections) {
    for (let hand of detections.multiHandLandmarks) {
      let indexTip = hand[FINGER_TIPS.index];
      let thumbTip = hand[FINGER_TIPS.thumb];

      // calculate distance between index and thumb tips
      let d = dist(indexTip.x * videoElement.width, indexTip.y * videoElement.height,
                   thumbTip.x * videoElement.width, thumbTip.y * videoElement.height);

      // if distance is small enough, consider it a pinch
      if (d < 40) {
        // move the closest color bar to the pinch position
        let pinchX = (indexTip.x + thumbTip.x) / 2 * videoElement.width;
        let pinchY = (indexTip.y + thumbTip.y) / 2 * videoElement.height;

        // find the closest color bar
        let closestBar = null;
        let closestDist = Infinity;
        for (let bar of colorBars) {
          let barDist = dist(pinchX, pinchY, bar.x, bar.y);
          if (barDist < closestDist) {
            closestDist = barDist;
            closestBar = bar;
          }
        }

        // move the closest bar to the pinch position
        if (closestBar) {
          closestBar.x = pinchX;
          closestBar.y = pinchY;
        }
      }
    }
  }

  // draw the color bars
  for (let bar of colorBars) {
    fill(bar.color);
    rectMode(CENTER);
    rect(bar.x, bar.y, bar.width/5, bar.height/5);
  } */

  // draw the circles at the color bar positions
  for (let bar of colorBars) {
    fill(bar.color);
    noStroke();
    circle(bar.x, bar.y, 50);
  }

  // check grab and move the circles
  if (detections) {
    for (let hand of detections.multiHandLandmarks) {
      let indexTip = hand[FINGER_TIPS.index];
      let thumbTip = hand[FINGER_TIPS.thumb];

      // calculate distance between index and thumb tips
      let d = dist(indexTip.x * videoElement.width, indexTip.y * videoElement.height,
        thumbTip.x * videoElement.width, thumbTip.y * videoElement.height);

      // if distance is small enough, consider it a pinch
      if (d < 40) {
        // move the closest color bar to the pinch position
        let pinchX = (indexTip.x + thumbTip.x) / 2 * videoElement.width;
        let pinchY = (indexTip.y + thumbTip.y) / 2 * videoElement.height;

        // find the closest color bar
        let closestBar = null;
        let closestDist = Infinity;
        for (let bar of colorBars) {
          let barDist = dist(pinchX, pinchY, bar.x, bar.y);
          if (barDist < closestDist) {
            closestDist = barDist;
            closestBar = bar;
          }
        }

        // move the closest bar to the pinch position
        if (closestBar) {
          closestBar.x = pinchX;
          closestBar.y = pinchY;
        }
      }
    }
  }

  // when no pinch, slowly return with gravitation with rebound effect
  for (let bar of colorBars) {
    let targetY = height / 2;
    let dy = targetY - bar.y;
    bar.y += dy * 0.1; // move 10% closer to target each frame

    // add a simple rebound effect
    if (abs(dy) < 2) {
      bar.y = targetY; // snap to target if very close
    }
  }

} // end of draw


// only the index finger tip landmark
function drawIndex(landmarks) {

  // get the index fingertip landmark
  let mark = landmarks[FINGER_TIPS.index];

  noStroke();
  // set fill color for index fingertip
  fill(0, 255, 255);

  // adapt the coordinates (0..1) to video coordinates
  let x = mark.x * videoElement.width;
  let y = mark.y * videoElement.height;
  circle(x, y, 20);

}


// draw the thumb finger tip landmark
function drawThumb(landmarks) {

  // get the thumb fingertip landmark
  let mark = landmarks[FINGER_TIPS.thumb];

  noStroke();
  // set fill color for thumb fingertip
  fill(255, 255, 0);

  // adapt the coordinates (0..1) to video coordinates
  let x = mark.x * videoElement.width;
  let y = mark.y * videoElement.height;
  circle(x, y, 20);

}

function drawTips(landmarks) {

  noStroke();
  // set fill color for fingertips
  fill(0, 0, 255);

  // fingertip indices
  const tips = [4, 8, 12, 16, 20];

  for (let tipIndex of tips) {
    let mark = landmarks[tipIndex];
    // adapt the coordinates (0..1) to video coordinates
    let x = mark.x * videoElement.width;
    let y = mark.y * videoElement.height;
    circle(x, y, 10);
  }

}


function drawLandmarks(landmarks) {

  noStroke();
  // set fill color for landmarks
  fill(255, 0, 0);

  for (let mark of landmarks) {
    // adapt the coordinates (0..1) to video coordinates
    let x = mark.x * videoElement.width;
    let y = mark.y * videoElement.height;
    circle(x, y, 6);
  }

}


function drawConnections(landmarks) {

  // set stroke color for connections
  stroke(0, 255, 0);

  // iterate through each connection
  for (let connection of HAND_CONNECTIONS) {
    // get the two landmarks to connect
    const a = landmarks[connection[0]];
    const b = landmarks[connection[1]];
    // skip if either landmark is missing
    if (!a || !b) continue;
    // landmarks are normalized [0..1], (x,y) with origin top-left
    let ax = a.x * videoElement.width;
    let ay = a.y * videoElement.height;
    let bx = b.x * videoElement.width;
    let by = b.y * videoElement.height;
    line(ax, ay, bx, by);
  }

}