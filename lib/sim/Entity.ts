import { IRectangle } from "./math";

export class Entity implements IRectangle {

  x = 0;
  y = 0;

  width = 16;
  height = 16;

  health = 1;

  vx = 0;
  vy = 0;

  speed = 60;

  dx = 0;

  sprite = -1;

  jumpImpulse = -125;

  private jumpCount = 0;

  public get right(): number {
    return this.x + this.width;
  }

  public get bottom(): number {
    return this.y + this.height;
  }

  public jump() {
    if (this.jumpCount > 0) { return; }
    this.vy += this.jumpImpulse;
    this.jumpCount++;
  }

  public land() {
    this.jumpCount = 0;
  }

}
