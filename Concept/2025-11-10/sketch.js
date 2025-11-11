// ...existing code...
let robotModel;
let robotTexture;

const params = {
  ambientColor: '#808080',
  ambientIntensity: 0.6,   // 0..1
  directionalColor: '#ffffff',
  directionalIntensity: 0.9,
  directionalDir: { x: 0.5, y: -1, z: -0.5 },
  pointColor: '#b0b0ff',
  pointIntensity: 0.5,
  textureEnabled: true,
  modelScale: 3,
  rotSpeed: 0.01
};

let ui = {};

function preload() {
  // fichiers à placer dans assets/: Robot.obj, (optionnel) robot_texture.png
  robotModel = loadModel('assets/Robot.obj', true);
  // si tu as une texture png:
  robotTexture = loadImage('assets/robot_texture.png', () => {}, () => {
    // texture non chargée -> ignore
    robotTexture = null;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  createControls();
}

function draw() {
  background(30);

  // convert colors and apply intensities
  const ac = color(params.ambientColor);
  ambientLight(red(ac) * params.ambientIntensity, green(ac) * params.ambientIntensity, blue(ac) * params.ambientIntensity);

  const dc = color(params.directionalColor);
  directionalLight(red(dc) * params.directionalIntensity, green(dc) * params.directionalIntensity, blue(dc) * params.directionalIntensity, params.directionalDir.x, params.directionalDir.y, params.directionalDir.z);

  const pc = color(params.pointColor);
  pointLight(red(pc) * params.pointIntensity, green(pc) * params.pointIntensity, blue(pc) * params.pointIntensity, 0, -200, 200);

  orbitControl(); // rotation souris

  /* push();
  rotateX(-0.1);
  rotateY(frameCount * params.rotSpeed);
  scale(params.modelScale);

  if (robotModel) {
    if (params.textureEnabled && robotTexture) {
      texture(robotTexture);
    } else {
      // fallback material when no texture: use fill to color model
      ambientMaterial(10);
      specularMaterial(100);
    }
    model(robotModel);
  } else {
    // message simple si modèle non chargé
    push();
    rotateY(frameCount * 0.1);
    normalMaterial();
    box(80);
    pop();
  }

  pop(); */

  // Dessiner le robot qui bondit verticalement 
  push();
  const jumpHeight = 50;
  const jumpSpeed = 0.01;
  const yOffset = abs(sin(frameCount * jumpSpeed)) * jumpHeight;
  translate(200, -yOffset, 0);
  rotateY(frameCount * params.rotSpeed);
  scale(params.modelScale * 0.5);

  if (robotModel) {
    if (params.textureEnabled && robotTexture) {
      texture(robotTexture);
    } else {
      ambientMaterial(10);
      specularMaterial(100);
    }
    model(robotModel);
  } else {
    push();
    rotateY(frameCount * 0.1);
    normalMaterial();
    box(40);
    pop();
  }
}

// UI pour contrôler les paramètres (p5.dom)
function createControls() {
  const container = createDiv().style('position', 'absolute').style('left', '10px').style('top', '10px').style('background', 'rgba(0,0,0,0.4)').style('padding', '8px').style('color', '#fff');
  container.id('ui');

  container.child(createSpan('Ambient').style('display','block'));
  ui.ambientColor = createColorPicker(params.ambientColor).parent(container);
  ui.ambientIntensity = createSlider(0, 2, params.ambientIntensity, 0.01).parent(container);

  container.child(createSpan('Directional').style('display','block').style('margin-top','6px'));
  ui.directionalColor = createColorPicker(params.directionalColor).parent(container);
  ui.directionalIntensity = createSlider(0, 2, params.directionalIntensity, 0.01).parent(container);

  container.child(createSpan('Point Light').style('display','block').style('margin-top','6px'));
  ui.pointColor = createColorPicker(params.pointColor).parent(container);
  ui.pointIntensity = createSlider(0, 2, params.pointIntensity, 0.01).parent(container);

  container.child(createSpan('Texture / Model').style('display','block').style('margin-top','6px'));
  ui.textureEnabled = createCheckbox('Texture', params.textureEnabled).parent(container);
  ui.modelScale = createSlider(0.1, 4, params.modelScale, 0.01).parent(container);
  ui.rotSpeed = createSlider(0, 0.1, params.rotSpeed, 0.001).parent(container);

  // sync valeurs UI -> params à chaque frame via input events
  ui.ambientColor.input(() => params.ambientColor = ui.ambientColor.value());
  ui.ambientIntensity.input(() => params.ambientIntensity = ui.ambientIntensity.value());
  ui.directionalColor.input(() => params.directionalColor = ui.directionalColor.value());
  ui.directionalIntensity.input(() => params.directionalIntensity = ui.directionalIntensity.value());
  ui.pointColor.input(() => params.pointColor = ui.pointColor.value());
  ui.pointIntensity.input(() => params.pointIntensity = ui.pointIntensity.value());
  ui.textureEnabled.changed(() => params.textureEnabled = ui.textureEnabled.checked());
  ui.modelScale.input(() => params.modelScale = ui.modelScale.value());
  ui.rotSpeed.input(() => params.rotSpeed = ui.rotSpeed.value());
}