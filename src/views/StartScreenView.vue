<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleNewGame = () => {
  router.push({ name: 'NewChooseHero' });
};
</script>

<template>
  <div class="start-screen">
    <div class="animated-background"></div>
    <div class="content">
      <h1>MayoRPG</h1>
      <div class="button-container">
        <button class="new-game-button" @click="handleNewGame">New Game</button>
        <button class="continue-button">Continue Game</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.start-screen {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.content {
  position: relative;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

h1 {
  font-size: 3rem;
  margin-bottom: 3rem;
  font-family: 'Press Start 2P', cursive;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

button {
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #2c3e50;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, #415b77 0%, #2c3e50 100%);
}

.new-game-button {
  background-color: #7f8c8d;
  background-image: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
}

.new-game-button:hover {
  background-image: linear-gradient(135deg, #b1bdbd 0%, #7f8c8d 100%);
}

.continue-button {
  background-color: #34495e;
  background-image: linear-gradient(135deg, #46637f 0%, #34495e 100%);
}

.continue-button:hover {
  background-image: linear-gradient(135deg, #587ca1 0%, #34495e 100%);
}
</style>