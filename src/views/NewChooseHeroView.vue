<script setup>
import { ref } from 'vue';
import ChooseHeroCard from "@/components/ChooseHeroCard.vue";
import { NewHeroStats } from "@/data/NewHeroStats.js";


const heroes = ref(NewHeroStats);

const selectedHero = ref(null);

function selectHero(hero) {
  selectedHero.value = hero;
}

</script>

<template>
  <div class="hero-selection">
    <div class="card-container">
      <ChooseHeroCard
        v-for="(hero, index) in heroes"
        :key="index"
        :hero="hero"
        :is-selected="selectedHero === hero"
        @select="selectHero"
      />
    </div>
  </div>
</template>

<style scoped>
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
</style>

