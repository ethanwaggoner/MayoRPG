import Monster1SpriteA from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_A.png';
import Monster1SpriteB from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_B.png';
import Monster1SpriteC from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_C.png';
import Monster1SpriteD from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_001_D.png';
import Monster2SpriteA from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_002_A.png';
import Monster2SpriteB from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_002_B.png';
import Monster2SpriteC from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_002_C.png';
import Monster2SpriteD from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_002_D.png';
import Monster3SpriteA from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_003_A.png';
import Monster3SpriteB from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_003_B.png';
import Monster3SpriteC from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_003_C.png';
import Monster3SpriteD from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_003_D.png';
import Monster4SpriteA from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_004_A.png';
import Monster4SpriteB from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_004_B.png';
import Monster4SpriteC from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_004_C.png';
import Monster4SpriteD from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Monsters/Sprites/Enemy_004_D.png';


export const MonsterStats = [
  {
    name: "Goblin",
    spriteSheetA: Monster1SpriteA,
    spriteSheetB: Monster1SpriteB,
    spriteSheetC: Monster1SpriteC,
    spriteSheetD: Monster1SpriteD,
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
    spriteSheetA: Monster2SpriteA,
    spriteSheetB: Monster2SpriteB,
    spriteSheetC: Monster2SpriteC,
    spriteSheetD: Monster2SpriteD,
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
    spriteSheetA: Monster3SpriteA,
    spriteSheetB: Monster3SpriteB,
    spriteSheetC: Monster3SpriteC,
    spriteSheetD: Monster3SpriteD,
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
    spriteSheetA: Monster4SpriteA,
    spriteSheetB: Monster4SpriteB,
    spriteSheetC: Monster4SpriteC,
    spriteSheetD: Monster4SpriteD,
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

];
