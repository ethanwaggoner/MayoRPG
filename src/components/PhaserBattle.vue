<script setup>
import { computed, onMounted, ref } from 'vue';
import Phaser from 'phaser';
import { useHeroStore } from "@/store/HeroStore.js";
import { MonsterStats } from '@/data/MonsterStats.js';

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);
let game;

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
      preload: preload,
      create: create,
      update: update
    },
    parent: gameContainer.value
  };

  game = new Phaser.Game(config);

  let monsters;
  let maxMonsters = 20;

  function preload() {
    console.log('Preloading assets...');
    this.load.image('background', 'src/assets/BattleBackground2.jpg');

    heroes1.value.forEach((hero, index) => {
      console.log(`Loading sprite sheet for hero${index} from ${hero.spriteSheet}`);
      this.load.spritesheet(`hero${index}`, hero.spriteSheet, {
        frameWidth: 96,
        frameHeight: 96
      });
    });

    MonsterStats.forEach((monster, index) => {
      console.log(`Loading sprite sheet for monster${index} from ${monster.spriteSheet}`);
      this.load.spritesheet(`monster${index}`, monster.spriteSheet, {
        frameWidth: 32,
        frameHeight: 32
      });
    });
  }

  function create() {
    this.add.image(600, 300, 'background');
    console.log('Creating hero sprites...');

    const heroBaseX = 100; // Base X position for the leftmost hero
    const heroBaseY = 300; // Base Y position for the heroes
    const heroSpacingX = 150; // Horizontal spacing between heroes
    const heroSpacingY = 100; // Vertical spacing between rows of heroes

    // Positions for a right-facing bowling pin formation with 2 heroes in front and 3 in the back
    const heroPositions = [
      { x: heroBaseX, y: heroBaseY - heroSpacingY * 0.5 }, // 1st row top
      { x: heroBaseX, y: heroBaseY + heroSpacingY * 0.5 }, // 1st row bottom
      { x: heroBaseX + heroSpacingX, y: heroBaseY - heroSpacingY }, // 2nd row top
      { x: heroBaseX + heroSpacingX, y: heroBaseY }, // 2nd row middle
      { x: heroBaseX + heroSpacingX, y: heroBaseY + heroSpacingY } // 2nd row bottom
    ];

    heroes1.value.forEach((hero, index) => {
      if (index < heroPositions.length) {
        console.log(`Adding hero${index} sprite at position: (${heroPositions[index].x}, ${heroPositions[index].y})`);
        const sprite = this.add.sprite(heroPositions[index].x, heroPositions[index].y, `hero${index}`).setOrigin(0.5, 0.5);
        const frames = this.anims.generateFrameNumbers(`hero${index}`, { start: 6, end: 11 });
        console.log(`Frames for hero${index}:`, frames);
        this.anims.create({
          key: `heroAnim${index}`,
          frames: frames,
          frameRate: 10,
          repeat: -1
        });
        sprite.play(`heroAnim${index}`);
      }
    });

    monsters = this.physics.add.group();
    this.physics.add.collider(monsters, this.physics.add.group(), handleCollision, null, this);

    this.time.addEvent({
      delay: 1000, // Spawn a new monster every second
      callback: spawnMonster,
      callbackScope: this,
      loop: true
    });
  }

  function spawnMonster() {
    if (monsters.countActive(true) < maxMonsters) {
      const monsterIndex = Phaser.Math.Between(0, MonsterStats.length - 1);
      const monsterData = MonsterStats[monsterIndex];
      const x = Phaser.Math.Between(1100, 1200);
      const y = Phaser.Math.Between(150, 550);
      console.log(`Spawning monster ${monsterIndex} at position: (${x}, ${y})`);

      const monster = monsters.create(x, y, `monster${monsterIndex}`);
      monster.setOrigin(0.5, 0.5);
      monster.setVelocityX(-100); // Move towards the left
      monster.flipX = true; // Flip to face left
      monster.scale = 3; // Double the size
      const frames = this.anims.generateFrameNumbers(`monster${monsterIndex}`, { start: 0, end: 5 });
      console.log(`Frames for monster${monsterIndex}:`, frames);
      this.anims.create({
        key: `monsterAnim${monsterIndex}`,
        frames: frames,
        frameRate: 10,
        repeat: -1
      });
      monster.play(`monsterAnim${monsterIndex}`);
    }
  }

  function handleCollision(monster, hero) {
    monster.setVelocity(0);
  }

  function update() {
    monsters.getChildren().forEach(monster => {
      if (monster.x < 0) {
        monster.destroy();
      }
    });
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
