import Phaser from 'phaser';
import { spawnMonster, handleMonsterMovement } from '../utils/monsterUtils';
import { createHeroes } from '../utils/heroUtils';
import { updateLevelText } from '../utils/gameUtils';
import { LANES, MAX_MONSTERS, ATTACK_DISTANCE, MONSTERS_PER_LEVEL } from '../gameConstants';
import { MonsterStats } from '@/data/MonsterStats.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.heroes = [];
    this.emit = () => {};
    this.selectedSpeed = { value: 1 };
    this.continueAfterFighting = { value: true };
    this.currentLevel = 1;
    this.monstersKilled = 0;
    this.monstersPerLevel = MONSTERS_PER_LEVEL;
    this.maxMonsters = MAX_MONSTERS;
    this.monsterSpawnEvent = null;
  }

  init(data) {
    this.heroes = data.heroes;
    this.emit = data.emit;
    this.selectedSpeed = data.selectedSpeed;
    this.continueAfterFighting = data.continueAfterFighting;
  }

  preload() {
    this.load.image('background', 'src/assets/BattleBackground2.jpg');
    this.heroes.forEach((hero, index) => {
      this.load.spritesheet(`hero${index}`, hero.spriteSheet, { frameWidth: 96, frameHeight: 96 });
    });
    MonsterStats.forEach((monster, index) => {
      this.load.spritesheet(`monsterA${index}`, monster.spriteSheetA, { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet(`monsterB${index}`, monster.spriteSheetB, { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet(`monsterC${index}`, monster.spriteSheetC, { frameWidth: 32, frameHeight: 32 });
      this.load.spritesheet(`monsterD${index}`, monster.spriteSheetD, { frameWidth: 32, frameHeight: 32 });
    });
  }

  create() {
    this.add.image(600, 300, 'background');
    createHeroes(this, this.heroes);
    this.monsters = this.physics.add.group();

    this.setupMonsterSpawning();

    this.levelText = this.add.text(800, 510, `Level: ${this.currentLevel}`, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
    this.nextLevelText = this.add.text(800, 540, `Monsters to Next Level: ${this.monstersPerLevel - this.monstersKilled}`, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);

    updateLevelText(this);
  }

  setupMonsterSpawning() {
    if (this.monsterSpawnEvent) {
      this.monsterSpawnEvent.remove();
    }
    this.monsterSpawnEvent = this.time.addEvent({
      delay: 1000 / this.selectedSpeed.value,
      callback: () => spawnMonster(this),
      loop: true
    });
  }

  update(time, delta) {
    this.monsters.getChildren().forEach(monsterSprite => {
      handleMonsterMovement(this, monsterSprite, this.heroes, ATTACK_DISTANCE);
    });
  }

  resetGame() {
    this.monstersKilled = 0;
    this.currentLevel = 1;
    this.maxMonsters = MAX_MONSTERS;
    updateLevelText(this);
    this.scene.restart();
  }

  setSpeed(newSpeed) {
    this.selectedSpeed.value = newSpeed;
    this.setupMonsterSpawning();
    this.monsters.getChildren().forEach(monsterSprite => {
      monsterSprite.setVelocityX(-100 * newSpeed);
      if (monsterSprite.anims.currentAnim) {
        monsterSprite.anims.timeScale = newSpeed;
      }
    });
    this.heroes.forEach((hero) => {
      if (hero.sprite && hero.sprite.anims.currentAnim) {
        hero.sprite.anims.timeScale = newSpeed;
      }
    });
  }
}