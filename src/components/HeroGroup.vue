<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  heroes: {
    type: Array,
    default: () => []
  }
});

const router = useRouter();

function routeToNewHero() {
  router.push({ name: 'NewChooseHero' });
}
</script>

<template>
  <div class="hero-container">
    <h2>Hero Group</h2>
    <div class="row">
      <div v-for="index in 3" :key="index" class="hero-square">
        <template v-if="heroes.length >= index && heroes[index - 1].image">
          <div class="col-12 hero-card">
            <p>{{ heroes[index-1].name }} </p>
            <p>Level: {{ heroes[index-1].level }} {{ heroes[index-1].heroClass }}</p>
            <img :src="heroes[index - 1].image" alt="Hero" class="hero-image" />
          </div>
        </template>
        <span v-else class="plus" @click="routeToNewHero">+</span>
      </div>
    </div>
    <div class="row">
      <div v-for="index in 2" :key="index + 3" class="hero-square">
        <template v-if="heroes.length >= index + 3 && heroes[index + 2].image">
          <div class="hero-card">
            <p>{{ heroes[index + 2].name }} </p>
            <p>Level: {{ heroes[index + 2].level }} {{ heroes[index + 2].heroClass }}</p>
            <img :src="heroes[index + 2].image" alt="Hero " class="hero-image" />
          </div>
        </template>
        <span v-else class="plus" @click="routeToNewHero">+</span>
      </div>
    </div>
  </div>
</template>



<style scoped>
h2 {
  font-size: 2rem;
  color: #f8facc;
  font-family: 'Almendra', serif;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
}

.row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.hero-square {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  width: 25%;
  height: 0; /* Set to 0 */
  padding-bottom: 32%; /* Maintains aspect ratio */
  position: relative;
  margin: 10px;
  background: linear-gradient(135deg, #0c5460 0%, #203647 100%);
}

.hero-card {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distributes space evenly */
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}

.hero-card p {
  margin: 2px 0; /* Reducing margin to make more space for the image */
  font-size: .75rem; /* Smaller text to reduce space usage */
  color: #f8facc;
}

.hero-image {
  max-width: 100%; /* Ensures the image covers the available width */
  height: 100%; /* Maintains the image aspect ratio */
  flex-grow: 1; /* Allows the image to take up remaining space */
  object-fit: cover;
  scale: 1.3;
}

.plus {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: bold;
  color: white;
}

.hero-square:hover {
  transform: scale(1.1) translateY(-10px);
}

.hero-square:hover .plus {
  font-size: 4.5rem;
  cursor: pointer;
}
</style>


