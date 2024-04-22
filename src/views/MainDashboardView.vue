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
      <div class="party-container">
        <HeroStatsCard />
        <HeroStatsCard :hero="selectedHero" />
        <HeroStatsCard />
      </div>
    </div>
  </div>
</template>


<style scoped>
.party-container {
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;

}

</style>
