<script setup>
import {computed, ref} from 'vue';
import {useHeroStore} from "@/store/HeroStore.js";

import Inventory from '@/assets/items/tile952.png';
import Fight from '@/assets/items/tile486.png';
import Shop from '@/assets/items/tile735.png';
import Craft from '@/assets/items/tile435.png';

const heroStore = useHeroStore();

const hero1Name = computed(() => heroStore.hero1?.name ?? 'Hero 1');
const hero2Name = computed(() => heroStore.hero2?.name ?? 'Hero 2');
const hero3Name = computed(() => heroStore.hero3?.name ?? 'Hero 3');

const buttons = ref([
  { label: 'Inventory', icon: Inventory, options: [
    { name: hero1Name.value, icon: Inventory },
    { name: hero2Name.value, icon: Inventory },
    { name: hero3Name.value, icon: Inventory }
  ] },
  { label: 'Fight', icon: Fight, options: [
    { name: 'Battlefield', icon: Fight },
    { name: 'Infinite Arena', icon: Fight }
  ] },
  { label: 'Craft', icon: Craft, options: [
    { name: 'Blacksmith', icon: Craft },
    { name: 'Alchemist', icon: Craft }
  ] },
  { label: 'Shop', icon: Shop, options: [
    { name: 'Sell', icon: Shop },
    { name: 'Buy Gear', icon: Shop },
    { name: 'Buy Ingredients', icon: Shop }
  ] },
]);
</script>


<template>
  <div class="main-menu">
    <div class="button-container">
      <div v-for="(button, index) in buttons" :key="index" class="menu-item-wrapper">
        <div class="menu-button">
          <img :src="button.icon" :alt="button.label" class="button-icon" />
          <span class="button-label">{{ button.label }}</span>
        </div>
        <div class="dropdown-content">
          <div v-for="option in button.options" :key="option.name" class="dropdown-item">
            <img :src="option.icon" :alt="option.name" class="option-icon" />
            {{ option.name }}
          </div>
        </div>
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

.menu-item-wrapper {
  position: relative;
  width: 30rem;
}

.menu-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 5px;
}

.dropdown-content {
  font-family: 'Press Start 2P', cursive;
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
  background-color: #34495e;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.menu-item-wrapper:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
  text-align: left;
}

.option-icon {
  width: 30px;
  height: 30px;
}

.dropdown-item:hover {
  background-color: #46637f;
  color: #fff;
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
</style>

