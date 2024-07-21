export class Monster {
  constructor(monsterData) {
    if (!monsterData || !monsterData.stats) {
      throw new Error("Invalid monster data provided");
    }

    this.name = monsterData.name;
    this.spriteSheet = monsterData.spriteSheet;

    this.health = monsterData.stats["Health"];
    this.fireAttack = monsterData.stats["Fire Attack"];
    this.waterAttack = monsterData.stats["Water Attack"];
    this.lightAttack = monsterData.stats["Light Attack"];
    this.darkAttack = monsterData.stats["Dark Attack"];
    this.fireDefense = monsterData.stats["Fire Defense"];
    this.waterDefense = monsterData.stats["Water Defense"];
    this.lightDefense = monsterData.stats["Light Defense"];
    this.darkDefense = monsterData.stats["Dark Defense"];
    this.sprite = null; // Initialize sprite as null

    this.attackCooldown = 1000; // 1 second cooldown between attacks
    this.lastAttackTime = 0;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    // Destroy the sprite associated with this monster
    if (this.sprite) {
      this.sprite.destroy();
    }
  }

  calculateDamage() {
    // Simple damage calculation
    return this.fireAttack;
  }

  canAttack() {
    const now = Date.now();
    if (now - this.lastAttackTime >= this.attackCooldown) {
      this.lastAttackTime = now;
      return true;
    }
    return false;
  }



  serialize() {
    return JSON.stringify({
      name: this.name,
      spriteSheet: this.spriteSheet,
      stats: {
        "Health": this.health,
        "Fire Attack": this.fireAttack,
        "Water Attack": this.waterAttack,
        "Light Attack": this.lightAttack,
        "Dark Attack": this.darkAttack,
        "Fire Defense": this.fireDefense,
        "Water Defense": this.waterDefense,
        "Light Defense": this.lightDefense,
        "Dark Defense": this.darkDefense
      }
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
      spriteSheet: obj.spriteSheet,
      stats: {
        "Health": obj.stats["Health"],
        "Fire Attack": obj.stats["Fire Attack"],
        "Water Attack": obj.stats["Water Attack"],
        "Light Attack": obj.stats["Light Attack"],
        "Dark Attack": obj.stats["Dark Attack"],
        "Fire Defense": obj.stats["Fire Defense"],
        "Water Defense": obj.stats["Water Defense"],
        "Light Defense": obj.stats["Light Defense"],
        "Dark Defense": obj.stats["Dark Defense"]
      }
    });
  }
}