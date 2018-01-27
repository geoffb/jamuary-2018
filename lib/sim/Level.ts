import { Entity } from "./Entity";

const GRAVITY = 250;

export class Level {

  public height = 320;

  public entities: Entity[] = [];

  public player: Entity;

  constructor() {
    this.player = new Entity();
    this.entities.push(this.player);
  }

  public update(dt: number) {

    const t = dt / 1000;

    for (let entity of this.entities) {
      // TODO: gravity

      entity.vy += GRAVITY * t;

      entity.x += entity.dx * entity.speed * t;

      entity.x += entity.vx * t;
      entity.y += entity.vy * t;

      // TODO: map collision

      if (entity.y + entity.height > this.height) {
        entity.y = this.height - entity.height;
        entity.vy = 0;
        entity.land();
      }

    }

  }

}
