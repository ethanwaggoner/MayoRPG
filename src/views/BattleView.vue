<script setup>
import { useRouter } from 'vue-router';
import PhaserBattle from "@/components/PhaserBattle.vue";
import { ref } from 'vue';

const router = useRouter();
const phaserBattleKey = ref(0);

function handleGameOver() {
  router.back();
}

function handleRestartGame() {
  phaserBattleKey.value++; // This will force the component to re-render
}
</script>

<template>
  <div class="container">
    <PhaserBattle
      :key="phaserBattleKey"
      @gameOver="handleGameOver"
      @restartGame="handleRestartGame"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
