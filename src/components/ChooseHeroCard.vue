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

const emits = defineEmits(['select']);

function selectHero() {
  emits('select', props.hero);
}
</script>

<template>
  <div
    class="hero-card"
    :class="{ 'is-selected': isSelected }"
    @click="selectHero"
  >
    <h2>{{ hero.name }}</h2>
    <img :src="hero.image" :alt="hero.name" class="hero-image">
    <div class="hero-stats">
      <div v-for="(value, key) in hero.stats" :key="key" class="stat-row">
        <img :src="icons[key]" class="stat-icon">
        <span class="stat-label">{{ key }}:</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>
    <button v-if="isSelected" class="continue-button">Continue</button>
  </div>
</template>

<style scoped>

.hero-card {
  background-color: #0F111A;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.hero-card:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.hero-card.is-selected {
  border: 4px solid #fff;
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

.continue-button {
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

.continue-button:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, #415b77 0%, #2c3e50 100%);
}
</style>