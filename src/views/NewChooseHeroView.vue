<script setup>
import { ref, computed } from 'vue';
import ChooseHeroCard from "@/components/ChooseHeroCard.vue";
import Logo from "@/components/Logo.vue";
import { NewHeroStats } from "@/data/NewHeroStats.js";


const heroes = ref([...NewHeroStats]);
const currentIndex = ref(0);
const selectedHero = ref(heroes.value[0]);

function adjustIndex(index) {
  const count = heroes.value.length;
  return (index % count + count) % count;
}


const displayedHeroes = computed(() => {
  let prevIndex = adjustIndex(currentIndex.value - 1);
  let nextIndex = adjustIndex(currentIndex.value + 1);
  return [
    heroes.value[prevIndex],
    heroes.value[currentIndex.value],
    heroes.value[nextIndex]
  ];
});

function selectHero(hero) {
  selectedHero.value = hero;
}

function moveLeft() {
  currentIndex.value = adjustIndex(currentIndex.value - 1);
}

function moveRight() {
  currentIndex.value = adjustIndex(currentIndex.value + 1);
}
</script>


<template>
  <div class="hero-selection">
    <Logo />
    <h1 class="title">Choose Your Hero</h1>
    <div class="navigation-container">
      <button @click="moveLeft"> <<< </button>
      <div class="card-container">
        <ChooseHeroCard
          v-for="(hero, index) in displayedHeroes"
          :key="hero.name"
          :hero="hero"
          :is-selected="selectedHero.value === hero"
          @select="() => selectHero(hero)"
          :class="{ 'is-large': index === 1 }"
        />
      </div>
      <button @click="moveRight"> >>> </button>
    </div>
    <button class="continue-button">Continue</button>
  </div>
</template>

<style scoped>
.title {
  color: #fff;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  display: inline-block;
  background-color: #2c3e50;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  border-radius: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.4);
}

.hero-selection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.navigation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  overflow: hidden;
  max-width: 80%;
}

.is-large {
  transform: scale(1.1);
  margin: 40px;
  cursor: pointer;
  border: 4px solid #fff;
}

button {
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  color: #fff;
  border: none;
  border-radius: 8px;
  margin: 40px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #2c3e50;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

button:first-child {
  left: 10px;
}

button:last-child {
  right: 10px;
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, #415b77 0%, #2c3e50 100%);
}

</style>
