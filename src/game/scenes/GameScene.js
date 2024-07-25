import Phaser from 'phaser';
import {Monster} from '../monster.js';
import {MonsterStats} from '@/data/MonsterStats';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.heroes = [];
    this.monsters = [];
    this.currentLevel = 1;
    this.maxLevel = 10;
    this.levelCooldown = false;
    this.gameSpeed = 1;
    this.continueAfterFighting = false;
    this.graphics = null;
    this.onGameOver = null;
  }

  init(data) {
    this.storeHeroes = data.heroes;
    this.gameSpeed = data.gameSpeed || 1;
    this.continueAfterFighting = data.continueAfterFighting || false;
    this.onGameOver = data.onGameOver;

  }

  preload() {
    this.load.image('background', 'src/assets/BattleBackground2.jpg');

    this.storeHeroes.forEach((hero, index) => {
      this.load.spritesheet(`hero${index}`, hero.spriteSheet, { frameWidth: 96, frameHeight: 96 });
    });

    MonsterStats.forEach(monster => {
      ['A', 'B', 'C', 'D'].forEach(variant => {
        const spriteKey = `monster${monster.name}${variant}`;
        this.load.spritesheet(spriteKey, monster[`spriteSheet${variant}`], { frameWidth: 32, frameHeight: 32 });
      });
    });
  }

   create() {
    this.add.image(600, 300, 'background');
    this.graphics = this.add.graphics();
    this.createHeroes();
    this.setupHeroes();
    this.setupMonsters();
    this.setupCombatLoop();
  }

  createHeroes() {
    this.heroes = this.storeHeroes.map((heroData, index) => {
      const hero = Object.create(heroData);
      hero.spriteKey = `hero${index}`;
      hero.attackBar = 0;
      hero.attackSpeed = heroData.attackSpeed || 5;
      hero.health = heroData.Health || 100;
      hero.attackPower = heroData.fireAttack || 10;
      this.createHeroAnimation(hero, index);
      return hero;
    });
  }

  createHeroAnimation(hero, index) {
    const frameRate = 10 * this.gameSpeed;

    let startFrame, endFrame;
    switch (hero.heroClass) {
      case 'Berserker':
        startFrame = 12;
        endFrame = 23;
        break;
      case 'Hunter':
        startFrame = 24;
        endFrame = 29;
        break;
      case 'Wizard':
        startFrame = 30;
        endFrame = 35;
        break;
      default:
        startFrame = 0;
        endFrame = 5;
    }

    this.anims.create({
      key: `heroIdle${index}`,
      frames: this.anims.generateFrameNumbers(`hero${index}`, { start: startFrame, end: endFrame }),
      frameRate,
      repeat: -1
    });
  }


  setupHeroes() {
    const heroPositions = [
      { x: 200, y: 300 }, { x: 150, y: 200 }, { x: 150, y: 400 },
      { x: 100, y: 100 }, { x: 100, y: 500 }
    ];
    this.heroes.forEach((hero, index) => {
      if (index < heroPositions.length) {
        hero.x = heroPositions[index].x;
        hero.y = heroPositions[index].y;
        this.createHeroContainer(hero);
      }
    });
  }

  getHealthColor(percentage) {
    const red = Math.floor(255 * (1 - percentage));
    const green = Math.floor(255 * percentage);
    return Phaser.Display.Color.GetColor(red, green, 0);
  }

  updateHealthBar(character) {
    const [, , healthRect] = character.healthBar;
    const healthPercentage = character.health / (character.maxHealth || 100);
    healthRect.width = 80 * healthPercentage;
    healthRect.fillColor = this.getHealthColor(healthPercentage);
  }

  createHealthBar(x, y, health, maxHealth) {
    const width = 80;
    const height = 8;
    const border = 2;

    // Border
    const borderRect = this.add.rectangle(x, y, width + border * 2, height + border * 2, 0x000000);
    borderRect.setOrigin(0.5, 0);

    // Background
    const bgRect = this.add.rectangle(x, y + border, width, height, 0xff0000);
    bgRect.setOrigin(0.5, 0);

    // Health
    const healthColor = this.getHealthColor(health / maxHealth);
    const healthRect = this.add.rectangle(x - width / 2, y + border, width * (health / maxHealth), height, healthColor);
    healthRect.setOrigin(0, 0);

    return [borderRect, bgRect, healthRect];
    }

    createAttackBar(x, y) {
      const width = 80;
      const height = 8;
      const border = 2;

      // Border
      const borderRect = this.add.rectangle(x, y, width + border * 2, height + border * 2, 0x000000);
      borderRect.setOrigin(0.5, 0);

      // Background
      const bgRect = this.add.rectangle(x, y + border, width, height, 0x808080);
      bgRect.setOrigin(0.5, 0);

      // Attack progress
      const attackRect = this.add.rectangle(x - width / 2, y + border, 0, height, 0x0000ff);
      attackRect.setOrigin(0, 0);

      return [borderRect, bgRect, attackRect];
    }

   createHeroContainer(hero) {
    const heroSprite = this.physics.add.sprite(0, 0, hero.spriteKey);
    heroSprite.setScale(1.5);
    hero.sprite = heroSprite;
    hero.sprite.setData('instance', hero);

    // Play idle animation (which is now the class-specific attack animation)
    hero.sprite.play(`heroIdle${this.heroes.indexOf(hero)}`);

    const attackBarGraphic = this.graphics.fillStyle(0x00ff00, 1);
    attackBarGraphic.fillRect(hero.x - 40, hero.y - 60, 0, 10); // Start with 0 width
    hero.attackBarGraphic = attackBarGraphic;

    const healthBar = this.createHealthBar(0, 50, hero.health, hero.health || 100);
    hero.healthBar = healthBar;

    const attackBar = this.createAttackBar(0, 65);
    hero.attackBar = attackBar;

    hero.container = this.add.container(hero.x, hero.y, [heroSprite, ...healthBar, ...attackBar]);
  }

  createCharacterAnimations(character, spriteKey) {
    this.anims.create({
      key: `${spriteKey}_idle`,
      frames: this.anims.generateFrameNumbers(spriteKey, { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: `${spriteKey}_attack`,
      frames: this.anims.generateFrameNumbers(spriteKey, { start: 4, end: 7 }),
      frameRate: 8,
      repeat: 0
    });

    character.sprite.play(`${spriteKey}_idle`);
  }

  setupMonsters() {
    this.monsters.forEach(monster => {
      if (monster.sprite) {
        monster.sprite.destroy();
      }
    });
    this.monsters = [];

    const monsterPositions = [
      { x: 1000, y: 300 }, { x: 1050, y: 200 }, { x: 1050, y: 400 },
      { x: 1100, y: 100 }, { x: 1100, y: 500 }
    ];
    for (let i = 0; i < 5; i++) {
      const monster = this.createRandomMonster();
      monster.x = monsterPositions[i].x;
      monster.y = monsterPositions[i].y;
      monster.attackBar = 0;
      monster.attackSpeed = Phaser.Math.Between(5, 12);
      monster.health = monster.health || 100;
      monster.attackPower = monster.attackPower || 10;
      this.createMonsterContainer(monster);
      this.monsters.push(monster);
    }
  }

  createRandomMonster() {
    const randomIndex = Phaser.Math.Between(0, MonsterStats.length - 1);
    const monsterData = MonsterStats[randomIndex];
    const monster = new Monster(monsterData);
    monster.spriteVariant = ['A', 'B', 'C', 'D'][Phaser.Math.Between(0, 3)];
    monster.spriteKey = `monster${monsterData.name}${monster.spriteVariant}`;
    return monster;
  }

  createMonsterContainer(monster) {
    const monsterSprite = this.physics.add.sprite(0, 0, monster.spriteKey);
    monsterSprite.setFlipX(true);
    monsterSprite.setScale(5);
    monster.sprite = monsterSprite;
    monster.sprite.setData('instance', monster);



    const healthBar = this.createHealthBar(0, 50, monster.health, monster.health || 100);
    monster.healthBar = healthBar;

    const attackBar = this.createAttackBar(0, 65);
    monster.attackBar = attackBar;

    monster.container = this.add.container(monster.x, monster.y, [monsterSprite, ...healthBar, ...attackBar]);

    this.createCharacterAnimations(monster, monster.spriteKey);
  }

  setupCombatLoop() {
    this.time.addEvent({
      delay: 100,
      callback: this.updateCombat,
      callbackScope: this,
      loop: true
    });
  }

   updateCombat() {
    if (this.levelCooldown) return;

    const delta = this.game.loop.delta * this.gameSpeed;

    [...this.heroes, ...this.monsters].forEach(character => {
      if (character.health > 0) {
        character.attackProgress = (character.attackProgress || 0) + character.attackSpeed * delta / 100;
        character.attackProgress = Math.min(character.attackProgress, 100); // Cap at 100

        // Update attack bar
        const [, , attackRect] = character.attackBar;
        attackRect.width = 80 * (character.attackProgress / 100);
      }
    });

    const allCharacters = [...this.heroes, ...this.monsters].filter(char => char.health > 0);
    const readyCharacter = allCharacters.find(char => char.attackProgress >= 100);

    if (readyCharacter) {
      readyCharacter.attackProgress = 0;
      this.moveToEnemyAndAttack(readyCharacter);
    }

    this.checkBattleEnd();
  }


   moveToEnemyAndAttack(attacker) {
    if (!attacker.container || !attacker.sprite) return;

    const targets = this.getTargets(attacker);
    const target = this.findClosestTarget(attacker, targets);

    if (target) {
      const direction = this.monsters.includes(attacker) ? -1 : 1;
      const moveDistance = 50 * direction;

      this.tweens.add({
        targets: attacker.container,
        x: attacker.container.x + moveDistance,
        duration: 500 / this.gameSpeed,
        onComplete: () => {
          if (attacker.container && target.container) {
            const damage = this.applyDamage(attacker, target);
            this.displayDamage(target, damage);

            this.tweens.add({
              targets: attacker.container,
              x: attacker.container.x - moveDistance,
              duration: 500 / this.gameSpeed,
              onComplete: () => {
                // The sprite is already playing the idle animation, which is the attack animation
              }
            });
          }
        }
      });
    }
  }

  getTargets(attacker) {
    return this.heroes.includes(attacker) ? this.monsters.filter(m => m.health > 0) : this.heroes.filter(h => h.health > 0);
  }

  findClosestTarget(attacker, targets) {
    return targets.reduce((closest, current) => {
      const distanceToCurrent = Phaser.Math.Distance.Between(attacker.x, attacker.y, current.x, current.y);
      const distanceToClosest = closest ? Phaser.Math.Distance.Between(attacker.x, attacker.y, closest.x, closest.y) : Infinity;
      return distanceToCurrent < distanceToClosest ? current : closest;
    }, null);
  }

applyDamage(attacker, target) {
    const damage = attacker.attackPower || 10;
    target.health = Math.max(0, target.health - damage);
    this.updateHealthBar(target);
    if (target.health <= 0) {
      if (target.container) {
        target.container.destroy();
      }
      target.container = null;
      target.sprite = null;
    }
    return damage;
  }

  displayDamage(target, damage) {
    const damageText = this.add.text(target.x, target.y - 20, damage.toString(), {
      font: '16px Arial',
      fill: '#ff0000'
    });
    this.tweens.add({
      targets: damageText,
      y: target.y - 50,
      alpha: 0,
      duration: 800 / this.gameSpeed,
      onComplete: () => damageText.destroy()
    });
  }

   checkBattleEnd() {
    if (this.heroes.every(hero => hero.health <= 0)) {
      this.endBattle('lose');
    } else if (this.monsters.every(monster => monster.health <= 0)) {
      this.endBattle('win');
    }
  }

  endBattle(result) {
    this.levelCooldown = true;
    if (result === 'win') {
      this.currentLevel++;
      if (this.currentLevel > this.maxLevel) {
        this.gameVictory();
      } else {
        this.time.delayedCall(2000 / this.gameSpeed, () => {
          this.setupMonsters();
          this.levelCooldown = false;
        });
      }
    } else {
      if (this.continueAfterFighting) {
        this.restartRound();
      } else {
        this.gameOver();
      }
    }
  }

   restartRound() {
    this.graphics.clear(); // Clear all graphics
    this.heroes.forEach(hero => {
      hero.health = hero.maxHealth || 100;
      hero.attackBar = 0;
      if (hero.container) {
        hero.container.destroy();
      }
    });
    this.monsters.forEach(monster => {
      if (monster.container) {
        monster.container.destroy();
      }
    });
    this.setupHeroes();
    this.setupMonsters();
    this.levelCooldown = false;
  }
  gameVictory() {
    this.add.text(400, 300, 'You Won!', { fontSize: '64px', fill: '#fff' });
    this.time.delayedCall(5000 / this.gameSpeed, () => {
      this.scene.restart();
    });
  }

gameOver() {
    const gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#fff' });
    this.time.delayedCall(2000 / this.gameSpeed, () => {
      gameOverText.destroy();
      if (this.onGameOver) {
        this.onGameOver();
      }
    });
  }


  setGameSpeed(speed) {
    this.gameSpeed = speed;
  }

  setContinueAfterFighting(value) {
    this.continueAfterFighting = value;
  }
}