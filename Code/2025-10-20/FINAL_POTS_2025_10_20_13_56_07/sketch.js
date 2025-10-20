const posterWidth = 420;
const posterHeight = 594;

let percentMousePosition = 0; // plage de 0 à 255
let image_01, image_02, image_yodel;
let image_text;
let maskArray = [];
let maskArray1 = [];
let currentMaskIndex = 0;
let currentMaskIndex1 = 0;
let mic;

function preload() {
  image_01 = loadImage("images/Pot_Williamine.jpg");
  image_02 = loadImage("images/Pot_TrainSuisse.jpg");
  image_yodel = loadImage("images/YODELTEST_FINAL.png");

  // Renommer les masques au même nom suivi des chiffres
  // Mettre les masques dans les dossiers Mask1 et Mask2
  for (let i = 1; i <= 8; i++) {
    maskArray.push(loadImage("Mask1/MASK_TEST_" + i + ".jpg"));
  }
  for (let i = 1; i <= 8; i++) {
    maskArray1.push(loadImage("Mask2/MASK_TEST_" + i + ".jpg"));
  }

  //   for (let i = 1; i <= 12; i++) {
  //     maskArray.push(loadImage("Mask1/NEW_MASK_" + i + ".jpg"));
  //   }
  //   for (let i = 1; i <= 12; i++) {
  //     maskArray1.push(loadImage("Mask2/NEW_MASK_" + i + ".jpg"));
  //   }

  image_text = loadImage("images/REFONT_TXT_TEST_FINAL.jpg");
}

function setup() {
//   pixelDensity(1);

//   mic = new p5.AudioIn();
//   mic.start();
  
  const dpi = 150;

  // Calculate the needed canvas size
  const wCanvas = round(((posterWidth / 25.4) * dpi) / pixelDensity());
  const hCanvas = round(((posterHeight / 25.4) * dpi) / pixelDensity());

  print(wCanvas, hCanvas);
  createCanvas(wCanvas, hCanvas);

  // Reduce size of preview
  let scalePreview = 0.2;
  let cnv = document.getElementById("defaultCanvas0");
  cnv.style.width = round(width * scalePreview) + "px";
  cnv.style.height = round(height * scalePreview) + "px";

//   createCanvas(posterWidth, posterHeight); // Créer le canevas

  // Bouton Record
  VideoRecorder.addButton();

  // Redimensionner les images pour s'adapter à la fenêtre
  image_01.resize(wCanvas, hCanvas);
  image_01.loadPixels();
  image_02.resize(wCanvas, hCanvas);
  image_02.loadPixels();
  image_text.resize(wCanvas, hCanvas);
  image_yodel.resize(wCanvas, hCanvas);

  maskArray.forEach((mask) => {
    mask.resize(wCanvas, hCanvas);
    mask.loadPixels();
  });
  maskArray1.forEach((mask) => {
    mask.resize(wCanvas, hCanvas);
    mask.loadPixels();
  });

  img = createImage(wCanvas, hCanvas);

  //   noLoop();
}

function draw() {
  background(255);

//   let vol = mic.getLevel();
//   percentMicVolume = map(vol, 0, 1, 255, 0);

  //texte en fond
  image(image_text, 0, 0);

  // ordre
  drawImage(
    image_01,
    maskArray[currentMaskIndex],
    map(percentMousePosition, 0, 50, 0, 255)
  );
  drawImage(
    image_02,
    maskArray1[currentMaskIndex1],
    map(percentMousePosition, 5, 100, 0, 255)
  );
}

function drawImage(imageRef, imageMask, threshold) {
  for (let x = 0; x < imageMask.width; x++) {
    for (let y = 0; y < imageMask.height; y++) {
      const i = (x + y * imageMask.width) * 4;

      const r = imageMask.pixels[i + 0];
      const g = imageMask.pixels[i + 1];
      const b = imageMask.pixels[i + 2];

      // Obtenir la luminosité
      const pixelsLuminosity = (r + g + b) / 3;

      // Si la luminosité est au-dessus de notre seuil, rendre le pixel transparent
      if (pixelsLuminosity >= threshold) {
        img.set(x, y, color(255, 255, 255, 0)); // Définit la couleur du pixel à blanc avec une transparence de 0
      } else {
        img.set(
          x,
          y,
          color(
            imageRef.pixels[i + 0],
            imageRef.pixels[i + 1],
            imageRef.pixels[i + 2],
            255
          )
        );
      }
    }
  }

  img.updatePixels();

  // Afficher l'image traitée
  image(img, 0, 0);
  image(image_yodel, 0, 0);
}

function mouseMoved() {
  percentMousePosition = map(mouseX, 10, width, 4, 100);
  redraw();
}

function mousePressed() {
  // Changer l'index du masque actuel
  currentMaskIndex = (currentMaskIndex + 1) % maskArray.length;
  currentMaskIndex1 = (currentMaskIndex1 + 1) % maskArray1.length;
  //   redraw();
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("Poster_Pots", "tiff"); // Enregistrer l'image au format TIFF
  }
}
