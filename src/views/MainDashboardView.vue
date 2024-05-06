<script setup>
import SideBarMenu from "@/components/SideBarMenu.vue";
import Inventory from "@/components/Inventory.vue";
import HeroGroup from "@/components/HeroGroup.vue";
import TopBarStats from "@/components/TopBarStats.vue";

import {useHeroStore} from "@/store/HeroStore.js";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const heroStore = useHeroStore();
const router = useRouter();


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
            <HeroGroup />
          </div>
          <div class="col-6">
            <HeroGroup />
          </div>
        </div>
        <Inventory />
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  margin-top: 5rem;
  width: 80%;
  height: 100%;
}
</style>


