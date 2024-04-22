<script setup>
import { ref } from 'vue';

import Hero1 from '@/assets/hero1idle.png';
import Hero2 from '@/assets/hero2idle.png';
import Hero3 from '@/assets/hero3idle.png';
import Hero4 from '@/assets/hero4idle.png';

const heroes = ref([
    {
    name: 'Warrior',
    image: Hero1,
    stats: {
      attack: 18,
      defense: 12,
      craftingSpeed: 6,
      gatheringSpeed: 8,
      hunger: 4
    },
  },
  {
    name: 'Scout',
    image: Hero2,
    stats: {
      attack: 10,
      defense: 6,
      craftingSpeed: 14,
      gatheringSpeed: 18,
      hunger: 10
    },
  },
  {
    name: 'Craftsman',
    image: Hero3,
    stats: {
      attack: 7,
      defense: 10,
      craftingSpeed: 20,
      gatheringSpeed: 6,
      hunger: 8
    },
  },
  {
    name: 'Defender',
    image: Hero4,
    stats: {
      attack: 9,
      defense: 20,
      craftingSpeed: 10,
      gatheringSpeed: 7,
      hunger: 15
    },
  },

]);

const selectedHero = ref(null);

function selectHero(hero) {
  selectedHero.value = hero;
}

</script>

<template>
  <div class="hero-selection">
    <div class="card-container">
      <div
        v-for="(hero, index) in heroes"
        :key="index"
        class="hero-card"
        :class="{ 'is-selected': selectedHero === hero }"
        @click="selectHero(hero)"
      >
        <h2>{{ hero.name }}</h2>
        <img :src="hero.image" :alt="hero.name" class="hero-image">
        <div class="hero-stats">
          <p>Attack: {{ hero.stats.attack }}</p>
          <p>Defense: {{ hero.stats.defense }}</p>
          <p>Crafting Speed: {{ hero.stats.craftingSpeed }}</p>
          <p>Gathering Speed: {{ hero.stats.gatheringSpeed }}</p>
          <p>Hunger: {{ hero.stats.hunger }}</p>
        </div>
        <button v-if="selectedHero === hero" class="continue-button">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.hero-selection {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  padding: 20px;
}

.hero-card {
  background-color: #0F111A;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  animation: floatCard 3s ease-in-out infinite;
}

.hero-card:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.hero-card.is-selected {
  border: 4px solid #fff;
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


.hero-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
  border-radius: 50%;
  border: 3px solid #fff;
}

.hero-stats {
  margin-top: 20px;
}

@keyframes floatCard {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

