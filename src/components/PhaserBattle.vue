<script setup>
import { ref, onMounted, computed } from 'vue';
import { useHeroStore } from "@/store/HeroStore.js";
import { createGame } from '../game/PhaserGame';
import useGameControls from '../composables/useGameControls';

const emit = defineEmits(['gameOver', 'restartGame']);

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);
const { selectedSpeed, continueAfterFighting, changeSpeed } = useGameControls();

let game;

onMounted(() => {
  heroStore.loadHeroData();
  game = createGame(gameContainer.value, heroes1.value, emit, selectedSpeed, continueAfterFighting);
});

function handleSpeedChange(newSpeed) {
  changeSpeed(game, newSpeed);
}
</script>

<template>
  <div ref="gameContainer" class="game-container"></div>
  <div class="controls">
    <label>Speed: </label>
    <select v-model="selectedSpeed" @change="handleSpeedChange($event.target.value)">
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