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
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0c5460 0%, #203647 100%); /* Darker, more mysterious gradient */
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.5); /* Deeper shadow for more depth */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.sidebar li {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  flex-grow: 1;
  border-bottom: 3px groove #ddd; /* Make the dividers more pronounced */
  background: rgba(0, 0, 0, 0.2); /* Slight transparency for depth */
}

.sidebar li:last-child {
  border-bottom: none;
}

.sidebar li:hover {
  background-color: rgba(44, 62, 80, 0.8); /* Adjusted hover color for better visibility */
  transform: scale(1.1); /* Slightly larger scale on hover */
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}

.sidebar span {
  font-size: 2rem;
  color: #f8facc;
  font-family: 'Almendra', serif;
}

@font-face {
  font-family: 'Almendra';
  src: url('https://fonts.googleapis.com/css2?family=Almendra&display=swap');
}
</style>




