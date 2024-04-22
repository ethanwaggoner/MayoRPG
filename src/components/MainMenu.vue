<script setup>
import { ref } from 'vue';

import Inventory from '@/assets/items/tile952.png';
import Fight from '@/assets/items/tile486.png';
import Gather from '@/assets/items/tile894.png';
import Craft from '@/assets/items/tile912.png';

const buttons = ref([
  { label: 'Inventory', icon: Inventory },
  { label: 'Fight', icon: Fight },
  { label: 'Gather', icon: Gather },
  { label: 'Craft', icon: Craft },
]);
</script>

<template>
  <div class="main-menu">
    <div class="button-container">
      <div v-for="(button, index) in buttons" :key="index" class="menu-button">
        <img :src="button.icon" :alt="button.label" class="button-icon" />
        <span class="button-label">{{ button.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}

.button-container {
  display: flex;
  justify-content: space-around;
  width: 80%;
}

.menu-button {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 5px;
}

.menu-button:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
}

.button-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.button-label {
  font-size: 24px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, #415b77 0%, #2c3e50 100%);
}
</style>