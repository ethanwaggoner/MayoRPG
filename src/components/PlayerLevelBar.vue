<script setup>
import { useCharacterStore } from "@/store/CharacterStore.js";
import { computed } from 'vue';

const store = useCharacterStore();

const experiencePercentage = computed(() => {
  return store.experiencePercentage;
});

const experienceRatio = computed(() => {
  return `${store.currentExperience} / ${store.requiredExperience}`;
});

const currentLevel = computed(() => {
  return store.level;
});

</script>

<template>
  <h2>Level: {{ currentLevel }} </h2>
  <div class="experience-bar-container">
    <div class="progress-bar progress-bar-striped bg-danger"
         :style="{ width: experiencePercentage + '%' }"
         aria-valuenow="experiencePercentage"
         aria-valuemin="0"
         aria-valuemax="100"
         role="progressbar">
      {{ experienceRatio }}
    </div>
  </div>
</template>

<style scoped>

h2 {
  font-size: 24px;
  color: #f8facc;
  font-family: 'Almendra', serif;
  margin-top: 5px;
}
.experience-bar-container {
  border-radius: 10px;
  background-color: white;
  font-size: 1rem;
  color: #f8facc;
  font-family: 'Almendra', serif;
  margin-top: 5px;
  width: 100%;
}

</style>