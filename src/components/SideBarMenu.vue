<script setup>
import { useRouter } from 'vue-router';

import blacksmith from "@/assets/items/tile025.png";
import alchemist from "@/assets/items/tile026.png";
import tavern from "@/assets/items/tile027.png";
import mine from "@/assets/items/tile028.png";
import farms from "@/assets/items/tile029.png";
import exit from "@/assets/items/tile030.png";

const menuItems = [
  { label: 'Tavern', icon: tavern, route: '/tavern' },
  { label: 'Mines', icon: mine, route: '/mines' },
  { label: 'Farms', icon: farms, route: '/farms' },
  { label: 'Blacksmith', icon: blacksmith, route: '/blacksmith' },
  { label: 'Alchemist', icon: alchemist, route: '/alchemist' },
  { label: 'Exit', icon: exit, route: '/exit' }
];

const router = useRouter();

function navigate(route) {
  router.push(route);
}
</script>

<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.label" @click="navigate(item.route)">
        <img :src="item.icon" :alt="item.label" class="icon" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 60%;
  height: 80vh;
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar li {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  flex-grow: 1;
  border-bottom: 1px solid white;
}

.sidebar li:last-child {
  border-bottom: none;
}

.sidebar li:hover {
  background-color: #2c3e60;
  transform: scale(1.05);
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.sidebar span {
  font-size: 1.5rem;
  color: white;
  font-family: 'Arial', sans-serif;
}


</style>




