import { TileMap, Edges } from "./TileMap";
import { Entity } from "./Entity";
import { getMinSeparation } from "./math";

const GRAVITY = 300;

export class Level {

  public width = 640;
  public height = 320;

  public map = new TileMap();

  public entities: Entity[] = [];

  public player: Entity;

  private collideMap = new TileMap();

  constructor() {
    this.player = new Entity();
    this.player.width = 6;
    this.player.height = 12;
    this.player.sprite = 0;

    let spikes = new Entity();
    spikes.width = 12;
    spikes.height = 12;
    spikes.sprite = 1;
    this.entities.push(spikes);
    spikes.x = 2;

    this.entities.push(this.player);

    this.map.resize(80, 40);
    this.width = this.map.width * this.map.tileSize;
    this.height = this.map.height * this.map.tileSize;

    this.map.forEach((value, x, y) => {
      let tile = Math.random() < 0.3 ? 1 : 0;
      this.map.set(x, y, tile);
    });

    for (let y = 0; y < this.map.height; ++y) {
      for (let x = 0; x < this.map.width; ++x) {

      }
    }
  }

  public update(dt: number) {

    const t = dt / 1000;

    for (let entity of this.entities) {
      // TODO: gravity

      entity.vy += GRAVITY * t;


      entity.y += entity.vy * t;
      this.mapCollide(entity);



      entity.x += entity.dx * entity.speed * t;
      entity.x += entity.vx * t;

      this.mapCollide(entity);


    }

  }

  private mapCollide(entity: Entity) {
    const size = this.map.tileSize;
    let ox = Math.floor(entity.x / size);
    let oy = Math.floor(entity.y / size);
    let tx = Math.floor(entity.right / size);
    let ty = Math.floor(entity.bottom / size);

    for (let y = oy; y <= ty; ++y) {
      for (let x = ox; x <= tx; ++x) {
        let value = this.map.get(x, y);
        if (value === 1) {
          let tile = { x: x * size, y: y * size, width: size, height: size };
          let edgeMask = this.map.generateEdgeMask(x, y);
          let msv = getMinSeparation(entity, tile);

          if (msv.x !== 0 && (entity.vx > 0 || entity.dx > 0) && (edgeMask & Edges.West) > 0 && entity.x < tile.x && entity.right > tile.x) {
            entity.x = tile.x - entity.width;
            entity.vx = 0;
          }

          if (msv.x !== 0 && (entity.vx < 0 || entity.dx < 0) && (edgeMask & Edges.East) > 0 && entity.x < tile.x + size && entity.right > tile.x + size) {
            entity.x = tile.x + size;
            entity.vx = 0;
          }

          if (msv.y !== 0 && entity.vy > 0 && (edgeMask & Edges.North) > 0 && entity.y < tile.y && entity.bottom > tile.y) {
            entity.y = tile.y - entity.height;
            entity.vy = 0;
            entity.land();
          }

          if (msv.y !== 0 && entity.vy < 0 && (edgeMask & Edges.South) > 0 && entity.y < tile.y + size && entity.bottom > tile.y + size) {
            entity.y = tile.y + size;
            entity.vy = 0;
          }


          // let msv = getMinSeparation(entity, tile);
          // entity.x -= msv.x;
          // entity.y -= msv.y;
          //
          // if (msv.x !== 0) {
          //   entity.vx = 0;
          // } else {
          //   entity.vy = 0;
          //   entity.land();
          // }
        }
      }
    }

    if (entity.y < 0) {
      entity.y = 0;
      entity.vy = 0;
    } else if (entity.bottom > this.height) {
      entity.y = this.height - entity.height;
      entity.vy = 0;
      entity.land();
    }

    if (entity.x < 0) {
      entity.x = 0;
      entity.vx = 0;
    } else if (entity.right > this.width) {
      entity.x = this.width - entity.width;
      entity.vx = 0;
    }

  }

}
