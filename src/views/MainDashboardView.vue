<script setup>
import MainMenu from "@/components/MainMenu.vue";
import Logo from "@/components/Logo.vue";
import HeroStatsCard from "@/components/HeroStatsCard.vue";

import {useHeroStore} from "@/store/HeroStore.js";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const heroStore = useHeroStore();
const router = useRouter();

const hero1 = heroStore.hero1;
const hero2 = heroStore.hero2;
const hero3 = heroStore.hero3;

onMounted(() => {
  heroStore.loadHeroData();
});

</script>

<template>
  <div class="app-container">
    <Logo />
    <div class="center-dashboard">
      <MainMenu />
      <div class="party-container">
        <HeroStatsCard :hero="hero2"/>
        <HeroStatsCard :hero="hero1" />
        <HeroStatsCard :hero="hero3"/>
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
