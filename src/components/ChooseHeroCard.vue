<script setup>
import AttackIcon from '@/assets/items/tile000.png';
import SpellIcon from '@/assets/items/tile256.png';
import DefenseIcon from '@/assets/items/tile085.png';
import CraftingIcon from '@/assets/items/tile464.png';
import GatheringIcon from '@/assets/items/tile849.png';
import HungerIcon from '@/assets/items/tile913.png';

const icons = {
  attack: AttackIcon,
  spell: SpellIcon,
  defense: DefenseIcon,
  craftingSpeed: CraftingIcon,
  gatheringSpeed: GatheringIcon,
  hunger: HungerIcon
};


const props = defineProps({
  hero: Object,
  isSelected: Boolean
});

</script>

<template>
  <div class="hero-card">
    <h2>{{ hero.name }}</h2>
    <img :src="hero.image" :alt="hero.name" class="hero-image">
    <div class="hero-stats">
      <div v-for="(value, key) in hero.stats" :key="key" class="stat-row">
        <img :src="icons[key]" class="stat-icon">
        <span class="stat-label">{{ key }}:</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.hero-card {
  background-color: #0F111A;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #fff;
  width: 250px;
  height: 400px;
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

</style>