export interface IVector {
  x: number;
  y: number;
}

export interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function sign(n: number): number {
  return n > 0 ? 1 : n == 0 ? 0 : -1;
}

export function getMinSeparation(a: IRectangle, b: IRectangle): IVector {
  let msv = { x: 0, y: 0 };

  let aw = a.width / 2;
  let ah = a.height / 2;

  let bw = b.width / 2;
  let bh = b.height / 2;

  let tx = (b.x + bw) - (a.x + aw);
  let ty = (b.y + bh) - (a.y + ah);

  let ox = aw + bw - Math.abs(tx);
  let oy = aw + bw - Math.abs(ty);

  if (ox < oy) {
    msv.x = ox * sign(tx);
  } else {
    msv.y = oy * sign(ty);
  }

  return msv;
}
