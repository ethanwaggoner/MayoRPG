<script setup>
import resource1 from '@/assets/items/tile499.png';
import resource2 from '@/assets/items/tile509.png';
import resource3 from '@/assets/items/tile631.png';
import resource4 from '@/assets/items/tile721.png'

const fractions = [
  { numerator: 8, denominator: 9, image: resource1 },
  { numerator: 112, denominator: 5476, image: resource2},
  { numerator: 56, denominator: 789, image: resource3},
  { numerator: 44, denominator: 55, image: resource4}
];
</script>


<template>
  <div class="fraction-menu">
    <div class="fraction" v-for="(fraction, index) in fractions" :key="index">
      <img :src="fraction.image" alt="Stat Image" class="fraction-image"/>
      {{ fraction.numerator }}/{{ fraction.denominator }}
    </div>
  </div>
</template>


<style scoped>
.fraction-menu {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #0c5460 0%, #203647 100%);
  padding: 10px 0;
  border-radius: 10px;
}

.fraction {
  font-size: 2rem;
  color: #f8facc;
  font-family: 'Almendra', serif;
  display: flex;
  align-items: center;
}

.fraction-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
}
</style>