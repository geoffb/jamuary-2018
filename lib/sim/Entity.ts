export class Entity {

  x = 0;
  y = 0;

  width = 16;
  height = 16;

  health = 1;

  vx = 0;
  vy = 0;

  speed = 100;

  dx = 0;

  jumpImpulse = -150;

  private jumpCount = 0;

  public jump() {
    if (this.jumpCount > 0) { return; }
    this.vy += this.jumpImpulse;
    this.jumpCount++;
  }

  public land() {
    this.jumpCount = 0;
  }

}
