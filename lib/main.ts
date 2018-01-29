import { Keyboard, Key } from "./Keyboard";
import { Level } from "./sim/Level";
import { clamp } from "./sim/math";
import { Palette } from "./palette";

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = Math.floor(STAGE_WIDTH / 2);
const VIEW_SCALE = 3;
const SPRITE_SIZE = 16;

// Game simulation
const level = new Level();

const stage = document.createElement("canvas");
stage.id = "stage";
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
document.body.appendChild(stage);

const sprites = new Image();
sprites.src = "images/sprites.png";

const tiles = new Image();
tiles.src = "images/tiles.png";

const ctx = stage.getContext("2d");
if (ctx !== null) {
  ctx.imageSmoothingEnabled = false;
}

const keyboard = new Keyboard();

let clock = 0;

let cameraX = 0;
let cameraY = 0;

const update = (time: number) => {
  const dt = time - clock;
  clock = time;
  input();
  level.update(dt);
  updateCamera();
  render();
  requestAnimationFrame(update);
};

const updateCamera = () => {
  let player = level.player;

  let x = player.x + player.width / 2 - STAGE_WIDTH / VIEW_SCALE / 2;
  let y = player.y + player.height / 2 - STAGE_HEIGHT / VIEW_SCALE / 2;

  let maxX = level.width - STAGE_WIDTH / VIEW_SCALE;
  let maxY = level.height - STAGE_HEIGHT / VIEW_SCALE;

  cameraX = clamp(x, 0, maxX);
  cameraY = clamp(y, 0, maxY);
};

const input = () => {
  if (keyboard.down(Key.Space)) {
    level.player.jump();
  }
  level.player.dx = 0;
  if (keyboard.down(Key.Right)) {
    level.player.dx += 1;
  }
  if (keyboard.down(Key.Left)) {
    level.player.dx -= 1;
  }
};

const render = () => {
  if (ctx === null) { return; }

  ctx.fillStyle = Palette.Blue;
  ctx.fillRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);

  // Render map
  const size = level.map.tileSize * VIEW_SCALE;
  for (let y = 0; y < level.map.height; ++y) {
    for (let x = 0; x < level.map.width; ++x) {
      let value = level.map.get(x, y);
      if (value === 1) {
        let sx = (value - 1) * SPRITE_SIZE;
        ctx.drawImage(tiles, sx, 0, SPRITE_SIZE, SPRITE_SIZE, x * size - cameraX * VIEW_SCALE, y * size - cameraY * VIEW_SCALE, size, size);
      }
    }
  }

  ctx.strokeStyle = "#FF00FF";
  ctx.lineWidth = 1;

  // Render entities
  for (let entity of level.entities) {
    if (entity.sprite === -1) { continue; }

    let sx = entity.sprite * SPRITE_SIZE;

    let dx = Math.round(entity.x + entity.width / 2 - SPRITE_SIZE / 2 - cameraX) * VIEW_SCALE;
    let dy = Math.round(entity.bottom - SPRITE_SIZE - cameraY) * VIEW_SCALE;
    ctx.drawImage(sprites, sx, 0, SPRITE_SIZE, SPRITE_SIZE, dx, dy, SPRITE_SIZE * VIEW_SCALE, SPRITE_SIZE * VIEW_SCALE);

    // ctx.strokeRect(entity.x * VIEW_SCALE, entity.y * VIEW_SCALE, entity.width * VIEW_SCALE, entity.height * VIEW_SCALE);
  }

};

const run = () => {
  keyboard.init();
  requestAnimationFrame(update);
};

const resizeStage = () => {
  // Viewport width
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Determine scale while maintaining aspect ratio
  let scale = Math.min(width / stage.width, height / stage.height);

  // Calculate centered position for scaled canvas
  let left = width / 2 - (stage.width / 2 * scale);
  let top = height / 2 - (stage.height / 2 * scale);

  // Apply styles
  stage.style.transformOrigin = "0 0";
  stage.style.transform = `scale(${scale}, ${scale})`;
  stage.style.left = `${left}px`;
  stage.style.top = `${top}px`;
};

resizeStage();
window.addEventListener("resize", resizeStage, false);

run();
