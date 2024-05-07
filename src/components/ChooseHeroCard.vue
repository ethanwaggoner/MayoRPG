<script setup>

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
import HealthIcon from "@/assets/items/tile403.png";

import {computed} from "vue";

const icons = {
  "Fire Attack": FireAttackIcon,
  "Water Attack": WaterAttackIcon,
  "Dark Attack": DarkAttackIcon,
  "Light Attack": LightAttackIcon,
  "Fire Defense": FireDefenseIcon,
  "Water Defense": WaterDefenseIcon,
  "Dark Defense": DarkDefenseIcon,
  "Light Defense": LightDefenseIcon,
  "Crafting Speed": CraftingIcon,
  "Gathering Speed": GatheringIcon,
  "Hunger": HungerIcon,
  "Health": HealthIcon
};

const props = defineProps({
  hero: Object,
  isSelected: Boolean
});

const attackAndCraftingStats = computed(() => {
  return Object.entries(props.hero.stats).filter(([key, value]) =>
    key.endsWith('Attack')
  );
});

const defenseAndOtherStats = computed(() => {
  return Object.entries(props.hero.stats).filter(([key, value]) =>
    key.endsWith('Defense')
  );
});

</script>

<template>
  <div class="hero-card">
    <h2>{{ props.hero.name }}</h2>
    <img :src="props.hero.image" :alt="props.hero.name" class="hero-image">
    <div class="health">
      <img :src="icons.Health" class="stat-icon">
      <span class="stat-label">Health:</span>
      <span class="stat-value">{{ props.hero.stats.Health }}</span>
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
      <div v-if="props.isSelected" class="col-3 passive">
        <h2>Passive</h2>
        <p>{{ props.hero.passive.description}}</p>
      </div>
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

.hero-card {
  background-color: #0F111A;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  color: #f8facc;
  font-family: 'Almendra', serif;
  width: 400px;
  height: 450px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.health {
  margin-bottom: 20px;
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

.passive {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 0;
}

</style>