class Player extends Character {
  constructor(name, attributes) {
    super(name, attributes);
    this.experience = 0;
    this.level = 1;

    this.skills = {
      craftingSpeed: attributes.craftingSpeed,
      gatheringSpeed: attributes.gatheringSpeed,
      hunger: attributes.hunger
    };

  }
}


