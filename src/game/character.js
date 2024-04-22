
class Character {
  constructor(name, attributes) {
    this.name = name;
    this.health = attributes.health;
    this.attacks = {
      fire: attributes.fireAttack,
      water: attributes.waterAttack,
      light: attributes.lightAttack,
      dark: attributes.darkAttack
    };
    this.defenses = {
      fire: attributes.fireDefense,
      water: attributes.waterDefense,
      light: attributes.lightDefense,
      dark: attributes.darkDefense
    };

    this.crit_chance = 0.15;
    this.crit_damage = 1.5;
    this.block_chance = 0.1;
    this.block_damage_reduction = 0.25;
    this.level = 1;
  }

  getTypeEffectiveness(attackType, defenseType) {
    const effectiveness = {
      fire: { water: 0.5, light: 1.0, dark: 1.0, fire: 1.0 },
      water: { water: 1.0, light: 1.0, dark: 1.0, fire: 1.5 },
      light: { water: 1.0, light: 1.0, dark: 1.5, fire: 1.0 },
      dark: { water: 1.0, light: 1.0, dark: 1.0, fire: 1.0 }
    };

    return effectiveness[attackType][defenseType];
  }

  attack(target, type) {
    const baseAttack = this.attacks[type];
    const defenseType = Object.keys(target.defenses).reduce((acc, key) => {
      return target.defenses[key] > target.defenses[acc] ? key : acc;
    }, 'fire');
    const defenseReduction = target.defenses[defenseType] || 0;
    let damage = (baseAttack - defenseReduction) * this.getTypeEffectiveness(type, defenseType);

    if (Math.random() < this.crit_chance) {
      damage *= this.crit_damage;
      console.log(`${this.name} lands a critical hit on ${target.name}!`);
    }

    damage = Math.max(0, damage);

    target.takeDamage(damage);
    console.log(`${this.name} attacks ${target.name} with ${type} attack, dealing ${damage} damage.`);
  }

  takeDamage(amount) {
    if (Math.random() < this.block_chance) {
      const blockedAmount = amount * this.block_damage_reduction;
      amount -= blockedAmount;
      console.log(`${this.name} blocks ${blockedAmount} damage.`);
    }

    this.health -= amount;
    console.log(`${this.name} takes ${amount} damage, ${this.health} health remaining.`);

  }
}
