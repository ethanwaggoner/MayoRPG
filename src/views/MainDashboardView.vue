<script setup>
import SideBarMenu from "@/components/SideBarMenu.vue";
import Inventory from "@/components/Inventory.vue";
import HeroGroup from "@/components/HeroGroup.vue";
import TopBarStats from "@/components/TopBarStats.vue";
import BattleButton from "@/components/BattleButton.vue";
import PlayerLevelBar from "@/components/PlayerLevelBar.vue";

import {useHeroStore} from "@/store/HeroStore.js";
import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";

const heroStore = useHeroStore();
const router = useRouter();

const heroes1 = computed(() => heroStore.HeroGroup1);
const heroes2 = computed(() => heroStore.HeroGroup2);

onMounted(() => {
  heroStore.loadHeroData();
});

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <SideBarMenu />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12">
            <TopBarStats />
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <HeroGroup :heroes="heroes1" />
          </div>
          <div class="col-6">
            <HeroGroup :heroes="heroes2" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <PlayerLevelBar />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <Inventory />
          </div>
          <div class="col-2 align-self-end">
            <BattleButton />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 2.5rem 2.5rem 0 2.5rem;
  margin-top: 3rem;
  width: 100%;
  height: 100%;
  scale: .9;
}

</style>


