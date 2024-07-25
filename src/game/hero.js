export class Hero {
  constructor(heroData) {
    this.name = heroData.name;
    this.heroNumber = heroData.heroNumber;
    this.image = heroData.image;
    this.spriteSheet = heroData.spriteSheet;
    this.heroClass = heroData.heroClass;
    this.heroGroup = heroData.heroGroup;
    this.passive = heroData.passive;

    this.health = heroData.stats["Health"];
    this.fireAttack = heroData.stats["Fire Attack"];
    this.waterAttack = heroData.stats["Water Attack"];
    this.lightAttack = heroData.stats["Light Attack"];
    this.darkAttack = heroData.stats["Dark Attack"];
    this.fireDefense = heroData.stats["Fire Defense"];
    this.waterDefense = heroData.stats["Water Defense"];
    this.lightDefense = heroData.stats["Light Defense"];
    this.darkDefense = heroData.stats["Dark Defense"];
    this.attackSpeed = heroData.stats["Attack Speed"];
    this.attackBar = 0;

    this.level = 1;
    this.experience = 0;
    this.requiredExperience = 100;

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
    let damage = 0;
    switch (this.heroClass) {
      case 'Berserker':
        damage = this.fireAttack;
        break;
      case 'Hunter':
        damage = this.waterAttack;
        break;
      case 'Wizard':
        damage = this.lightAttack;
        break;
    }
    return damage;
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
      heroNumber: this.heroNumber,
      image: this.image,
      spriteSheet: this.spriteSheet,
      heroClass: this.heroClass,
      heroGroup: this.heroGroup,
      passive: this.passive,
      health: this.health,
      fireAttack: this.fireAttack,
      waterAttack: this.waterAttack,
      lightAttack: this.lightAttack,
      darkAttack: this.darkAttack,
      fireDefense: this.fireDefense,
      waterDefense: this.waterDefense,
      lightDefense: this.lightDefense,
      darkDefense: this.darkDefense,
      attackSpeed: this.attackSpeed,
      attackBar: this.attackBar,
      level: this.level,
      experience: this.experience,
      requiredExperience: this.requiredExperience,
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

    return new Hero({
      name: obj.name,
      heroNumber: obj.heroNumber,
      image: obj.image,
      spriteSheet: obj.spriteSheet,
      heroClass: obj.heroClass,
      heroGroup: obj.heroGroup,
      passive: obj.passive,
      stats: {
        "Health": obj.health,
        "Fire Attack": obj.fireAttack,
        "Water Attack": obj.waterAttack,
        "Light Attack": obj.lightAttack,
        "Dark Attack": obj.darkAttack,
        "Fire Defense": obj.fireDefense,
        "Water Defense": obj.waterDefense,
        "Light Defense": obj.lightDefense,
        "Dark Defense": obj.darkDefense,
        "Attack Speed": obj.attackSpeed
      },
      level: obj.level,
      experience: obj.experience,
      requiredExperience: obj.requiredExperience
    });
  }
}
