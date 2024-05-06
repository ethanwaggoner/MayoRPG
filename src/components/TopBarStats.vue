<script setup>
const fractions = [
        { numerator: 8, denominator: 9 },
        { numerator: 112, denominator: 5476 },
        { numerator: 56, denominator: 789 },
        { numerator: 44, denominator: 55 }
      ];
</script>

<template>
  <div class="fraction-menu">
    <div class="fraction" v-for="(fraction, index) in fractions" :key="index">
      {{ fraction.numerator }}/{{ fraction.denominator }}
    </div>
  </div>
</template>

<style scoped>
.fraction-menu {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  padding: 10px 0;
}

.fraction {
  font-size: 24px;
  color: white;
}
</style>