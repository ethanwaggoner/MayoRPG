<template>
  <div ref="gameContainer" class="game-container"></div>
  <div class="controls">
    <label>Speed: </label>
    <select v-model="selectedSpeed" @change="changeSpeed">
      <option value="1">1x</option>
      <option value="2">2x</option>
      <option value="3">3x</option>
      <option value="4">4x</option>
    </select>
    <label>
      <input type="checkbox" v-model="continueAfterFighting" /> Continue after fighting
    </label>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Phaser from 'phaser';
import { useHeroStore } from "@/store/HeroStore.js";
import { MonsterStats } from '@/data/MonsterStats.js';
import { Monster } from '@/game/monster.js';

const emit = defineEmits(['gameOver']);

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);
const selectedSpeed = ref(1);
const continueAfterFighting = ref(true);
let game;

const lanes = [150, 240, 330, 420, 510]; // Y positions for the 5 lanes
let maxMonsters = 20;
const attackDistance = 50; // Define the stopping distance in front of the hero


let currentLevel = 1;
let monstersKilled = 0;
let monstersPerLevel = 20;
const monstersPerLevelIncrease = 5; // Number of additional monsters per level
const statIncreasePerLevel = 0.2; // 20% increase in stats per level

let levelText, nextLevelText;

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
    loadMonsterSpritesheets(this, MonsterStats);
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

    levelText = this.add.text(800, 510, `Level: ${currentLevel}`, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
    nextLevelText = this.add.text(800, 540, `Monsters to Next Level: ${monstersPerLevel - monstersKilled}`, { fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
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
          if (monsterSprite.anims.currentAnim?.key !== `monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
            monsterSprite.play(`monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
          }
          if (monster.canAttack()) { // Monster can attack if cooldown has passed
            const damage = monster.calculateDamage();
            closestHero.hero.takeDamage(damage);
            displayDamage(this, closestHero.sprite, damage, '#ff0000'); // Display damage dealt to hero in red
            if (closestHero.hero.health <= 0) {
              if (continueAfterFighting.value) {
                emit('restartGame')
                return;
              } else {
                emit('gameOver');
                return;
              }
            }
          }

          // Play hero attack animation and deal damage
          playHeroAttackAnimation(closestHero.hero, closestHero.sprite);
          const heroDamage = closestHero.hero.attack(monster);
          if (heroDamage > 0) { // Only display damage if it was dealt
            displayDamage(this, monsterSprite, heroDamage);
            if (monster.health <= 0) {
              monsterKilled();
            }
          }
        } else {
          monsterSprite.setVelocityX(-100 * selectedSpeed.value); // Adjust monster speed based on game speed
          if (monsterSprite.anims.currentAnim?.key !== `monsterMove${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
            monsterSprite.play(`monsterMove${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
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

  function loadMonsterSpritesheets(scene, monsters) {
    monsters.forEach((monster, index) => {
      scene.load.spritesheet(`monsterA${index}`, monster.spriteSheetA, { frameWidth: 32, frameHeight: 32 });
      scene.load.spritesheet(`monsterB${index}`, monster.spriteSheetB, { frameWidth: 32, frameHeight: 32 });
      scene.load.spritesheet(`monsterC${index}`, monster.spriteSheetC, { frameWidth: 32, frameHeight: 32 });
      scene.load.spritesheet(`monsterD${index}`, monster.spriteSheetD, { frameWidth: 32, frameHeight: 32 });
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
          frameRate: 10 * selectedSpeed.value, // Adjust the frame rate based on the game speed
          repeat: -1
        });
        sprite.play(`heroAnim${index}`);
        hero.sprite = sprite; // Attach sprite to hero for reference
        sprite.setData('instance', hero);
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
      frameRate: 10 * selectedSpeed.value, // Adjust the frame rate based on the game speed
      repeat: -1
    });
  }

  function playHeroAttackAnimation(hero, sprite) {
    const heroIndex = heroes1.value.indexOf(hero);
    if (sprite?.anims?.currentAnim?.key !== `heroAttack${heroIndex}`) {
      sprite?.play(`heroAttack${heroIndex}`);
    }
  }

  function displayDamage(scene, sprite, damage, color = '#ff0000') {
    const damageText = scene.add.text(sprite.x, sprite.y - 50, damage, {
      fontSize: '32px',
      fill: color
    });
    scene.tweens.add({
      targets: damageText,
      y: sprite.y - 100,
      alpha: 0,
      duration: 1000 / selectedSpeed.value, // Adjust the duration based on the game speed
      ease: 'Power1',
      onComplete: () => damageText.destroy()
    });
  }

  function spawnMonster(scene) {
    if (scene.monsters.countActive(true) < maxMonsters) {
      const monsterIndex = Phaser.Math.Between(0, MonsterStats.length - 1);
      const element = ['A', 'B', 'C', 'D'][Phaser.Math.Between(0, 3)];
      const spriteKey = `monster${element}${monsterIndex}`;
      const x = Phaser.Math.Between(1100, 1200);
      const y = lanes[Phaser.Math.Between(0, lanes.length - 1)];

      const monsterData = {
        name: MonsterStats[monsterIndex].name,
        stats: {
          "Health": MonsterStats[monsterIndex].stats["Health"] * (1 + statIncreasePerLevel * (currentLevel - 1)),
          "Fire Attack": MonsterStats[monsterIndex].stats["Fire Attack"] * (1 + statIncreasePerLevel * (currentLevel - 1)),
          "Water Attack": MonsterStats[monsterIndex].stats["Water Attack"] * (1 + statIncreasePerLevel * (currentLevel - 1)),
          "Light Attack": MonsterStats[monsterIndex].stats["Light Attack"] * (1 + statIncreasePerLevel * (currentLevel - 1)),
          "Dark Attack": MonsterStats[monsterIndex].stats["Dark Attack"] * (1 + statIncreasePerLevel * (currentLevel - 1)),
          "Fire Defense": MonsterStats[monsterIndex].stats["Fire Defense"],
          "Water Defense": MonsterStats[monsterIndex].stats["Water Defense"],
          "Light Defense": MonsterStats[monsterIndex].stats["Light Defense"],
          "Dark Defense": MonsterStats[monsterIndex].stats["Dark Defense"]
        }
      };

      const monster = new Monster(monsterData);
      const monsterSprite = scene.monsters.create(x, y, spriteKey).setOrigin(0.5, 0.5).setVelocityX(-100 * selectedSpeed.value).setScale(3);
      monsterSprite.flipX = true;
      monsterSprite.setData('index', monsterIndex);
      monsterSprite.setData('element', element);
      monsterSprite.setData('instance', monster);
      monster.sprite = monsterSprite; // Associate the sprite with the monster instance

      createMonsterAnimations(scene, spriteKey, monsterIndex, element);
      monsterSprite.play(`monsterMove${element}${monsterIndex}`);
    }
  }

  function createMonsterAnimations(scene, spriteKey, monsterIndex, element) {
    const moveFrames = scene.anims.generateFrameNumbers(spriteKey, { start: 0, end: 5 });
    const attackFrames = scene.anims.generateFrameNumbers(spriteKey, { start: 12, end: 17 });
    scene.anims.create({
      key: `monsterMove${element}${monsterIndex}`,
      frames: moveFrames,
      frameRate: 10 * selectedSpeed.value, // Adjust the frame rate based on the game speed
      repeat: -1
    });
    scene.anims.create({
      key: `monsterAttack${element}${monsterIndex}`,
      frames: attackFrames,
      frameRate: 10 * selectedSpeed.value, // Adjust the frame rate based on the game speed
      repeat: -1
    });
  }

  function handleCollision(monsterSprite, heroSprite) {
    const monster = monsterSprite.getData('instance');
    const hero = heroSprite.getData('instance');
    monsterSprite.setVelocity(0);
    if (monsterSprite.anims.currentAnim?.key !== `monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
      monsterSprite.play(`monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
    }
    if (monster.canAttack()) { // Monster can attack if cooldown has passed
      const damage = monster.calculateDamage();
      hero.takeDamage(damage);
      displayDamage(this, hero.sprite, damage, '#ff0000'); // Display damage dealt to hero in red
      if (hero.health <= 0) {
        if (continueAfterFighting.value) {
          emit('restartGame')
        } else {
          emit('gameOver');
        }
      }
    }
  }

  function findClosestHero(monsterSprite) {
    let closestHero = null;
    let minDistance = Infinity;
    heroes1.value.forEach((hero, index) => {
      if (hero.health > 0) { // Only consider heroes that are alive
        const heroPosition = { x: 100, y: lanes[index], hero, sprite: hero.sprite };
        const distance = Phaser.Math.Distance.Between(monsterSprite.x, monsterSprite.y, heroPosition.x, heroPosition.y);
        if (distance < minDistance) {
          minDistance = distance;
          closestHero = heroPosition;
        }
      }
    });
    return closestHero;
  }

  function monsterKilled() {
    monstersKilled++;
    if (monstersKilled >= monstersPerLevel) {
      currentLevel++;
      monstersKilled = 0;
      monstersPerLevel += monstersPerLevelIncrease;
      maxMonsters += monstersPerLevelIncrease;
    }
    updateLevelText();
  }

  function updateLevelText() {
    levelText.setText(`Level: ${currentLevel}`);
    nextLevelText.setText(`Monsters to Next Level: ${monstersPerLevel - monstersKilled}`);
  }

  function changeSpeed() {
    game.loop.targetFps = 60 * selectedSpeed.value; // Adjust the target FPS based on the selected speed
    game.time.slowMotion = 1 / selectedSpeed.value; // Adjust the slow motion factor based on the selected speed
    game.monsters.getChildren().forEach(monsterSprite => {
      monsterSprite.body.velocity.x = -100 * selectedSpeed.value;
      if (monsterSprite.anims.currentAnim) {
        monsterSprite.anims.currentAnim.frameRate = 10 * selectedSpeed.value;
      }
    });
    heroes1.value.forEach((hero, index) => {
      if (hero.sprite && hero.sprite.anims.currentAnim) {
        hero.sprite.anims.currentAnim.frameRate = 10 * selectedSpeed.value;
      }
    });
  }

  function resetGame() {
    monstersKilled = 0;
    currentLevel = 1;
    maxMonsters = 20;
    updateLevelText();
    this.scene.restart();
  }
});
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
