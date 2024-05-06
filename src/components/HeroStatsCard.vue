<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import FireAttackIcon from "@/assets/items/tile096.png";
import WaterAttackIcon from "@/assets/items/tile032.png";
import DarkAttackIcon from "@/assets/items/tile064.png";
import LightAttackIcon from "@/assets/items/tile000.png";

import FireDefenseIcon from "@/assets/items/tile117.png";
import WaterDefenseIcon from "@/assets/items/tile053.png";
import DarkDefenseIcon from "@/assets/items/tile085.png";
import LightDefenseIcon from "@/assets/items/tile021.png";

import CraftingIcon from "@/assets/items/tile924.png";
import GatheringIcon from "@/assets/items/tile849.png";
import HungerIcon from "@/assets/items/tile913.png";


const router = useRouter();

const navigateToNewHero = () => {
  router.push({ name: 'NewChooseHero' });
};

const icons = {
  "fireAttack": FireAttackIcon,
  "waterAttack": WaterAttackIcon,
  "darkAttack": DarkAttackIcon,
  "lightAttack": LightAttackIcon,
  "fireDefense": FireDefenseIcon,
  "waterDefense": WaterDefenseIcon,
  "darkDefense": DarkDefenseIcon,
  "lightDefense": LightDefenseIcon,
  "craftingSpeed": CraftingIcon,
  "gatheringSpeed": GatheringIcon,
  "hunger": HungerIcon
};
const props = defineProps({
  hero: Object,
  isSelected: Boolean
});

const attackAndCraftingStats = computed(() => {
  return Object.entries(props.hero).filter(([key, value]) =>
    key.endsWith('Attack')
  );
});

const defenseAndOtherStats = computed(() => {
  return Object.entries(props.hero).filter(([key, value]) =>
    key.endsWith('Defense')
  );
});

</script>

<template>
  <div class="hero-card" :class="{ 'is-selected': props.isSelected }">
    <div v-if="props.hero">
      <h2>{{ props.hero.name }}</h2>
      <img :src="props.hero.image" :alt="props.hero.name" class="hero-image">
      <div class="level-experience">
        <h3>Level: {{ props.hero.level }}</h3>
        <p>{{ props.hero.heroClass }}</p>
        <p>Health {{ props.hero.health }}</p>
        <p>Experience: {{ props.hero.experience }} / {{ props.hero.requiredExperience }}</p>
      </div>
      <div class="hero-stats">
        <div class="stat-column">
          <div v-for="([key, value]) in attackAndCraftingStats" :key="'attack-' + key" class="stat-row">
            <img :src="icons[key]" class="stat-icon">
            <span class="stat-label">{{ key }}:</span>
            <span class="stat-value">{{ value }}</span>
          </div>
        </div>
        <div class="stat-column">
          <div v-for="([key, value]) in defenseAndOtherStats" :key="'defense-' + key" class="stat-row">
            <img :src="icons[key]" class="stat-icon">
            <span class="stat-label">{{ key }}:</span>
            <span class="stat-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-card">
      <div class="plus-sign" @click="navigateToNewHero">+</div>
    </div>
  </div>
</template>


<style scoped>
.hero-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
}

.level-experience {
  font-size: 1.2rem;
  text-align: center;
}

.hero-card {
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #fff;
  width: 80%;
  height: 30rem;
  margin: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.stat-label {
  flex: 1;
  text-align: left;
}

.stat-value {
  flex: 1;
  text-align: right;
}

.hero-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 50%;
  border: 3px solid #fff;
}

.empty-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
}

.plus-sign {
  font-size: 72px;
  color: #ccc;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
}

.empty-card:hover .plus-sign {
  transform: scale(1.5);
  color: #ff0000;
  cursor: pointer;
}

</style>