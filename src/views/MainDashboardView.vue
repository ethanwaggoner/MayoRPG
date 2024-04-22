<script setup>
import MainMenu from "@/components/MainMenu.vue";
import Logo from "@/components/Logo.vue";
import HeroStatsCard from "@/components/HeroStatsCard.vue";

import {useHeroStore} from "@/store/HeroStore.js";

const heroStore = useHeroStore();

const selectedHero = heroStore.selectedHero;
</script>

<template>
  <div class="app-container">
    <Logo />
    <div class="center-dashboard">
      <MainMenu />
      <HeroStatsCard :hero="selectedHero" />
    </div>
  </div>
</template>


<style scoped>


</style>
