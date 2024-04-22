class Battle {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
  }

  start() {
    console.log("The battle begins!");
    let round = 1;

    while (this.player.health > 0 && this.monster.health > 0) {
      console.log(`Round ${round}:`);

      this.playerTurn();

      if (this.monster.health <= 0) {
        console.log(`${this.monster.name} has been defeated!`);
        break;
      }

      this.monsterTurn();

      if (this.player.health <= 0) {
        console.log(`${this.player.name} has been defeated!`);
        break;
      }

      round++;
      console.log();
    }

    this.endBattle();
  }

  playerTurn() {
    const attackType = this.chooseAttackType(this.player);
    this.player.attack(this.monster, attackType);
  }

  monsterTurn() {
    const attackType = this.chooseAttackType(this.monster);
    this.monster.attack(this.player, attackType);
  }

  chooseAttackType(character) {
    return Object.keys(character.attacks).reduce((a, b) => character.attacks[a] > character.attacks[b] ? a : b);
  }

  endBattle() {
    if (this.player.health > 0) {
      console.log(`${this.player.name} wins the battle!`);
    } else {
      console.log(`${this.monster.name} wins the battle!`);
    }
  }
}
