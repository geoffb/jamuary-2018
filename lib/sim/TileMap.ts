const EDGE_NEIGHBORS = [
  { x: -1, y: 0, value: 1 },
  { x: 0, y: -1, value: 2 },
  { x: 1, y: 0, value: 4 },
  { x: 0, y: 1, value: 8 }
];

export enum Edges {
  West = 1,
  North = 2,
  East = 4,
  South = 8,
}

export class TileMap {

  public width = 0;
  public height = 0;

  public tileSize = 16;

  private cells: number[] = [];

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = new Array(width * height);
    this.cells.fill(0);
  }

  public valid(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.width && y < this.width;
  }

  public get(x: number, y: number): number {
    if (!this.valid) { return -1; }
    let index = this.xyToIndex(x, y);
    return this.cells[index];
  }

  public set(x: number, y: number, value: number) {
    if (!this.valid(x, y)) { return; }
    let index = this.xyToIndex(x, y);
    this.cells[index] = value;
  }

  public generateEdgeMask(x: number, y: number): number {
    let mask = 0;
    let a = this.get(x, y);
    if (a === 0) { return mask; }
    for (let neighbor of EDGE_NEIGHBORS) {
      let b = this.get(x + neighbor.x, y + neighbor.y);
      if (b === 0) {
        mask |= neighbor.value;
      }
    }
    return mask;
  }

  private xyToIndex(x: number, y: number): number {
    return (y * this.width) + x;
  }

}
