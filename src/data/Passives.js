export const EthanPassive = {
  name: "Fire Mastery",
  description: "Increases fire attack by 23%.",
  usePassive: hero => {
    hero.fireAttack *= 1.23;
  }
};

export const DrewPassive = {
  name: "Light Guard",
  description: "Increases light defense by 30%.",
  usePassive: hero => {
    hero.lightDefense *= 1.3;
  }
};

export const JonathanPassive = {
  name: "Water Healer",
  description: "Heals the hero by 10% of max health after each attack.",
  usePassive: hero => {
    const healAmount = hero.health * 0.1;
    hero.currentHealth = Math.min(hero.health, hero.currentHealth + healAmount);
  }
};

export const NicholasPassive = {
  name: "Shield Master",
  description: "Increases all defense stats by 15%.",
  usePassive: hero => {
    hero.fireDefense *= 1.15;
    hero.waterDefense *= 1.15;
    hero.lightDefense *= 1.15;
    hero.darkDefense *= 1.15;
  }
};

export const ConorPassive = {
  name: "Swift Attack",
  description: "Increases attack speed by 20%.",
  usePassive: hero => {
    hero.craftingSpeed *= 1.2;
    hero.gatheringSpeed *= 1.2;
  }
};

export const MaraPassive = {
  name: "Dark Sorcery",
  description: "Increases dark attack by 25%.",
  usePassive: hero => {
    hero.darkAttack *= 1.25;
  }
};

export const SavPassive = {
  name: "Crafting Genius",
  description: "Increases crafting speed by 30%.",
  usePassive: hero => {
    hero.craftingSpeed *= 1.3;
  }
};

export const LainePassive = {
  name: "Resilient Gatherer",
  description: "Increases gathering speed by 25%.",
  usePassive: hero => {
    hero.gatheringSpeed *= 1.25;
  }
};

export const TomPassive = {
  name: "Party Leader",
  description: "Increases all party members' health by 10%.",
  usePassive: hero => {
    hero.health *= 1.1;
    console.log(`Increased ${hero.name}'s health to ${hero.health}`);
  }
};

export const CrisluigyPassive = {
  name: "Elemental Master",
  description: "Increases all elemental attacks by 20%.",
  usePassive: hero => {
    hero.fireAttack *= 1.2;
    hero.waterAttack *= 1.2;
    hero.lightAttack *= 1.2;
    hero.darkAttack *= 1.2;
  }
};

export const NikPassive = {
  name: "Balanced Defender",
  description: "Increases defense stats by 10% increases health by 5%.",
  usePassive: hero => {
    hero.fireDefense *= 1.1;
    hero.waterDefense *= 1.1;
    hero.lightDefense *= 1.1;
    hero.darkDefense *= 1.1;
    hero.health *= 1.05;
  }
};
