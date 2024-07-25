<script setup>
import { useRouter } from 'vue-router';
import PhaserBattle from "@/components/PhaserBattle.vue";
import { ref } from 'vue';
import TopBarStats from "@/components/TopBarStats.vue";
import PlayerLevelBar from "@/components/PlayerLevelBar.vue";

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
    <div class="game-wrapper">
      <TopBarStats />
      <PhaserBattle
        :key="phaserBattleKey"
        @gameOver="handleGameOver"
        @restartGame="handleRestartGame"
      />
      <PlayerLevelBar />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
  margin-top: 3rem;
  width: 100%;
  height: 100%;
  scale: .9;
}

.game-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
}

.game-wrapper :deep(> *) {
  width: 100%;
}
</style>