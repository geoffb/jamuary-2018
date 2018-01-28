import { TileMap, Edges } from "./TileMap";
import { Entity } from "./Entity";
import { getMinSeparation } from "./math";

const GRAVITY = 250;

export class Level {

  public height = 320;

  public map = new TileMap();

  public entities: Entity[] = [];

  public player: Entity;

  private collideMap = new TileMap();

  constructor() {
    this.player = new Entity();
    this.entities.push(this.player);

    this.map.resize(40, 20);

    this.map.set(19, 15, 1);
    this.map.set(19, 18, 1);
    this.map.set(19, 19, 1);
    this.map.set(18, 19, 1);
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

    // Floor
    if (entity.bottom > this.height) {
      entity.y = this.height - entity.height;
      entity.vy = 0;
      entity.land();
    }

  }

}
