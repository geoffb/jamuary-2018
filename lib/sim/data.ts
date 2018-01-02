export interface UnitCard {
  name: string;
  health: number;
  cards: number[];
}

export interface CombatCard {
  name: string;
}

// Combat card data
export var combatCards: CombatCard[] = [
  { // 0
    name: "Bite",
  }
];

// Monster data
export var monsterCards: UnitCard[] = [
  { // 0
    name: "Rat",
    health: 1,
    cards: [0]
  }
];
