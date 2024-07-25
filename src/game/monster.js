export class Monster {
  constructor(monsterData) {
    this.name = monsterData.name;
    this.stats = monsterData.stats;
    this.health = this.stats["Health"];
    this.attackSpeed = this.stats["AttackSpeed"];
    this.attackBar = 0;

    this.x = 0;
    this.y = 0;
    this.sprite = null;
  }

  update(delta) {
    this.attackBar += this.attackSpeed * delta / 1000;
    if (this.attackBar > 100) this.attackBar = 100;
  }

  attack(target) {
    if (this.attackBar >= 100) {
      const damage = Math.max(0, this.calculateDamage() - target.defense);
      target.takeDamage(damage);
      this.attackBar = 0;
      return damage;
    }
    return 0;
  }

  calculateDamage() {
    return this.stats["Fire Attack"]; // Adjust based on your logic
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    if (this.sprite) {
      this.sprite.setPosition(x, y);
    }
  }

  serialize() {
    return JSON.stringify({
      name: this.name,
      stats: this.stats,
      health: this.health,
      attackSpeed: this.attackSpeed,
      attackBar: this.attackBar,
      x: this.x,
      y: this.y
    });
  }

  static deserialize(data) {
    if (!data) return null;
    let obj;
    try {
      obj = JSON.parse(data);
      if (!obj || typeof obj !== 'object') return null;
    } catch (e) {
      console.error("Deserialization error: ", e);
      return null;
    }

    return new Monster({
      name: obj.name,
      stats: obj.stats
    });
  }
}
