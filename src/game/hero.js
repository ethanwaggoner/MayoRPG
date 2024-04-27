export class Hero {
  constructor(heroData) {
    if (!heroData || !heroData.stats) {
      throw new Error("Invalid hero data provided");
    }

    this.name = heroData.name;
    this.heroNumber = heroData.heroNumber;
    this.image = heroData.image;
    this.heroClass = heroData.heroClass;

    this.health = heroData.stats["Health"];

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

  serialize() {
    return JSON.stringify({
      name: this.name,
      heroNumber: this.heroNumber,
      image: this.image,
      heroClass: this.heroClass,
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
      image: obj.image,
      heroClass: obj.heroClass,
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