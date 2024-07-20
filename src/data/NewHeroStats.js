import Hero1 from '@/assets/hero1animate.gif';
import Hero2 from '@/assets/hero2animate.gif';
import Hero3 from '@/assets/hero3animate.gif';
import Hero4 from '@/assets/hero4animate.gif';
import Hero5 from '@/assets/hero5animate.gif';
import Hero6 from '@/assets/hero6animate.gif';
import Hero7 from '@/assets/hero7animate.gif';
import Hero8 from '@/assets/hero8animate.gif';
import Hero9 from '@/assets/hero9animate.gif';
import Hero10 from '@/assets/hero10animate.gif';
import Hero11 from '@/assets/hero11animate.gif';

import Hero1Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_01.png';
import Hero2Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_02.png';
import Hero3Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_03.png';
import Hero4Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_04.png';
import Hero5Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_05.png';
import Hero6Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_06.png';
import Hero7Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_07.png';
import Hero8Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_08.png';
import Hero9Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_09.png';
import Hero10Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_10.png';
import Hero11Sprite from '@/assets/Rogue Adventure Assets/Rogue Adventure World 2.6.0/Characters/96x96/Hero_11.png';

import {
  EthanPassive, DrewPassive, JonathanPassive, NicholasPassive,
  ConorPassive, MaraPassive, SavPassive, LainePassive, TomPassive,
  CrisluigyPassive, NikPassive
} from '@/data/Passives.js';

export const NewHeroStats = [
  {
    name: "Ethan",
    image: Hero1,
    spriteSheet: Hero1Sprite,
    passive: EthanPassive,
    stats: {
      "Fire Attack": 1000,
      "Water Attack": 1200,
      "Light Attack": 600,
      "Dark Attack": 1800,
      "Fire Defense": 8,
      "Water Defense": 9,
      "Light Defense": 5,
      "Dark Defense": 14,
      "Health": 12000
    },
  },
  {
    name: "Drew",
    image: Hero2,
    spriteSheet: Hero2Sprite,
    passive: DrewPassive,
    stats: {
      "Fire Attack": 8,
      "Water Attack": 6,
      "Light Attack": 14,
      "Dark Attack": 10,
      "Fire Defense": 4,
      "Water Defense": 6,
      "Light Defense": 12,
      "Dark Defense": 8,
      "Health": 100
    },
  },
  {
    name: "Jonathan",
    image: Hero3,
    spriteSheet: Hero3Sprite,
    passive: JonathanPassive,
    stats: {
      "Fire Attack": 12,
      "Water Attack": 9,
      "Light Attack": 7,
      "Dark Attack": 10,
      "Fire Defense": 10,
      "Water Defense": 14,
      "Light Defense": 8,
      "Dark Defense": 12,
      "Health": 140
    },
  },
  {
    name: "Nicholas",
    image: Hero4,
    spriteSheet: Hero4Sprite,
    passive: NicholasPassive,
    stats: {
      "Fire Attack": 14,
      "Water Attack": 11,
      "Light Attack": 9,
      "Dark Attack": 7,
      "Fire Defense": 12,
      "Water Defense": 18,
      "Light Defense": 10,
      "Dark Defense": 15,
      "Health": 150
    },
  },
  {
    name: "Conor",
    image: Hero5,
    spriteSheet: Hero5Sprite,
    passive: ConorPassive,
    stats: {
      "Fire Attack": 9,
      "Water Attack": 8,
      "Light Attack": 14,
      "Dark Attack": 11,
      "Fire Defense": 6,
      "Water Defense": 7,
      "Light Defense": 12,
      "Dark Defense": 10,
      "Health": 105
    },
  },
  {
    name: "Mara",
    image: Hero6,
    spriteSheet: Hero6Sprite,
    passive: MaraPassive,
    stats: {
      "Fire Attack": 11,
      "Water Attack": 14,
      "Light Attack": 7,
      "Dark Attack": 9,
      "Fire Defense": 9,
      "Water Defense": 12,
      "Light Defense": 10,
      "Dark Defense": 15,
      "Health": 130
    },
  },
  {
    name: "Sav",
    image: Hero7,
    spriteSheet: Hero7Sprite,
    passive: SavPassive,
    stats: {
      "Fire Attack": 7,
      "Water Attack": 9,
      "Light Attack": 11,
      "Dark Attack": 14,
      "Fire Defense": 5,
      "Water Defense": 6,
      "Light Defense": 9,
      "Dark Defense": 12,
      "Health": 110
    },
  },
  {
    name: "Laine",
    image: Hero8,
    spriteSheet: Hero8Sprite,
    passive: LainePassive,
    stats: {
      "Fire Attack": 6,
      "Water Attack": 8,
      "Light Attack": 12,
      "Dark Attack": 14,
      "Fire Defense": 5,
      "Water Defense": 6,
      "Light Defense": 9,
      "Dark Defense": 12,
      "Health": 115
    },
  },
  {
    name: "Tom",
    image: Hero9,
    spriteSheet: Hero9Sprite,
    passive: TomPassive,
    stats: {
      "Fire Attack": 12,
      "Water Attack": 14,
      "Light Attack": 9,
      "Dark Attack": 7,
      "Fire Defense": 10,
      "Water Defense": 15,
      "Light Defense": 12,
      "Dark Defense": 18,
      "Health": 145
    },
  },
  {
    name: "Crisluigy",
    image: Hero10,
    spriteSheet: Hero10Sprite,
    passive: CrisluigyPassive,
    stats: {
      "Fire Attack": 14,
      "Water Attack": 11,
      "Light Attack": 18,
      "Dark Attack": 7,
      "Fire Defense": 12,
      "Water Defense": 9,
      "Light Defense": 10,
      "Dark Defense": 15,
      "Health": 135
    },
  },
  {
    name: "Nik",
    image: Hero11,
    spriteSheet: Hero11Sprite,
    passive: NikPassive,
    stats: {
      "Fire Attack": 9,
      "Water Attack": 12,
      "Light Attack": 14,
      "Dark Attack": 11,
      "Fire Defense": 7,
      "Water Defense": 10,
      "Light Defense": 12,
      "Dark Defense": 15,
      "Health": 125
    }
}
];

