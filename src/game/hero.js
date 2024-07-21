export class Hero {
  constructor(heroData) {
    if (!heroData || !heroData.stats) {
      throw new Error("Invalid hero data provided");
    }

    this.name = heroData.name;
    this.heroNumber = heroData.heroNumber;
    this.image = heroData.image;
    this.spriteSheet = heroData.spriteSheet;
    this.heroClass = heroData.heroClass;
    this.heroGroup = heroData.heroGroup;
    this.passive = heroData.passive;

    this.health = heroData.stats["Health"];

    this.attackCooldown = 1000; // 1 second cooldown between attacks
    this.lastAttackTime = 0;

    this.fireAttack = heroData.stats["Fire Attack"];
    this.waterAttack = heroData.stats["Water Attack"];
    this.lightAttack = heroData.stats["Light Attack"];
    this.darkAttack = heroData.stats["Dark Attack"];
    this.fireDefense = heroData.stats["Fire Defense"];
    this.waterDefense = heroData.stats["Water Defense"];
    this.lightDefense = heroData.stats["Light Defense"];
    this.darkDefense = heroData.stats["Dark Defense"];
    this.craftingSpeed = heroData.stats["Crafting Speed"];
    this.gatheringSpeed = heroData.stats["Gathering Speed"];
    this.hunger = heroData.stats["Hunger"];

    this.level = 1;
    this.experience = 0;
    this.requiredExperience = 100;
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

    attack(monster) {
      const now = Date.now();
      if (now - this.lastAttackTime >= this.attackCooldown) {
        this.lastAttackTime = now;
        const damage = this.calculateDamage();
        monster.takeDamage(damage);
        return damage; // Return the damage dealt for display purposes
      }
      return 0; // No damage dealt if still in cooldown
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

  serialize() {
    return JSON.stringify({
      name: this.name,
      attackCooldown: this.attackCooldown,
      lastAttackTime: this.lastAttackTime,
      heroNumber: this.heroNumber,
      image: this.image,
      spriteSheet: this.spriteSheet,
      heroClass: this.heroClass,
      heroGroup: this.heroGroup,
      passive: this.passive,
      stats: {
        "Health": this.health,
        "Fire Attack": this.fireAttack,
        "Water Attack": this.waterAttack,
        "Light Attack": this.lightAttack,
        "Dark Attack": this.darkAttack,
        "Fire Defense": this.fireDefense,
        "Water Defense": this.waterDefense,
        "Light Defense": this.lightDefense,
        "Dark Defense": this.darkDefense,
        "Crafting Speed": this.craftingSpeed,
        "Gathering Speed": this.gatheringSpeed,
        "Hunger": this.hunger
      },
      level: this.level,
      experience: this.experience,
      requiredExperience: this.requiredExperience
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
      attackCooldown: obj.attackCooldown,
      lastAttackTime: obj.lastAttackTime,
      image: obj.image,
      spriteSheet: obj.spriteSheet,
      heroClass: obj.heroClass,
      heroGroup: obj.heroGroup,
      passive: obj.passive,
      stats: {
        "Health": obj.stats["Health"],
        "Fire Attack": obj.stats["Fire Attack"],
        "Water Attack": obj.stats["Water Attack"],
        "Light Attack": obj.stats["Light Attack"],
        "Dark Attack": obj.stats["Dark Attack"],
        "Fire Defense": obj.stats["Fire Defense"],
        "Water Defense": obj.stats["Water Defense"],
        "Light Defense": obj.stats["Light Defense"],
        "Dark Defense": obj.stats["Dark Defense"],
        "Crafting Speed": obj.stats["Crafting Speed"],
        "Gathering Speed": obj.stats["Gathering Speed"],
        "Hunger": obj.stats["Hunger"]
      },
      level: obj.level,
      experience: obj.experience,
      requiredExperience: obj.requiredExperience
    });
  }
}