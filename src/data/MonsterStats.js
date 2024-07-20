import Monster1Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_A.png';
import Monster2Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_002_B.png';
import Monster3Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_003_D.png';
import Monster4Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_004_C.png';
import Monster5Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_B.png';


export const MonsterStats = [
  {
    name: "Goblin",
    spriteSheet: Monster1Sprite,
    stats: {
      "Fire Attack": 6,
      "Water Attack": 4,
      "Light Attack": 7,
      "Dark Attack": 5,
      "Fire Defense": 3,
      "Water Defense": 2,
      "Light Defense": 4,
      "Dark Defense": 3,
      "Health": 80
    },
  },
  {
    name: "Orc",
    spriteSheet: Monster2Sprite,
    stats: {
      "Fire Attack": 12,
      "Water Attack": 10,
      "Light Attack": 8,
      "Dark Attack": 14,
      "Fire Defense": 8,
      "Water Defense": 6,
      "Light Defense": 10,
      "Dark Defense": 12,
      "Health": 150
    },
  },
  {
    name: "Troll",
    spriteSheet: Monster3Sprite,
    stats: {
      "Fire Attack": 10,
      "Water Attack": 8,
      "Light Attack": 6,
      "Dark Attack": 12,
      "Fire Defense": 6,
      "Water Defense": 5,
      "Light Defense": 7,
      "Dark Defense": 9,
      "Health": 120
    },
  },
  {
    name: "Dragon",
    spriteSheet: Monster4Sprite,
    stats: {
      "Fire Attack": 20,
      "Water Attack": 18,
      "Light Attack": 16,
      "Dark Attack": 22,
      "Fire Defense": 15,
      "Water Defense": 14,
      "Light Defense": 16,
      "Dark Defense": 18,
      "Health": 300
    },
  },
  {
    name: "Skeleton",
    spriteSheet: Monster5Sprite,
    stats: {
      "Fire Attack": 7,
      "Water Attack": 6,
      "Light Attack": 9,
      "Dark Attack": 8,
      "Fire Defense": 4,
      "Water Defense": 3,
      "Light Defense": 5,
      "Dark Defense": 6,
      "Health": 90
    },
  }
];
