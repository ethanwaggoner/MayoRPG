<script setup>
import { computed, onMounted, ref } from 'vue';
import Phaser from 'phaser';
import { useHeroStore } from "@/store/HeroStore.js";
import { MonsterStats } from '@/data/MonsterStats.js';
import { Hero } from '@/game/hero.js';
import { Monster } from '@/game/monster.js';

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);
let game;

const lanes = [150, 240, 330, 420, 510]; // Y positions for the 5 lanes
const maxMonsters = 20;
const attackDistance = 50; // Define the stopping distance in front of the hero

onMounted(() => {
  heroStore.loadHeroData();

  if (game) {
    game.destroy(true);
  }

  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: {
      preload,
      create,
      update
    },
    parent: gameContainer.value
  };

  game = new Phaser.Game(config);

  function preload() {
    this.load.image('background', 'src/assets/BattleBackground2.jpg');
    loadSpritesheets(this, heroes1.value, 'hero', 96, 96);
    loadSpritesheets(this, MonsterStats, 'monster', 32, 32);
  }

  function create() {
    this.add.image(600, 300, 'background');
    createHeroes(this);
    this.monsters = this.physics.add.group();
    this.physics.add.collider(this.monsters, this.physics.add.group(), handleCollision, null, this);
    this.time.addEvent({
      delay: 1000,
      callback: () => spawnMonster(this),
      loop: true
    });
  }

  function update(time, delta) {
    this.monsters.getChildren().forEach(monsterSprite => {
      const monster = monsterSprite.getData('instance');
      if (monsterSprite.x < 0) {
        monsterSprite.destroy();
      } else {
        const closestHero = findClosestHero(monsterSprite);
        if (closestHero && Phaser.Math.Distance.Between(monsterSprite.x, monsterSprite.y, closestHero.sprite.x, closestHero.sprite.y) < attackDistance) {
          monsterSprite.setVelocity(0);
          if (monsterSprite.anims.currentAnim.key !== `monsterAttack${monsterSprite.data.get('index')}`) {
            monsterSprite.play(`monsterAttack${monsterSprite.data.get('index')}`);
          }
          // Play hero attack animation and deal damage
          playHeroAttackAnimation(closestHero.hero, closestHero.sprite);
          const damage = closestHero.hero.attack(monster);
          if (damage > 0) { // Only display damage if it was dealt
            displayDamage(this, monsterSprite, damage);
          }
        } else {
          monsterSprite.setVelocityX(-100);
          if (monsterSprite.anims.currentAnim.key !== `monsterMove${monsterSprite.data.get('index')}`) {
            monsterSprite.play(`monsterMove${monsterSprite.data.get('index')}`);
          }
        }
      }
    });
  }

  function loadSpritesheets(scene, entities, prefix, frameWidth, frameHeight) {
    entities.forEach((entity, index) => {
      scene.load.spritesheet(`${prefix}${index}`, entity.spriteSheet, { frameWidth, frameHeight });
    });
  }

  function createHeroes(scene) {
    heroes1.value.forEach((hero, index) => {
      if (index < lanes.length) {
        const sprite = scene.add.sprite(100, lanes[index], `hero${index}`).setOrigin(0.5, 0.5);
        const frames = scene.anims.generateFrameNumbers(`hero${index}`, { start: 0, end: 5 });
        scene.anims.create({
          key: `heroAnim${index}`,
          frames,
          frameRate: 10,
          repeat: -1
        });
        sprite.play(`heroAnim${index}`);
        hero.sprite = sprite; // Attach sprite to hero for reference
        createHeroAttackAnimation(scene, hero, index);
      }
    });
  }

  function createHeroAttackAnimation(scene, hero, index) {
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
    }
    const attackFrames = scene.anims.generateFrameNumbers(`hero${index}`, { start: startFrame, end: endFrame });
    scene.anims.create({
      key: `heroAttack${index}`,
      frames: attackFrames,
      frameRate: 10,
      repeat: -1
    });
  }

  function playHeroAttackAnimation(hero, sprite) {
    const heroIndex = heroes1.value.indexOf(hero);
    if (sprite.anims.currentAnim.key !== `heroAttack${heroIndex}`) {
      sprite.play(`heroAttack${heroIndex}`);
    }
  }

  function displayDamage(scene, monsterSprite, damage) {
    const damageText = scene.add.text(monsterSprite.x, monsterSprite.y - 50, damage, {
      fontSize: '32px',
      fill: '#ff0000'
    });
    scene.tweens.add({
      targets: damageText,
      y: monsterSprite.y - 100,
      alpha: 0,
      duration: 1000,
      ease: 'Power1',
      onComplete: () => damageText.destroy()
    });
  }

  function spawnMonster(scene) {
    if (scene.monsters.countActive(true) < maxMonsters) {
      const monsterIndex = Phaser.Math.Between(0, MonsterStats.length - 1);
      const x = Phaser.Math.Between(1100, 1200);
      const y = lanes[Phaser.Math.Between(0, lanes.length - 1)];

      const monsterData = MonsterStats[monsterIndex];
      const monster = new Monster(monsterData);
      const monsterSprite = scene.monsters.create(x, y, `monster${monsterIndex}`).setOrigin(0.5, 0.5).setVelocityX(-100).setScale(3);
      monsterSprite.flipX = true;
      monsterSprite.setData('index', monsterIndex);
      monsterSprite.setData('instance', monster);
      monster.sprite = monsterSprite; // Associate the sprite with the monster instance
      const moveFrames = scene.anims.generateFrameNumbers(`monster${monsterIndex}`, { start: 0, end: 5 });
      const attackFrames = scene.anims.generateFrameNumbers(`monster${monsterIndex}`, { start: 12, end: 17 });
      scene.anims.create({
        key: `monsterMove${monsterIndex}`,
        frames: moveFrames,
        frameRate: 10,
        repeat: -1
      });
      scene.anims.create({
        key: `monsterAttack${monsterIndex}`,
        frames: attackFrames,
        frameRate: 10,
        repeat: -1
      });
      monsterSprite.play(`monsterMove${monsterIndex}`);
    }
  }

  function handleCollision(monsterSprite, heroSprite) {
    const monster = monsterSprite.getData('instance');
    monsterSprite.setVelocity(0);
    if (monsterSprite.anims.currentAnim.key !== `monsterAttack${monsterSprite.data.get('index')}`) {
      monsterSprite.play(`monsterAttack${monsterSprite.data.get('index')}`);
    }
  }

  function findClosestHero(monsterSprite) {
    let closestHero = null;
    let minDistance = Infinity;
    heroes1.value.forEach((hero, index) => {
      const heroPosition = { x: 100, y: lanes[index], hero, sprite: hero.sprite };
      const distance = Phaser.Math.Distance.Between(monsterSprite.x, monsterSprite.y, heroPosition.x, heroPosition.y);
      if (distance < minDistance) {
        minDistance = distance;
        closestHero = heroPosition;
      }
    });
    return closestHero;
  }
});
</script>

<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
}
</style>
