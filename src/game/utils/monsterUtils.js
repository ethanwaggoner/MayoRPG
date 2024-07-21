import { Monster } from '../monster';
import { MonsterStats } from '@/data/MonsterStats.js';
import { LANES, STAT_INCREASE_PER_LEVEL } from '../gameConstants';
import { displayDamage, findClosestHero, monsterKilled } from './gameUtils';
import { playHeroAttackAnimation } from './heroUtils';

export function spawnMonster(scene) {
  if (scene.monsters.countActive(true) < scene.maxMonsters) {
    const monsterIndex = Phaser.Math.Between(0, MonsterStats.length - 1);
    const element = ['A', 'B', 'C', 'D'][Phaser.Math.Between(0, 3)];
    const spriteKey = `monster${element}${monsterIndex}`;
    const x = Phaser.Math.Between(1100, 1200);
    const y = LANES[Phaser.Math.Between(0, LANES.length - 1)];

    const monsterData = {
      name: MonsterStats[monsterIndex].name,
      stats: {
        "Health": MonsterStats[monsterIndex].stats["Health"] * (1 + STAT_INCREASE_PER_LEVEL * (scene.currentLevel - 1)),
        "Fire Attack": MonsterStats[monsterIndex].stats["Fire Attack"] * (1 + STAT_INCREASE_PER_LEVEL * (scene.currentLevel - 1)),
        "Water Attack": MonsterStats[monsterIndex].stats["Water Attack"] * (1 + STAT_INCREASE_PER_LEVEL * (scene.currentLevel - 1)),
        "Light Attack": MonsterStats[monsterIndex].stats["Light Attack"] * (1 + STAT_INCREASE_PER_LEVEL * (scene.currentLevel - 1)),
        "Dark Attack": MonsterStats[monsterIndex].stats["Dark Attack"] * (1 + STAT_INCREASE_PER_LEVEL * (scene.currentLevel - 1)),
        "Fire Defense": MonsterStats[monsterIndex].stats["Fire Defense"],
        "Water Defense": MonsterStats[monsterIndex].stats["Water Defense"],
        "Light Defense": MonsterStats[monsterIndex].stats["Light Defense"],
        "Dark Defense": MonsterStats[monsterIndex].stats["Dark Defense"]
      }
    };

    const monster = new Monster(monsterData);
    const monsterSprite = scene.monsters.create(x, y, spriteKey).setOrigin(0.5, 0.5).setVelocityX(-100 * scene.selectedSpeed.value).setScale(3);
    monsterSprite.flipX = true;
    monsterSprite.setData('index', monsterIndex);
    monsterSprite.setData('element', element);
    monsterSprite.setData('instance', monster);
    monster.sprite = monsterSprite;

    createMonsterAnimations(scene, spriteKey, monsterIndex, element);
    monsterSprite.play(`monsterMove${element}${monsterIndex}`);
  }
}

export function createMonsterAnimations(scene, spriteKey, monsterIndex, element) {
  const moveFrames = scene.anims.generateFrameNumbers(spriteKey, { start: 0, end: 5 });
  const attackFrames = scene.anims.generateFrameNumbers(spriteKey, { start: 12, end: 17 });
  scene.anims.create({
    key: `monsterMove${element}${monsterIndex}`,
    frames: moveFrames,
    frameRate: 10 * scene.selectedSpeed.value,
    repeat: -1
  });
  scene.anims.create({
    key: `monsterAttack${element}${monsterIndex}`,
    frames: attackFrames,
    frameRate: 10 * scene.selectedSpeed.value,
    repeat: -1
  });
}

export function handleMonsterMovement(scene, monsterSprite, heroes, attackDistance) {
  const monster = monsterSprite.getData('instance');
  if (monsterSprite.x < 0) {
    monsterSprite.destroy();
  } else {
    const closestHero = findClosestHero(monsterSprite, heroes);
    if (closestHero && Phaser.Math.Distance.Between(monsterSprite.x, monsterSprite.y, closestHero.sprite.x, closestHero.sprite.y) < attackDistance) {
      monsterSprite.setVelocity(0);
      if (monsterSprite.anims.currentAnim?.key !== `monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
        monsterSprite.play(`monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
      }
      if (monster.canAttack()) {
        const damage = monster.calculateDamage();
        closestHero.hero.takeDamage(damage);
        displayDamage(scene, closestHero.sprite, damage, '#ff0000');
        if (closestHero.hero.health <= 0) {
          if (scene.continueAfterFighting.value) {
            scene.emit('restartGame');
            return;
          } else {
            scene.emit('gameOver');
            return;
          }
        }
      }

      playHeroAttackAnimation(closestHero.hero, closestHero.sprite);
      const heroDamage = closestHero.hero.attack(monster);
      if (heroDamage > 0) {
        displayDamage(scene, monsterSprite, heroDamage);
        if (monster.health <= 0) {
          monsterKilled(scene);
        }
      }
    } else {
      monsterSprite.setVelocityX(-100 * scene.selectedSpeed.value);
      if (monsterSprite.anims.currentAnim?.key !== `monsterMove${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
        monsterSprite.play(`monsterMove${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
      }
    }
  }
}