import { Keyboard, Key } from "./Keyboard";
import { Level } from "./sim/Level";

import { Palette } from "./palette";

const STAGE_WIDTH = 640;
const STAGE_HEIGHT = Math.floor(STAGE_WIDTH / 2);

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

const keyboard = new Keyboard();

let clock = 0;

const update = (time: number) => {
  const dt = time - clock;
  clock = time;
  input();
  level.update(dt);
  render();
  requestAnimationFrame(update);
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

  const SPRITE_SIZE = 16;

  // Render map
  const size = level.map.tileSize;
  for (let y = 0; y < level.map.height; ++y) {
    for (let x = 0; x < level.map.width; ++x) {
      let value = level.map.get(x, y);
      if (value === 1) {
        let sx = (value - 1) * SPRITE_SIZE;
        ctx.drawImage(tiles, sx, 0, SPRITE_SIZE, SPRITE_SIZE, x * size, y * size, size, size);
      }
    }
  }

  ctx.strokeStyle = "#FF00FF";
  ctx.lineWidth = 1;

  // Render entities
  for (let entity of level.entities) {
    if (entity.sprite === -1) { continue; }

    let sx = entity.sprite * SPRITE_SIZE;

    let dx = Math.round(entity.x + entity.width / 2 - SPRITE_SIZE / 2);
    let dy = Math.round(entity.bottom - SPRITE_SIZE);
    ctx.drawImage(sprites, sx, 0, SPRITE_SIZE, SPRITE_SIZE, dx, dy, SPRITE_SIZE, SPRITE_SIZE);

    ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
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
