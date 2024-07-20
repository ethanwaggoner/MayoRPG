<script setup>
import { computed, onMounted, ref } from 'vue';
import Phaser from 'phaser';
import { useHeroStore } from "@/store/HeroStore.js";

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);

onMounted(() => {
  heroStore.loadHeroData();

  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {},
    scene: {
      preload: preload,
      create: create
    },
    parent: gameContainer.value
  };

  new Phaser.Game(config);

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
  }

  function create() {
    this.add.image(600, 300, 'background');
    console.log('Creating hero sprites...');

    const baseX = 100; // Base X position for the leftmost hero
    const baseY = 300; // Base Y position for the heroes
    const spacingX = 150; // Horizontal spacing between heroes
    const spacingY = 100; // Vertical spacing between rows of heroes

    // Positions for a right-facing bowling pin formation with 2 heroes in front and 3 in the back
    const positions = [
      {x: baseX, y: baseY - spacingY * 0.5}, // 1st row top
      {x: baseX, y: baseY + spacingY * 0.5}, // 1st row bottom
      {x: baseX + spacingX, y: baseY - spacingY}, // 2nd row top
      {x: baseX + spacingX, y: baseY}, // 2nd row middle
      {x: baseX + spacingX, y: baseY + spacingY} // 2nd row bottom
    ];

    heroes1.value.forEach((hero, index) => {
      if (index < positions.length) {
        console.log(`Adding hero${index} sprite at position: (${positions[index].x}, ${positions[index].y})`);
        const sprite = this.add.sprite(positions[index].x, positions[index].y, `hero${index}`).setOrigin(0.5, 0.5);
        const frames = this.anims.generateFrameNumbers(`hero${index}`, {start: 36, end: 47});
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
