<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import { useHeroStore } from "@/store/HeroStore.js";
import { createGame } from '../game/PhaserGame';
import useGameControls from '../composables/useGameControls';

const emit = defineEmits(['gameOver', 'switchToPreviousView']);

const heroStore = useHeroStore();
const heroes1 = computed(() => heroStore.HeroGroup1);

const gameContainer = ref(null);
const { selectedSpeed, continueAfterFighting, changeSpeed, changeContinueAfterFighting } = useGameControls();

let game;

onMounted(() => {
  heroStore.loadHeroData();
  startGame();
});

function startGame() {
  game = createGame(gameContainer.value, heroes1.value, handleGameOver, selectedSpeed.value, continueAfterFighting.value);
}

function handleGameOver() {
  emit('gameOver');
  if (!continueAfterFighting.value) {
    // Destroy the current game instance
    if (game) {
      game.destroy(true);
      game = null;
    }
    // Emit an event to tell the parent component to switch back to the previous view
    emit('switchToPreviousView');
  }
}

function handleSpeedChange(newSpeed) {
  changeSpeed(game, newSpeed);
}

function handleContinueAfterFightingChange(value) {
  changeContinueAfterFighting(game, value);
}

watch(continueAfterFighting, (newValue) => {
  handleContinueAfterFightingChange(newValue);
});

onUnmounted(() => {
  if (game) {
    game.destroy(true);
  }
});
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
      <input type="checkbox" v-model="continueAfterFighting" @change="handleContinueAfterFightingChange($event.target.checked)" /> Restart Round After Death
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
  margin: auto;
  bottom: 10px;
  left: 3rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>