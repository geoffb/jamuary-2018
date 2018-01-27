export enum Key {
  Space = 32,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
}

export class Keyboard {

  private keyState = new Map<number, boolean>();

  public init() {
    window.addEventListener("keydown", this.onKeyDown.bind(this), false);
    window.addEventListener("keyup", this.onKeyUp.bind(this), false);
  }

  public down(key: Key): boolean {
    let state = this.keyState.get(key);
    return state === undefined ? false : state;
  }

  private onKeyDown(e: KeyboardEvent) {
    this.keyState.set(e.keyCode, true);
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keyState.set(e.keyCode, false);
  }

}
