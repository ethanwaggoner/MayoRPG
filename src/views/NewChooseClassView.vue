<script setup>
import HeroStatsCard from "@/components/HeroStatsCard.vue";
import ChooseClassCard from "@/components/ChooseClassCard.vue";
import { useHeroStore} from "@/store/HeroStore.js";

import { useRouter } from 'vue-router';

const router = useRouter();

const heroStore = useHeroStore();

const hero = heroStore.selectedHero;

function selectHero(hero) {
  heroStore.selectHeroClass(hero, hero.heroClass);
}


const Continue = () => {
  selectHero(hero);
  router.push({ name: 'MainDashboard' });
};

const Back = () => {
  router.push({ name: 'NewChooseHero' });
};

</script>

<template>
  <div class="centered-container">
    <div class="cards-container">
      <HeroStatsCard :hero="hero" class="hero-stats-card" />
      <div class="choose-class">
        <h1 class="title">Choose Your Class</h1>
        <ChooseClassCard :hero="hero" class="choose-class-card" @click="Continue" />
      </div>
    </div>
    <div class="button-container">
      <button @click="Back">Back</button>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: .5rem;
  margin-left: 1rem;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  background-color: #2c3e50;
  background-image: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  border-radius: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.4);
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 80%;
  align-items: stretch;
  margin-bottom: 20px;
}

.hero-stats-card, .choose-class {
  display: flex;
  flex-direction: column;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  width: 80%;
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
  flex: none;
  margin: 0 20px;
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(135deg, #415b77 0%, #2c3e50 100%);
}
</style>

