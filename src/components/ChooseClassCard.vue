<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useHeroStore } from "@/store/HeroStore.js";

const heroStore = useHeroStore();

const props = defineProps({
  hero: Object
});

const classDetails = ref([
  { name: 'Berserker', src: '', description: "Brave and bold, excels in melee combat and defense.", stats: [
      "+5 All Defense",
      "+30 Health",
    ]},
  { name: 'Wizard', src: '', description: "Master of the arcane, wields powerful spells.", stats: [
      "+5 All Attack",
      "+50 Mana",
    ]},
  { name: 'Hunter', src: '', description: "Stealthy and agile, expert in ranged attacks and survival.", stats: [
      "+3 All Attack",
      "+10% Base Crit Chance",
    ]},
]);

function selectClass(className) {
  const classInfo = classDetails.value.find(c => c.name === className);
  if (classInfo && classInfo.src) {
    props.hero.image = classInfo.src;
    props.hero.heroClass = classInfo.name;
  }
}

onMounted(async () => {
  if (props.hero && props.hero.image) {
    const baseName = props.hero.image.match(/(hero\d+)animate/)?.[1];

    if (baseName) {
      try {
        const animations = await Promise.all([
          import(`@/assets/${baseName}animatemelee.gif`),
          import(`@/assets/${baseName}animatemagic.gif`),
          import(`@/assets/${baseName}animateranged.gif`)
        ]);

        classDetails.value[0].src = animations[0].default;
        classDetails.value[1].src = animations[1].default;
        classDetails.value[2].src = animations[2].default;
      } catch (error) {
        console.error('Failed to load class animations:', error);
        const defaultAnimation = await import(`@/assets/${baseName}animate.gif`);

        classDetails.value[0].src = defaultAnimation.default;
        classDetails.value[1].src = defaultAnimation.default;
        classDetails.value[2].src = defaultAnimation.default;

      }
    }
  }
});
</script>


<template>
  <div class="class-selection">
    <div class="class-card" v-for="classInfo in classDetails" :key="classInfo.name" @click="selectClass(classInfo.name)">
      <h3>{{ classInfo.name }}</h3>
      <img :src="classInfo.src" :alt="`${classInfo.name} animation`" class="class-animation">
      <p v-for="stat in classInfo.stats" :key="stat">{{ stat }}</p>
      <p>{{ classInfo.description }}</p>
    </div>
  </div>
</template>


<style scoped>
.class-selection {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
  gap: 20px;
}

.class-card {
  cursor: pointer;
  width: 200px;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #1e2833;
  color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.class-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3);
}

.class-animation {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

h3 {
  color: white;
  font-size: 1.4rem;
  margin-bottom: 10px;
}

p {
  font-size: 0.9rem;
  line-height: 1.3;
  text-align: justify;
}
</style>

