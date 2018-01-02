import { Random } from "@mousepox/random";
import { combatCards, monsterCards } from "./data";
import { Unit } from "./Unit";

export class Dungeon {

  private _random = new Random();

  player: Unit = new Unit();

  deck: number[] = [];

  resetDeck () {
    for (let i = 0; i < monsterCards.length; ++i) {
      this.deck.push(i);
      // TODO: Shuffle deck
    }
    console.log(this._random.next());
  }

}
