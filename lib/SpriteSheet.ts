export class SpriteSheet {

  public texture = new Image();

  public spriteSize = 0;

  private _ready = false;

  public get ready(): boolean {
    return this._ready;
  }

  public get spritesPerRow(): number {
    return Math.floor(this.texture.width / this.spriteSize);
  }

  constructor(path: string, spriteSize: number) {
    this.texture.src = path;
    this.texture.onload = () => {
      this._ready = true;
    };
    this.spriteSize = spriteSize;
  }

}
