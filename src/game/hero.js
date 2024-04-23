export class Hero {
  constructor(heroData) {
    if (!heroData || !heroData.stats) {
      throw new Error("Invalid hero data provided");
    }

    this.name = heroData.name;
    this.image = heroData.image;

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
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (!data) {
      return null;
    }

    let obj;
    try {
      obj = JSON.parse(data);
      if (!obj || typeof obj !== 'object') {
        return null;
      }
    } catch (e) {
      console.error("Deserialization error: ", e);
      return null;
    }
    console.log(obj.name)
    return new Hero({
      name: obj.name,
      image: obj.image,
      stats: {
        "Fire Attack": obj.fireAttack,
        "Water Attack": obj.waterAttack,
        "Light Attack": obj.lightAttack,
        "Dark Attack": obj.darkAttack,
        "Fire Defense": obj.fireDefense,
        "Water Defense": obj.waterDefense,
        "Light Defense": obj.lightDefense,
        "Dark Defense": obj.darkDefense,
        "Crafting Speed": obj.craftingSpeed,
        "Gathering Speed": obj.gatheringSpeed,
        "Hunger": obj.hunger
      }
    });
  }
}
